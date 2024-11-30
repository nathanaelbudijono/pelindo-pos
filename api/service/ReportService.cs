using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.Items;
using api.dto.report;
using api.helper;
using api.interfaces;
using Microsoft.VisualBasic;

namespace api.service
{
    public class ReportService : IReportRepository
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IItemRepository _itemRepository;
        private readonly ITransactionRepository _transactionRepository;

        public ReportService(
            ICategoryRepository categoryRepository,
            IItemRepository itemRepository,
            ITransactionRepository transactionRepository
        )
        {
            _categoryRepository = categoryRepository;
            _itemRepository = itemRepository;
            _transactionRepository = transactionRepository;
        }

        public async Task<ReportDto> GetReportAsync(QueryObject query)
        {
            var items = await _itemRepository.GetAllAsync();
            var categories = await _categoryRepository.GetAllAsync();
            var transactions = await _transactionRepository.GetAllTransactionAsync(query);

            int totalTransaction = transactions.Count;
            int totalItemSold = transactions.Sum(item => item.QuantityBought);
            double totalRevenue = transactions.Sum(item => item.TotalPrice);

            var bestSellingItem = items
                .Select(item => new
                {
                    item.ItemName,
                    TotalItemSold = transactions
                        .Where(transaction => transaction.ItemId == item.Id)
                        .Sum(transaction => transaction.QuantityBought),
                    TotalItemRevenue = transactions
                        .Where(transaction => transaction.ItemId == item.Id)
                        .Sum(transaction => transaction.TotalPrice),
                })
                .OrderByDescending(item => item.TotalItemSold)
                .FirstOrDefault();

            var bestSellingCategory = categories
                .Select(item => new
                {
                    item.Name,
                    TotalSold = transactions
                        .Where(item => item.CategoryId == item.Id)
                        .Sum(item => item.QuantityBought),
                    TotalRevenue = transactions
                        .Where(item => item.CategoryId == item.Id)
                        .Sum(item => item.TotalPrice),
                })
                .OrderByDescending(item => item.TotalSold)
                .FirstOrDefault();

            var itemReports = items
                .Select(i => new ReportDto.ItemReport
                {
                    ItemName = i.ItemName,
                    ItemSold = transactions.Where(t => t.ItemId == i.Id).Sum(t => t.QuantityBought),
                    TotalItemRevenue = transactions
                        .Where(t => t.ItemId == i.Id)
                        .Sum(t => t.TotalPrice),
                }).OrderByDescending(i => i.ItemSold)
                .ToList();

            var categoryReports = categories
                .Select(c => new ReportDto.CategoryReport
                {
                    CategoryName = c.Name,
                    CategorySold = transactions
                        .Where(t => t.CategoryId == c.Id)
                        .Sum(t => t.QuantityBought),
                    TotalCategoryRevenue = transactions
                        .Where(t => t.CategoryId == c.Id)
                        .Sum(t => t.TotalPrice),
                }).OrderByDescending(c => c.CategorySold)
                .ToList();

            return new ReportDto
            {
                BestSellingItem = bestSellingItem?.ItemName ?? string.Empty,
                BestSellingCategory = bestSellingCategory?.Name ?? string.Empty,
                TotalTransaction = totalTransaction,
                TotalItemSold = totalItemSold,
                TotalRevenue = totalRevenue,
                Items = itemReports,
                Categories = categoryReports,
            };
        }

        public async Task<StockReportDto> GetStockReportAsync()
        {
            var items = await _itemRepository.GetAllAsync();

            int lowStockCount = items.Count(item => item.Quantity <= 10);
            int mediumStockCount = items.Count(item => item.Quantity > 10 && item.Quantity <= 20);
            int highStockCount = items.Count(item => item.Quantity > 20);
            var stockReportItems = items
                .Select(item =>
                {
                    string level;
                    if (item.Quantity <= 10)
                    {
                        level = "Low";
                    }
                    else if (item.Quantity <= 20)
                    {
                        level = "Medium";
                    }
                    else
                    {
                        level = "High";
                    }

                    return new StockReportItemDto
                    {
                        ItemName = item.ItemName,
                        Quantity = item.Quantity,
                        Price = item.Price,
                        Category = item.Category.Name,
                        ImagePath = item.ImagePath,
                        Level = level,
                    };
                })
                .ToList();

            var stockReportDto = new StockReportDto
            {
                LowStockLevel = lowStockCount,
                MediumStockLevel = mediumStockCount,
                HighStockLevel = highStockCount,
                Stocks = stockReportItems,
            };

            return stockReportDto;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.dto.Items;
using api.interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.repository
{
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationDBContext _context;

        public ItemRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Item> CreateAsync(Item createItem)
        {
            await _context.Item.AddAsync(createItem);
            await _context.SaveChangesAsync();
            return createItem;
        }

        public async Task<Item?> DeleteAsync(int id)
        {
            var item = await _context.Item.FirstOrDefaultAsync(item => item.Id == id);
            if (item is null)
            {
                return null;
            }
            _context.Item.Remove(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public Task<List<Item>> GetAllAsync()
        {
            return _context.Item.Include(item => item.Category).ToListAsync();
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            var item = await _context
                .Item.Include(item => item.Category)
                .FirstOrDefaultAsync(item => item.Id == id);
            if (item is null)
            {
                return null;
            }
            return item;
        }

        public async Task<bool> GetItemByNameAsync(string name)
        {
            var item = await _context.Item.FirstOrDefaultAsync(item => item.ItemName.ToLower() == name.ToLower());
            if(item is null){
                return false;
            }

            return true;
        }

        public async Task<Item?> UpdateAsync(int id, Item updateItem)
        {
            var existingItem = await _context.Item.FirstOrDefaultAsync(item => item.Id == id);
            if (existingItem is null)
            {
                return null;
            }

            existingItem.ItemName = updateItem.ItemName;
            existingItem.Quantity = updateItem.Quantity;
            existingItem.Price = updateItem.Price;
            existingItem.ImagePath = updateItem.ImagePath;
            existingItem.CategoryId = updateItem.CategoryId;

            await _context.SaveChangesAsync();
            return existingItem;
        }

        public async Task<Item?> UpdateItemQuantityAsync(int id, int quantity)
        {
            var item = await _context.Item.FirstOrDefaultAsync(item => item.Id == id);

            if (item is null)
            {
                return null;
            }

            item.Quantity = item.Quantity - quantity;

            await _context.SaveChangesAsync();
            return item;
        }
    }
}

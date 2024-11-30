using System;
using System.Collections.Generic;

namespace api.dto.Items
{
    public class StockReportDto
    {
        public int LowStockLevel { get; set; } = 2;

        public int MediumStockLevel { get; set; } = 3;

        public int HighStockLevel { get; set; } = 4;

        public List<StockReportItemDto> Stocks { get; set; } = new List<StockReportItemDto>();
    }

    public class StockReportItemDto
    {
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string Category { get; set; } = string.Empty;

        public string ImagePath { get; set; } = string.Empty;

        public string Level { get; set; } = string.Empty;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.report
{
    public class ReportDto
    {
        public string BestSellingItem { get; set; } = string.Empty;
        public string BestSellingCategory { get; set; } = string.Empty;
        public int TotalTransaction { get; set; }
        public int TotalItemSold { get; set; }
        public double TotalRevenue { get; set; }

        public List<ItemReport> Items { get; set; } = new List<ItemReport>();
        public List<CategoryReport> Categories { get; set; } = new List<CategoryReport>();

        public class ItemReport
        {
            public string ItemName { get; set; } = string.Empty;
            public int ItemSold { get; set; }
            public double TotalItemRevenue { get; set; }
        }

        public class CategoryReport
        {
            public string CategoryName { get; set; } = string.Empty;
            public int CategorySold { get; set; }
            public double TotalCategoryRevenue { get; set; }
        }
    }
}

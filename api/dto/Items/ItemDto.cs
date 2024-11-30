using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.category;
using api.models;

namespace api.dto.Items
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string ImagePath { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
    }
}

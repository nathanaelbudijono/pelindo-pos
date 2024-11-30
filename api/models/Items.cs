using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.models
{
    [Table("Items")]
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string ImagePath { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [JsonIgnore]
        public Category Category { get; set; }
    }
}

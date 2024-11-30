using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.models
{
    [Table("Transaction")]
    public class Transaction
    {
        public int Id { get; set; }

        public int QuantityBought { get; set; }

        public double TotalPrice { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;

        public string ItemName { get; set; } = string.Empty;

        public int ItemId { get; set; }

        [JsonIgnore]
        public Item? Item { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}

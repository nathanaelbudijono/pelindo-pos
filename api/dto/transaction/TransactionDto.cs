using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.transaction
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public int QuantityBought { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;

        public double TotalPrice { get; set; }

        public string ItemName { get; set; } = string.Empty;

        public double ItemPrice { get; set; }

        public string CategoryName { get; set; } = string.Empty;
    }
}

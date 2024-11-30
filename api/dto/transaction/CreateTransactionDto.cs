using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.transaction
{
    public class CreateTransactionDto
    {
        [Required]
        [Range(1, 99999)]
        public int QuantityBought { get; set; }

        [Required]
        public string ItemName { get; set; } = string.Empty;

        [Required]
        public int ItemId { get; set; }

        [Required]
        public string CategoryName { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }
    }
}

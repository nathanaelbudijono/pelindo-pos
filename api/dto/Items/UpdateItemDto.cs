using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.Items
{
    public class UpdateItemDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Item name must be at least 2 characters long")]
        public string ItemName { get; set; } = string.Empty;

        [Required]
        [MinLength(1, ErrorMessage = "Quantity cannot be 0")]
        public string Quantity { get; set; } = string.Empty;

        [Required]
        [MinLength(1, ErrorMessage = "Price cannot be 0")]
        public string Price { get; set; } = string.Empty;

        [Required]
        public required IFormFile ImagePath { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Category Id cannot be empty")]
        public string CategoryId { get; set; } = string.Empty;
    }
}

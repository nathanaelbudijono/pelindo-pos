using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.category
{
    public class UpdateCategoryDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Category name must be at least 2 characters long")]
        public string Name { get; set; } = string.Empty;
    }
}

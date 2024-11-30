using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.Items;

namespace api.dto.category
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public List<ItemDto> Items { get; set; } = new List<ItemDto>();
    }
}

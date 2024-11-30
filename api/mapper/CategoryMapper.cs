using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.category;
using api.models;

namespace api.mapper
{
    public static class CategoryMapper
    {
        public static Category ToCategoryFromCreateDto(this CreateCategoryDto categoryDto)
        {
            return new Category { Name = categoryDto.Name };
        }

        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                Name = categoryModel.Name,
                Items = categoryModel.Items.Select(item => item.toItemDto()).ToList(),
            };
        }
    }
}

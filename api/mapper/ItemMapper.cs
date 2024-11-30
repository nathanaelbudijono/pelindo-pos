using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.category;
using api.dto.Items;
using api.models;

namespace api.mapper
{
    public static class ItemMapper
    {
        public static Item ToCreateItemDto(this CreateItemDto createItemDto, string createImageName)
        {
            return new Item
            {
                ItemName = createItemDto.ItemName,
                Price = double.Parse(createItemDto.Price),
                ImagePath = createImageName,
                CategoryId = int.Parse(createItemDto.CategoryId),
                Quantity = int.Parse(createItemDto.Quantity),
            };
        }

        public static Item ToUpdateItemDto(
            this UpdateItemDto updateItemDto,
            string createdImageName
        )
        {
            return new Item
            {
                ItemName = updateItemDto.ItemName,
                Price = double.Parse(updateItemDto.Price),
                ImagePath = createdImageName,
                CategoryId = int.Parse(updateItemDto.CategoryId),
                Quantity = int.Parse(updateItemDto.Quantity),
            };
        }

        public static ItemDto toItemDto(this Item item)
        {
            return new ItemDto
            {
                Id = item.Id,
                ItemName = item.ItemName,
                Quantity = item.Quantity,
                Price = item.Price,
                ImagePath = item.ImagePath,
                Category = item.Category.Name,
            };
        }
    }
}

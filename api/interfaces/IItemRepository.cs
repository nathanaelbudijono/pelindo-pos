using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.Items;
using api.models;

namespace api.interfaces
{
    public interface IItemRepository
    {
        Task<List<Item>> GetAllAsync();
        Task<Item?> GetByIdAsync(int id);

        Task<Item?> UpdateAsync(int id, Item updateItem);

        Task<Item> CreateAsync(Item createItem);

        Task<Item?> DeleteAsync(int id);

        Task<Item?> UpdateItemQuantityAsync(int id, int quantity);

        Task<Boolean> GetItemByNameAsync(string name);
    }
}

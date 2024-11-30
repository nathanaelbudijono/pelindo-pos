using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.category;
using api.models;

namespace api.interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);

        Task<Category?> UpdateAsync(int id, UpdateCategoryDto updateCategory);

        Task<Category> CreateAsync(Category category);

        Task<Category?> DeleteAsync(int id);

        Task<Boolean> GetByNameAsync(string name);
    }
}

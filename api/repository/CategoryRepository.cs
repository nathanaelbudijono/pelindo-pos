using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.dto.category;
using api.interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDBContext _context;

        public CategoryRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Category.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> DeleteAsync(int id)
        {
            var category = await _context.Category.FirstOrDefaultAsync(item => item.Id == id);
            if (category is null)
            {
                return null;
            }
            _context.Category.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Category.Include(item => item.Items).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            var category = await _context
                .Category.Include(item => item.Items)
                .FirstOrDefaultAsync(item => item.Id == id);

            if (category is null)
            {
                return null;
            }

            return category;
        }

        public async Task<bool> GetByNameAsync(string name)
        {
           var category = await _context.Category.FirstOrDefaultAsync(item => item.Name.ToLower() == name.ToLower());

        if(category is null)
        {
            return false;
        }
            return true;
        }

        public async Task<Category?> UpdateAsync(int id, UpdateCategoryDto updateCategory)
        {
            var existingCategory = await _context.Category.FirstOrDefaultAsync(item =>
                item.Id == id
            );
            if (existingCategory is null)
            {
                return null;
            }

            existingCategory.Name = updateCategory.Name;
            await _context.SaveChangesAsync();
            return existingCategory;
        }
    }
}

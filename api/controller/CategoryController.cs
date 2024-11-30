using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.category;
using api.interfaces;
using api.mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.controller
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllCategory()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var category = await _categoryRepo.GetAllAsync();
                var categoryDto = category.Select(item => item.ToCategoryDto()).ToList();

                return Ok(categoryDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto categoryDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var isCategoryExist = await _categoryRepo.GetByNameAsync(categoryDto.Name);
                if(isCategoryExist)
                {
                    return BadRequest("The category already exist");
                }

                var categoryModel = categoryDto.ToCategoryFromCreateDto();
                await _categoryRepo.CreateAsync(categoryModel);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = categoryModel.Id },
                    categoryModel
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var category = await _categoryRepo.GetByIdAsync(id);

                if (category is null)
                {
                    return NotFound("The category doesnt exist");
                }
                return Ok(category.ToCategoryDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateCategory(
            [FromRoute] int id,
            [FromBody] UpdateCategoryDto updateCategoryDto
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var isCategoryExist = await _categoryRepo.GetByNameAsync(updateCategoryDto.Name);
                if(isCategoryExist)
                {
                    return BadRequest("The category already exist");
                }

                var category = await _categoryRepo.UpdateAsync(id, updateCategoryDto);

                if (category is null)
                {
                    return NotFound("The category doesnt exist");
                }

                return Ok(category.ToCategoryDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var category = await _categoryRepo.DeleteAsync(id);

                if (category is null)
                {
                    return NotFound("The category doesnt exist");
                }

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}

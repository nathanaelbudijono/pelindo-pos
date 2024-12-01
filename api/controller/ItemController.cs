using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.Items;
using api.interfaces;
using api.mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.controller
{
    [Route("/api/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;
        private readonly IFileService _fileService;

        private readonly IReportRepository _reportRepository;

        public ItemController(
            IItemRepository itemRepo,
            IFileService fileService,
            IReportRepository reportRepository
        )
        {
            _itemRepo = itemRepo;
            _fileService = fileService;
            _reportRepository = reportRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllItem()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var items = await _itemRepo.GetAllAsync();
                var itemDto = items.Select(item => item.toItemDto()).ToList();
                return Ok(itemDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateItem([FromForm] CreateItemDto createItemDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingItem = await _itemRepo.GetItemByNameAsync(createItemDto.ItemName);
                if (existingItem)
                {
                    return BadRequest("Item already exists");
                }

                if (createItemDto.ImagePath?.Length > 1 * 1024 * 1024)
                {
                    return StatusCode(413, "Image is too large. Must be less than 1MB");
                }

                string[] allowedExtensions = [".jpg", ".jpeg", ".png"];

                if (createItemDto.ImagePath == null)
                {
                    return BadRequest("Image path cannot be null.");
                }

                string createImageName = await _fileService.SaveFileAsync(
                    createItemDto.ImagePath,
                    allowedExtensions
                );

                var createdItemDto = createItemDto.ToCreateItemDto(createImageName);
                var createdItem = await _itemRepo.CreateAsync(createdItemDto);

                return CreatedAtAction(
                    nameof(GetItemById),
                    new { id = createdItem.Id },
                    createdItem
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetItemById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var item = await _itemRepo.GetByIdAsync(id);
                if (item is null)
                {
                    return NotFound("The item doesnt exist");
                }
                return Ok(item.toItemDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateItem(
            [FromRoute] int id,
            [FromForm] UpdateItemDto updateItemDto
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingItem = await _itemRepo.GetByIdAsync(id);
                if (existingItem is null)
                {
                    return NotFound("The item doesnt exist");
                }
                string oldImage = existingItem.ImagePath;

                if (updateItemDto.ImagePath is null)
                {
                    return BadRequest("Image path cannot be null.");
                }
                if (updateItemDto.ImagePath?.Length > 1 * 1024 * 1024)
                {
                    return StatusCode(
                        StatusCodes.Status400BadRequest,
                        "File size should not exceed 1 MB"
                    );
                }
                string[] allowedFileExtentions = [".jpg", ".jpeg", ".png"];

                string createdImageName = await _fileService.SaveFileAsync(
                    updateItemDto.ImagePath,
                    allowedFileExtentions
                );
                var updatedItemDto = updateItemDto.ToUpdateItemDto(createdImageName);
                var updatedItem = await _itemRepo.UpdateAsync(id, updatedItemDto);
                if (updatedItem is null)
                {
                    return NotFound("The item doesnt exist");
                }
                return Ok(updatedItem.toItemDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteItem([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var existingItem = await _itemRepo.GetByIdAsync(id);

                if (existingItem is null)
                {
                    return NotFound("The item doesnt exist");
                }
                await _itemRepo.DeleteAsync(id);
                _fileService.DeleteFile(existingItem.ImagePath);
          
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("stock")]
        [Authorize]
        public async Task<IActionResult> GetStockReport()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var items = await _reportRepository.GetStockReportAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.transaction;
using api.extension;
using api.helper;
using api.interfaces;
using api.mapper;
using api.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.controller
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IItemRepository _itemRepository;
        private readonly UserManager<AppUser> _userManager;

        public TransactionController(
            ITransactionRepository transactionRepository,
            IItemRepository itemRepository,
            UserManager<AppUser> userManager
        )
        {
            _transactionRepository = transactionRepository;
            _itemRepository = itemRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTransaction(
            [FromBody] CreateTransactionDto createTransactionDto
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var existingItem = await _itemRepository.GetByIdAsync(createTransactionDto.ItemId);
                if (existingItem is null)
                {
                    return NotFound("Item Not Found");
                }

                if (existingItem.Quantity < createTransactionDto.QuantityBought)
                {
                    return BadRequest("Not enough items in stock");
                }

                await _itemRepository.UpdateItemQuantityAsync(
                    existingItem.Id,
                    createTransactionDto.QuantityBought
                );

                double totalPrice = existingItem.Price * createTransactionDto.QuantityBought;

                var createdTransaction = createTransactionDto.ToCreateTransactionDto(totalPrice);
                await _transactionRepository.CreateTransactionAsync(createdTransaction);

                return CreatedAtAction(
                    nameof(GetTransactionById),
                    new { id = createdTransaction.Id },
                    createdTransaction
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
        public async Task<IActionResult> GetTransactionById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var existingTransaction = await _transactionRepository.GetTransactionByIdAsync(id);
                if (existingTransaction is null)
                {
                    return NotFound("The transaction doesnt exist");
                }

                return Ok(existingTransaction.ToTransactionDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllTransaction([FromQuery] QueryObject query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var transactions = await _transactionRepository.GetAllTransactionAsync(query);
                var transactiondDto = transactions.Select(item => item.ToTransactionDto()).ToList();
                return Ok(transactiondDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}

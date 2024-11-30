using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.transaction;
using api.models;

namespace api.mapper
{
    public static class TransactionMapper
    {
        public static Transaction ToCreateTransactionDto(
            this CreateTransactionDto createTransactionDto,
            double totalPrice
        )
        {
            return new Transaction
            {
                QuantityBought = createTransactionDto.QuantityBought,
                TotalPrice = totalPrice,
                ItemName = createTransactionDto.ItemName,
                ItemId = createTransactionDto.ItemId,
                CategoryName = createTransactionDto.CategoryName,
                CategoryId = createTransactionDto.CategoryId,
            };
        }

        public static TransactionDto ToTransactionDto(this Transaction transaction)
        {
            return new TransactionDto
            {
                Id = transaction.Id,
                QuantityBought = transaction.QuantityBought,
                TotalPrice = transaction.TotalPrice,
                DateTime = transaction.DateTime,
                ItemName = transaction.ItemName,
                CategoryName = transaction.CategoryName,
                
            };
        }
    }
}

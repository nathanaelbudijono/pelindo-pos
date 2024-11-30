using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.helper;
using api.models;

namespace api.interfaces
{
    public interface ITransactionRepository
    {
        public Task<List<Transaction>> GetAllTransactionAsync(QueryObject query);

        public Task<Transaction?> GetTransactionByIdAsync(int id);

        public Task<Transaction> CreateTransactionAsync(Transaction createTransaction);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.helper;
using api.interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDBContext _context;

        public TransactionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetAllTransactionAsync(QueryObject query)
        {
            var transactions = _context
                .Transaction.Include(item => item.Category)
                .Include(item => item.Item)
                .AsQueryable();
            if (query.IsDescending)
            {
                transactions = transactions.OrderByDescending(item => item.DateTime);
            }
            else
            {
                transactions = transactions.OrderBy(item => item.DateTime);
            }

            return await transactions.ToListAsync();
        }

        public async Task<Transaction?> GetTransactionByIdAsync(int id)
        {
            var existingTransaction = await _context
                .Transaction.Include(item => item.Category)
                .Include(item => item.Item)
                .FirstOrDefaultAsync(item => item.Id == id);
            if (existingTransaction is null)
            {
                return null;
            }
            return existingTransaction;
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction createTransaction)
        {
            await _context.Transaction.AddAsync(createTransaction);
            await _context.SaveChangesAsync();
            return createTransaction;
        }
    }
}

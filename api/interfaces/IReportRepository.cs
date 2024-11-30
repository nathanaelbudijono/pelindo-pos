using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.Items;
using api.dto.report;
using api.helper;

namespace api.interfaces
{
    public interface IReportRepository
    {
        Task<ReportDto> GetReportAsync(QueryObject query);

        Task<StockReportDto> GetStockReportAsync();
    }
}

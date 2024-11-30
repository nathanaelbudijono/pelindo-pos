using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.helper;
using api.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.controller
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;

        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetReportAsync([FromQuery] QueryObject query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var report = await _reportRepository.GetReportAsync(query);
                return Ok(report);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}

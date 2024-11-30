using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.account
{
    public class validTokenDto
    {
        [Required]
        public string token { get; set; } = string.Empty;
    }
}

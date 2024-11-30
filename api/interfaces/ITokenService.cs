using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.models;

namespace api.interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
        ClaimsPrincipal? ValidateToken(string token);

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.extension
{
    public static class ClaimExtension
    {
#pragma warning disable CS8603 // Possible null reference return.
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user
                .Claims.SingleOrDefault(x =>
                    x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")
                )
                ?.Value;
        }
    }
}

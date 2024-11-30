using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.interfaces
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedFileExtensions);
        void DeleteFile(string fileNameWithExtension);
    }
}

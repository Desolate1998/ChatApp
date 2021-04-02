using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.ConnectionServices
{
    public interface IConnectionServices
    {
        Task SetConnection(string Email, string ConnectionID);
        Task<string> GetConnectionID(string Email);
        Task HandleDisconect(string ConnectionID);
    }
}

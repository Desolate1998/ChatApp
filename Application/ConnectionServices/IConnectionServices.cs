using Domain.CommonUseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.ConnectionServices
{
    public interface IConnectionServices
    {
        Task SetConnection(string Email, string ConnectionID);
        Task<string> GetConnectionWithEmail(string Email);
        Task<string> GetConnectionIdWithId(int id);
        Task HandleDisconect(string ConnectionID);
       Task<string> GetReciverConnection(int ChatId, int SenderId);
    }
}

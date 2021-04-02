
using Domain.CommonUseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Users
{
    public interface IUserService
    {
        public Task<string> Register(EmailAndPasswordModel Data);
        public Task<bool> Login(EmailAndPasswordModel Data);
    }
}

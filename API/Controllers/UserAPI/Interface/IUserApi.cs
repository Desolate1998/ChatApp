using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CommonUseModels;
namespace api.Controllers.UserActions.Interface
{
    interface IUserApi
    {
        public  Task<IActionResult> RegisterUser(EmailAndPasswordModel Data);
        public Task<string> Login(EmailAndPasswordModel Data);

        public Task<string> DeleteAccount();
       


    }
}

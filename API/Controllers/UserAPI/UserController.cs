using api.Controllers.UserActions.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Users;
using Domain.CommonUseModels;

namespace api.Controllers
{
    public class UserController : Controller, IUserApi
    {
        private IUserService UserServices;
        public UserController(IUserService _UserServices)
        {
            UserServices = _UserServices;
        }

        public async Task<string> DeleteAccount()
        {
            throw new NotImplementedException();
        }
        [Route("/Users/Login"), HttpPost]
        public async Task<bool> Login([FromBody]EmailAndPasswordModel Data)
        {
            return await UserServices.Login(Data);
        }

        [Route("/Users/Register"),HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] EmailAndPasswordModel Data)
        {
            string Results = await UserServices.Register(Data);
            return Ok(Results);
        }
    }
}

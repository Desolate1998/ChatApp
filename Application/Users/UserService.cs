using DataAccess;
using Domain.CommonUseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Domain;
using Microsoft.EntityFrameworkCore;
namespace Application.Users
{

    public class UserService : IUserService
    {
        private DataContext dbContext;
        public UserService(DataContext dataContext)
        {
            dbContext = dataContext;
        }


        public async Task<string> Register(EmailAndPasswordModel Data)
        {
            if (Data.Email != null && Data.Password != null)
            {
                User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Data.Email);
                if (user == null)
                {
                    await dbContext.Users.AddRangeAsync(new User { Email = Data.Email, Password = Data.Password });
                    dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Email alread Exists";
                }
            }
            else
            {
                return "Failed to add user due to some error";
            }
           
        }

       
        public async Task<int?> Login(EmailAndPasswordModel Data)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Data.Email && x.Password == Data.Password);
            return user?.id;
        }

       
   
    }
}

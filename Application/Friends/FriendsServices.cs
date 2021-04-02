using DataAccess;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Friends
{
    public class FriendsServices : IFriendServices
    {
        private DataContext dbContext;
        public FriendsServices(DataContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public Task<bool> AcceptFriendRequest(string AcceptingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public Task DeclineRequest(string FromUser, string UserEmail)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetAllRequests(string Email)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
            List<string> Users = await (from U in dbContext.Users where U == user select U.Email).ToListAsync<string>();
            return Users;
        }

        public Task<List<object>> GetFriends(string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SendFriendReques(string SentToEmail, string FromUser)
        {
            User SendToUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == SentToEmail);
            User RequestingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == FromUser);

            if (SendToUser != null)
            {
                FriendRequest request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.SentTo == SendToUser && x.SentFrom == RequestingUser);
                if (request != null)
                {
                    return "You have already sent this person an invite";
                }

                request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.SentTo == RequestingUser && x.SentFrom == SendToUser);
                if (request != null)
                {
                    return "You have a pending invite from this person";
                }

                var Friends = await dbContext.Friends.FirstOrDefaultAsync(x => x.UserX == SendToUser && x.UserY == RequestingUser || x.UserX == RequestingUser && x.UserY == SendToUser);
                if (Friends != null)
                {
                    return "Already friends";
                }




                await dbContext.FriendRequests.AddAsync(new FriendRequest()
                {
                    SentFrom = RequestingUser,
                    SentTo = SendToUser
                });
                dbContext.SaveChanges();
                return "202";
            }
            else
            {

                return "404";
            }
        }
    }
}

using DataAccess;
using Domain;
using Domain.CommonUseModels;
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

        public async Task AcceptFriendRequest(int id)
        {
            FriendRequest request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.id == id);
    
            int k =1;
        }

        public async Task DeclineRequest(int id)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FriendRequestsModel>> GetAllRequests(string Email)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
            List<FriendRequestsModel> requests = await (
                from R in dbContext.FriendRequests
                join u in dbContext.Users on R.SentFrom.id equals u.id
                where R.SentTo == user
                select new FriendRequestsModel()
                {
                    email = u.Email,
                    requestID = R.id
                }

                ).ToListAsync<FriendRequestsModel>();
            return requests;
        }

        public Task<List<object>> GetFriends(string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SendFriendRequest(string SentToEmail, string FromUser)
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

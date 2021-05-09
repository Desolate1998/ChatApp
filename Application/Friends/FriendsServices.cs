using DataAccess;
using Domain;
using Domain.CommonUseModels;
using Domain.DatabaseModels;
using Domain.Enumeration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Friends
{
    public class FriendsServices : IFriendServices
    {
        private readonly DataContext dbContext;
        public FriendsServices(DataContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public async Task AcceptFriendRequest(int id)
        {
            FriendRequest request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.id == id);
            request.Status = FriendStatus.Friends;
            Chats chat = await dbContext.Chats
                .Where(x =>
                      (x.UserA == request.FromUserId && x.UserB == request.ToUserId) ||
                      (x.UserA == request.ToUserId && x.UserB == request.FromUserId)
                  ).SingleOrDefaultAsync();

            if (chat == null)
            {
                dbContext.Chats.Add(new Chats()
                {
                    UserA = request.FromUserId,
                    UserB = request.ToUserId
                });
            }
            dbContext.SaveChanges();

        }

        public async Task DeclineRequest(int id)
        {
            FriendRequest request = await dbContext.FriendRequests
                                .FirstOrDefaultAsync(x => x.id == id);
            dbContext.FriendRequests.Remove(request);
            dbContext.SaveChanges();
        }

        public async Task DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FriendRequestsModel>> GetAllRequests(string Email)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
            return await (
                 from R in dbContext.FriendRequests
                 join u in dbContext.Users on R.FromUserId equals u.id
                 where R.ToUser == user && R.Status == FriendStatus.PendingAccept
                 select new FriendRequestsModel()
                 {
                     email = u.Email,
                     requestID = R.id
                 }
                 ).ToListAsync();
        }

        public async Task<List<FriendModel>> GetFriends(string Email)
        {
            User user = await dbContext.Users
                             .FirstOrDefaultAsync(x => x.Email == Email);    
            return user.Friends.ToList();

        }

        public async Task<string> SendFriendRequest(string SentToEmail, string FromUser)
        {
            User SendToUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == SentToEmail);
            User RequestingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == FromUser);
            if (SendToUser != null)
            {
                FriendRequest request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.ToUser == SendToUser && x.FromUser == RequestingUser && x.Status == FriendStatus.PendingAccept);
                if (request != null)
                {
                    return "You have already sent this person an invite";
                }

                request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.ToUser == RequestingUser && x.FromUser == SendToUser && x.Status == FriendStatus.PendingAccept);
                if (request != null)
                {
                    return "You have a pending invite from this person";
                }


                await dbContext.FriendRequests.AddAsync(new FriendRequest()
                {
                    FromUser = RequestingUser,
                    ToUser = SendToUser,
                    Status = FriendStatus.PendingAccept

                });

                await dbContext.SaveChangesAsync();
                return "202";
            }
            return "404";
        }


        public async Task<List<Messages>> GetChatMessages(GetMessagesModel Data)
        {

            return await (from M in dbContext.Messanges
                          where M.ChatId == Data.ChatId
                          select M
                          ).Skip(Data.StartIndex).Take(50).ToListAsync();

        }



    }
}


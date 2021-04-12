﻿using DataAccess;
using Domain;
using Domain.CommonUseModels;
using Domain.Enumeration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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
            request.Status = FriendStatus.Friends;
            dbContext.SaveChanges();
           
        }

        public async Task DeclineRequest(int id)
        {
            FriendRequest request = await dbContext.FriendRequests.FirstOrDefaultAsync(x => x.id == id);
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
                where R.ToUser == user  && R.Status == FriendStatus.PendingAccept
                select new FriendRequestsModel()
                {
                    email = u.Email,
                    requestID = R.id
                }
                ).ToListAsync();
        }

        public async Task<List<FriendModel>> GetFriends(string Email)
        {
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
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
    }
}


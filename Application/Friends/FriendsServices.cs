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
                Chats chat = await dbContext.Chats
                    .Where(x =>
                        (x.UserA == request.FromUserId && x.UserB == request.ToUserId) ||
                        (x.UserA == request.ToUserId && x.UserB == request.FromUserId)
                    ).SingleOrDefaultAsync();

                if (chat == null)
                {
                    Chats newChat = new Chats()
                    {
                        UserA = request.FromUserId,
                        UserB = request.ToUserId
                    };
                    dbContext.Chats.Add(newChat);
                    request.Chat = newChat;
                }
                else
                {
                    request.Chat = chat;
                }
                request.Status = FriendStatus.Friends;
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
                        FromUserId = RequestingUser.id,
                        ToUserId = SendToUser.id,
                        Status = FriendStatus.PendingAccept,
                    });
                    try
                    {
                        await dbContext.SaveChangesAsync();
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                    return "R2";
                }
                return "R1";
            }

            public async Task<List<FriendModel>> GetFriends(string Email)
            {
                User user = await dbContext.Users
                                .FirstOrDefaultAsync(x => x.Email == Email);
                return user.Friends.ToList();
        


            }
            public async Task<List<UserChatDisplay>> GetActiveChats(string Email)
            {
                try
                {

                    List<ActiveChats> ActiveChats = await dbContext.ActiveChats.Where(x => x.User.Email == Email).ToListAsync();
                    List<UserChatDisplay> ReturnData = new List<UserChatDisplay>();

                    foreach (ActiveChats item in ActiveChats)
                    {
                        Chats chat = await dbContext.Chats.SingleOrDefaultAsync(x => x.Id == item.ChatId);
                        if (chat._UserA.Email == Email)
                        {
                            ReturnData.Add(new UserChatDisplay()
                            {
                                DisplayName = string.IsNullOrEmpty(chat._UserB.DisplayName) ? chat._UserB.Email : chat._UserB.DisplayName,
                                ChatId = item.ChatId,
                                UserId= chat._UserB.id
                            });
                        }
                        else
                        {
                            ReturnData.Add(new UserChatDisplay()
                            {
                                DisplayName = string.IsNullOrEmpty(chat._UserA.DisplayName) ? chat._UserA.Email : chat._UserA.DisplayName,
                                ChatId = item.ChatId,
                                UserId= chat._UserA.id

                            });
                        }
                    }
                    return ReturnData;

                }
                catch (Exception)
                {

                    throw;
                }

            }
    
            public async Task<List<Messages>> setChatActive(int ChatId, string Email)
            {
                User user = await dbContext.GetUserFromEmail(Email);
                await dbContext.ActiveChats.AddAsync(new ActiveChats()
                {
                    ChatId = ChatId,
                    UserId = user.id
                });
                dbContext.SaveChanges();
                return await GetChatMessages(0, ChatId);
            }

            public async Task<List<Messages>> GetChatMessages(int StartIndex, int ChatId)
            {

                return await (from M in dbContext.Messanges
                            where M.Chat.Id == ChatId
                            select M
                                            ).OrderByDescending(x => x.Id).Skip(StartIndex).Take(50).Reverse().ToListAsync();



            }

            public async Task SendMessage(SendMessageModel Data)
            {
                dbContext.Messanges.Add(new Messages()
                {
                    ChatId = Data.ChatId,
                    Message = Data.Message,
                    Status = MessageStatus.Sent,
                    SenderId = Data.SenderId
                });
                await dbContext.SaveChangesAsync();
            }

        }
    }


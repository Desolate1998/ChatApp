using Domain.CommonUseModels;
using Domain.DatabaseModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.FriendsAPI
{
    interface IFriendsAPI
    {
        Task<string> SendFriendRequest(string SentToEmail, string FromUser);
        Task<IActionResult> AcceptFriendRequest(int id);
        Task<IActionResult> DeleteFriend(string DeleteingEmail, string Email);
        Task<List<UserChatDisplay>> GetFriends(string Email);
        Task<List<FriendRequestsModel>> GetAllRequests(string Email);
        Task<IActionResult> DeclineRequest(int id);
        Task<List<Messages>> GetChatMessages(int StartIndex, int ChatId);
        Task<List<UserChatDisplay>> GetActiveChats(string Email);
        Task<List<Messages>> GetNewActiveChatMessages(int ChatId, string Email);
    }
}

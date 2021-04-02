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
        Task<bool> AcceptFriendRequest(string AcceptingEmail, string Email);
        Task<bool> DeleteFriend(string DeleteingEmail, string Email);
        Task<IActionResult> GetFriends(string Email);
        Task<List<string>> GetAllRequests(string Email);
        Task<IActionResult> DeclineRequest(string FromUser, string UserEmail);
    }
}

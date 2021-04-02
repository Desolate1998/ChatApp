using Application.Friends;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
namespace API.Controllers.FriendsAPI
{
    public class FriendsController : Controller, IFriendsAPI
    {
        private IFriendServices friendServices;

        public FriendsController(IFriendServices friendServices)
        {
            this.friendServices = friendServices;
        }

        [Route("/Test")]
        public bool Test()
        {
            return true;
        }

        public Task<bool> AcceptFriendRequest(string AcceptingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> DeclineRequest(string FromUser, string UserEmail)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetAllRequests(string Email)
        {
            List<string> Data = await friendServices.GetAllRequests(Email);
            return Data;
        }

        public Task<IActionResult> GetFriends(string Email)
        {
            throw new NotImplementedException();
        }
        [Route("/Friends/SendFriendRequest"),HttpPost]
        public async Task<string> SendFriendRequest([FromQuery] string SentToEmail, [FromQuery] string FromUser)
        {
            return await friendServices.SendFriendReques(SentToEmail, FromUser);
        }
    }
}

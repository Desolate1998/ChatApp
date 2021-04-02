using Application.Friends;
using Domain.CommonUseModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        [Route("/Friends/AcceptFriendRequest"), HttpGet]
        public async Task<IActionResult> AcceptFriendRequest([FromQuery]int id)
        {
            await friendServices.AcceptFriendRequest(id);
            return Ok();
        }
        [Route("/Friends/DeclineRequest"), HttpPost]
        public async Task<IActionResult> DeclineRequest(int id)
        {
            await friendServices.DeclineRequest(id);
            return Ok();
        }

        public Task<IActionResult> DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }
        [Route("/Friends/GetAllRequests"), HttpGet]
        public async Task<List<FriendRequestsModel>> GetAllRequests([FromQuery] string Email)
        {
            List<FriendRequestsModel> Data = await friendServices.GetAllRequests(Email);
            return Data;
        }

        public Task<IActionResult> GetFriends(string Email)
        {
            throw new NotImplementedException();
        }
        [Route("/Friends/SendFriendRequest"), HttpPost]
        public async Task<string> SendFriendRequest([FromQuery] string SentToEmail, [FromQuery] string FromUser)
        {
            return await friendServices.SendFriendRequest(SentToEmail, FromUser);
        }
    }
}

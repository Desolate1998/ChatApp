using Application.Friends;
using Domain.CommonUseModels;
using Domain.DatabaseModels;
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
        [Route("/Friends/AcceptFriendRequest"), HttpPost]
        public async Task<IActionResult> AcceptFriendRequest([FromQuery]int id)
        {
            await friendServices.AcceptFriendRequest(id);
            return Ok();
        }
        [Route("/Friends/DeclineRequest"), HttpPost]
        public async Task<IActionResult> DeclineRequest([FromQuery] int id)
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

        [HttpGet,Route("/Friends/GetFriends")]
        public async Task<List<FriendModel>> GetFriends([FromQuery]string Email)
        {
          return await friendServices.GetFriends(Email);
;
        }
        [Route("/Friends/SendFriendRequest"), HttpPost]
        public async Task<string> SendFriendRequest([FromQuery] string SentToEmail, [FromQuery] string FromUser)
        {
            return await friendServices.SendFriendRequest(SentToEmail, FromUser);
        }
        [Route("/Friends/GetChatMessages"), HttpPost]
        public async Task<List<Messages>> GetChatMessages([FromBody]GetMessagesModel Data)
        {
            return await friendServices.GetChatMessages(Data);
        }
    }
}

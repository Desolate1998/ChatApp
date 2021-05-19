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
        private readonly IFriendServices friendServices;

        public FriendsController(IFriendServices friendServices)
        {
            this.friendServices = friendServices;
        }


        [HttpPost("/Friends/AcceptFriendRequest"),]
        public async Task<IActionResult> AcceptFriendRequest([FromQuery] int id)
        {
            await friendServices.AcceptFriendRequest(id);
            return Ok();
        }
        [HttpPost("/Friends/DeclineRequest"),]
        public async Task<IActionResult> DeclineRequest([FromQuery] int id)
        {
            await friendServices.DeclineRequest(id);
            return Ok();
        }

        public Task<IActionResult> DeleteFriend(string DeleteingEmail, string Email)
        {
            throw new NotImplementedException();
        }
        [HttpGet("/Friends/GetAllRequests"),]
        public async Task<List<FriendRequestsModel>> GetAllRequests([FromQuery] string Email)
        {
            List<FriendRequestsModel> Data = await friendServices.GetAllRequests(Email);
            return Data;
        }

   

        [HttpPost("/Friends/SendFriendRequest")]
        public async Task<string> SendFriendRequest([FromQuery] string SentToEmail, [FromQuery] string FromUser)
        {
            return await friendServices.SendFriendRequest(SentToEmail, FromUser);
        }
        [HttpGet("/Friends/GetChatMessages")]
        public async Task<List<Messages>> GetChatMessages([FromQuery] int StartIndex, [FromQuery] int ChatId)
        {

            return await friendServices.GetChatMessages(StartIndex, ChatId);
        }
        [HttpGet("/Friends/GetActiveChats")]
        public async Task<List<UserChatDisplay>> GetActiveChats([FromQuery] string Email)
        {
            return await friendServices.GetActiveChats(Email);
        }
        [HttpGet("/Friends/GetFriends")]
        public async Task<List<UserChatDisplay>> GetFriends([FromQuery] string Email)
        {
            return await friendServices.GetFriends(Email);
        }
        [HttpGet("/Friends/GetNewActiveChatMessages")]
        public async Task<List<Messages>> GetNewActiveChatMessages([FromQuery] int ChatId, [FromQuery] string Email)
        {
            return await friendServices.setChatActive(ChatId, Email);
        }
    }
}

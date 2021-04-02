using Domain.CommonUseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Friends
{
    public interface IFriendServices
    {
        Task<string> SendFriendRequest(string SentToEmail,string FromUser);
        Task  AcceptFriendRequest(int id);
        Task DeleteFriend(string DeleteingEmail, string Email);
        Task<List<object>> GetFriends(string Email);
        Task<List<FriendRequestsModel>> GetAllRequests(string Email);
        Task DeclineRequest(int id);
    }
}

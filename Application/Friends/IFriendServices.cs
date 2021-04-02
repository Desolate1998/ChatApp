using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Friends
{
    public interface IFriendServices
    {
        Task<string> SendFriendReques(string SentToEmail,string FromUser);
        Task<bool> AcceptFriendRequest(string AcceptingEmail, string Email);
        Task<bool> DeleteFriend(string DeleteingEmail, string Email);
        Task<List<object>> GetFriends(string Email);
        Task<List<string>> GetAllRequests(string Email);
        Task DeclineRequest(string FromUser, string UserEmail);
    }
}

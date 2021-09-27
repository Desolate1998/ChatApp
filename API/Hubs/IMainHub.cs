using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public interface IMainHub
    {
        Task SendRequestNotfication(string Email);
        Task SendNewMessageNotification(int chatId, int senderId, string Message);
    }
}

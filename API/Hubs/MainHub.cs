using Application.ConnectionServices;
using Domain.CommonUseModels;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
namespace API.Hubs
{
    public  class MainHub : Hub
    {
        private IConnectionServices connectionServices;

        public MainHub(IConnectionServices connectionServices)
        {
            this.connectionServices = connectionServices;
        }

        public async Task SetClientConnectionID(string Email)
        {
            await connectionServices.SetConnection(Email, Context.ConnectionId);
        }

        public async Task SendRequestNotfication(string Email)
        {
            string ConnectionID = await connectionServices.GetConnectionWithEmail(Email);
            if (ConnectionID != null)
            {
                await Clients.Client(ConnectionID).SendAsync("Notfication", "You have a new friend Request!");
            }

        }

        public async Task SendNewMessageNotification(int chatId, int senderId,string Message)
        {
      
            string ConnectionID = await connectionServices.GetReciverConnection(chatId,senderId);
            if (ConnectionID != null)
            {
                await Clients.Client(ConnectionID).SendAsync("NewMessage", new NewMessageNotifcationModel() { 
                    ChatId=chatId,
                    Message = Message,
                    SenderId = senderId
                });
            }
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await connectionServices.HandleDisconect(Context.ConnectionId);
        }
    }
}

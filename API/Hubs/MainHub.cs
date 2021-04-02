using System;
using System.Threading.Tasks;
using Application.ConnectionServices;
using Microsoft.AspNetCore.SignalR;
namespace API.Hubs
{
    public class MainHub:Hub
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
            string ConnectionID = await connectionServices.GetConnectionID(Email);
            if (ConnectionID != string.Empty)
            {
                await Clients.Client(ConnectionID).SendAsync("Notfication", "You have a new friend Request!");
            }
           
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await connectionServices.HandleDisconect(Context.ConnectionId);
        }
    }
}

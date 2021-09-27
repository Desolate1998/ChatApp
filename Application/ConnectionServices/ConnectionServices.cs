using DataAccess;
using Domain;
using Domain.CommonUseModels;
using Domain.DatabaseModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ConnectionServices
{
    public class ConnectionServices : IConnectionServices
    {
        private DataContext dbContext;

        public ConnectionServices(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<string> GetConnectionWithEmail(string Email)
        {
            return await (
                from C in dbContext.UserConnections
                join U in dbContext.Users
                on C.user equals U
                where U.Email == Email
                select C.ConnectionCode).FirstOrDefaultAsync();

        }
        public async Task<string> GetConnectionIdWithId(int id)
        {
            return await (
                from C in dbContext.UserConnections
                join U in dbContext.Users
                on C.user equals U
                where U.id  == id
                select C.ConnectionCode).FirstOrDefaultAsync();

        }


        public async Task HandleDisconect(string ConnectionID)
        {
            UserConnections connections = await (
                                            from C in dbContext.UserConnections
                                            where C.ConnectionCode == ConnectionID
                                            select C).FirstOrDefaultAsync();
            dbContext.UserConnections.Remove(connections);
            dbContext.SaveChanges();
        }

        public async Task SetConnection(string Email, string ConnectionID)
        {
            UserConnections connections = new UserConnections();
            User user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == Email);
            connections.user = user;
            connections.DateConnected = DateTime.UtcNow;
            connections.ConnectionCode = ConnectionID;
            UserConnections OldUserConnection = await dbContext.UserConnections.FirstOrDefaultAsync(x => x.user == user);
            if (OldUserConnection !=null)
            {
                dbContext.UserConnections.Remove(OldUserConnection);
      
            }
             await dbContext.UserConnections.AddAsync(connections);
            dbContext.SaveChanges();
        }

        public async Task<string> GetReciverConnection(int ChatId, int SenderId)
        {

            Chats chats = await dbContext.Chats.SingleOrDefaultAsync(x => x.Id == ChatId);
            int UserId = chats._UserA.id == SenderId ? chats._UserB.id : chats._UserA.id;
            return await(
                from C in dbContext.UserConnections
                join U in dbContext.Users
                on C.user equals U
                where U.id == UserId
                select C.ConnectionCode).FirstOrDefaultAsync();
        }
    }


    }


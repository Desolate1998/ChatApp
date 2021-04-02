using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.DatabaseModels;

namespace DataAccess
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions ops):base(ops)
        {

        }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<User> Users    { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<UserConnections> UserConnections { get; set; }
    }

}

using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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

        public DataContext(DbContextOptions ops) : base(ops)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Gender>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.Property(x => x.Name).HasMaxLength(20).IsRequired();
                ent.Property(x => x.id).IsRequired();
            });
            modelBuilder.Entity<User>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.HasOne(x => x.Gender).WithOne();
            });
            modelBuilder.Entity<FriendRequest>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.HasOne(d => d.SentTo).WithOne().OnDelete(DeleteBehavior.NoAction);
                ent.HasOne(d => d.SentFrom).WithOne().OnDelete(DeleteBehavior.NoAction);

            });

            modelBuilder.Entity<Friends>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.HasOne(x => x.UserX).WithMany().OnDelete(DeleteBehavior.NoAction);
                ent.HasOne(x => x.UserY).WithMany().OnDelete(DeleteBehavior.NoAction);

            });
            modelBuilder.Entity<UserConnections>(ent =>
            {
                ent.HasKey(x => x.id);
            });
        }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<User> Users    { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<UserConnections> UserConnections { get; set; }
    }

}

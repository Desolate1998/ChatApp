using Domain;
using Domain.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions ops) : base(ops)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Gender>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.Property(x => x.Name)
                    .HasMaxLength(20)
                    .IsRequired();
                ent.Property(x => x.id)
                    .IsRequired();
            });
            modelBuilder.Entity<User>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.HasOne(x => x.Gender)
                    .WithOne();
            });
            modelBuilder.Entity<FriendRequest>(ent =>
            {
                ent.HasKey(x => x.id);
                ent.HasOne(e => e.FromUser)
                    .WithMany(x => x.SentFriendRequets)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasForeignKey(x => x.FromUserId);
                ent.HasOne(d => d.ToUser)
                    .WithMany(x => x.RecivedFriendRequests)
                    .OnDelete(DeleteBehavior.NoAction)
                    .HasForeignKey(x => x.ToUserId);
            });


            modelBuilder.Entity<UserConnections>(ent =>
            {
                ent.HasKey(x => x.id);
            });
            modelBuilder.Entity<Chats>(ent =>
            {
                ent.HasKey(x => x.Id);
                ent.HasOne(x => x._UserA)
                    .WithMany()
                    .HasForeignKey(x => x.UserA)
                    .OnDelete(DeleteBehavior.NoAction);
                ent.HasOne(x => x._UserB)
                    .WithMany()
                    .HasForeignKey(x => x.UserB)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Messages>(ent =>
            {
                ent.HasKey(x => x.Id);
                ent.HasOne(x => x.Chat).WithMany().HasForeignKey(x => x.ChatId).OnDelete(DeleteBehavior.NoAction);
                ent.HasOne(x => x._SenderId).WithMany().HasForeignKey(x => x.SenderId).OnDelete(DeleteBehavior.NoAction);

            });
        }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }

        public DbSet<UserConnections> UserConnections { get; set; }
        public DbSet<Chats> Chats { get; set; }
        public DbSet<Messages> Messanges { get; set; }
    }

}

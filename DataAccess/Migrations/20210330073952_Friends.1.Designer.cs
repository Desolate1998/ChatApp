﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataAccess.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210330073952_Friends.1")]
    partial class Friends1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.DatabaseModels.Friends", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("UserXid")
                        .HasColumnType("int");

                    b.Property<int?>("UserYid")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("UserXid");

                    b.HasIndex("UserYid");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("Domain.FriendRequest", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("SentFromid")
                        .HasColumnType("int");

                    b.Property<int?>("SentToid")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("SentFromid");

                    b.HasIndex("SentToid");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("Domain.Gender", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Genders");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Genderid")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImage")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("Genderid");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.DatabaseModels.Friends", b =>
                {
                    b.HasOne("Domain.User", "UserX")
                        .WithMany()
                        .HasForeignKey("UserXid");

                    b.HasOne("Domain.User", "UserY")
                        .WithMany()
                        .HasForeignKey("UserYid");

                    b.Navigation("UserX");

                    b.Navigation("UserY");
                });

            modelBuilder.Entity("Domain.FriendRequest", b =>
                {
                    b.HasOne("Domain.User", "SentFrom")
                        .WithMany()
                        .HasForeignKey("SentFromid");

                    b.HasOne("Domain.User", "SentTo")
                        .WithMany()
                        .HasForeignKey("SentToid");

                    b.Navigation("SentFrom");

                    b.Navigation("SentTo");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.HasOne("Domain.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("Genderid");

                    b.Navigation("Gender");
                });
#pragma warning restore 612, 618
        }
    }
}

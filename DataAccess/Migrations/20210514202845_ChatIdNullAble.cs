using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistent.Migrations
{
    public partial class ChatIdNullAble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_Chats_ChatId",
                table: "FriendRequests");

            migrationBuilder.AlterColumn<int>(
                name: "ChatId",
                table: "FriendRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_Chats_ChatId",
                table: "FriendRequests",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendRequests_Chats_ChatId",
                table: "FriendRequests");

            migrationBuilder.AlterColumn<int>(
                name: "ChatId",
                table: "FriendRequests",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FriendRequests_Chats_ChatId",
                table: "FriendRequests",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

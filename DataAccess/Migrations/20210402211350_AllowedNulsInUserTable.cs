using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistent.Migrations
{
    public partial class AllowedNulsInUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Genders_Genderid",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Genderid",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Genderid",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Genderid",
                table: "Users",
                column: "Genderid",
                unique: true,
                filter: "[Genderid] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Genders_Genderid",
                table: "Users",
                column: "Genderid",
                principalTable: "Genders",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Genders_Genderid",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Genderid",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Genderid",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Genderid",
                table: "Users",
                column: "Genderid");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Genders_Genderid",
                table: "Users",
                column: "Genderid",
                principalTable: "Genders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

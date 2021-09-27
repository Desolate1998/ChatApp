using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Domain.CommonUseModels;
using Domain.Enumeration;

namespace Domain
{
    public class User
    {
        [Key, Required]
        public int id { get; set; }

        public int? Genderid { get; set; }

        [Required, MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(255)]
        public string Password { get; set; }

        public string DisplayName { get; set; }

        public int? Age { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [MaxLength(255)]
        public string FirstName { get; set; }

        [MaxLength(255)]
        public string LastName { get; set; }

        public virtual Gender Gender { get; set; }

        public string ProfileImage { get; set; }

        [JsonIgnore]
        public virtual ICollection<FriendRequest> SentFriendRequets
        { get; set;
        }

        [JsonIgnore]
        public virtual ICollection<FriendRequest> RecivedFriendRequests
        { get; set;
        }

        [NotMapped, JsonIgnore]
        public virtual ICollection<FriendModel> Friends
        {
            get
            {
                List<FriendModel> friends = 
                    (
                    from SF in SentFriendRequets
                    where SF.Status == (int)FriendStatus.Friends
                    select
                    new FriendModel {
                        DisplayName = SF.ToUser.Email,
                        ChatId = SF.ChatId,
                        RecordId=SF.id

                    }
                    ).ToList();

                friends
                    .AddRange(from SF in RecivedFriendRequests
                       where SF.Status == (int)FriendStatus.Friends
                    select
                 

                    new FriendModel {
                        DisplayName = SF.FromUser.Email,
                        ChatId = SF.ChatId,
                        RecordId=SF.id
                    });

                return friends;
            }
        }
    }
}

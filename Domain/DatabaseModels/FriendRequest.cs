using Domain.DatabaseModels;
using Domain.Enumeration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain
{
    public class FriendRequest
    {
        [Key, Required]
        public int id { get; set; }

        public int FromUserId { get; set; }

        public int ToUserId { get; set; }

        public int? ChatId { get; set; }

        public FriendStatus Status { get; set; }
        [JsonIgnore]
        public virtual User ToUser { get; set; }
        [JsonIgnore]
        public virtual Chats Chat { get; set; }
        [JsonIgnore]
        public virtual User FromUser { get; set; }
    }
}

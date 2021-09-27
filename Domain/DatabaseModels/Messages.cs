using Domain.Enumeration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.DatabaseModels
{
    public class Messages
    {
     
        public int Id { get; set; }
        public string Message { get; set; }
        public int ChatId { get; set; }
        public int SenderId { get; set; }
        public MessageStatus Status { get; set; }
        public DateTime? TimeSent { get; set; }
        public DateTime? TimeRead { get; set; }
        [JsonIgnore]
        public virtual User _SenderId { get; set; }
        [JsonIgnore]
        public virtual Chats Chat { get; set; }

    }
}

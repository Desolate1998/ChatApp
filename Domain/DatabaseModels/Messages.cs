﻿using Domain.Enumeration;
using System;
using System.Collections.Generic;
using System.Text;

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
  
        public virtual User _SenderId { get; set; }

        public virtual Chats Chat { get; set; }

    }
}

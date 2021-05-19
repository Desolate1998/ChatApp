using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.DatabaseModels
{
    public class ActiveChats
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
        public virtual Chats ActiveChat { get; set; }
        public virtual User User { get; set; }

    }
}

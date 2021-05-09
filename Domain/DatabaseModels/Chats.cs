using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Domain.DatabaseModels
{
    public class Chats
    {
        public int Id { get; set; }
        public int UserA { get; set; }
        public int UserB { get; set; }
        public virtual User _UserA { get; set; }
        public virtual User _UserB { get; set; }
        public virtual ICollection<Messages> Messages { get; set; }

        [NotMapped]
        public virtual ICollection<Messages> GetMessages
        {
            get { 
                return
                Messages.OrderByDescending(x => x.TimeSent)
                        .Take(50).Select(x => x)
                        .ToList();
            } 
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.DatabaseModels
{
    public class UserConnections
    {
        [Key,Required]
        public int id { get; set; }

        public int Userid { get; set; }

        public DateTime DateConnected { get; set; }

        public string ConnectionCode { get; set; }
   
        public virtual User user { get; set; }
    }
}

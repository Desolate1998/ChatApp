using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DatabaseModels
{
    public class UserConnections
    {
        [Key]
        public int id { get; set; }
        [Key]
        public User user { get; set; }
        public DateTime DateConnected { get; set; }

        public string ConnectionCode { get; set; }
    }
}

using Domain.Enumeration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
    public class FriendRequest
    {
        [Key, Required]
        public int id { get; set; }

        public int FromUserId { get; set; }

        public int ToUserId { get; set; }
      
        public FriendStatus Status { get; set; }
        public virtual User ToUser { get; set; }

        public virtual User FromUser { get; set; }
    }
}

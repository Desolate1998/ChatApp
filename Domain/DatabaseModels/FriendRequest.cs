using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class FriendRequest
    {
        [Key]
        public int id { get; set; }
        [Key]
        public User SentFrom { get; set; }
        [Key]
        public User SentTo { get; set; }
    }
}

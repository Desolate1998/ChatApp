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
        [Required]
        public int SentFromid { get; set; }
        [Required]
        public int SentToid { get; set; }
      
        public virtual User SentTo { get; set; }

        public virtual User SentFrom { get; set; }
    }
}

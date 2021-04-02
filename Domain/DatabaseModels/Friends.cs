using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DatabaseModels
{
    public class Friends
    {
        [Key]
        public int id { get; set; }
        [Key]
        public User UserX { get; set; }
        [Key]
        public User UserY { get; set; }
    }
}

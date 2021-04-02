using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.DatabaseModels
{
    public class Friends
    {
        [Key,Required]
        public int id { get; set; }
     
        public int UserXid { get; set; }
 
        public int UserYid { get; set; }

        public virtual User UserX { get; set; }

        public virtual User UserY { get; set; }
    }
}

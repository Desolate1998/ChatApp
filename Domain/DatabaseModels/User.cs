using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
    
        [Key,Required]
        public int id { get; set; }
 
        public int? Genderid { get; set; }
        [Required,MaxLength(255)]
        public string Email { get; set; }
        [MaxLength(255)]
        public string Password { get; set; }
   
        public int? Age { get; set; }
        
        public DateTime? DateOfBirth { get; set; }
        [MaxLength(255)]
        public string FirstName { get; set; }
        [MaxLength(255)]
        public string LastName { get; set; }

        public virtual Gender Gender { get; set; }
        public string ProfileImage { get; set; }
    }
}

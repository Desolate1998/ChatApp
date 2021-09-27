using System.Security.AccessControl;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.CommonUseModels
{
    public class FriendModel
    {
        public string DisplayName { get; set; }
        public int? ChatId { get; set; }
        public string ProfileImage { get; set; }
        public int RecordId { get; set; }
        
        
    }
}

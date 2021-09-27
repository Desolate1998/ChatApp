using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.CommonUseModels
{
    public class NewMessageNotifcationModel
    {
        public int ChatId { get; set; }
        public string Message { get; set; }
        public int SenderId { get; set; }
    }
}

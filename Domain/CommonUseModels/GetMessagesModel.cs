using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.CommonUseModels
{
    public class GetMessagesModel
    {
        public int StartIndex { get; set; }
        public int ChatId { get; set; }
    }
}

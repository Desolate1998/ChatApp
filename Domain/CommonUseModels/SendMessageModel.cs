namespace Domain.CommonUseModels
{
    public class SendMessageModel
    {

        public int ChatId { get; set; }
        public string Message { get; set; }
        public int SenderId { get; set; }
    }
}

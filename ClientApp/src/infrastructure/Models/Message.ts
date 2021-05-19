import { MessageType } from "@microsoft/signalr";
import { MessageStatus } from "../Enumeration/MessageStatus";

export interface IMessage{
    id:number;
    message:string;
    chatId:number;
    senderId:number;
    timeSent:any;
    timeRead:any;
    status:MessageStatus;
    messageType:MessageType;
}
import { IMessage } from "./Message";

export interface IActiveChat{
    displayName:string;
    chatId:number;
    userId:number;
    messanges:IMessage[];
}
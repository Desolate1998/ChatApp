import { IMessage } from "./Message";
import { IActiveChat } from './ActiveChats';

export interface IChats{
   activeChat:IActiveChat;
   messages:IMessage[]
}
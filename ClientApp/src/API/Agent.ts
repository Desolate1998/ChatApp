import axios, { AxiosResponse } from 'axios'
import { IEmailAndPassword } from '../infrastructure/Models/EmailAndPasswordModel'
import * as data from '../Config.json'
import { IFriendRequest } from './../infrastructure/Models/FriendRequest'
import { IFriend } from '../infrastructure/Models/Friend'
import { IMessage } from '../infrastructure/Models/Message'
import { ISendFriendRequestModel } from '../infrastructure/Models/SendFriendRequestModel'
import { IActiveChat } from '../infrastructure/Models/ActiveChats'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const responseBody = <T>(response: AxiosResponse<T>) =>
  response.data ? response.data : <T>{}
const requests = {
  get: <T>(url: string) => axios.get<T>(data.Route + url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(data.Route + url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(data.Route + url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(data.Route + url).then(responseBody),
  Download: (url: string) => {
    const link = document.createElement('a')
    link.href = data.Route + url
    link.target = 'blank'
    link.click()
    link.remove()
  }
}

const UserAPI = {
  Register: (Data: IEmailAndPassword) =>
    requests.post<string>('Users/Register', Data),
  Login: (Data: IEmailAndPassword) =>
    requests.post<boolean>('Users/Login', Data)
}

const FriendAPI = {
  SendFriendRequest: (Data: ISendFriendRequestModel) =>
    requests.post<string>(
      `Friends/SendFriendRequest/?FromUser=${Data.FromUser}&&SentToEmail=${Data.SentToEmail}`,
      {}
    ),
  GetAllFriendRequests: (Data: string) =>
    requests.get<IFriendRequest[]>('Friends/GetAllRequests/?Email=' + Data),
  AcceptFriendRequest: (id: Number) =>
    requests.post('Friends/AcceptFriendRequest?id=' + id, {}),
  DeclineFreiendRequest: (id: Number) =>
    requests.post('Friends/DeclineRequest?id=' + id, {}),
  GetFriends: (email: string) =>
    requests.get<IActiveChat[]>('Friends/GetFriends?Email=' + email),
  GetActiveChats: (email: string) =>
    requests.get<IActiveChat[]>('Friends/GetActiveChats?email=' + email),
  GetChatMessages: (startIndex: number, chatId: number) =>
    requests.get<IMessage[]>(
      `Friends/GetChatMessages?StartIndex=${startIndex}&ChatId=${chatId}`
    ),
  GetNewActiveChatMessages: (ChatId: number, Email: string) =>
  requests.get<IMessage[]>(
      `Friends/GetNewActiveChatMessages?ChatId=${ChatId}&Email=${Email}`
    )
}
export { UserAPI, FriendAPI }

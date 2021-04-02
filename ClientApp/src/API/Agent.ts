import axios, { AxiosResponse } from 'axios'
import { IEmailAndPassword } from '../infrastructure/Models/EmailAndPasswordModel'
import * as data from '../Config.json'
import { Notfications } from './../infrastructure/HelperScripts/Notifications'
import { ISendFriendReequestModel } from '../infrastructure/Models/SendFriendRequestModel'
import { IFriendRequest } from './../infrastructure/Models/FriendRequest'

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
  SendFriendRequest: (Data: ISendFriendReequestModel) =>
    requests.post<string>(
      `Friends/SendFriendRequest/?FromUser=${Data.FromUser}&&SentToEmail=${Data.SentToEmail}`,
      {}
    ),
  GetAllFriendRequests: (Data: string) =>
    requests.get<IFriendRequest[]>('Friends/GetAllRequests/?Email=' + Data),
    AcceptFriendRequest:(id:Number)=>requests.get('Friends/AcceptFriendRequest?id='+id),
    DeclineFreiendRequest:(id:Number)=>requests.post('Friends/AcceptFriendRequest',id),

}
export { UserAPI, FriendAPI }

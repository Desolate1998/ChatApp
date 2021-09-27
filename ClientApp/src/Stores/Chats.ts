import { observable, action, makeAutoObservable } from 'mobx'
import { FriendAPI } from '../API/Agent'

import {
  SessionHelper,
  SessionVariabels
} from '../infrastructure/HelperScripts/SessionHelper'
import { ISendFriendRequestModel } from './../infrastructure/Models/SendFriendRequestModel'
import { IFriendRequest } from './../infrastructure/Models/FriendRequest'
import { IFriend } from './../infrastructure/Models/Friends'
import { IActiveChat } from './../infrastructure/Models/ActiveChats'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import configFile from '../Config.json'
import { Notfications } from './../infrastructure/HelperScripts/Notifications'
import { IMessage } from './../infrastructure/Models/Message'
import { INewMessageNotificationModel } from './../infrastructure/Models/NewMessageNotificationModel'

import { store } from './store'
export default class ChatStore {
  constructor () {
    makeAutoObservable(this)
  }
  //Menu open states
  @observable sideBarMenu = false
  @observable addFriendDialogOpen = false
  //InputStrings
  @observable addFriendEmailAddress: string = ''
  @observable message: string = ''

  //Database
  @observable friendRequests: IFriendRequest[] = []
  @observable activeChats: IActiveChat[] = []
  @observable currentFocusedChat: IActiveChat | null = null
  @observable friends: IFriend[] = []

  @action setSideBarMenu = () => {
    if (!this.sideBarMenu) {
      this.getAllFriendRequests()
      this.getFriends()
    }
    this.sideBarMenu = !this.sideBarMenu
  }

  @action openChat (Id: Number) {}

  @action getActiveChats = () => {
    FriendAPI.GetActiveChats(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(response => {
      this.activeChats = response
    })
  }

  @action sendMessage = () => {
    FriendAPI.SendMessage({
      chatId: this.currentFocusedChat?.chatId!,
      message: this.message,
      senderId: parseInt(SessionHelper.GetVerable(SessionVariabels.Id)!)
    })


  }
  @action setAddFriendDialog = () => {
    this.addFriendDialogOpen = !this.addFriendDialogOpen
  }
  @action setAddFriendEmail = (Email: string) => {
    this.addFriendEmailAddress = Email
  }

  @action focusChat = (chatId: number) => {
    let foundIndex: number = 0
    for (var x = 0; x < this.activeChats.length; x++) {
      if (this.activeChats[x].chatId === chatId) {
        foundIndex = x
        x = this.activeChats.length + 1
      }
    }
    if (this.activeChats[foundIndex].messanges === undefined) {
      FriendAPI.GetChatMessages(0, chatId).then(response => {
        this.activeChats[foundIndex].messanges = response
        this.currentFocusedChat = {
          chatId: this.activeChats[foundIndex].chatId,
          displayName: this.activeChats[foundIndex].displayName,
          messanges: this.activeChats[foundIndex].messanges,
          userId: this.activeChats[foundIndex].userId
        }
      })
    } else {
      this.currentFocusedChat = {
        chatId: this.activeChats[foundIndex].chatId,
        displayName: this.activeChats[foundIndex].displayName,
        messanges: this.activeChats[foundIndex].messanges,
        userId: this.activeChats[foundIndex].userId
      }
    }
  }

  @action handleStartChat = (chatId: number) => {
    let found = false
    let foundIndex: number = 0
    for (var x = 0; x < this.activeChats.length; x++) {
      if (this.activeChats[x].chatId === chatId) {
        found = true
        foundIndex = x
        x = this.activeChats.length + 1
      }
    }

    if (found) {
      this.focusChat(chatId)
    } else {
      FriendAPI.StartActiveChat(
        SessionHelper.GetVerable(SessionVariabels.Email)!,
        chatId
      ).then(response => {
        for (var x = 0; x < this.friends.length; x++) {
          if (this.friends[x].chatId === chatId) {
            foundIndex = x
            x = this.friends.length
          }
        }
        this.activeChats.push({
          chatId: chatId,
          displayName: this.friends[foundIndex].displayName,
          messanges: response,
          userId: this.friends[foundIndex].recordId
        })
      })
    }
    this.sideBarMenu = false
  }
  @action handleDeleteFriend = (chatId: number) => {}
  @action getFriends = () => {
    FriendAPI.GetFriends(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(res => {
      this.friends = res
    })
  }

  @action getAllFriendRequests = () => {
    FriendAPI.GetAllFriendRequests(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(response => {
      this.friendRequests = response
    })
  }
  @action acceptFriendRequest = (id: number) => {
    FriendAPI.AcceptFriendRequest(id).then(response => {
      this.getAllFriendRequests()
      this.getFriends()
    })
  }
  @action declineFriendRequest = (id: number) => {
    FriendAPI.DeclineFreiendRequest(id).then(response => {
      this.getAllFriendRequests()
      this.getFriends()
    })
  }

  @action addFriend = () => {
    if (this.addFriendEmailAddress !== '') {
      let request: ISendFriendRequestModel = {
        FromUser: SessionHelper.GetVerable(SessionVariabels.Email)!,
        SentToEmail: this.addFriendEmailAddress
      }

      FriendAPI.SendFriendRequest(request).then(response => {
        switch (response) {
          case 'R1':
            Notfications.info('Ohh no!', 'Sorry but the user was not found')

            break
          case 'R2':
            Notfications.Success('Good Job!', 'Friend request was sent')
            break

          default:
            Notfications.Warning('Uhm', response)
            break
        }
      })
    } else {
      Notfications.Danager('Error', 'Please Enter An Email Address')
    }
  }

  hubConnection: HubConnection | null = null

  createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(configFile.HubUrl)
      .withAutomaticReconnect()
      .build()
    this.hubConnection
      .start()
      .catch(err => console.log(err))
      .then(() => {
        this.hubConnection!.invoke(
          'SetClientConnectionID',
          SessionHelper.GetVerable(SessionVariabels.Email)
        )
      })
    this.hubConnection.on('Notfication', () => {
      Notfications.info('Friend Request', 'You have a new friend request')
    })
    this.hubConnection.on('NewMessage', (message: IMessage) => {
      Notfications.info('New Message', 'You have a new message')
      console.log(message)
    })
  }
}

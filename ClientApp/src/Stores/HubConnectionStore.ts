import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import configFile from '../Config.json'
import { makeAutoObservable } from 'mobx'
import { IMessage } from '../infrastructure/Models/Message'
import { Notfications } from '../infrastructure/HelperScripts/Notifications'
import {
  SessionHelper,
  SessionVariabels
} from '../infrastructure/HelperScripts/SessionHelper'
import { store } from './store'
import ChatStore from './Chats';

export default class HubConnectionStore {

  constructor () {
    makeAutoObservable(this)
    
  }

 
}

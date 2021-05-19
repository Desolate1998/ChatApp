import React, { useEffect, useState } from 'react'
import './FrontPageStyle.css'
import { ChatCard } from './../ChatCard/ChatCard'
import { Button, TextField } from '@material-ui/core'
import { NavBar } from '../NavBar/Navbar'
import { AddFriendModel } from '../AddFriendModel/AddFriendModel'

import {
  SessionHelper,
  SessionVariabels
} from '../../infrastructure/HelperScripts/SessionHelper'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import * as data from '../../Config.json'
import { Notfications } from '../../infrastructure/HelperScripts/Notifications'
import { ViewFriendRequestsModel } from './../ViewFriendRequestModel/ViewFriendRequestsModel'
import { IFriendRequest } from './../../infrastructure/Models/FriendRequest'
import { FriendAPI } from '../../API/Agent'
import { ViewFriendsModel } from './../ViewFriendsModel/ViewFriendsModel'
import { IFriend } from '../../infrastructure/Models/Friend'
import { IChats } from '../../infrastructure/Models/Chats'
import { IActiveChat } from '../../infrastructure/Models/ActiveChats'

export const FrontPage = () => {
  const [message, setmessage] = useState('')
  const [HubConnection, setHubConnection] = useState<HubConnection | null>(null)
  const [AddfriendOpen, setAddFriendOpen] = useState<boolean>(false)
  const [friendRequests, setFriendsRequets] = useState<IFriendRequest[]>([])
  const [ViewFriends, setViewFriends] = useState<boolean>(false)
  const [curentChat, setCurentChat] = useState<IActiveChat>()

  const [ViewFriendRequestOpen, setViewFriendRequestOpen] = useState<boolean>(
    false
  )
  const [chats, setChats] = useState<IChats[]>([])


  useEffect(() => {
    const createHubConnection = async () => {
      const hubConnect = new HubConnectionBuilder().withUrl(data.HubUrl).build()
      try {
        await hubConnect.start()
        hubConnect.invoke(
          'SetClientConnectionID',
          SessionHelper.GetVerable(SessionVariabels.Email)
        )

        hubConnect.on('Notfication', Message => {
          Notfications.info('New Request', 'You have a new friend request!')
        })
      } catch (err) {
        alert(err)
        console.log('Error while establishing connection: ' + { err })
      }
      setHubConnection(hubConnect)
  
    }

    createHubConnection()
    handleGetCurrentChat();
  }, [])

  function handleGetCurrentChat(){
    FriendAPI.GetActiveChats(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(res => {

      let chat:IChats[] = []
      res.forEach((item)=>{
        chat.push({
          activeChat:item,
          messages:[]
        })
        setChats([...chat])
        console.log(chats)
      })
    })
  }
  function handleAddFriendOnclick () {
    setAddFriendOpen(true)
  }
  function handleAddFriendClose () {
    setAddFriendOpen(false)
  }

  function HandleFriendRequestOpen () {
    FriendAPI.GetAllFriendRequests(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(response => {
      setFriendsRequets([...response])
    })
    setViewFriendRequestOpen(!ViewFriendRequestOpen)
  }

  function handleNotfication (Email: string) {
    HubConnection!.invoke('SendRequestNotfication', Email)
  }
  function handleAcceptFriendRequest (requestID: number) {
    FriendAPI.AcceptFriendRequest(requestID).then(() => {
      FriendAPI.GetAllFriendRequests(
        SessionHelper.GetVerable(SessionVariabels.Email)!
      ).then(response => {
        setFriendsRequets([...response])
      })
    })
  }


  function handleDeclineFriendRequest (requestID: number) {
 
    FriendAPI.DeclineFreiendRequest(requestID).then(() => {
      FriendAPI.GetAllFriendRequests(
        SessionHelper.GetVerable(SessionVariabels.Email)!
      ).then(response => {
        setFriendsRequets([...response])
      })
    })
  }
  function handleViewFriendsOnClick () {
    setViewFriends(!ViewFriends)
  }


  function handleShowChat (chatId: number) {
    let found: boolean = false
    chats.forEach(item => {
      if(item.activeChat.chatId===chatId){
        found = true;
      }
    })
  
    if (found) {
    } else {
      FriendAPI.GetNewActiveChatMessages(chatId,SessionHelper.GetVerable(SessionVariabels.Email)!).then((res=>{
        console.log(res)
      }))
    }
  }

  function sendMessage(){
    alert(message)

  }

  function setActiveChatDisplay(chatId:number){
    alert(chatId)
  }

  return (
    <div className='Front-Page-Container'>
      <AddFriendModel
        open={AddfriendOpen}
        close={handleAddFriendClose}
        handleSendNotfication={handleNotfication}
      />
      <ViewFriendRequestsModel
        handleFriendAcceptMethod={handleAcceptFriendRequest}
        handleFriendDeclineMethod={handleDeclineFriendRequest}
        open={ViewFriendRequestOpen}
        handleClose={HandleFriendRequestOpen}
        requests={friendRequests}
      />
      <ViewFriendsModel
        open={ViewFriends}
        setOpen={handleViewFriendsOnClick}
        handleShowChat={handleShowChat}
      />
      <NavBar
        AddFriendOnClick={handleAddFriendOnclick}
        ViewFriendRequestsOnClick={HandleFriendRequestOpen}
        ViewFriendsOnClick={handleViewFriendsOnClick}
      />
      <div className='Content-Container'>
        <div className='ChatsHistory'>
          <TextField
            id='filled-basic'
            label='Search'
            variant='filled'
            className='MUI-Input Searcher'
          />
          <div className='ChatHistoryContent'>
            {chats.map(item => {
              return <ChatCard displayName={item.activeChat.displayName} chatId={item.activeChat.chatId} setActiveChatDisplay={setActiveChatDisplay}/>
            })}
          </div>
        </div>
        <div className='Chat'>
          <div className='chatTextArea'></div>
          <textarea className='Text-Input' onChange={(e)=>{setmessage(e.target.value)}} value={message}></textarea>
          <br />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  )
}

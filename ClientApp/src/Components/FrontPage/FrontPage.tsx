import React, { useEffect, useState } from 'react'
import './FrontPageStyle.css'
import { ChatCard } from './../ChatCard/ChatCard'
import { Button, TextField } from '@material-ui/core'
import { NavBar } from '../NavBar/Navbar'
import { AddFriendModel } from '../AddFriendModel/AddFriendModel'
import { Message } from './../Message/Message'
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

export const FrontPage = () => {
  const [ActiveChat, setActiveChat] = useState<any[]>([])
  const [HubConnection, setHubConnection] = useState<HubConnection | null>(null)
  const [AddfriendOpen, setAddFriendOpen] = useState<boolean>(false)
  const [friendRequests, setFriendsRequets] = useState<IFriendRequest[]>([])
  const [ViewFriends, setViewFriends] = useState<boolean>(false)
  const [ViewFriendRequestOpen, setViewFriendRequestOpen] = useState<boolean>(
    false
  )

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
  }, [])

  function handleAddFriendOnclick () {
    setAddFriendOpen(true)
  }
  function handleAddFriendClose () {
    setAddFriendOpen(false)
  }

  async function HandleFriendRequestOpen () {
    await FriendAPI.GetAllFriendRequests(
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
    console.log(requestID)
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
      <ViewFriendsModel open={ViewFriends} />
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
            <ChatCard />
          </div>
        </div>
        <div className='Chat'>
          <div className='chatTextArea'>
            
            
          </div>
          <textarea className='Text-Input'></textarea>
          <br />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}

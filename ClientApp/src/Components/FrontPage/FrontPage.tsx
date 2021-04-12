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

export const FrontPage = () => {
  const [HubConnection, setHubConnection] = useState<HubConnection | null>(null)
  const [AddfriendOpen, setAddFriendOpen] = useState<boolean>(false)
  const [friendRequests, setFriendsRequets] = useState<IFriendRequest[]>([])
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

      <NavBar
        AddFriendOnClick={handleAddFriendOnclick}
        ViewFriendRequestsOnClick={HandleFriendRequestOpen}
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
            <Message
              Sender
              Name='Ruan'
              Message={`Lorem Ipsum is simply
              
              
              dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
              since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived no
              t only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960
              s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus Page
              Maker including versions of Lorem Ipsum`}
            />
            <Message
              Sender={false}
              Name='Ruan'
              Message="Lorem Ipsum is si
              
              mply dummy text of the printing  😂 and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
            />
          </div>
          <textarea className='Text-Input'></textarea>
          <br />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}

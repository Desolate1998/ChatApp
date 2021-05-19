import {
  Avatar,
  Button,
  Dialog,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './ViewFriends.css'
import { IFriend } from './../../infrastructure/Models/Friend'
import { FriendAPI } from '../../API/Agent'
import {
  SessionHelper,
  SessionVariabels
} from '../../infrastructure/HelperScripts/SessionHelper'
import { List } from '@material-ui/core'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SmsIcon from '@material-ui/icons/Sms'
import { DialogActions } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { IActiveChat } from '../../infrastructure/Models/ActiveChats'
interface IProps {
  open: boolean
  setOpen: Function
  handleShowChat: Function
}
export const ViewFriendsModel: React.FC<IProps> = ({
  open,
  setOpen,
  handleShowChat
}) => {
  const [friends, setFriends] = useState<IActiveChat[]>([])

  useEffect(() => {
    FriendAPI.GetFriends(
      SessionHelper.GetVerable(SessionVariabels.Email)!
    ).then(response => {
      setFriends([...response])
      console.log(response)
    })
  }, [])

  return (
    <Dialog open={open} fullWidth className='ViewFriendsContainer'>
      <DialogActions>
        <IconButton edge='end' aria-label='delete' onClick={() => setOpen()}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <h2 className='ViewFriendsHeading'>Friends</h2>
      <TextField
        id='standard-password-input'
        label='Search For Friend'
        type='Text'
      />
      <div className='FriendsBoxContainer'>
        <List>
          {friends.map((friend, index) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText>{friend.displayName}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label=''>
                    <SmsIcon onClick={()=>{handleShowChat(friend.chatId)}}/>
                  </IconButton>
                  <IconButton edge='end' aria-label='delete' onClick={() => {console.log(friends)}}>
                    <DeleteSweepIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </div>
    </Dialog>
  )
}

import {
  Avatar,
  Dialog,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
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
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SmsIcon from '@material-ui/icons/Sms';
interface IProps {
  open: boolean
}
export const ViewFriendsModel: React.FC<IProps> = ({ open }) => {
  const [friends, setFriends] = useState<IFriend[]>([])

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
      <h2 className='ViewFriendsHeading'>Friends</h2>
      <div className='FriendsBoxContainer'>
        <List>
          {friends.map((friend, index) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
               
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  {friend.displayeName ? friend.displayeName : friend.email}
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton  edge="end" aria-label="delete">
                      <SmsIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
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

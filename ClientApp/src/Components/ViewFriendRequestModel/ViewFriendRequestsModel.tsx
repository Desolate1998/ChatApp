import {
  Avatar,
  Button,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Typography
} from '@material-ui/core'
import React, { useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { IFriendRequest } from '../../infrastructure/Models/FriendRequest'
import './ViewFriendRequestModel.css'
interface IProps {
  open: boolean
  handleClose: Function;
  requests?: IFriendRequest[];
  handleFriendAcceptMethod: Function;
  handleFriendDeclineMethod: Function;
}
export const ViewFriendRequestsModel: React.FC<IProps> = ({
  open,
  handleClose,
  requests,
  handleFriendAcceptMethod,
  handleFriendDeclineMethod
}) => {
  return (
    <Dialog open={open} fullWidth className='FriendRequestsContainer'>
      <h2>Friend Requests</h2>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => handleClose()}
      >
        Close
      </Button>
      <List>
        {requests?.map(item => {
          return (
            <ListItem className='FriendRequestItemContainer'>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.email} />
              <ListItemSecondaryAction>
                <Button
                  className='AcceptFriendRequestButton'
                  variant='outlined'
                  onClick={() => {handleFriendAcceptMethod(item.requestID)}}
                >
                  ✔
                </Button>
                <Button
                  className='DeclineFriendRequestButton'
                  variant='outlined'
                  color='primary'
                  onClick={() => {handleFriendDeclineMethod(item.requestID)}}
                >
                  ✘
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

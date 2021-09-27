import React from 'react'
import { Grid, Button, IconButton, Avatar } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import tempAv from '../../Resources/Images/main-qimg-722ecfc93dbf9003c2c9833ee84563f2.jpg'

interface IProps {
  handleStartChat: Function
  handleDeleteFriend: Function
  displayName: string
}
export const FriendsList: React.FC<IProps> = ({
  displayName,
  handleDeleteFriend,
  handleStartChat
}) => {
  return (
    <Grid
      container
      alignItems='center'
      style={{ borderBottom: '1px solid white' }}
    >
      <Grid item xs={2} xl={2} md={2} lg={2}>
        <Avatar src={tempAv} />
      </Grid>
      <Grid item xs={6} xl={6} md={6} lg={6}>
        <h4>{displayName}</h4>
      </Grid>
      <Grid item xs={2} xl={2} md={2} lg={2}>
        <IconButton color='primary' onClick={() => handleStartChat()}>
          <MessageIcon />
        </IconButton>
      </Grid>

      <Grid item xs={2} xl={2} md={2} lg={2}>
        <IconButton color='secondary' onClick={() => handleDeleteFriend()}>
          <DeleteOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

import React from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

interface IProps {
  handleAccept: Function
  handleDecline: Function
  email: string
}
export const FriendRequest: React.FC<IProps> = ({
  handleAccept,
  handleDecline,
  email
}) => {
  return (
    <div>
      <Grid
        container
        alignItems='center'
        style={{ borderBottom: '1px solid white' }}
      >
        <Grid item xs={8} xl={8} md={8} lg={8}>
          <h4>{email}</h4>
        </Grid>
        <Grid item xs={2} xl={2} md={2} lg={2}>
          <IconButton color='primary' onClick={()=>handleAccept()}>
            <DoneIcon />
          </IconButton>
        </Grid>

        <Grid item xs={2} xl={2} md={2} lg={2}>
          <IconButton color='secondary' onClick={()=>handleDecline()}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

import React from 'react'
import './ChatCard.css'
import ProfileImage from '../../Resources/Images/main-qimg-722ecfc93dbf9003c2c9833ee84563f2.jpg'
import { Grid } from '@material-ui/core'
import { StyledBadge } from './../StyledBadge/StyledBadge'
import { OnlineStatus } from '../../infrastructure/Enumeration/OnlineStatus'

interface IProps {
  displayName: string
  lastMessage?: string
  chatId: number
}

export const ChatCard: React.FC<IProps> = ({
  displayName,
  lastMessage,
  chatId
}) => {
  return (
    <div >
      <Grid xs={12} lg={12} md={12} className='chatCard'>
        <Grid container spacing={2}>
          <Grid item>
            <StyledBadge onlineStatus={OnlineStatus.Online} image={''} />
          </Grid>
          <Grid item>
            <small style={{fontWeight:'bolder'}}>{displayName}</small>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>{lastMessage}</Grid>
        </Grid>
      </Grid>
    </div>
  )
}

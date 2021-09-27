import React, { useState } from 'react'
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles
} from '@material-ui/core/styles'
import { Avatar, Badge } from '@material-ui/core'
import { OnlineStatus } from '../../infrastructure/Enumeration/OnlineStatus'
import ProfilePicturePlaceHolder from '../../Resources/Images/main-qimg-722ecfc93dbf9003c2c9833ee84563f2.jpg'
interface IProps {
  onlineStatus: OnlineStatus
  image: string
}

export const StyledBadge: React.FC<IProps> = ({ image, onlineStatus }) => {
 let color = '#fffffff'
  switch (onlineStatus) {
    case OnlineStatus.Away:
        color = '#f9c74f'
      break
    case OnlineStatus.Busy:
        color = '#d62828'
      break
    case OnlineStatus.Offline:
        color = '#cddafd'
      break
    case OnlineStatus.Online:
        color = '#43aa8b'
      break
    default:
      break
  }

  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: color,
        color: color,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
      }
    })
  )(Badge)

  return (
    <StyledBadge
      overlap='circle'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      variant='dot'
    >
      <Avatar alt='P' src={ProfilePicturePlaceHolder} />
    
    </StyledBadge>
     
  )
}

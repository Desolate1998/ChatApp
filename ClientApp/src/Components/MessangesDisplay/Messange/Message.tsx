import { Grid, Chip } from '@material-ui/core'
import React from 'react'
import './Message.css'
interface IProps {
  message: string
  isSender: boolean
  dateSent?: string
}
export const Message: React.FC<IProps> = ({ isSender, message, dateSent }) => {
  return (
    <Grid
      item
      xs={11}
      xl={11}
      md={11}
      className='Message'
      justify={isSender ? 'flex-end' : 'flex-start'}
    >
      <div className='MessageContainer'>
        {message}
        <br />
       <small className='TimeStamp'>
         {dateSent}
       </small>
      </div>
    </Grid>
  )
}

import { Avatar, Grid, makeStyles, Paper, TextField ,Button, IconButton} from '@material-ui/core'
import React from 'react'

import './MessageDisplay.css'
import { StyledBadge } from './../StyledBadge/StyledBadge'
import { OnlineStatus } from '../../infrastructure/Enumeration/OnlineStatus'
import { Message } from './Messange/Message'
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { observer } from 'mobx-react-lite'
import { useStore } from '../../Stores/store'
import { SessionHelper, SessionVariabels } from '../../infrastructure/HelperScripts/SessionHelper'



 const MessangesDisplay = () => {
   const {chatStore} = useStore();
  return (
    <div className='MessangesDisplayContainer'>
      <Grid container alignItems='flex-end'>
        <Grid item xs={12} xl={12} md={12}>
          <Paper className='ChatInfoHeader'>
            <StyledBadge image='' onlineStatus={OnlineStatus.Online} />
            <h2 style={{ marginLeft: 5 }}>Random Person</h2>
          </Paper>
          <div className='ContainerForMessages'>
          {
            chatStore.currentFocusedChat?.messanges.map(item=>{
              return <Message  dateSent={item.timeSent}  isSender={
                item.senderId ===
                parseInt(SessionHelper.GetVerable(SessionVariabels.Id)!)
              } 
              message={item.message}


              />
            })
          }
          </div>
          <Grid>
          <TextField id="standard-name" label="Message" multiline style={{width:'90%',marginLeft:'1%'}} onChange={(e)=>{
            chatStore.message= e.target.value
          }} />
          <IconButton  color='primary'><AttachFileIcon/></IconButton>

          <IconButton  onClick={chatStore.sendMessage} color='primary'><SendIcon/></IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default observer(MessangesDisplay)
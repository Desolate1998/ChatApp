import React from 'react'
import { Grid, Avatar,Button, IconButton } from '@material-ui/core'
import TextsmsIcon from '@material-ui/icons/Textsms';

interface IProps {
  displayName: string;
  openChat:Function;
}
export const ActiveChatItem: React.FC<IProps> = ({ displayName,openChat }) => {
  return (
    <Grid container style={{marginBottom:'10px'}}  alignItems='center'
    justify='center'
   
    >
      <Grid item xs={4} xl={4} md={4} lg={4}>
        <Avatar style={{marginRight:'100px'}} />
      </Grid>
      <Grid  item xs={7} xl={7} md={7} lg={7}>
        <h3>{displayName}</h3>
      </Grid>
      <Grid  item xs={1} xl={1} md={1} lg={1}>
        <IconButton color='secondary' onClick={()=>openChat()}>
            <TextsmsIcon/>
        </IconButton>
      </Grid>
    </Grid>
  )
}

import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import './Home.css'

import MessangesDisplay  from '../MessangesDisplay/MessangesDisplay'
import ActiveChatsBar from '../ActiveChatsBar/ActiveChatsBar'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../Stores/store'


 const Home = () => {

   let {chatStore} = useStore();
  useEffect(() => {
    chatStore.createHubConnection();
    
  }, [])
  return (
    <div>
      <Grid container>
        <Grid item lg={2} sm={2}>
          <Hidden smDown>
            <Paper style={{ background: 'black', height: '100vh' }}>
              <ActiveChatsBar />
            </Paper>
          </Hidden>
        </Grid>
        <Grid item lg={10} sm={12} xs={12} md={10}>
          <MessangesDisplay />
        </Grid>
      </Grid>
    </div>
  )
}

export   default observer(Home)
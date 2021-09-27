import {
  Menu,
  Grid,
  Paper,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AccordionDetails
} from '@material-ui/core/'
import React, { useState } from 'react'
import './SideBarStyle.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import addFriendSVG from '../../Resources/SVG/AddFriendSvg.svg'
import { useStore } from './../../Stores/store'

import { FriendRequest } from '../FriendRequest/FriendRequest'
import { FriendsList } from '../FriendsList/FriendsList'
import { observer } from 'mobx-react-lite';

 const Sidebar = () => {
  const { chatStore } = useStore()

  return (
    <div
      className={'FriendsMenu '.concat(
        chatStore.sideBarMenu ? 'FriendsMenuActive' : ''
      )}
    >
      <Dialog open={chatStore.addFriendDialogOpen} maxWidth='md' fullWidth>
        <DialogContent className='AddFriendDialog'>
          <DialogTitle>Add A Friend</DialogTitle>
          <Grid container>
            <Grid item xs={6} md={6} xl={6}>
              <img src={addFriendSVG} alt='' width='100%' />
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <h2>Friend quote of the day</h2>
              <p>
                “A friend is one who overlooks your broken fence and admires the
                flowers in your garden.”
              </p>
              <br />
              <TextField
                id='standard-full-width'
                label='Email Address'
                style={{ margin: 8 }}
                placeholder='Darth@Vador.com'
                fullWidth
                margin='normal'
                value={chatStore.addFriendEmailAddress}
                onChange={e => {
                  chatStore.setAddFriendEmail(e.target.value)
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='AddFriendDialogActions'>
          <Button
            color='primary'
            variant='outlined'
            onClick={chatStore.setAddFriendDialog}
          >
            Close
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              chatStore.addFriend()
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        onClick={() => {
          chatStore.setSideBarMenu()
        }}
        color='primary'
        aria-label='add an alarm'
      >
        <ArrowBackOutlinedIcon />
      </IconButton>
      <h2 style={{ color: 'white' }}>
        Friends{' '}
        <IconButton
          color='primary'
          aria-label='add an alarm'
          onClick={() => {
            chatStore.setAddFriendDialog()
          }}
        >
          <GroupAddIcon />
        </IconButton>
      </h2>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontWeight: 'bolder', color: 'white' }} />
          }
          style={{ fontWeight: 'bolder', color: 'white' }}
        >
          Friends
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: 'column' }}>
          {chatStore.friends.map(item => {
            return (
              <FriendsList
                displayName={item.displayName}
                handleDeleteFriend={() =>
                  chatStore.handleDeleteFriend(item.chatId)
                }
                handleStartChat={() => chatStore.handleStartChat(item.chatId)}
              />
            )
          })}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontWeight: 'bolder', color: 'white' }} />
          }
          style={{ fontWeight: 'bolder', color: 'white' }}
        >
          Friend Requests
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: 'column' }}>
          {chatStore.friendRequests.map(item => {
            return (
              <FriendRequest
                email={item.email}
                handleAccept={() =>
                  chatStore.acceptFriendRequest(item.requestID)
                }
                handleDecline={() =>
                  chatStore.acceptFriendRequest(item.requestID)
                }
              />
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontWeight: 'bolder', color: 'white' }} />
          }
          style={{ fontWeight: 'bolder', color: 'white' }}
        >
          Sent Friend Requests
        </AccordionSummary>
      </Accordion>
    </div>
  )
}

export  default observer(Sidebar)
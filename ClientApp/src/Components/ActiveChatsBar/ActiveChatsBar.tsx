import {
  Grid,
  Badge,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Button,
  Typography,
  Divider,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import React, { useRef, useState } from 'react'
import './ActiveChatsBar.css'
import { StyledBadge } from './../StyledBadge/StyledBadge'
import { OnlineStatus } from '../../infrastructure/Enumeration/OnlineStatus'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupIcon from '@material-ui/icons/Group'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import * as FaUserIcons from 'react-icons/fa'
import ProfilePicturePlaceHolder from '../../Resources/Images/main-qimg-722ecfc93dbf9003c2c9833ee84563f2.jpg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import { ChatCard } from '../ChatCard/ChatCard'
import Sidebar from '../Sidebar/Sidebar'
import { useStore } from '../../Stores/store'
import { FriendsList } from '../FriendsList/FriendsList'
import { ActiveChatItem } from './../ActiveChatItem/ActiveChatItem'
import { observer } from 'mobx-react-lite'

const ActiveChatsBar = () => {
  const [sideBarOpen, setsideBarOpen] = useState(false)
  const inputEl = useRef(null)
  const MenueEl = useRef(null)
  const { chatStore } = useStore()

  return (
    <div>
      <Sidebar />
      <Grid item xl={12} xs={12} className='ActiveChatsBar'>
        <Grid container className='ProfileAndOptionsContainer'>
          <Grid item xs={12} md={8} xl={8}>
            <StyledBadge
              image={ProfilePicturePlaceHolder}
              onlineStatus={OnlineStatus.Online}
            />
          </Grid>
          <Grid item xs={12} md={5} xl={4}>
            {/* friends */}
            <IconButton
              ref={MenueEl}
              color='primary'
              aria-label='add an alarm'
              onClick={() => {
                chatStore.setSideBarMenu()
              }}
            >
              <FaUserIcons.FaUserFriends />
            </IconButton>
            {/* Settings */}
            <IconButton
              onClick={() => setsideBarOpen(!sideBarOpen)}
              ref={inputEl}
              color='primary'
            >
              <MoreVertIcon />
              <Menu open={sideBarOpen} anchorEl={inputEl.current}>
                <MenuItem>
                  <Typography variant='inherit'>Settings</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography variant='inherit'>New Group</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography variant='inherit'>Profie</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography variant='inherit'>Logout</Typography>
                </MenuItem>
              </Menu>
            </IconButton>
          </Grid>
          <Grid container alignItems='flex-end'>
            <Grid item md={1} xl={1}>
              <SearchIcon color='primary' />
            </Grid>
            <Grid item md={11} xl={11}>
              <TextField
                id='input-with-icon-grid'
                label='Search'
                color='primary'
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontWeight: 'bolder', color: 'white' }} />
          }
          style={{ fontWeight: 'bolder', color: 'white' }}
        >
          Chats
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <div>
              {chatStore.activeChats.map(item => {
                return (
                  <ActiveChatItem
                    displayName={item.displayName}
                    openChat={() => chatStore.focusChat(item.chatId)}
                  />
                )
              })}
            </div>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontWeight: 'bolder', color: 'white' }} />
          }
          style={{ fontWeight: 'bolder', color: 'white' }}
        >
          Groups
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
export default observer(ActiveChatsBar)

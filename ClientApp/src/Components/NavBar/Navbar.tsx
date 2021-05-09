import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu'
import './Navbar.css'
import { Button, Drawer, IconButton, MenuItem, Select } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

interface IProps {
  AddFriendOnClick: Function
  ViewFriendRequestsOnClick: Function
  ViewFriendsOnClick: Function
}

export const NavBar: React.FC<IProps> = ({
  AddFriendOnClick,
  ViewFriendRequestsOnClick,
  ViewFriendsOnClick
}) => {
  const [DrawerOpen, setDrawer] = useState(false)

  function HandleDrawer () {
    setDrawer(!DrawerOpen)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={HandleDrawer}>
            <AccountCircleIcon />
          </IconButton>

          <Drawer open={DrawerOpen} variant='temporary' className='Menu-Drawer'>
            <Button aria-controls='simple-menu' aria-haspopup='true'>
              Profile Settings
            </Button>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              Friends
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  HandleDrawer()
                  AddFriendOnClick()
                }}
              >
                Add Friend
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  HandleDrawer()
                }}
              >
                Delete Friend
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  HandleDrawer()
                  ViewFriendsOnClick()
                }}
              >
                view Friends
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  HandleDrawer()
                  ViewFriendRequestsOnClick()
                }}
              >
                view Friend Requests
              </MenuItem>
            </Menu>{' '}
            <Button color='primary' onClick={HandleDrawer}>
              Close
            </Button>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              style={{ bottom: '10px', position: 'absolute' }}
            >
              Log Out
            </Button>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}

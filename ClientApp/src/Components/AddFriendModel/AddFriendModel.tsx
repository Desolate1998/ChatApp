import { Button, Modal, TextField } from '@material-ui/core'

import React, {  useState } from 'react'
import { FriendAPI } from '../../API/Agent'
import {
  SessionHelper,
  SessionVariabels
} from '../../infrastructure/HelperScripts/SessionHelper'
import './AddFriendStyle.css'
import { Notfications } from './../../infrastructure/HelperScripts/Notifications'
import { ISendFriendReequestModel } from './../../infrastructure/Models/SendFriendRequestModel'

interface IProps {
  open: any;
  close: Function;
  handleSendNotfication:Function;
}

export const AddFriendModel: React.FC<IProps> = ({ open, close,handleSendNotfication }) => {
  
  const [Email, setEmail] = useState<string>('')

  function handleOnSubmit () {
    let Data: ISendFriendReequestModel = {
      FromUser: SessionHelper.GetVerable(SessionVariabels.Email)!,
      SentToEmail: Email
    }
    console.log(Data)
    if (Email !== '') {
      FriendAPI.SendFriendRequest(Data).then(response => {
        if (response === '404') {
          Notfications.Danager(
            'Could not add friend',
            'No such email found please check spelling'
          )
        } else if (response === '202') {
          Notfications.Success('Good Job!', 'Request has been sent')
         
          handleSendNotfication(Email);
          setEmail('');
          close();
        } else {
          Notfications.info('oops', response)
        }
      })
    }
  }

  function handleEmailTextChange (event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        open={open}
      >
        <div className='model-Content'>
          <h2>Add Friend</h2>
          <TextField
            id='filled-basic'
            label='Users Email Address'
            variant='filled'
            className='MUI-Input '
            value={Email}
            onChange={handleEmailTextChange}
          />
          <Button
            variant='outlined'
            className='SendFriendRequest'
            onClick={handleOnSubmit}
          >
            Send Friend Request
          </Button>
          <Button
            variant='outlined'
            className='Cancel'
            onClick={() => {
              setEmail('')
              close()
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}

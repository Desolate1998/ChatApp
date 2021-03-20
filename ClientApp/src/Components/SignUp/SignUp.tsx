import React, { ChangeEventHandler, useState } from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import './SignUp.css'
import SideImage from '../../Resources/SVG/SocialInteraction.svg'
import { Button, TextField } from '@material-ui/core'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Notfications } from './../../infrastructure/HelperScripts/Notifications'
import { UserAPI } from '../../API/Agent'
import { IEmailAndPassword } from './../../infrastructure/Models/EmailAndPasswordModel'

export const SignUp = () => {
  const [EmailAddress, setEmailAddress] = useState<string>('')
  const [Password, setPassword] = useState<string>('')
  const [ConfirmPassword, setConfirmPassword] = useState<string>('')

  function HandleSubmit () {
    if (Password !== ConfirmPassword || Password === '') {
      Notfications.Warning(
        'Passowrd Error',
        'Passwords Does Not Match Or Are Missing'
      )
    } else if (Password.length < 8) {
      Notfications.Warning('Password Error', 'Passsword Is To Weak')
    } else if (EmailAddress === '') {
      Notfications.Warning('Email Error', 'Missing Email Adress')
    } else {
      let Data: IEmailAndPassword = {
        Email: EmailAddress,
        Password: Password
      }

      UserAPI.Register(Data)
        .then(Response => {
          if (Response === 'Success') {
            Notfications.Success('Good Job!', 'You are now registred')
          } else {
            Notfications.Danager('Error', Response)
          }
        })
        .catch(Error => {
          Notfications.Danager('Error', 'Please try again later')
         
        })
    }
  }

  return (
    <div className='SignUp-Container'>
      <div className='SignUp-Card'>
        <div className='content-Conatainer'>
          <div className='LeftContent'>
            <img className='Signup-SideImage' src={SideImage} alt='' />
          </div>
          <div className='rightContent'>
            <h1 className='Sign-Up-Title'>Sign Up</h1>
            <TextField
              type='email'
              value={EmailAddress}
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Email Address'
              variant='filled'
              className='MUI-Input'
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setEmailAddress(e.target.value)
              }}
            />

            <TextField
              type='Password'
              value={Password}
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Password'
              variant='filled'
              className='MUI-Input'
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPassword(e.target.value)
              }}
            />

            <TextField
              value={ConfirmPassword}
              type='Password'
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Confirm Password'
              variant='filled'
              className='MUI-Input'
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setConfirmPassword(e.target.value)
              }}
            />
            <Button
              variant='text'
              className='SignUp-Button'
              onClick={HandleSubmit}
            >
              Sign Up Now!
            </Button>
            <Link to=''>
              <Button variant='text' className='Return-Button'>
                Return To Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ThemeButton visable={false} />
    </div>
  )
}

import React, { useState } from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import './SignUp.css'
import SideImage from '../../Resources/SVG/SocialInteraction.svg'
import { Button, TextField } from '@material-ui/core'
import { Route } from 'react-router'
import { Link } from 'react-router-dom';

export const SignUp = () => {

  const [EmailAddress, setEmailAddress] = useState<String>('');
  const [Password, setPassword] = useState<String>('');
  

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
            type="email"
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Email Address'
              variant='filled'
              className='MUI-Input'
            />

            <TextField
            type="Password"
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Password'
              variant='filled'
              className='MUI-Input'
            />

            <TextField
             type="Password"
              style={{ width: '100%', color: 'red' }}
              id='filled-basic'
              label='Confirm Password'
              variant='filled'
              className='MUI-Input'
            />
            <Button variant="text" className="SignUp-Button" >Sign Up Now!</Button>
            <Link to=''>
              <Button variant="text" className="Return-Button" >Return To Login</Button>
            </Link>
          </div>
        </div>
      </div>
      <ThemeButton visable={false} />
    </div>
  )
}

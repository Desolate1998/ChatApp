import React from 'react'
import './Login.css'
import LoginImage from '../../Resources/SVG//LoginIamge.svg';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { ThemeButton } from './../ThemeButton/ThemeButton';

export const Login = () => {
  return (
    
    <div className='LoginContainer' >
  
      <div className='LoginCard' >
        <div className="Content-Container"  >
          <div className='Login-Controls'>
            <h2>Log in</h2>

            <TextField
              id='filled-basic'
              label='Email address'
              variant='filled'
              className='Login-Input'
            />
            <TextField
              id='filled-basic'
              label='Password'
              variant='filled'
              className='Login-Input'
            />
            <label htmlFor="" className="Login-Forgot-Password">Forgot Password ?</label>
            <FormControlLabel
              control={
                <Switch
                  className='RemberMe'
                  onChange={() => {}}
                  value='checkedB'
                  color='primary'
                />
              }
              label='Auto Login?'
            />
            
            <Button variant='outlined' className='Login-Button'>
              Login
            </Button>
            <p>
              Need An Account ?{' '}
              <span className='Sign-Up-Text-Color'>Sign Up</span>{' '}
              {'  '} 
            </p>
          </div>
          <div className='Login-Image'>
              <img src={LoginImage} className="Login-Svg" alt=""/>
          </div>
        </div>
      </div>

      <ThemeButton visable={false} />
    </div>
  )
}

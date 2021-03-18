import React from 'react'
import './Login.css'
import { LoginSVG } from './../../Resources/SVG/LoginSVG'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

export const Login = () => {
  return (
    <div className='LoginContainer'>
      <div className='LoginCard'>
        <div className='Login-Controls'>
          <h2>Log in</h2>
     
          <TextField id="filled-basic" label="Email address" variant="filled" className="Login-Input" />
          <TextField id="filled-basic" label="Password" variant="filled"  className="Login-Input" />
          <FormControlLabel
          control={
            <Switch
          className="RemberMe"
              onChange={()=>{}}
              value="checkedB"
              color="primary"
            />
          }
          label="Auto Login?"
        />
        <Button variant="outlined" className="Login-Button">Login</Button>
        </div>
        <div className='Login-Image'>
          <LoginSVG ClassName="LoginSvg" />
        </div>
      </div>
    </div>
  )
}

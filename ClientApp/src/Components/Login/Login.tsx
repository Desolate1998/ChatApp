import React, { useState } from 'react'
import './Login.css'
import LoginImage from '../../Resources/SVG//LoginIamge.svg'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { ThemeButton } from './../ThemeButton/ThemeButton'

import { Link} from 'react-router-dom'
import { Notfications } from './../../infrastructure/HelperScripts/Notifications';
import { IEmailAndPassword } from './../../infrastructure/Models/EmailAndPasswordModel';
import { UserAPI } from '../../API/Agent'
import { SessionHelper, SessionVariabels } from '../../infrastructure/HelperScripts/SessionHelper'
import { useHistory } from "react-router-dom"

interface IProps{
  logedIn:Function
}
export const Login:React.FC<IProps> = ({logedIn}) => {
  const history = useHistory();
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');

  async function HandleSubmit(){
    if(Email!==''&& Password !== ''){
      let Data:IEmailAndPassword ={
        Email:Email,
        Password:Password
      }
      try {
       await UserAPI.Login(Data).then((Response)=>{
         if(Response ===true){
            SessionHelper.SetVerable(SessionVariabels.Email,Email);
            history.push("/",{from:'Login'})
            logedIn();
         }else{
          Notfications.Danager('Login Failed','Email or password was inccorect')
         }
       })
      } catch (err) {
        Notfications.Danager('Server Error','Try Again Later')
      }
    }else{
      Notfications.info('Error','Some fields are missing')
    }
  }
  return (
    <div className='LoginContainer'>
      <div className='LoginCard'>
        <div className='Content-Container'>
          <div className='Login-Controls'>
            <h2>Log in</h2>

            <TextField
              id='filled-basic'
              label='Email address'
              variant='filled'
              className='MUI-Input'
              value={Email}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setEmail(e.target.value)}}
            />
            <TextField
              id='filled-basic'
              label='Password'
              variant='filled'
              className='MUI-Input'
              type="Password"
              value={Password}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>{setPassword(e.target.value)}}
            />
            <label htmlFor='' className='Login-Forgot-Password'>
              Forgot Password ?
            </label>
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

            <Button variant='outlined' className='Login-Button' onClick={HandleSubmit}>
              Login
            </Button>
            <p>
              Need An Account ?{' '}
              
                <Link to="/SignUp" className='Sign-Up-Text-Color'>
                  Sign Up
                </Link>{' '}
            
              {'  '}
            </p>
          </div>
          <div className='Login-Image'>
            <img src={LoginImage} className='Login-Svg' alt='' />
          </div>
        </div>
      </div>

      <ThemeButton visable={false} />
    </div>
  )
}

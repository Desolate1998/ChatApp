import React, { useState } from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import './App.css'
import { Login } from './../Login/Login'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import {
  SessionHelper,
  SessionVariabels
} from '../../infrastructure/HelperScripts/SessionHelper'
import { SignUp } from '../SignUp/SignUp'
import './Themes.css'
import ReactNotification from 'react-notifications-component'
import { FrontPage } from '../FrontPage/FrontPage'
import { HubHelper } from '../../infrastructure/HelperScripts/HubHelper'

export const App = () => {
  const [LogedIn, setLogedIn] = useState<boolean>(false);
  
  if (!LogedIn) {
  
    return (
      <Router>
        <ReactNotification />
        <Switch>
          <Route exact path='/SignUp'>
            <SignUp />
          </Route>
          <Route>
            <Login logedIn={()=>{setLogedIn(true)}} />
          </Route>
        </Switch>
      </Router>
    )
  } else
    return (
      <div>
        <Router>
          <ReactNotification />
          <Switch>
            <Route exact path='/'>
              <FrontPage  />
            </Route>
          </Switch>
        </Router>
      </div>
    )
}

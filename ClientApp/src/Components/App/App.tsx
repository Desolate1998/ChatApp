import React from 'react'
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

export const App = () => {
  if (SessionHelper.GetVerable(SessionVariabels.Email) != null) {
    return (
      <Router>
        <ReactNotification/>
        <Switch>
          <Route exact path="/SignUp">
          <SignUp/>
          </Route>
          <Route >
           
            <Login />
          </Route>
        </Switch>
      </Router>
    )
  } else
    return (
      <div>
        <Router>
        <ReactNotification/>
          <Switch>
            <Route exact path='/Login'>
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    )
}

import React from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import './App.css'
import { Login } from './../Login/Login'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {
  SessionHelper,
  SessionVariabels
} from '../../HelperScripts/SessionHelper'
import { SignUp } from '../SignUp/SignUp'
import './Themes.css'
export const App = () => {
  if (SessionHelper.GetVerable(SessionVariabels.Email) != null) {
    return (
      <Router>
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
          <Switch>
            <Route exact path='/Login'>
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    )
}

import React, { useState } from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import './App.css'
import { Login } from './../Login/Login'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { SignUp } from '../SignUp/SignUp'
import './Themes.css'
import ReactNotification from 'react-notifications-component'
import Home  from './../Home/Home';
import { observer } from 'mobx-react-lite'


function App(){
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
              <Home  />
            </Route>
          </Switch>
        </Router>
      </div>
    )
}
export default observer(App)
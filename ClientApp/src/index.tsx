import React from 'react'
import ReactDOM from 'react-dom'
import App  from './Components/App/App'
import { ThemeButton } from './Components/ThemeButton/ThemeButton'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { blue, purple,orange } from '@material-ui/core/colors'
import { store, StoreContext } from './Stores/store'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <StoreContext.Provider value={store }>
      <App />
      </StoreContext.Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

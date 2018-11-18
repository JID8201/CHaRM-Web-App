import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.css'
import App from './pages/App'
import registerServiceWorker from './registerServiceWorker'
import authStore from './stores/authStore'
import commonStore from './stores/commonStore'
import recyclingStore from './stores/recyclingStore'
import userStore from './stores/userStore'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './assets/styles/theme'

const stores = {
  recyclingStore,
  authStore,
  commonStore,
  userStore
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()

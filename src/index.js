import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import appState from './stores/appState';
import recyclingStore from './stores/recyclingStore'
import { Provider } from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme'


const stores = {
    appState,
    recyclingStore
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
);
registerServiceWorker();

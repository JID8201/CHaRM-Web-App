import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './stores/AppState';
import { Provider } from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme'


const store = new AppState();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>, 
    document.getElementById('root')
);
registerServiceWorker();

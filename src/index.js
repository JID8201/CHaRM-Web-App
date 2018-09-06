import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './stores/AppState';
import { Provider } from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';

const store = new AppState();

ReactDOM.render(
    <Provider store={ store }>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();

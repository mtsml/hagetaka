import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/index'
import Router from './component/Router.js';
import './css/index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


ReactDOM.render(
    <Provider>
        <Router />
    </Provider>,
    document.getElementById('root')
);
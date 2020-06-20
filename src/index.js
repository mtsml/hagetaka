import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/index'
import Router from './container/Router.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './css/index.css'

ReactDOM.render(
    <Provider>
        <Router />
    </Provider>,
    document.getElementById('root')
);
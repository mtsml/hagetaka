import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/index'
import Router from './container/Router.js';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './css/index.scss';

ReactDOM.render(
    <Provider>
        <Router />
    </Provider>,
    document.getElementById('root')
);
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './store/index'
import Router from './container/Router.js';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './css/index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider>
        <Router />
    </Provider>
);
import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import './css/index.css';
import Router from './component/Router.js';
import { getHost } from './util/util'

const socket = io(getHost());

ReactDOM.render(
  <React.StrictMode>
    <Router socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
);
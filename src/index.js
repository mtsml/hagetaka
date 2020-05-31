import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import './css/index.css';
import Router from './component/Router.js';

const getHost = () => {
  if (process.env.NODE_ENV === 'production') {
    return "18.181.41.155:8090"
  } else {
    return "localhost:8090" 
  }
}
const socket = io(getHost());

ReactDOM.render(
  <React.StrictMode>
    <Router socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
);
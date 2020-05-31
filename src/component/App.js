import React from 'react';
import io from "socket.io-client";
import { Row } from 'react-bootstrap'
import ButtonArea from './ButtonArea.js'
import Contents from './Contents.js'
import InputModal from './InputModal.js'
import MessageToast from './MessageToast.js'
import Player from './Player.js'
import Point from './Point.js'
import './../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io(this.getHost());

    this.state = {
      name: null,
      point: 0,
      players: [],
      toast: []
    }
  }

  componentDidMount() {
    this.socket.on('INIT', (data) => {
      console.log('INIT')
      this.notifyAddPlayer(data.name)
      this.setState({players: data.players})
    })
    this.socket.on('RECEIVE_MESSAGE', function(data){ 
      console.log('receive')
    })
    this.socket.on('UPDATE_COUNT', (data) => { 
      console.log('update')
      console.log(data)
      this.setState({point: data})
    })
  }

  getHost() {
    if (process.env.NODE_ENV === 'production') {
      return "18.181.41.155:8090"
    } else {
      return "localhost:8090" 
    }
  }

  sendMessage() {
    console.log('send message')
    this.socket.emit('SEND_MESSAGE', {
    });
  }

  inputName(name) {
    this.setState({name: name})
    this.socket.emit('INIT', name)
  }

  notifyAddPlayer(name) {
    const toast = this.state.toast
    toast.push(name)
    this.setState({toast: toast})
  }

  render() {
    return (
      <div className="App">
        <Contents title='プレイヤー'>
          <Row>
            {this.state&&this.state.players.map(player => {
              return (
                <Player 
                  name={player.name} 
                  point={player.point} 
                  hand={player.hand}
                  color={player.color} 
                />
              )
            })}
          </Row>
        </Contents>
        <Contents title='得点'>
          <Point point={this.state.point} socket={this.socket}/>
        </Contents>
        <Contents title='手札'>
          <ButtonArea onClick={(msg) => this.sendMessage(msg)}/>
        </Contents>
        <InputModal onClick={(name) => this.inputName(name)}/>
        {this.state.toast&&this.state.toast.map(name => {
          return <MessageToast name={name} show={true} />
        })}
      </div>
    );
  }
}

export default App;
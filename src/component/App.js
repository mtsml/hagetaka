import React from 'react';
import { Row } from 'react-bootstrap'
import ButtonArea from './ButtonArea.js'
import Contents from './Contents.js'
import MessageToast from './MessageToast.js'
import Player from './Player.js'
import Point from './Point.js'
import './../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.socket = props.socket

    this.state = {
      name: props.name,
      point: 0,
      players: props.players,
      toast: [],
      onGame: false
    }
  }

  componentDidMount() {
    this.socket.on('INIT', (data) => {
      console.log('INIT')
      this.notify(data.message)
      this.setState({players: data.players})
    })
    this.socket.on('UPDATE_PLAYER', (data) => { 
      console.log('UPDATE_PLAYER')
      this.setState({players: data.players})
    })
    this.socket.on('UPDATE_COUNT', (data) => { 
      console.log('UPDATE_COUNT')
      this.setState({point: data})
    })
    this.socket.on('GAME_START', (data) => { 
      console.log('GAME_START')
      this.notify(data.message)
      this.setState({onGame: true})
    })
  }

  componentWillUnmount() {
    this.socket.off('INIT')
    this.socket.off('UPDATE_PLAYER')
    this.socket.off('UPDATE_COUNT')
    this.socket.off('GAME_START')
  }

  notify(message) {
    const toast = this.state.toast
    toast.push(message)
    this.setState({toast: toast})
  }

  render() {
    return (
      <div className="App">
        <Contents title='プレイヤー'>
          <Row>
            {this.state&&this.state.players.map((player,idx) => {
              return (
                <Player 
                  key={idx}
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
          <ButtonArea socket={this.socket} name={this.state.name} />
        </Contents>
        {this.state.toast&&this.state.toast.map((message,idx) => {
          return <MessageToast key={idx} message={message} show={true} />
        })}
      </div>
    );
  }
}

export default App;
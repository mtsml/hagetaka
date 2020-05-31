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
      name: null,
      point: 0,
      players: props.players,
      toast: []
    }
  }

  componentDidMount() {
    this.socket.on('INIT', (data) => {
      console.log('INIT')
      this.notifyAddPlayer(data.name)
      this.setState({players: data.players, name: data.name})
    })
    this.socket.on('UPDATE_PLAYER', (data) => { 
      console.log('UPDATE_PLAYER')
      this.setState({players: data.players})
    })
    this.socket.on('UPDATE_COUNT', (data) => { 
      console.log('UPDATE_COUNT')
      console.log(data)
      this.setState({point: data})
    })
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
          <ButtonArea socket={this.socket} />
        </Contents>
        {this.state.toast&&this.state.toast.map((name,idx) => {
          return <MessageToast key={idx} name={name} show={true} />
        })}
      </div>
    );
  }
}

export default App;
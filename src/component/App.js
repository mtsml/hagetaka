import React from 'react';
import io from "socket.io-client";
import { Row } from 'react-bootstrap'
import ButtonArea from './ButtonArea.js'
import Contents from './Contents.js'
import Player from './Player.js'
import Point from './Point.js'
import './../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io('localhost:8080');

    this.state = {
      point: 1,
      players: [
        {name: "hoge", hand: 1, point: 2, color: 'primary'},
        {name: "fuga", hand: 2, point: 4, color: 'secondary'},
        {name: "foo", hand: 3, point: 6, color: 'success'},
        {name: "bar", hand: 4, point: 8, color: 'danger'},
        {name: "baz", hand: 5, point: 10, color: 'warning'}
      ]
    }
  }

  componentDidMount() {
    this.socket.on('RECEIVE_MESSAGE', function(data){ 
      console.log('receive')
    })
    this.socket.on('UPDATE_COUNT', (data) => { 
      console.log('update')
      console.log(data)
      this.setState({point: data})
    })
  }

  sendMessage() {
    console.log('send message')
    this.socket.emit('SEND_MESSAGE', {
    });
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
      </div>
    );
  }
}

export default App;

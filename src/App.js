import React from 'react';
import './App.css';
import ButtonArea from './ButtonArea.js'
import Contents from './Contents.js'
import Point from './Point.js'
import Player from './Player.js'
import { Row } from 'react-bootstrap'

const App = () => {
  const players = [
    {name: "hoge", hand: 1, point: 2, color: 'primary'},
    {name: "fuga", hand: 2, point: 4, color: 'secondary'},
    {name: "foo", hand: 3, point: 6, color: 'success'},
    {name: "bar", hand: 4, point: 8, color: 'danger'},
    {name: "baz", hand: 5, point: 10, color: 'warning'}
  ]
  return (
    <div className="App">
      <Contents title='プレイヤー'>
        <Row>
          {players.map(player => {
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
        <Point point='15' />
      </Contents>
      <Contents title='手札'>
        <ButtonArea />
      </Contents>
    </div>
  );
}

export default App;

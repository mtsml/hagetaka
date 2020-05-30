import React from 'react';
import './App.css';
import ButtonArea from './ButtonArea.js'
import Contents from './Contents.js'
import Hand from './Hand.js'
import Point from './Point.js'

const App = () => {
  const players = [
    {name: "hoge", hand: 1},
    {name: "fuga", hand: 2},
    {name: "foo", hand: 3},
    {name: "bar", hand: 4},
    {name: "baz", hand: 5}
  ]
  return (
    <div className="App">
      <Contents title='プレイヤー'>
        {players.map(player => {
          return (
            <Hand text={player.name} />
          )
        })}
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

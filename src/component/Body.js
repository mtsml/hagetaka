import React, { useContext } from 'react'
import { MDBListGroup } from 'mdbreact'
import { Store } from '../store/index'
import Player from './Player.js'


const Body = () => {
    const {state} = useContext(Store)

    return (
        <MDBListGroup>
            {state.players.map((player, idx) => {
                return (
                    <Player
                        key={idx}
                        name={player.name}
                        point={player.point}
                        color={player.color}
                        hand={player.hand}
                        butting={player.butting}
                    />
                )
            })}
        </MDBListGroup>
    )    
}

export default Body
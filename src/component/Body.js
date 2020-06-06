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
                        hand={player.hand}
                        color={player.color}
                    />
                )
            })}
        </MDBListGroup>
    )    
}

export default Body
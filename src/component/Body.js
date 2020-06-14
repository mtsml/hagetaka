import React, { useContext } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBListGroup } from 'mdbreact'
import { Store } from '../store/index'
import Player from './Player.js'


const Body = () => {
    const {state} = useContext(Store)

    return (
        <MDBContainer>
            <MDBRow center>
                <MDBCol md='6' className='px-0'>
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
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )    
}

export default Body
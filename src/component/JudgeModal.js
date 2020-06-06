import React, { useContext, useEffect, useState } from 'react'
import { Button, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,
    MDBListGroup
} from 'mdbreact'
import { Store } from '../store/index'
import { endGame } from '../util/util'
import Player from './Player'


const JudgeModal = () => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [lastGame, setLastGame] = useState(false)
    const {state, dispatch} = useContext(Store)

    const nextTurn = () => {
        setShow(false)
        state.socket.emit('NEXT_TURN')
    }

    useEffect(() => {
        state.socket.on('JUDGE', (data) => {
            console.log(data)
            dispatch({ type: 'UPDATE', data })
            setMessage(data.message)
            setLastGame(data.lastGame)
            setShow(true)
        })
        return () => {
            state.socket.off('JUDGE')
        }},[]
    )

    return (
        <MDBModal isOpen={show}>
            <MDBModalHeader>
                {message}
            </MDBModalHeader>

            <MDBModalBody>
                <MDBListGroup>
                    {[...state.players].sort((a, b) => { 
                        if (a.point > b.point) return -1
                        if (a.point < b.point) return 1
                        return 0
                    })
                    .map((player, idx) => {
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
            </MDBModalBody>

            <MDBModalFooter>
                {
                    lastGame ? 
                        <Button color='primary' onClick={() => endGame(state)}>ゲーム終了</Button>
                        :<Button color='primary' onClick={() => nextTurn()}>次のターンへ</Button>
                }
            </MDBModalFooter>
        </MDBModal>
    )
}

export default JudgeModal
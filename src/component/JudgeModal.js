import React, { useContext, useEffect, useState } from 'react'
import { Button, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact'
import { Store } from '../store/index'
import { endGame } from '../util/util'

const JudgeModal = () => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [lastGame, setLastGame] = useState(false)
    const {state} = useContext(Store)

    const nextTurn = () => {
        setShow(false)
        state.socket.emit('NEXT_TURN')
    }

    useEffect(() => {
        state.socket.on('JUDGE', (data) => {
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
                ジャッジ
            </MDBModalHeader>

            <MDBModalBody>
                {message}
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
import React, { useContext, useEffect, useState } from 'react'
import { Button, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'
import { Store } from '../store/index'
import { login, endGame } from '../util/util'
import { version } from '../util/const'


const LoginModal = () => {
    const [name, setName] = useState(null)
    const [room, setRoom] = useState(null)
    const [message, setMessage] = useState(null)
    const {state} = useContext(Store)

    useEffect(() => {
        state.socket.on('LOGIN_FAILED', (data) => {
            setMessage(data.message)
        })
        return () => state.socket.off('LOGIN_FAILED')
        },[]
    )

    return (
        <MDBModal isOpen={true}>
            <MDBModalHeader>
                ログイン
            </MDBModalHeader>

            <MDBModalBody>
                <MDBInput label="name" icon='user' onChange={(e) => setName(e.target.value)} />
                <MDBInput label="room" icon='users' onChange={(e) => setRoom(e.target.value)} />
                {message&&<p>{message}</p>}
            </MDBModalBody>

            <MDBModalFooter>
                <span>ver{version}</span>
                <Button color='mdb-color' onClick={() => endGame(state)}>強制ゲーム終了</Button>
                <Button color='mdb-color' onClick={() => login(state, name, room)}>入室</Button>
            </MDBModalFooter>
        </MDBModal>
    )    
}

export default LoginModal
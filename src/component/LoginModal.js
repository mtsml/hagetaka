import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'
import { Store } from '../store/index'
import { login, endGame } from '../util/util'

const version = '1.0.0'

const LoginModal = () => {
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)
    const {state} = useContext(Store)

    const onChange = (e) => setName(e.target.value)

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
                名前を入力してください
            </MDBModalHeader>

            <MDBModalBody>
                <Input area-label="名前" onChange={onChange} />
                {message&&<p>{message}</p>}
            </MDBModalBody>

            <MDBModalFooter>
                ver{version}
                <Button color="primary" onClick={() => endGame(state)}>強制ゲーム終了</Button>
                <Button color="primary" onClick={() => login(state, name)}>確定</Button>
            </MDBModalFooter>
        </MDBModal>
    )    
}

export default LoginModal
import React, { useState } from 'react'
import { Button, Input, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

const InputModal = (props) => {
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)

    const onChange = (e) => setName(e.target.value)

    const submit = ()  => {
        props.socket.emit('INIT', name)
    }    
    
    const endGame = () => {
        props.socket.emit('GAME_END')
    }

    props.socket.on('INIT_FAILED', (data) => {
        setMessage(data.message)
    })

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
                <Button color="primary" onClick={endGame}>強制ゲーム終了</Button>
                <Button color="primary" onClick={submit}>確定</Button>
            </MDBModalFooter>
        </MDBModal>
    )    
}

export default InputModal
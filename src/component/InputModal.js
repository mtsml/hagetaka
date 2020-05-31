import React, { useState } from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap'

const InputModal = (props) => {
    const [show, setShow] = useState(true)
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)

    const handleClose = () => setShow(false)
    const onChange = (e) => setName(e.target.value)

    const submit = ()  => {
        props.socket.emit('INIT', name)
    }    
    
    props.socket.on('INIT', (data) => {
        handleClose()        
    })
    props.socket.on('INIT_FAILED', (data) => {
        setMessage(data.message)
    })

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>名前を入力してください</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormControl area-label="名前" onChange={onChange} />
                {message&&<p>{message}</p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={submit}>確定</Button>
            </Modal.Footer>
        </Modal>
    )    
}

export default InputModal
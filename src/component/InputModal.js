import React, { useState } from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap'

const InputModal = (props) => {
    const [show, setShow] = useState(true)
    const [name, setName] = useState(null)

    const handleClose = () => setShow(false)
    const submit = () => {
        props.onClick(name)
        handleClose()
    }
    const onChange = (e) => setName(e.target.value)

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>名前を入力してください</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormControl area-label="名前" onChange={onChange} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={submit}>確定</Button>
            </Modal.Footer>
        </Modal>
    )    
}

export default InputModal
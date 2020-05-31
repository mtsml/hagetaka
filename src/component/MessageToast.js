import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

const MessageToast = (props) => {
    const [show, setShow] = useState(props.show);
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
            <strong className="mr-auto">Information</strong>
            <small>いま</small>
            </Toast.Header>
            <Toast.Body>{props.name}さんが入室しました。</Toast.Body>
        </Toast>
    )
}

export default MessageToast
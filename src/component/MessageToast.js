import React, { useState } from 'react'
import { MDBNotification } from 'mdbreact'

const MessageToast = (props) => {
    const [show, setShow] = useState(props.show);
    return (
        <MDBNotification 
            onClose={() => setShow(false)} 
            show={show}  
            autohide={3000}
            message={props.message}
        />
    )
}

export default MessageToast
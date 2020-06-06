import React, { useState } from 'react'
import { MDBNotification } from 'mdbreact'


const Notification = (props) => {
    const [show, setShow] = useState(props.show);

    return (
        <MDBNotification 
            onClose={() => setShow(false)} 
            show={show}
            icon='info-circle'
            autohide={3000}
            title='Information'
            message={props.message}
        />
    )
}

export default Notification
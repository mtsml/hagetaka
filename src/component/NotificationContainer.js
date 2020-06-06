import React, { useContext, useEffect, useState } from 'react'
import { MDBContainer } from 'mdbreact'
import { Store } from '../store/index'
import Notification from './Notification'


const NotificationContainer = () => {
    const [toast, setToast] = useState([])
    const {state} = useContext(Store)

    const addToast = (message) => {
        const newToast = toast?toast:[]
        newToast.push(message)
        setToast(newToast)
    }

    useEffect(() => {
        state.socket.on('NOTIFY', (data) => {
            console.log('NOTIFY')
            addToast(data.message)
        })
        return () => state.socket.off('NOTIFY')
        },[]
    )
    
    return (
        <MDBContainer
            style={{
            width: "auto",
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999
            }}
        >
            {toast && toast.map((message, idx) => {
                return <Notification key={idx} message={message} show={true} />
            })}
        </MDBContainer>
    )    
}

export default NotificationContainer
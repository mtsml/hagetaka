import React, { useContext, useEffect, useState } from 'react'
import { Button, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact'
import Hand from './Hand.js'
import { Store } from '../store/index'
import '../css/InputModal.css'


const InputModal = () => {
    const {state, dispatch} = useContext(Store)
    const [message, setMessage] = useState('')
    const [hand, setHand] = useState(1)
    const [show, setShow] = useState(false)
    
    const sendHand = () => {
        setShow(false)
        dispatch({ type: 'SET_HAND', data: {hand}})
        state.socket.emit('SEND_HAND', hand)
    }

    useEffect(() => {
        state.socket.on('NEXT_TURN', (data) => {
            setMessage(data.message)
            setShow(true)
        })            
        return () => {
            state.socket.off('NEXT_TURN')
        }},[]
    )

    return (
        <MDBModal className='fixed-bottom' isOpen={show}>
            <MDBModalHeader>
                {message}
                <Button color="mdb-color" onClick={() => sendHand()}>確定</Button>
            </MDBModalHeader>

            <MDBModalBody>
                {[1,2,3].map((i => {
                    return (
                        <div className='input'>
                            {state.hands.filter(h => h.hand > 5*(i-1) && h.hand <= 5*i).map(h => {
                                return (
                                    <Hand
                                        className='input-button waves-effect'
                                        text={h.hand}
                                        color='mdb-color'
                                        disabled={h.used}
                                        outline={!(hand===h.hand)&&!h.used}
                                        onClick={!h.used&&(() => setHand(h.hand))}
                                    />
                                )
                            })}
                        </div>
                    )
                }))}
            </MDBModalBody>
        </MDBModal>
    )
}

export default InputModal
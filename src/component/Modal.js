import React, { useContext, useState } from 'react'
import { Button, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact'
import { Store } from '../store/index'
import '../css/Modal.css'

const　Modal = () => {
    const {state} = useContext(Store)
    const [show, setShow] = useState(true)

    const toggleModal = () => {
        setShow(false)
    }

    const rank = state.players.find(player => player.id === state.socket.id).rank

    return (
        <MDBModal isOpen={show} id='modal'>
            <MDBModalHeader id='modal-header'>
                あなたは<strong>{rank}位</strong>でした{rank<4?'！':'…'}
            </MDBModalHeader>

            <MDBModalBody id='modal-body'>
                {rank<4?
                    <MDBIcon size='5x' icon='trophy' className={rank===1?'amber-text':rank===2?'grey-text':'brown-text'} />:
                    <MDBIcon size='5x' icon='tired' />
                }
                <br />
            </MDBModalBody>

            <MDBModalFooter id='modal-footer'>
                <Button color='mdb-color' onClick={toggleModal} >閉じる</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}

export default Modal
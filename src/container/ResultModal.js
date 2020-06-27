import React, { useContext, useState } from 'react'
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact'
import Button from '../component/Button'
import { Store } from '../store/index'
import { getResultMessage, getRank } from '../util/util'

const ResultModal = () => {
    const {state} = useContext(Store)
    const [show, setShow] = useState(true)

    const toggleModal = () => {
        setShow(false)
    }
    
    const rank = getRank(state)

    return (
        <MDBModal isOpen={show} className='hmodal'>
            <MDBModalHeader className='hrow'>
                <h1 className='message'>{getResultMessage(state)}</h1>
            </MDBModalHeader>

            <MDBModalBody className='hrow'>
                {rank<4?
                    <MDBIcon size='5x' icon='trophy' className={`rank${rank}`} />:
                    <MDBIcon size='5x' icon='tired' />
                }
                <br />
            </MDBModalBody>

            <MDBModalFooter className='hrow'>
                <Button onClick={toggleModal}>閉じる</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}

export default ResultModal
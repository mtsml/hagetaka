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
        <MDBModal isOpen={show} className='h-modal'>
            <MDBModalHeader className='h-row'>
                <h1 className='h-message'>{getResultMessage(state)}</h1>
            </MDBModalHeader>

            <MDBModalBody className='h-row'>
                {rank<4?
                    <MDBIcon size='5x' icon='trophy' className={`h-rank${rank}`} />:
                    <MDBIcon size='5x' icon='tired' />
                }
                <br />
            </MDBModalBody>

            <MDBModalFooter className='h-row'>
                <Button onClick={toggleModal}>閉じる</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}

export default ResultModal
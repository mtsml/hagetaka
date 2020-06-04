import React, { useState } from 'react'
import { Row, Col, Button, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'
import Hand from './Hand.js'
import Point from './Point.js'

const MessageModal = (props) => {
    const [title, setTitle] = useState('')
    const [hand, setHand] = useState(1)
    const [show, setShow] = useState(false)
    const [point, setPoint] = useState(0)
    const sendHand = () => {
        setShow(false)
        props.socket.emit('SEND_HAND', hand)
    }

    props.socket.on('GAME_START', (data) => {
        setTitle(data.title)
        setShow(true)
        setPoint(data.point)
    })

    return (
        <MDBModal isOpen={show}>
            <MDBModalHeader>
                {title}　得点カード
                <Point point={point} />
            </MDBModalHeader>

            <MDBModalBody>
                {[1, 2, 3].map(i => {
                    return (
                        <Row key={i} className="justify-content-md-center">
                            {[1, 2, 3, 4, 5].map(j => {
                                let val = (i - 1) * 5 + j
                                return (
                                    <Col key={val}>
                                        <Hand
                                            text={val}
                                            color="primary"
                                            onClick={() => setHand(val)}
                                        />
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    )
                })}
            </MDBModalBody>

            <MDBModalFooter>
                <Button color="primary" onClick={() => sendHand()}>確定</Button>
            </MDBModalFooter>
        </MDBModal>
    )
}

export default MessageModal
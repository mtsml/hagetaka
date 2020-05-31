import React from 'react';
import { Col, Row } from 'react-bootstrap'
import Hand from './Hand.js'

const ButtonArea = (props) => {
    const sendHand = (hand) => {
        props.socket.emit('SEND_HAND', hand)
    }

    return (
        <React.Fragment>
            {[1,2,3].map(i => {
                return (
                <Row className="justify-content-md-center">
                    {[1,2,3,4,5].map(j => {
                        let val = (i-1)*5+j
                        return (
                            <Col sm={1}>
                                <Hand 
                                    text={val} 
                                    color="primary" 
                                    onClick={() => sendHand(val)}
                                />
                            </Col>
                        )
                    })
                    }
                </Row>
                )
            })}
        </React.Fragment>
    )
}

export default ButtonArea;
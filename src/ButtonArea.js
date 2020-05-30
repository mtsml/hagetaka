import React from 'react';
import { Col, Row } from 'react-bootstrap'
import Hand from './Hand.js'

const ButtonArea = () => {
    return (
        <React.Fragment>
            {[1,2,3].map(i => {
                return (
                <Row className="justify-content-md-center">
                    {[1,2,3,4,5].map(j => {
                        return (
                            <Col sm={1}>
                                <Hand text={i*j} color="primary" />
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
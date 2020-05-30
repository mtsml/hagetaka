import React from 'react'
import { Card, Col } from 'react-bootstrap'
import Hand from './Hand.js'

const Player = (props) => {
    return (
        <Col>
            <Card border={props.color}>
                <Card.Header>{props.name}さん {props.point}ポイント</Card.Header>
                <Card.Body>
                    <Hand text={props.hand} color={props.color}/>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Player
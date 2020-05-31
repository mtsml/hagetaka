import React from 'react';
import { Button, Col, Row } from 'react-bootstrap'
import Hand from './Hand.js'

const ButtonArea = (props) => {
    const sendHand = (hand) => {
        props.socket.emit('SEND_HAND', hand)
    }
    const gameStart = () => {
        props.socket.emit('GAME_START')
    }
    const gameEnd = () => {
        props.socket.emit('GAME_END')
    }
    const logout = () => {
        props.socket.emit('LOGOUT', props.name)
    }

    return (
        <React.Fragment>
            {[1,2,3].map(i => {
                return (
                <Row key={i} className="justify-content-md-center">
                    {[1,2,3,4,5].map(j => {
                        let val = (i-1)*5+j
                        return (
                            <Col key={val} sm={1}>
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
            <Row>
                <Col>
                  <Button onClick={() => logout()}>退出</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => gameStart()}>ゲーム開始</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => gameEnd()}>ゲーム終了</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ButtonArea;
import React, { useState } from 'react';
import { Button, Col, Row } from 'mdbreact'

const Footer = (props) => {
    const [buttonMessage, setButtonMessage] = useState('ゲーム開始')
    const gameStart = () => {
        setButtonMessage('次のターン')
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
            <Row>
                <Col>
                    <Button color="primary" onClick={() => logout()}>退出</Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => gameStart()}>{buttonMessage}</Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => gameEnd()}>ゲーム終了</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Footer;
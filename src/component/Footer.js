import React, { useContext, useState } from 'react';
import { Button, Col, Row, MDBCardFooter } from 'mdbreact'
import { logout, startGame, endGame } from '../util/util'
import { Store } from '../store/index'


const Footer = () => {
    const [buttonMessage, setButtonMessage] = useState('ゲーム開始')
    const {state} = useContext(Store)

    return (
        <div className="fixed-bottom">
            <MDBCardFooter>
                <Row>
                    <Col>
                        <Button color="primary" onClick={() => logout(state)}>退出</Button>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={() => startGame(state)}>{buttonMessage}</Button>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={() => endGame(state)}>ゲーム終了</Button>
                    </Col>
                </Row>
            </MDBCardFooter>
        </div>
    )
}

export default Footer;
import React from 'react'
import { Image } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Point = (props) => {
    const socket = props.socket
    const png = require('./../image/1.png') 
    const countUp = () => {
        socket.emit('COUNT_UP', {
        });
    }

    return (
        // <Image src={png} />
    <Button onClick={() => countUp()}>{props.point}</Button>
    )
}

export default Point
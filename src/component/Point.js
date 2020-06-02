import React from 'react'
// import { Image } from 'react-bootstrap'
import { Button } from 'mdbreact'

const Point = (props) => {
    const socket = props.socket
    // const png = require('./../image/1.png') 
    const countUp = () => {
        socket.emit('COUNT_UP', {
        });
    }

    return (
        // <Image src={png} />
    <Button color='primary' onClick={() => countUp()}>{props.point}</Button>
    )
}

export default Point
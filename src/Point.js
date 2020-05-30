import React from 'react'
import { Image } from 'react-bootstrap'

const Point = (props) => {
    const png = require('./1.png') 
    return (
        <Image src={png} />
    )
}

export default Point
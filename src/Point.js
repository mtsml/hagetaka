import React from 'react'
import { Button } from 'react-bootstrap'

const Point = (props) => {
    return (
    <Button size="lg">{props.point}</Button>
    )
}

export default Point
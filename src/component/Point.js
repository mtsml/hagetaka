import React from 'react'
import { Button } from 'mdbreact'

const Point = (props) => {
    return (
        <Button color='primary'>{props.point}</Button>
    )
}

export default Point
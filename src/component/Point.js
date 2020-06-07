import React from 'react'
import { Button } from 'mdbreact'

const Point = (props) => {
    return (
        <Button 
            color={props.color||'primary'}
        >
            {props.point}
        </Button>
    )
}

export default Point
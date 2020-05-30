import React from 'react';
import { Button } from 'react-bootstrap'

const Hand = (props) => {
    return (
        <Button variant={props.color} onClick={props.onClick}>
            {props.text}
        </Button>
    )
}

export default Hand
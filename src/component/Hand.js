import React from 'react';
import { Button } from 'mdbreact'

const Hand = (props) => {
    return (
        <Button color={props.color} onClick={props.onClick}>
            {props.text}
        </Button>
    )
}

export default Hand
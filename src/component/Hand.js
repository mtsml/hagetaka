import React from 'react';
import { Button } from 'mdbreact'

const Hand = (props) => {
    return (
        <Button 
            color={props.color} 
            onClick={props.onClick}
            disabled={props.disabled||false}
            outline={props.outline||false}
        >
            {props.text}
        </Button>
    )
}

export default Hand
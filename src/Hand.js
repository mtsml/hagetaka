import React from 'react';
import { Button } from 'react-bootstrap'

const Hand = (props) => {
    return (
        <Button>
            {props.text}
        </Button>
    )
}

export default Hand
import React from 'react';
import { Button } from 'mdbreact'
import { THEME_COLOR } from '../util/const'

const Hand = (props) => {
    return (
        <Button 
            className='h-hand waves-effect'
            color={THEME_COLOR} 
            onClick={props.onClick}
            disabled={props.disabled||false}
            outline={props.outline||false}
        >
            {props.text}
        </Button>
    )
}

export default Hand
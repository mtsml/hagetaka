import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit'
import { THEME_COLOR } from '../util/const'

const Hand = (props) => {
    return (
        <MDBBtn 
            className='h-hand waves-effect'
            color={THEME_COLOR} 
            onClick={props.onClick}
            disabled={props.disabled||false}
            outline={props.outline||false}
        >
            {props.text}
        </MDBBtn>
    )
}

export default Hand
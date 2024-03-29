import React from 'react'
import { MDBBtn } from 'mdb-react-ui-kit'
import { THEME_COLOR } from '../util/const'

const Button = (props) => {
    return (
        <MDBBtn 
            disabled={props.disabled}
            className='mt-2 h-btn'
            color={props.color||THEME_COLOR}
            onClick={props.onClick}
        >
            {props.children}
        </MDBBtn>
    )
}

export default Button
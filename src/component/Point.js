import React from 'react'
import { MDBIcon } from 'mdbreact'

const Point = (props) => {
    return (
        <MDBIcon 
            className={props.className}
            icon='dollar-sign'
            size={props.size}
        >
            {props.point}
        </MDBIcon>
    )
}

export default Point
import React from 'react'
import { MDBInput } from 'mdbreact'

const Input = (props) => {
    return (
        <MDBInput 
            id={props.id}
            className='mt-2 h-input'
            label={props.label}
            onChange={props.onChange}
            type='text'
        />
    )
}

export default Input
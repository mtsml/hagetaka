import React, { useContext, useEffect } from 'react'
import { MDBContainer, MDBInput, MDBRow, MDBCol } from 'mdbreact'
import { Store } from '../store/index'

const Login = () => {
    const {state, dispatch} = useContext(Store)

    useEffect(() => {
        state.socket.on('LOGIN_FAILED', (data) => {
            dispatch({
                type: 'SET_STATE',
                data: {
                    key: 'message',
                    value: data.message
                }
            })
        })
        return () => state.socket.off('LOGIN_FAILED')
        },[]
    )

    const handleChange = (e) => {
        dispatch({
            type: 'SET_STATE',
            data: {
                key: e.target.id,
                value: e.target.value
            }
        })
    } 

    return (
        <MDBContainer>
            <MDBRow center>
                <MDBCol md='6'>
                    <MDBInput id='name' label="name" icon='user' onChange={(e) => handleChange(e)} />
                    <MDBInput id='room' label="room" icon='users' onChange={(e) => handleChange(e)} />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )    
}

export default Login
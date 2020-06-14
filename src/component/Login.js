import React, { useContext } from 'react'
import { MDBContainer, MDBInput, MDBRow, MDBCol } from 'mdbreact'
import { Store } from '../store/index'

const Login = () => {
    const {dispatch} = useContext(Store)

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
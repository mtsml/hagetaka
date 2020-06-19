import React, { useContext } from 'react'
import { Button, MDBContainer, MDBInput, MDBRow, MDBCol } from 'mdbreact'
import { Store } from '../store/index'
import '../css/Login.css'

const Login = () => {
    const {state, dispatch} = useContext(Store)

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
        <div id='container'>
            <div id='wrapper'>
                <img id='logo' src='./favicon.ico' width="100px" height="100px"/>
                <h1 id='message'>{state.message}</h1>
                <MDBInput id='input' label="name" onChange={(e) => handleChange(e)} />
                <MDBInput id='input' label="room" onChange={(e) => handleChange(e)} />
                <Button id='submit' color='mdb-color'>入室</Button>
            </div>
        </div>
    )    
}

export default Login
import React, { useContext, useEffect } from 'react'
import App from './App.js'
import LoginModal from './LoginModal'
import { Store } from '../store/index'


const Router = () => {
    const {state, dispatch} = useContext(Store)

    const socketOn = () => {
        state.socket.on('LOGIN', (data) => {console.log('LOGIN');dispatch({ type: 'LOGIN', data})})
        state.socket.on('LOGOUT', () => {console.log('LOGOUT');dispatch({ type: 'LOGOUT' })})
        state.socket.on('UPDATE', (data) => {console.log('UPDATE');dispatch({ type: 'UPDATE', data })})
    }

    const socketOff = () => {
        state.socket.off('LOGIN')
        state.socket.off('LOGOUT')
        state.socket.off('UPDATE')
    }

    useEffect(() => {
        socketOn()
        return () => socketOff
        },[]
    )

    return (
        state.login?<App />:<LoginModal />
    )
}

export default Router
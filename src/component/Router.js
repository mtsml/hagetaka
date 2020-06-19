import React, { useContext, useEffect } from 'react'
import Body from './Body.js'
import Footer from './Footer'
import Header from './Header'
import Input from './Input'
import Login from './Login'
import Modal from './Modal'
import { Store } from '../store/index'
import { proc } from '../util/const'

const Router = () => {
    const {state, dispatch} = useContext(Store)

    const socketOn = () => {
        state.socket.on('LOGIN', (data) => {
            console.log('LOGIN')
            dispatch({ type: 'LOGIN', data})
        })
        state.socket.on('LOGIN_FAILED', (data) => {
            console.log('LOGIN_FAILED')
            dispatch({ type: 'SET_STATE', data: {key: 'message', value: data.message}})
        })
        state.socket.on('LOGOUT', () => {
            console.log('LOGOUT')
            dispatch({ type: 'LOGOUT' })
        })
        state.socket.on('UPDATE', (data) => {
            console.log('UPDATE')
            dispatch({ type: 'SET_STATE', data: {key: 'players', value: data.players}})
        })
        state.socket.on('NEXT_TURN', (data) => {
            console.log('NEXT_TURN')
            dispatch({ type: 'NEXT_TURN', data})
        })
        state.socket.on('JUDGE', (data) => {
            console.log('JUDGE')
            dispatch({ type: 'SET_STATE', data: {key: 'players', value: data.players} })
            dispatch({ type: 'SET_STATE', data: {key: 'message', value: data.message} })
            dispatch({ type: 'SET_STATE', data: {key: 'proc', value: data.lastGame?proc.end:proc.result} })
            dispatch({ type: 'SET_STATE', data: {key: 'wait', value: false} })
        })
    }

    const socketOff = () => {
        state.socket.off('LOGIN')
        state.socket.off('LOGIN_FAILED')
        state.socket.off('LOGOUT')
        state.socket.off('UPDATE')
        state.socket.off('NEXT_TURN')
        state.socket.off('JUDGE')
    }

    useEffect(() => {
        socketOn()
        return () => socketOff
        },[]
    )

    return (
        <>
            {
                state.proc===proc.login?<Login />:
                <>
                    <Header />
                        {state.proc===proc.input?<Input />:
                        state.proc===proc.end?<><Body /><Modal /></>:<Body />}
                    <Footer />
                </>
            }
        </>
    )
}

export default Router
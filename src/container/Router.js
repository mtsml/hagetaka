import React, { useContext, useEffect } from 'react'
import Footer from './Footer'
import HandBox from './HandBox'
import Header from './Header'
import Login from './Login'
import PlayerTable from './PlayerTable.js'
import ResultModal from './ResultModal'
import { Store } from '../store/index'
import { PROC } from '../util/const'

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
            console.log('JUDGE', data, state)
            dispatch({ type: 'SET_STATE', data: {key: 'players', value: data.players} })
            dispatch({ type: 'SET_STATE', data: {key: 'id', value: data.id} })
            dispatch({ type: 'SET_STATE', data: {key: 'message', value: data.message} })
            dispatch({ type: 'SET_STATE', data: {key: 'proc', value: data.lastGame?PROC.RESULT:PROC.JUDGE} })
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
            {state.proc===PROC.LOGIN?
                <Login />:
                <>
                    <Header />
                        {state.proc===PROC.INPUT?
                            <HandBox />:
                            state.proc===PROC.RESULT?
                                <><PlayerTable /><ResultModal /></>:
                                <PlayerTable />
                        }
                    <Footer />
                </>
            }
        </>
    )
}

export default Router
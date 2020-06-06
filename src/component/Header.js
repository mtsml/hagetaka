import React, { useContext, useEffect, useState } from 'react'
import { MDBCardHeader } from 'mdbreact'
import Point from './Point.js'
import { Store } from '../store/index'


const Header = () => {
    const [headerMessage, setHeaderMessage] = useState('待機中')
    const {state, dispatch} = useContext(Store)

    useEffect(() => {
        state.socket.on('GAME_START', (data) => {
            console.log('GAME_START')
            setHeaderMessage(data.title)
            dispatch({ type: 'GAME_START', data })
        })
        return () => state.socket.off('GAME_START')
        },[]
    )

    return (
        <MDBCardHeader>
            {headerMessage}　得点カード
            <Point point={state.point}/>
        </MDBCardHeader>
    )    
}

export default Header
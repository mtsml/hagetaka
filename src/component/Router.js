import React, { useState } from 'react'
import App from './App.js'
import InputModal from './InputModal.js'

const Router = (props) => {
    const [login, setLogin] = useState(false)
    const [players, setPlayers] = useState([])

    props.socket.on('LOGIN', (data) => {
        setPlayers(data.players)
        setLogin(true)
    })
    return (
        login?<App socket={props.socket} players={players}/>:<InputModal socket={props.socket} />
    )
}

export default Router
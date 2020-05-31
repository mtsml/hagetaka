import React, { useState } from 'react'
import App from './App.js'
import InputModal from './InputModal.js'

const Router = (props) => {
    const [login, setLogin] = useState(false)
    const [players, setPlayers] = useState([])
    const [name, setName] = useState(null)
    const logout = () => {
        setPlayers([])
        setName(null)
        setLogin(false)
    }

    props.socket.on('LOGIN', (data) => {
        setPlayers(data.players)
        setName(data.name)
        setLogin(true)
    })
    props.socket.on('LOGOUT', (data) => {
        logout()
    })
    props.socket.on('GAME_END', (data) => { 
        logout()
    })

    return (
        login?<App socket={props.socket} name={name} players={players}/>:<InputModal socket={props.socket} />
    )
}

export default Router
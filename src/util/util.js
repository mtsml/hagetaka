import { localHost, host, port } from './const'


export const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        return host + ':' + port
    } else {
        return localHost + ':' + port
    }
}

export const login = (state, name, room)  => {
    state.socket.emit('LOGIN', {name, room})
}    

export const logout = (state) => {
    state.socket.emit('LOGOUT', {
        name: state.name, 
        room: state.room
    })
}

export const startGame = (state) => {
    state.socket.emit('GAME_START', {
        room: state.room
    })
}
import { localHost, host, port } from './const'


export const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        return host + ':' + port
    } else {
        return localHost + ':' + port
    }
}

export const login = (state, name)  => {
    state.socket.emit('LOGIN', name)
}    

export const logout = (state) => {
    state.socket.emit('LOGOUT', state.name)
}

export const startGame = (state) => {
    state.socket.emit('GAME_START')
}

export const endGame = (state) => {
    state.socket.emit('GAME_END')
}
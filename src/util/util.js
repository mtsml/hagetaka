import { LOCALHOST, HOST, PORT, PROC } from './const'

export const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        return HOST + ':' + PORT
    } else {
        return LOCALHOST + ':' + PORT
    }
}

export const isNull = (value) => {
    if (value === null || value === undefined || value === '') {
        return true
    } 
    return false
}

export const onGame = (proc) => {
    if (proc === PROC.INPUT || proc === PROC.JUDGE || proc === PROC.RESULT) {
        return true
    }
    return false
}

export const getResultMessage = (state) => {
    const player = state.players.find(player => player.id === state.socket.id)
    return `${player.point}P獲得で${player.rank}位でした${player.rank<4?'！':'…'}`
}

export const getRank = (state) => {
    return state.players.find(player => player.id === state.socket.id).rank
}
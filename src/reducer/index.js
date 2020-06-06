import { initialState } from '../store/index'

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                login : true,
                name: action.data.name
            }
        case 'GAME_START':
            return {
                ...state,
                point: action.data.point
            }
        case 'UPDATE':
            return {
                ...state,
                players: action.data.players
            }
        case 'LOGOUT':
            return initialState
        case 'GAME_END':
            return initialState
        default:
            return state
    }
}

export default reducer
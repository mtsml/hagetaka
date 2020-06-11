import { initialState } from '../store/index'

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                login : true,
                name: action.data.name,
                room: action.data.room
            }
        case 'NEXT_TURN':
            return {
                ...state,
                onGame: true,
                point: action.data.point
            }
        case 'UPDATE':
            return {
                ...state,
                players: action.data.players
            }
        case 'SET_HAND':
            const hands = state.hands.map(hand => {
                if (hand.hand === action.data.hand) {
                    return {...hand, used: true}
                } else {
                    return hand
                }
            })
            return {
                ...state,
                hands: hands
            }
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default reducer
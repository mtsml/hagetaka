import { initialState } from '../store/index'
import { proc } from '../util/const'

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                login : true,
                proc: proc.wait,
                players: action.data.players,
                message: action.data.message,
                name: action.data.name,
                room: action.data.room
            }
        case 'SET_STATE':
            return {
                ...state,
                [action.data.key]: action.data.value
            }
        case 'NEXT_TURN':
            return {
                ...state,
                proc: proc.input,
                point: action.data.point,
                cnt: action.data.cnt,
                message: action.data.message,
                wait: false
            }
        case 'SEND_HAND':
            const hands = state.hands.map(hand => {
                if (hand.hand === state.hand) {
                    return {...hand, used: true}
                } else {
                    return hand
                }
            })
            return {
                ...state,
                hand: 0,
                hands: hands,
                wait: true,
                message: '他のプレイヤーを待っています...'
            }
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default reducer
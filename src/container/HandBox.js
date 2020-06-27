import React, { useContext } from 'react'
import Hand from '../component/Hand.js'
import { Store } from '../store/index'

const Input = () => {
    const {state, dispatch} = useContext(Store)

    const handleClick = (hand) => {
        dispatch({
            type: 'SET_STATE',
            data: {
                key: 'hand',
                value: hand
            }
        })
    }    

    return (
        <div class='h-handbox'>
            {[1,2,3].map((i => {
                return (
                    <div className='h-handrow'>
                        {state.hands.filter(h => h.hand > 5*(i-1) && h.hand <= 5*i).map(h => {
                            return (
                                <Hand
                                    text={h.hand}
                                    disabled={h.used}
                                    outline={!(state.hand===h.hand)&&!h.used}
                                    onClick={!h.used&&(() => handleClick(h.hand))}
                                />
                            )
                        })}
                    </div>
                )
            }))}
        </div>
    )
}

export default Input
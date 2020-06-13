import React, { useContext } from 'react'
import { MDBContainer } from 'mdbreact'
import Hand from './Hand.js'
import { Store } from '../store/index'
import '../css/Input.css'

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
        <MDBContainer>
            {[1,2,3].map((i => {
                return (
                    <div className='input'>
                        {state.hands.filter(h => h.hand > 5*(i-1) && h.hand <= 5*i).map(h => {
                            return (
                                <Hand
                                    className='input-button waves-effect'
                                    text={h.hand}
                                    color='mdb-color'
                                    disabled={h.used}
                                    outline={!(state.hand===h.hand)&&!h.used}
                                    onClick={!h.used&&(() => handleClick(h.hand))}
                                />
                            )
                        })}
                    </div>
                )
            }))}
        </MDBContainer>
    )
}

export default Input
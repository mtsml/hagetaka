import React, { useContext } from 'react'
import Point from '../component/Point'
import { Store } from '../store/index'
import { onGame } from '../util/util'

const Header = () => {
    const {state} = useContext(Store)

    return (
        <header>
            {
                onGame(state.proc)&&
                    <div className='hrow'>
                        <span className='message'>ターン{state.cnt}</span>
                        <Point point={state.point}/>
                    </div>
            }
            <div className='hrow'>
                <h1 className='message'>{state.message}</h1>
            </div>
        </header>
    )    
}

export default Header
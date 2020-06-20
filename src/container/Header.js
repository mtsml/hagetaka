import React, { useContext } from 'react'
import Point from './Point.js'
import { Store } from '../store/index'
import { proc } from '../util/const'

const Header = () => {
    const {state} = useContext(Store)

    return (
        <header>
            <div className='hrow'>
                <h1 className='message'>{state.message}</h1>
                {(state.proc === proc.input || state.proc === proc.result || state.proc === proc.end)&&
                    <div id='header'>
                        <span id='cnt'>　{state.cnt}ターン目　</span>
                        <Point id='point' point={state.point} size='2x'/>
                    </div>
                }
            </div>
        </header>
    )    
}

export default Header
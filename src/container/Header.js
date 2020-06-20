import React, { useContext } from 'react'
import Point from '../component/Point'
import { Store } from '../store/index'
import { onGame } from '../util/util'

const Header = () => {
    const {state} = useContext(Store)

    return (
        <header>
            <div className='hrow'>
                <h1 className='message'>{onGame(state.proc)&&`ターン${state.cnt}:`}{state.message}</h1>
                {onGame(state.proc)&&<Point point={state.point}/>}
            </div>
        </header>
    )    
}

export default Header
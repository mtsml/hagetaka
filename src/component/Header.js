import React, { useContext } from 'react'
import { MDBCardHeader } from 'mdbreact';
import Point from './Point.js'
import { Store } from '../store/index'
import { proc } from '../util/const'
import '../css/Header.css'

const Header = () => {
    const {state} = useContext(Store)

    return (
        <MDBCardHeader>
            <div id='header'>
                <span id='message'>{state.message}</span>
                {(state.proc === proc.input || state.proc === proc.result) && <span id='cnt'>　{state.cnt}ターン目</span>}
            </div>
            <div id='point'>
                {(state.proc === proc.input || state.proc === proc.result) && <Point point={state.point} size='2x'/>}
            </div>
        </MDBCardHeader>
    )    
}

export default Header
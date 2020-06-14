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
            <span id='message'>{state.message}</span>
            {(state.proc === proc.input || state.proc === proc.result || state.proc === proc.end)&&
                <div id='header'>
                    <span id='cnt'>　{state.cnt}ターン目　</span>
                    <Point id='point' point={state.point} size='2x'/>
                </div>
            }
        </MDBCardHeader>
    )    
}

export default Header
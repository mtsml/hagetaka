import React, { useContext, useEffect, useState } from 'react'
import { MDBCardHeader } from 'mdbreact';
import Point from './Point.js'
import { Store } from '../store/index'
import { proc } from '../util/const'

const Header = () => {
    const {state} = useContext(Store)

    return (
        <MDBCardHeader>
            {state.message}
            {(state.proc === proc.input || state.proc === proc.resul) &&<Point point={state.point} color='mdb-color'/>}
        </MDBCardHeader>
    )    
}

export default Header
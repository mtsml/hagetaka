import React, { useContext, useEffect, useState } from 'react'
import {
    MDBIcon,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarBrand,
    MDBNavItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
  } from 'mdbreact';
import Point from './Point.js'
import { Store } from '../store/index'
import { logout, startGame, endGame } from '../util/util'


const Header = () => {
    const [headerMessage, setHeaderMessage] = useState('待機中')
    const {state, dispatch} = useContext(Store)

    useEffect(() => {
        state.socket.on('NEXT_TURN', (data) => {
            setHeaderMessage(data.title)
            dispatch({ type: 'NEXT_TURN', data })
        })
        return () => state.socket.off('NEXT_TURN')
        },[]
    )

    return (
        <MDBNavbar
            className='sticky-top pb-0'
            color=' blue-grey lighten-5'
            light
        >
            <MDBNavbarBrand>
                {headerMessage}
                {state.onGame&&<Point point={state.point} color='mdb-color'/>}
            </MDBNavbarBrand>

            <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav>
                            <MDBIcon icon='bars' size='2x'/>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu right>
                            <MDBDropdownItem
                                onClick={state.onGame?(() => endGame(state)):(() => startGame(state))}
                            >
                                {state.onGame?'ゲーム終了':'ゲーム開始'}
                            </MDBDropdownItem>
                            <MDBDropdownItem onClick={() => logout(state)}>退出</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem>
            </MDBNavbarNav>
        </MDBNavbar>
    )    
}

export default Header
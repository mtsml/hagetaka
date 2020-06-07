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
    const [open, setOpen] = useState(false)
    const [headerMessage, setHeaderMessage] = useState('待機中')
    const [buttonMessage, setButtonMessage] = useState('ゲーム開始')
    const {state, dispatch} = useContext(Store)

    useEffect(() => {
        state.socket.on('GAME_START', (data) => {
            console.log('GAME_START')
            setHeaderMessage(data.title)
            dispatch({ type: 'GAME_START', data })
        })
        return () => state.socket.off('GAME_START')
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
                <Point point={state.point} color='mdb-color'/>                    
            </MDBNavbarBrand>

            <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav>
                            <MDBIcon icon='bars' size='2x'/>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu right>
                            <MDBDropdownItem onClick={() => startGame(state)}>{buttonMessage}</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => logout(state)}>退出</MDBDropdownItem>
                            <MDBDropdownItem onClick={() => endGame(state)}>ゲーム終了</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem>
            </MDBNavbarNav>
        </MDBNavbar>
    )    
}

export default Header
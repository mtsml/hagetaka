import React, { createContext, useReducer } from 'react'
import io from "socket.io-client";
import { getHost } from '../util/util'
import reducer from '../reducer/index'
import { PROC, MSG_DEFAULT } from '../util/const'

const Store = createContext()
const socket = io(getHost());
const initialState = {
    socket: socket,
    name: null,
    room: null,
    wait: false,
    message: MSG_DEFAULT,
    cnt: 0,
    point: 0,
    carryPoint: 0,
    players: [],
    proc: PROC.LOGIN,
    hand: 0,
    hands: [
        {hand: 1, used: false},
        {hand: 2, used: false},
        {hand: 3, used: false},
        {hand: 4, used: false},
        {hand: 5, used: false},
        {hand: 6, used: false},
        {hand: 7, used: false},
        {hand: 8, used: false},
        {hand: 9, used: false},
        {hand: 10, used: false},
        {hand: 11, used: false},
        {hand: 12, used: false},
        {hand: 13, used: false},
        {hand: 14, used: false},
        {hand: 15, used: false}        
    ],
    id: null
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export { Store, Provider, initialState }
import React, { createContext, useReducer } from 'react'
import io from "socket.io-client";
import { getHost } from '../util/util'
import reducer from '../reducer/index'


const Store = createContext()
const socket = io(getHost());
const initialState = {
    socket: socket,
    name: null,
    point: 0,
    players: [],
    onGame: false,
    login: false
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export { Store, Provider, initialState }
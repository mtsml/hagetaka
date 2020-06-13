import React, { useContext } from 'react'
import { Button, MDBCardFooter, MDBIcon } from 'mdbreact'
import { Store } from '../store/index'
import { proc } from '../util/const'
import { isNull } from '../util/util'
import '../css/Footer.css'

const Footer = () => {
    const {state, dispatch} = useContext(Store)

    const login = ()  => {
        if (isNull(state.name)||isNull(state.room)) {
            dispatch({
                type: 'SET_STATE',
                data: {
                    key: 'message',
                    value: '名前とルームを入力してください'
                }
            })
        } else {
            state.socket.emit('LOGIN', {
                name: state.name, 
                room: state.room
            })
        }
    }        
    
    const logout = () => {
        state.socket.emit('LOGOUT', {
            name: state.name, 
            room: state.room
        })
    }
    
    const startGame = () => {
        dispatch({type: 'SET_STATE', data: {
            key: 'wait',
            value: true
        }})
        dispatch({type: 'SET_STATE', data: {
            key: 'message',
            value: '他のプレイヤーを待っています...'
        }})
        state.socket.emit('GAME_START', {
            room: state.room
        })
    }

    const sendHand = () => {
        dispatch({type: 'SEND_HAND'})
        state.socket.emit('SEND_HAND', {
            room: state.room, 
            hand: state.hand
        })
    }

    const nextTurn = () => {
        state.socket.emit('NEXT_TURN', {
            room: state.room
        })
    }

    const endGame = () => {
        dispatch({type: 'LOGOUT'})
    }

    return (
        <MDBCardFooter id='footer' className='fixed-bottom'>
            {state.proc === proc.login?
                <Button color='mdb-color' disabled={isNull(state.name)||isNull(state.room)} onClick={login}>入室</Button>:
            state.proc === proc.wait?
                <>
                    <Button color='mdb-color' onClick={logout}>退出</Button>
                    <Button color='mdb-color' disabled={state.wait} onClick={startGame}>
                        {state.wait&&<MDBIcon icon='spinner' spin/>}
                        ゲーム開始
                    </Button>
                </>:
            state.proc === proc.input?
                <Button color='mdb-color' disabled={state.wait||state.hand===0} onClick={sendHand}>
                    {state.wait&&<MDBIcon icon='spinner' spin/>}
                    確定
                </Button>:
            state.proc === proc.result?
                <Button color='mdb-color' onClick={nextTurn}>次へ</Button>:
            state.proc === proc.end?
                <Button color='mdb-color' onClick={endGame}>ゲーム終了</Button>:
                <React.Fragment/>
            }
        </MDBCardFooter>
    )
}

export default Footer
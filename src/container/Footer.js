import React, { useContext } from 'react'
import { MDBIcon } from 'mdbreact'
import Button from '../component/Button'
import { Store } from '../store/index'
import { proc } from '../util/const'

const Footer = () => {
    const {state, dispatch} = useContext(Store)

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
        <footer className='fixed-bottom mb-2'>
            <div className='hrow'>
                {
                    state.proc === proc.wait?
                        <>
                            <Button onClick={logout}>ログアウト</Button>
                            <Button disabled={state.wait} onClick={startGame}>
                                {state.wait&&<MDBIcon icon='spinner' spin/>}
                                スタート
                            </Button>
                        </>
                    :
                    state.proc === proc.input?
                        <Button disabled={state.wait||state.hand===0} onClick={sendHand}>
                            {state.wait&&<MDBIcon icon='spinner' spin/>}
                            確定
                        </Button>
                    :
                    state.proc === proc.result?
                        <Button onClick={nextTurn}>次へ</Button>
                    :
                    state.proc === proc.end?
                        <Button onClick={endGame}>ゲーム終了</Button>
                    :
                        <React.Fragment/>
                }
            </div>
        </footer>
    )
}

export default Footer
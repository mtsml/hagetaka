import React, { useContext } from 'react'
import Button from '../component/Button'
import Input from '../component/Input'
import { Store } from '../store/index'
import { isNull } from '../util/util'
import { MAX_VALUE_LENGTH } from '../util/const'
import logo from '../media/logo.png'

const Login = () => {
    const {state, dispatch} = useContext(Store)

    const handleChange = (e) => {
        dispatch({
            type: 'SET_STATE',
            data: {
                key: e.target.id,
                value: e.target.value
            }
        })
    } 

    const login = ()  => {
        if (isNull(state.name)||isNull(state.room)) {
            return dispatch({
                type: 'SET_STATE',
                data: {
                    key: 'message',
                    value: '名前とルームを入力してください'
                }
            })
        }
        if (state.name.length > MAX_VALUE_LENGTH || state.room.length > MAX_VALUE_LENGTH) {
            return dispatch({
                type: 'SET_STATE',
                data: {
                    key: 'message',
                    value: `名前とルームは${MAX_VALUE_LENGTH}以下で入力してください`
                }
            })
        } 
        state.socket.emit('LOGIN', {
            name: state.name, 
            room: state.room
        })
    }        
    
    return (
        <div className='hlogin'>
            <img src={logo}/>
            <h1 className='message'>{state.message}</h1>
            <Input id='name' label="nam" onChange={(e) => handleChange(e)} />
            <Input id='room' label="room" onChange={(e) => handleChange(e)} />
            <Button onClick={login}>ログイン</Button>
        </div>
    )
}

export default Login
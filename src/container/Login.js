import React from 'react'
import Button from '../component/Button'
import Input from '../component/Input'
import ShareButtons from './ShareButtons'
import { Store } from '../store/index'
import { isNull } from '../util/util'
import { MAX_VALUE_LENGTH, MSG_INVITATION, URL } from '../util/const'
import logo from '../media/logo.png'

const Login = () => {
    const {state, dispatch} = React.useContext(Store);

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
                    value: '「なまえ」と「あいことば」を入力してください'
                }
            })
        }
        if (state.name.length > MAX_VALUE_LENGTH || state.room.length > MAX_VALUE_LENGTH) {
            return dispatch({
                type: 'SET_STATE',
                data: {
                    key: 'message',
                    value: `「なまえ」と「あいことば」はそれぞれ${MAX_VALUE_LENGTH}文字以下で入力してください`
                }
            })
        } 
        state.socket.emit('LOGIN', {
            name: state.name, 
            room: state.room
        })
    }        
    
    return (
        <div className='h-login'>
            <img src={logo} alt="ロゴ"/>
            <h1 className='h-message'>{state.message}</h1>
            <Input id='name' label="なまえ" onChange={(e) => handleChange(e)} />
            <Input id='room' label="あいことば" onChange={(e) => handleChange(e)} />
            <Button onClick={login}>ログイン</Button>
            <ShareButtons url={URL} title={MSG_INVITATION}/>
        </div>
    )
}

export default Login

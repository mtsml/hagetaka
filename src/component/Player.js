import React, { useContext } from 'react'
import { MDBIcon, MDBListGroupItem } from 'mdbreact'
import Hand from './Hand'
import Point from './Point'
import { Store } from '../store/index'
import { proc } from '../util/const'
import '../css/Player.css'

const Player = (props) => {
    const {state} = useContext(Store)

    return (
        <MDBListGroupItem fab color={props.color} id='player'>
            <span>{props.name}さん</span>
            {state.proc!==proc.wait&&<Point point={props.point} size='1x'/>}
            {props.hand!==0&&<Hand text={props.hand} color={props.color}/>}
            {props.butting&&<MDBIcon icon='times' size='2x' className='red-text'/>}
        </MDBListGroupItem>
    )
}

export default Player
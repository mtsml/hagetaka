import React from 'react'
import { MDBIcon, MDBListGroupItem } from 'mdbreact'
import Hand from './Hand'
import Point from './Point'
import '../css/Player.css'

const Player = (props) => {
    return (
        <MDBListGroupItem fab color={props.color} id='player'>
            <span>{props.name}さん</span>
            <Point point={props.point} size='1x'/>
            {props.hand!==0&&<Hand text={props.hand} color={props.color}/>}
            {props.butting&&<MDBIcon icon='times' size='2x' className='red-text'/>}
        </MDBListGroupItem>
    )
}

export default Player
import React from 'react'
import { MDBIcon, MDBListGroupItem } from 'mdbreact'
import Hand from './Hand.js'

const Player = (props) => {
    return (
        <MDBListGroupItem fab color={props.color}>
            {props.name}さん {props.point}ポイント
            {props.hand&&<Hand text={props.hand} color={props.color}/>}
            {props.butting&&<MDBIcon icon='times' />}
        </MDBListGroupItem>
    )
}

export default Player
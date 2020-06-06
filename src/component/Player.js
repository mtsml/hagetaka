import React from 'react'
import { MDBIcon, MDBListGroupItem } from 'mdbreact'
import Hand from './Hand.js'

const Player = (props) => {
    return (
        <MDBListGroupItem fab color={props.color}>
            <MDBIcon icon="user-circle" />
            {props.name}さん {props.point}ポイント
            <Hand text={props.hand} color={props.color}/>
        </MDBListGroupItem>
    )
}

export default Player
import React from 'react'
import { MDBListGroupItem } from 'mdbreact'
import Hand from './Hand.js'

const Player = (props) => {
    return (
        <MDBListGroupItem color={props.color}>
            {props.name}さん {props.point}ポイント                
            <Hand text={props.hand} color={props.color}/>
        </MDBListGroupItem>
    )
}

export default Player
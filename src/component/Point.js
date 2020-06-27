import React from 'react'
import { isNull } from '../util/util'

const Point = (props) => {
    return (
        <>
            <span 
                className={`h-point${props.point>0?' blue-text':' red-text'}`}
            >
                {props.point>0&&'+'}{props.point}
            </span>
            {!isNull(props.carryPoint)&&
                <span 
                    className={`h-carry-point${props.point>0?' blue-text':' red-text'}`}
                >
                    ({props.carryPoint>=0&&'+'}{props.carryPoint})
                </span>
            }
        </>
    )
}

export default Point
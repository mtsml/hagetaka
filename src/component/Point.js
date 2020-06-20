import React from 'react'

const Point = (props) => {
    return (
        <span 
            className={`point${props.point>0?' green-text':' red-text'}`}
        >
            {props.point>0&&'+'}{props.point}
        </span>
    )
}

export default Point
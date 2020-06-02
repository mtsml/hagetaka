import React from 'react';
import { MDBContainer } from 'mdbreact';

const Contents = (props) => {
    return (
            <MDBContainer>
                {props.children}
            </MDBContainer>
        )
}

export default Contents
import React from 'react';
import { Card } from 'react-bootstrap';

const Contents = (props) => {
    return (
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>
        )
}

export default Contents
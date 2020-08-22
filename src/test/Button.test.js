import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../component/Button';

describe('スナップショット: ', () => {
    it('正常', () => {
        const props = {
            disabled: false, 
            color: 'red', 
            onClick: function(){}
        };
        const tree = renderer.create(<Button {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
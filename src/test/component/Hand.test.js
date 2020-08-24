import React from 'react';
import renderer from 'react-test-renderer';
import Hand from '../../component/Hand';

describe('スナップショット: ', () => {
    it('正常', () => {
        const props = {
            disabled: false, 
            outline: false,
            onClick: function(){},
            text: 'test'
        };
        const tree = renderer.create(<Hand {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
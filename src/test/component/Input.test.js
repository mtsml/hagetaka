import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../component/Input';

describe('スナップショット: ', () => {
    it('正常', () => {
        const props = {
            id: '1',
            label: 'test',
            onChange: function(){}
        };
        const tree = renderer.create(<Input {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
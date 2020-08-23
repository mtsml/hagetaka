import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../container/Login';

describe('スナップショット: ', () => {
    it('正常', () => {
        const tree = renderer.create(<Login />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
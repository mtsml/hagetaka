import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../container/Login';
import { initialState } from '../../store/index'

const { name, room, message } = initialState;
const retVal = {
    state: {name,room,message},
    dispatch: function(){}
};

describe('スナップショット: ', () => {
    it('正常', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(retVal);
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import React from 'react';
import renderer from 'react-test-renderer';
import Point from '../../component/Point';

describe('スナップショット: ', () => {
    it('プラス', () => {
        const props = {
            point: 1,
            carryPoint: 1
        };
        const tree = renderer.create(<Point {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('マイナス', () => {
        const props = {
            point: -1,
            carryPoint: -1
        };
        const tree = renderer.create(<Point {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('キャリーオーバーなし', () => {
        const props = {
            point: 0
        };
        const tree = renderer.create(<Point {...props}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
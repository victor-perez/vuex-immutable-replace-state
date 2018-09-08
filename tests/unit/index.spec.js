import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';
import Store from '../store';

function jsonCopy(value) {
    return JSON.parse(JSON.stringify(value));
}


describe('Test all immutable types ', () => {

    test('List', () => {
        let list = new List(['test', 'list', 1]);

        Store.replaceState({ list: jsonCopy(list) });

        expect(list).toEqual(Store.state.list);
    });


    test('Map', () => {
        let map = new Map({ test: 'map', map: true });

        Store.replaceState({ map: jsonCopy(map) });

        expect(map).toEqual(Store.state.map);
    });

    test('OrderedMap', () => {
        let orderedMap = new OrderedMap([['test', 'orderedMap'], ['orderedMap', true]]);

        Store.replaceState({ orderedMap: jsonCopy(orderedMap) });

        expect(orderedMap).toEqual(Store.state.orderedMap);
    });

    test('Set', () => {
        let set = new Set(['test', 'list', 1]);

        Store.replaceState({ set: jsonCopy(set) });

        expect(set).toEqual(Store.state.set);
    });

    test('OrderedSet', () => {
        let orderedSet = new OrderedSet(['test', 'list', 1]);

        Store.replaceState({ orderedSet: jsonCopy(orderedSet) });

        expect(orderedSet).toEqual(Store.state.orderedSet);
    });

    test('Stack', () => {
        let stack = new Stack(['test', 'list', 1]);

        Store.replaceState({ stack: jsonCopy(stack) });

        expect(stack).toEqual(Store.state.stack);
    });

    test('Seq', () => {
        let seq = new Seq([1, 2, 3]);

        Store.replaceState({ seq: jsonCopy(seq) });

        expect(seq).toEqual(Store.state.seq);
    });
});
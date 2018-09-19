import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';
import Store from '../store/modules';
import { jsonCopy } from '../helpers';

describe('Test store with modules', () => {

    test('root', () => {
        let orderedMap = new OrderedMap([['test', 'orderedMap'], ['orderedMap', true]]);

        Store.replaceState({ orderedMap: jsonCopy(orderedMap) });

        expect(orderedMap).toEqual(Store.state.orderedMap);
    });

    test('module a', () => {
        let seq = new Seq([1, 2, 3]);

        Store.replaceState({
            a: {
                seq: jsonCopy(seq)
            }
        });

        expect(seq).toEqual(Store.state.a.seq);
    });


    test('module a.b', () => {
        let stack = new Stack(['test', 'list', 1]);

        Store.replaceState({
            a: {
                b: {
                    stack: jsonCopy(stack)
                }
            }
        });

        expect(stack).toEqual(Store.state.a.b.stack);
    });


    test('module a.b.c', () => {
        let orderedSet = new OrderedSet(['test', 'list', 1]);

        Store.replaceState({
            a: {
                b: {
                    c: {
                        orderedSet: jsonCopy(orderedSet)
                    }
                }
            }
        });

        expect(orderedSet).toEqual(Store.state.a.b.c.orderedSet);
    });

    test('module a.b.c.d', () => {
        let set = new Set(['test', 'list', 1]);

        Store.replaceState({
            a: {
                b: {
                    c: {
                        d: {
                            set: jsonCopy(set)
                        }
                    }
                }
            }
        });

        expect(set).toEqual(Store.state.a.b.c.d.set);
    });


    test('module a.b.c.d.f', () => {
        let list = new List(['test', 'list', 1]);

        Store.replaceState({
            a: {
                b: {
                    c: {
                        d: {
                            f: {
                                list: jsonCopy(list)
                            }
                        }
                    }
                }
            }
        });

        expect(list).toEqual(Store.state.a.b.c.d.f.list);
    });

    test('module a.b.c.d.f.h', () => {
        let map = new Map({ test: 'map', map: true });

        Store.replaceState({
            a: {
                b: {
                    c: {
                        d: {
                            f: {
                                h: {
                                    map: jsonCopy(map)
                                }
                            }
                        }
                    }
                }
            }
        });

        expect(map).toEqual(Store.state.a.b.c.d.f.h.map);
    });
});
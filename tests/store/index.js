import Vuex from 'vuex';
import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';
import vuexImmutableReplaceState from '../../src';
import Vue from 'vue';
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [vuexImmutableReplaceState()],
    state: {
        list: new List(),
        map: new Map(),
        orderedMap: new OrderedMap(),
        set: new Set(),
        orderedSet: new OrderedSet(),
        stack: new Stack(),
        seq: new Seq()
    }
});
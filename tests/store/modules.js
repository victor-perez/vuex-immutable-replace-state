import Vuex from 'vuex';
import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';
import { vuexImmutableReplaceState } from '../../src';
import Vue from 'vue';
Vue.use(Vuex);

const moduleMap = {
    namespaced: true,
    state: {
        map: new Map(),
    }
};

const moduleList = {
    namespaced: true,
    modules: {
        h: moduleMap
    },
    state: {
        list: new List(),
    }
};

const moduleSet = {
    namespaced: true,
    modules: {
        f: moduleList
    },
    state: {
        set: new Set(),
    }
};

const moduleOrderedSet = {
    namespaced: true,
    modules: {
        d: moduleSet
    },
    state: {
        orderedSet: new OrderedSet(),
    }
};

const moduleStack = {
    namespaced: true,
    modules: {
        c: moduleOrderedSet
    },
    state: {
        stack: new Stack(),
    }
};

const moduleSeq = {
    namespaced: true,
    modules: {
        b: moduleStack
    },
    state: {
        seq: new Seq(),
    }
};

export default new Vuex.Store({
    plugins: [vuexImmutableReplaceState({ deep: true })],
    state: {
        orderedMap: new OrderedMap(),
    },
    namespaced: true,
    modules: {
        a: moduleSeq
    }
});

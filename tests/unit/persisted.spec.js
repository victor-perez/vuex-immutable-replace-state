import vuexImmutableReplaceState from '../../src';
import createPersistedState from 'vuex-persistedstate';
import { List } from 'immutable';
import Storage from 'dom-storage';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

describe('Test with vuex-persistedstate ', () => {
    let storage = new Storage();

    test('persisted list', () => {
        let persisted = new List([1, 2, 3]);

        storage.setItem('vuex', JSON.stringify({
            persisted
        }));

        let store = new Vuex.Store({
            state: {
                persisted: new List()
            },
            plugins: [
                vuexImmutableReplaceState(),
                createPersistedState({ storage })
            ],
        });

        expect(persisted).toEqual(store.state.persisted);

    });
});
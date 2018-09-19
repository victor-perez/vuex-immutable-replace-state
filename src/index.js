import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';

function isObject(value) {

    if (typeof value !== 'object' && value !== null || Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}

function replace(state, newState, findObject = false) {
    let foundObjects = [];
    Object.entries(state)
        .forEach(([key, value]) => {
            //is state a List
            if (List.isList(value)) {
                return newState[key] = new List(newState[key]);
            }

            //is state a order map
            if (OrderedMap.isOrderedMap(value)) {
                return newState[key] = new OrderedMap(newState[key]);
            }

            //is state a Map
            if (Map.isMap(value)) {
                return newState[key] = new Map(newState[key]);
            }

            //is state a order map
            if (OrderedSet.isOrderedSet(value)) {
                return newState[key] = new OrderedSet(newState[key]);
            }

            //is state a set
            if (Set.isSet(value)) {
                return newState[key] = new Set(newState[key]);
            }

            //is state a stack
            if (Stack.isStack(value)) {
                return newState[key] = new Stack(newState[key]);
            }

            //is state a seq.
            if (Seq.isSeq(value)) {
                return newState[key] = new Seq(newState[key]);
            }

            if (findObject && isObject(value)) {
                foundObjects.push(key);
            }
        });
    if (findObject) {
        return [newState, foundObjects];
    }
    return newState;
}


function modeDefault(store, replaceState) {
    store.replaceState = (newState) => {
        replaceState.call(store, replace(store.state, newState));
    };
}

function modeDeep(store, replaceState) {
    store.replaceState = (state) => {

        function next(storeState, newState = {}) {
            let [replacedState, foundObjects] = replace(storeState, newState, true);
            foundObjects.forEach((key) => {
                replacedState[key] = next(storeState[key], replacedState[key]);
            });
            return replacedState;
        }

        replaceState.call(store, next(store.state, state));
    };
}

export function vuexImmutableReplaceState({
    deep = false
} = {}) {

    return (store) => {
        if (!deep) {
            modeDefault(store, store.replaceState);
        } else {
            modeDeep(store, store.replaceState);
        }
    };
}

export default vuexImmutableReplaceState;
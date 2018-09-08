import { List, Map, OrderedMap, Set, OrderedSet, Stack, Seq } from 'immutable';

export default function () {

    return (store) => {
        let _replaceState = store.replaceState;

        store.replaceState = (newState) => {
            Object.entries(store.state)
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
                });
            //replace state with new state
            _replaceState.call(store, newState);
        };

    };
}
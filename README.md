vuex-immutable-replace-state
============================
[Vuex](http://vuex.vuejs.org/) replace state plugin to correctly handle state replacement when using [immutables](https://facebook.github.io/immutable-js/) states

## Problem
Any plugin that uses `Store.replaceState` like [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) or SSR like [Nuxt](https://nuxtjs.org) are most of the time using [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) on the `state`. All immutable types support a [toJSON](https://facebook.github.io/immutable-js/docs/#/Collection.Indexed/toJSON) method what will be called when the `state` is stringified. The problem is only when [Store.replaceState](https://vuex.vuejs.org/api/#replacestate) you state will not have any immutable anymore, just object's, array's etc. what means that you can't call any immutable methods. This plugin tries to solve this problem. 


[![NPM version](https://img.shields.io/npm/v/vuex-immutable-replace-state.svg)](https://www.npmjs.com/package/vuex-immutable-replace-state)
[![Build Status](https://travis-ci.org/victor-perez/vuex-immutable-replace-state.svg?branch=master)](https://travis-ci.org/victor-perez/vuex-immutable-replace-state)

[![NPM](https://nodei.co/npm/vuex-immutable-replace-state.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vuex-immutable-replace-state/)


## Requirements

* [Vue.js](https://vuejs.org) (v2.0.0+)
* [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Installation

```bash
# yarn
$ yarn add vuex-immutable-replace-state
# npm
$ npm install vuex-immutable-replace-state
```

## Usage

### options object
| property | type | version | default | description  |
|---|---|---|---| ---|
| `deep`| boolean | `false` | ^1.1.0 | if set to `true` it will do a deep replace of immutables |

By default it will **only** replace the first level of the state
```javascript
//default
const state = {
    todo: new List()
}
//will only work with {deep: true}
const state = {
    today: {
        done: new List (),
        todo: new List ()
    }
}
```

## Examples

```javascript
import vuexImmutableReplaceState from "vuex-immutable-replace-state";
import createPersistedState from "vuex-persistedstate";

import { List } from 'immutable'

const store = new Vuex.Store({
    state: {
        todo: new List() //this is important
    },
    plugins: [
        vuexImmutableReplaceState(), //first 
        createPersistedState()
    ]
});

````

when working with modules `{deep: true}` is required

```javascript
import vuexImmutableReplaceState from "vuex-immutable-replace-state";
import createPersistedState from "vuex-persistedstate";

import { List, Map } from 'immutable'

const store = new Vuex.Store({
    state: {
        todo: new List() //this is important
        module: {
            a: {
                state: new Map()
            }
        }
    },
    plugins: [
        vuexImmutableReplaceState({deep: true}), //deep true 
        createPersistedState()
    ]
});

````
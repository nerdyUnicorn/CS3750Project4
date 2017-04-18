import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({

    // global state available throughout application
    state: {
        stocks: [],
        funds: 10000
    },

    // sync modificaiton of global state
    mutations: {
    },
    // async modificaiton of global state
    actions: {
    },
    getters: {
        funds(state) { // using old style javascript syntax
            return state.funds;
        },
        stocks: state => { // using new style javascript syntax
            return state.stocks;
        }
    }
});
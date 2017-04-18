import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({

    // global state available throughout application
    state: {
        stocks: [],
        allocations: [],
        funds: 10000
    },

    // sync modificaiton of global state
    mutations: {
        maddStock(state, stock) {

            // return if stock is already in state.stocks
            if (state.stocks.indexOf(stock) > -1) {
                return;
            }

            let newStock = {
                symbol: stock,
                percent: 0
            }

            state.stocks.push(stock);
            state.allocations.push(newStock);
        }
    },
    // async modificaiton of global state
    actions: {
        addStock: ({commit}, stock) => {
            commit('maddStock', stock);
        },
    },
    getters: {
        allocations(state) { // using old style javascript syntax
            return state.allocations;
        },
        funds(state) { // using old style javascript syntax
            return state.funds;
        },
        stocks: state => { // using new style javascript syntax
            return state.stocks;
        }
    }
});
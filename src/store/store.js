import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({

    // global state available throughout application
    state: {
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
        },
        mdelStock(state, stock) {

            // return if stock is not already in state.stocks
            if (state.stocks.indexOf(stock) == -1) {
                return;
            }

            // TODO
            // remove stock from stocks and allocations
        }
    },
    // async modificaiton of global state
    actions: {
        // stock = stock symbol
        addStock: ({commit}, stock) => {
            commit('maddStock', stock);
        },
        delStock: ({commit}, stock) => {
            console.log('delStock called on: ' + stock);
            commit('mdelStock', stock);
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
            let stocks = [];
            for (let i in state.allocations) {
                stocks.push(state.allocations[i].symbol);
            }
            return stocks;
        }
    }
});
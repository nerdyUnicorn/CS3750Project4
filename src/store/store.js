import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({

    // global state available throughout application
    state: {
        isLoggedIn: false,
        allocations: [],
        funds: 10000
    },

    // sync modificaiton of global state
    mutations: {
        maddStock(state, stock) {

            // return if stock is already being tracked
            for (let i in state.allocations) {
                if (state.allocations[i].symbol == stock) {
                    return;
                }
            }

            let newStock = {
                symbol: stock,
                percent: 0
            }

            state.allocations.push(newStock);
        },
        mdelStock(state, stock) {

            // return if stock is not already in state.stocks
            if (state.stocks.indexOf(stock) == -1) {
                return;
            }

            // TODO
            // remove stock from stocks and allocations
        },
        setisLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
        loadStocks(state, dBStocks) {
            state.allocations.push(dBStocks);
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
        checkLoggedIn: ({commit}) => {
            Vue.http.get('http://localhost:3000/api/isLoggedIn')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    commit('setisLoggedIn', true);
                    Vue.http.get('http://localhost:3000/api/getStocksAndPercent')
                    //.then(response => response.json())
                    .then(commit('loadStocks', response.json()))
                                   
                } else {
                    commit('setisLoggedIn', false);
                }
            });
            
        }
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
        },
        loginStatus: state => { // using new style javascript syntax
            return state.isLoggedIn;
        }
    }
});

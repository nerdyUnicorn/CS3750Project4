import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export const store = new Vuex.Store({

    // global state available throughout application
    state: {
        isLoggedIn: false,
        allocations: [],
        funds: 10000
    },

    // sync modificaiton of global state
    mutations: {
        mdelStock(state, stock) {
            state.allocations = state.allocations.filter((el) => {
                return el.symbol !== stock;
            });
        },
        setisLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
        mloadStocks(state, dBStocks) {
            state.allocations = dBStocks;
        },
        msetFunds(state, amt) {
            state.funds = amt;
        }
    },
    // async modificaiton of global state
    actions: {
        // stock = stock symbol
        addStock: ({commit}, symbol) => {
            Vue.http.post('/api/addstocks', {stock: symbol})
            .then(function(response) {
                    console.log('success', response);
                    store.dispatch('loadStocks')},
                  function(response) {
                     console.log('error', response)}
            )
            
        },
        delStock: ({commit}, symbol) => {
            Vue.http.delete('/api/stock/' + symbol)
            .then(function(response) {
                     commit('mdelStock', symbol);},
                  function(response) {
                     console.log('error calling delete stock API for ', symbol)}
            );
        },
        checkLoggedIn: ({commit}) => {
            Vue.http.get('/api/isLoggedIn')
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    commit('setisLoggedIn', true);
                    store.dispatch('loadStocks');                                   
                } else {
                    commit('setisLoggedIn', false);
                }

            })
        },

        loadStocks: ({commit}) => {
            Vue.http.get('/api/getStocksAndPercent')
            .then(stockResponse => stockResponse.json())
            .then(function(stockResponse){
                if(stockResponse) {
                    commit('mloadStocks', stockResponse);
                }
                else{
                    commit('mloadStocks', [{"symbol": "ERROR", "percent":0}]);
                }
            })
        },

        setFunds: ({commit}, amt) => {
            commit('msetFunds', amt);
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

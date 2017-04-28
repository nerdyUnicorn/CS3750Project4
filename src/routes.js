import Home from './components/Home.vue';
import AddStock from './components/AddStockPage/AddStock.vue';
import ManageStocks from './components/ManageStocksPage/ManageStocks.vue';
import StockView from './components/StockViewPage/StockView.vue';
import StockList from './components/StockListPage/StockList.vue';
import Page404 from './components/Page404/page404.vue';
import {store} from './store/store.js'

export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList },
    { path: '/addstocks', component: AddStock },
    { path: '/managestocks', component: ManageStocks },
    { path: '*', component: Page404 },
    { path: '/stockview', component: StockView },
]

export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList },
    { path: '/addstocks', component: AddStock },
    { path: '/managestocks', component: ManageStocks },
    { path: '*', component: Page404 },
    { path: '/stockview', component: StockView },
]


function redirectIfNotLoggedIn(to, from, next) {
    if(store.getters.loginStatus === false) {
        next('/');
    }
    next();
}


function redirectIfNotLoggedIn(to, from, next) {
    if(store.getters.loginStatus === false) {
        next('/');
    }
    next();
}


export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList, beforeEnter: redirectIfNotLoggedIn },
    { path: '/addstocks', component: AddStock, beforeEnter: redirectIfNotLoggedIn },
    { path: '/managestocks', component: ManageStocks, beforeEnter: redirectIfNotLoggedIn },
    { path: '/stockview', component: StockView, beforeEnter: redirectIfNotLoggedIn },
    { path: '*', component: Page404 },


    { path: '*', component: Page404 }
];

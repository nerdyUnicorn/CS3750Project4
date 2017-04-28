import Home from './components/Home.vue';
import AddStock from './components/AddStockPage/AddStock.vue';
import ManageStocks from './components/ManageStocksPage/ManageStocks.vue';
import StockView from './components/StockViewPage/StockView.vue';
import StockList from './components/StockListPage/StockList.vue';
<<<<<<< HEAD

import Page404 from './components/Page404/page404.vue';
=======
<<<<<<< HEAD
import Page404 from './components/Page404/page404.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList },
    { path: '/addstocks', component: AddStock },
    { path: '/managestocks', component: ManageStocks },
    { path: '*', component: Page404 },
    { path: '/stockview', component: StockView },
=======
>>>>>>> a80d5de4d91ee23eb31685726c1c065f85afdfe7
import {store} from './store/store.js'
import Page404 from './components/Page404/page404.vue';

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
<<<<<<< HEAD
    { path: '*', component: Page404 },

=======
    { path: '*', component: Page404 }
>>>>>>> refs/remotes/origin/master
>>>>>>> a80d5de4d91ee23eb31685726c1c065f85afdfe7
];

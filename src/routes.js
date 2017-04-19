import Home from './components/Home.vue';
import AddStock from './components/AddStock.vue';
import ManageStocks from './components/ManageStocks.vue';
import StockView from './components/StockView.vue';
import StockList from './components/StockList.vue';
import StockListStock from './components/StockListStock.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList },
    { path: '/addstocks', component: AddStock },
    { path: '/managestocks', component: ManageStocks },
    { path: '/stockview', component: StockView },
    { path: '/stock1', component: StockListStock },
];
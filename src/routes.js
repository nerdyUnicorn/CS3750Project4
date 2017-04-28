import Home from './components/Home.vue';
import AddStock from './components/AddStockPage/AddStock.vue';
import ManageStocks from './components/ManageStocksPage/ManageStocks.vue';
import StockView from './components/StockViewPage/StockView.vue';
import StockList from './components/StockListPage/StockList.vue';
import Page404 from './components/Page404/page404.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/stocklist', component: StockList },
    { path: '/addstocks', component: AddStock },
    { path: '/managestocks', component: ManageStocks },
    { path: '*', component: Page404 },
    { path: '/stockview', component: StockView },
];

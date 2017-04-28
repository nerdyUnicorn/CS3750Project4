<template>
    <div>
        <app-stock v-for="stock in stockquotes" :stock="stock"></app-stock>
    </div>
</template>

<script>

    import Stock from './StockListStock.vue';

    export default {
        computed: {
            stocks() {
               return this.$store.getters.stocks;
           },
           stockquotes() {

               let tmpObj = {};

               for (let i in this.stocks) {
                   tmpObj[i] = {
                       symbol: this.stocks[i],
                       name: '',
                       currprice: 'Loading...',
                       change: '',
                   }
               }
               return tmpObj;
           }
        },
        components: {
            appStock: Stock
        }
    }
</script>

<style>

</style>

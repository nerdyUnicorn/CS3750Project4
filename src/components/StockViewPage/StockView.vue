<template>
    <div>
        <app-pie></app-pie>
        <app-chart v-for="stock in stocks" :stock="stock"></app-chart>
    </div>
</template>

<script>

    import PieChart from '../ManageStocksPage/AllocPieChart.vue';
    import HighStock from './HighStock.vue';

    export default {
        computed: {
            stocks() {
               return this.$store.getters.stocks;
           },
        },
        components: {
            appChart: HighStock,
            appPie: PieChart
        }
    }
</script>

<style>

</style>

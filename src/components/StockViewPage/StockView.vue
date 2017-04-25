<template>
    <div>
        <app-chart v-for="stock in stocks" :stock="stock"></app-chart>
    </div>
</template>

<script>

    import HighStock from './HighStock.vue';

    export default {
        computed: {
            stocks() {
               return this.$store.getters.stocks;
           },
        },
        components: {
            appChart: HighStock
        }
    }
</script>

<style>

</style>

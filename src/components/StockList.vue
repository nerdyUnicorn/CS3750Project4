<template>
    <div>
        <h3>Stock List</h3>
        <p>stocks: {{ stocks }}</p>
    </div>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        computed: {
            stocks() {
               return this.$store.getters.stocks;
           }
        },
        components: {
        
        }
    }
</script>

<style>

</style>

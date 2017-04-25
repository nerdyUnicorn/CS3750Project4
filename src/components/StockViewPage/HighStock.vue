<template>
    <div>
        <div class="col-sm-6 col-md-6">
            <div class="panel well">
                <highstock :options="options"></highstock>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['stock'],
        data() {
            return {
                history: [],
            }
        },
        computed: {
            options() {
                return {
                    title: {
                        text: this.stock + ' Stock Price'
                    },
                    rangeSelector: {
                        selected: 1
                    },
                    series: [{
                        name: this.stock,
                        data: this.history,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]

                }

            }
        },
        methods: {
            getStockData() {
            this.$http.get('http://localhost:3000/proxyapi/stockhistory/' + this.stock)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        this.history = data;
                    }
                });            
            }
        },
        created() {
            this.getStockData();
        }
    }
</script>

<style>

</style>

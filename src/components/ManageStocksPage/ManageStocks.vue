<template>
    <div>
        <h3>Manage Total Funds and Allocation Percentages</h3>
        <h4>Funds in Account</h4>
        <div class="container">
            <div class="row">
                <div>
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon">$</span>
                        <input type="number" min="0" v-model.number="funds" v-on:change="updateFunds" class="form-control" aria-label="Amount (to the nearest dollar)">
                    </div>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div id="stockWindow">
            <h4>Allocate Funds</h4>
            <div id="remainingPercentOuter">
                <div id="remainingPercentInner" v-bind:style="barStyle"></div>
            </div>
            <table>
                <tbody>
                    <template v-for="item in this.$store.getters.allocations">
                        <tr>
                            <td class="symbol-container">{{item.symbol}}</td>
                            <td class="slider-container">
                                <input type="range" class="stock-alloc" v-model.number="item.percent" min="0" max="100" v-on:change="limitRange($event, item)" v-on:input="limitRange($event, item)" />
                            </td>
                            <td class="number-money">{{parseFloat((item.percent * funds / 100).toFixed(2)) | currency}}</td>
                            <td class="number-container">
                                <input type="number" class="stock-num-box" :disabled="item.percent > 100" v-model.number="item.percent" min="0" max="100" v-on:change="limitRange($event, item)" v-on:input="limitRange($event, item)" />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <button class="btn submit-port-button" v-bind:disabled="savingPort" v-bind:class="{'btn-info': !savingPort, 'btn-warning': savingPort}" v-on:click="submitPortfolio()">{{saveText}}</button>
        </div>
        <div id="chartWindow">
            <pie-chart ref="stockschart"></pie-chart>
        </div>
    </div>
</template>

<script>

import PieChart from './AllocPieChart.vue';

export default {
    data() {
        return {
            barStyle: {
                backgroundColor: '#033c73',
                width: () => 60 + '%',
                height: '100%'
            },
            funds: 0,
            savingPort: false,
            saveText: 'Save'
        }
    },
    methods: {
        limitRange: function (event, item) {
            if (item.percent > 100) {
                item.percent = 100;
            }
            var stocks = document.getElementsByClassName('stock-alloc');
            var stockTotal = 0;
            [].forEach.call(stocks, function (st) {
                stockTotal += parseInt(st.value);
            });
            if (stockTotal > 100) {
                item.percent -= stockTotal - 100;
                item.percent = Math.max(0, Math.min(item.percent, 100));
                event.target.value -= stockTotal - 100;
                stockTotal = 100;
            }
            this.$data.barStyle.width = (100 - stockTotal) + '%';
            this.$refs.stockschart.setAlloc();
        },
        updateFunds: function () {
            this.$store.dispatch('setFunds', this.funds);
        },
        submitPortfolio: function () {
            this.$data.savingPort = true;
            this.$data.saveText = 'Saving...';
            this.$http.post('/api/updateAlloc', { portfolio: this.$store.getters.allocations })
                .then(data => {
                    this.$data.savingPort = false;
                    this.$data.saveText = 'Save';
                });
            return;
        }
    },
    components: {
        pieChart: PieChart
    },
    mounted() {
        this.funds = this.$store.getters.funds;
    }
}
</script>

<style scoped>
#stockWindow {
    color: #000;
    width: 50%;
    float: left;
}

#chartWindow {
    display: block;
    width: 50%;
    float: right;
}

input.stock-num-box {
    width: 60px;
}

table {
    width: 100%;
}

table tbody {
    max-height: 50vh;
    overflow-y: scroll;
    display: block;
}

td {
    padding: 3px;
}

td.slider-container {
    width: 100%;
}

td.symbol-container {
    width: 5%;
}

tr {
    border: solid 1px #4174a0;
    background: #c0e1ff;
}

div#remainingPercentOuter {
    background: #000;
    border: solid 1px #000;
    height: 30px;
}

.submit-port-button {
    margin-top: 20px;
}

input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    margin: 0px 0;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
}

input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 1.1px solid #000000;
    height: 20px;
    width: 16px;
    border-radius: 0px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -0.2px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #5697cf;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 1.1px solid #000000;
    height: 20px;
    width: 16px;
    border-radius: 0px;
    background: #ffffff;
    cursor: pointer;
}

input[type=range]::-ms-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type=range]::-ms-fill-lower {
    background: #1f496d;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}

input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}

input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 1.1px solid #000000;
    width: 16px;
    border-radius: 0px;
    background: #ffffff;
    cursor: pointer;
    height: 20px;
}

input[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
}

input[type=range]:focus::-ms-fill-upper {
    background: #5697cf;
}
</style>

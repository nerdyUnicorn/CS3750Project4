<template>
    <div>
        <h3>Manage Stocks</h3>
        <div id="stockWindow">
            <div id="remainingPercentOuter">
                <div id="remainingPercentInner" v-bind:style="barStyle"></div>
            </div>
            <table>
                <tbody>
                    <template v-for="item in this.$store.getters.allocations">
                        <tr>
                            <td class="symbol-container">{{item.symbol}}</td>
                            <td class="slider-container">
                                <input type="range" class="stock-alloc" v-model="item.percent" min="0" max="100" v-on:change="limitRange($event, item)" v-on:input="limitRange($event, item)" />
                            </td>
                            <td class="number-container">
                                <input type="number" class="stock-num-box" v-model="item.percent" min="0" max="100" v-on:change="limitRange($event, item)" v-on:input="limitRange($event, item)" />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <button class="btn submit-port-button" v-bind:class="{'btn-info': !savingPort, 'btn-warning': savingPort}" v-on:click="submitPortfolio()">Save</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            barStyle: {
                backgroundColor: '#033c73',
                width: () => 60 + '%',
                height: '100%'
            },
            savingPort: false
        }
    },
    methods: {
        limitRange: function (event, item) {
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
        },
        submitPortfolio: function() {
            this.$data.savingPort = true;
            this.$http.post('/api/updateAlloc', {portfolio: this.$store.getters.allocations})
            .then(data => {
                this.$data.savingPort = false;
            });
            return;
        }
    },
    components: {
    }
}
</script>

<style scoped>
#stockWindow {
    color: #000;
    width: 70%;
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

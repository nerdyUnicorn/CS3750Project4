<template>
    <div>
        <h3>Manage Stocks</h3>
        <button v-on:click="addStock">add stock</button>
        <div id="remainingPercentOuter">
            <div id="remainingPercentInner"
                 v-bind:style="barStyle"></div>
        </div>
        <div id="stockWindow">
            <table>
                <template v-for="item in items">
                    <tr>
                        <td>{{item.stock}}</td>
                        <td class="slider-container">
                            <input type="range"
                                   class="stock-alloc"
                                   v-model="item.val"
                                   min="0"
                                   max="100"
                                   v-on:change="limitRange($event, item)"
                                   v-on:input="limitRange($event, item)" />
                        </td>
                        <td>
                            <input type="number"
                                   class="stock-num-box"
                                   v-model="item.val"
                                   min="0"
                                   max="100"
                                   v-on:change="limitRange($event, item)"
                                   v-on:input="limitRange($event, item)" />
                        </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            barStyle: {
                backgroundColor: '#f0f',
                width: '100%',
                height: '100%'
            },
            items: [
                { stock: 'stock1', val: 0 },
                { stock: 'stock2', val: 0 },
                { stock: 'stock3', val: 0 }
            ]
        }
    },
    methods: {
        addStock: function () {
            this.$data.items.push({ stock: 'stock' + (this.$data.items.length + 1), val: 0 });
        },
        limitRange: function (event, item) {
            var stocks = document.getElementsByClassName('stock-alloc');
            var stockTotal = 0;
            [].forEach.call(stocks, function (st) {
                stockTotal += parseInt(st.value);
            });
            if (stockTotal > 100) {
                item.val -= stockTotal - 100;
                item.val = Math.max(0, Math.min(item.val, 100));
                event.target.value -= stockTotal - 100;
                stockTotal = 100;
            }
            this.$data.barStyle.width = (100 - stockTotal) + '%';
        }
    },
    components: {
    }
}
</script>

<style>
input.stock-num-box {
    width: 60px;
}

#stockWindow {
    max-height: 50vh;
    overflow-y: scroll;
}

td {
    padding: 3px;
}

td.slider-container {
    width: 100%;
}

div#remainingPercentOuter {
    border: solid 1px #000;
    height: 20px;
}

input[type=range] {
    display: inline;
    -webkit-appearance: none;
    margin: 2px 0;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
    background: #79d1eb;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
}

input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
    border: 1px solid #000000;
    height: 24px;
    width: 10px;
    border-radius: 0px;
    background: #0771aa;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -2.2px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #98dcf0;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 20px;
    cursor: pointer;
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
    background: #79d1eb;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
    border: 1px solid #000000;
    height: 24px;
    width: 10px;
    border-radius: 0px;
    background: #0771aa;
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
    background: #5ac6e6;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
}

input[type=range]::-ms-fill-upper {
    background: #79d1eb;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
}

input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 2px #000000, 0px 0px 0px #0d0d0d;
    border: 1px solid #000000;
    height: 24px;
    width: 10px;
    border-radius: 0px;
    background: #0771aa;
    cursor: pointer;
    height: 20px;
}

input[type=range]:focus::-ms-fill-lower {
    background: #79d1eb;
}

input[type=range]:focus::-ms-fill-upper {
    background: #98dcf0;
}
</style>

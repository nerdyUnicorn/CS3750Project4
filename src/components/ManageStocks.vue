<template>
    <div>
        <h3>Manage Stocks</h3>
        <button v-on:click="addStock">add stock</button>
        <div id="remainingPercentOuter">
            <div id="remainingPercentInner"></div>
        </div>
        <div id="stockWindow">
            <table>
                <template v-for="item in items">
                    <tr>
                        <td>{{item.stock}}</td>
                        <td class="slider-container">
                            <input class="stock-alloc"
                                   value="0"
                                   min="0"
                                   max="100"
                                   type="range"
                                   v-on:change="limitRange"
                                   v-on:input="limitRange" />
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
            items: [
                { stock: 'stock1' },
                { stock: 'stock2' },
                { stock: 'stock3' }
            ]
        }
    },
    methods: {
        addStock: function () {
            this.$data.items.push({ stock: 'stock' + (this.$data.items.length + 1) });
        },
        limitRange: function (event) {
            var stocks = document.getElementsByClassName('stock-alloc');
            var stockTotal = 0;
            [].forEach.call(stocks, function (st) {
                stockTotal += parseInt(st.value);
            });
            var remainingBar = document.getElementById('remainingPercentInner');
            var range = event.target;
            if (stockTotal > 100) {
                range.value -= stockTotal - 100;
                stockTotal = 100;
            }
            remainingBar.style.width = '' + (100 - stockTotal) + '%';
        }
    },
    components: {
    }
}
</script>

<style>
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

div#remainingPercentInner {
    width: 50%;
    height: 100%;
    background-color: #f0f;
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

<template>
    <div>
        <h3>Add Stock</h3>
        <typeahead
            :data="stockSymbols"
            :match-start="matchStart"
            :template="customTemplate"
            :on-hit="recordSelection"
            placeholder="Enter Stock Symbol">
        </typeahead>
        <br>
        <br>
        <hr>
        <div v-if="selectedStocks.length > 0">
            <h4>Newly Added Stocks <span class="badge">{{selectedStocks.length}}</span></h4>
            <ul class="list-group">
                <transition-group name="slide" mode="out-in">
                <li
                    class="list-group-item"
                    :key="stock"
                    v-for="(stock, i) in selectedStocks"><span class="badge">{{stock}}</span>{{ getCompany(stock) }}</li>
                </transition-group>
            </ul>
        </div>
    </div>
</template>

<script>
    import { allStocks } from '../data/allstocks';
    import typeahead  from './Typeahead.vue'; // customized local copy to show symbol and company name

    export default {
        data() {
            return {
                matchStart: true,
                stockSymbols: allStocks,
                customTemplate: '<span>{{ item.symbol }}  ({{ item.name }}) </span>',
                selectedStocks: [],
            }
        },
        methods: {
            recordSelection(item) {
                if (this.selectedStocks.indexOf(item) === -1) {
                    this.selectedStocks.push(item);
                }
            },
            getCompany(symbol) {
                return allStocks.get(symbol);
            }
        },
        components: {
            typeahead
        }
    }
</script>

<style scoped>

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
    }

    .slide-move {
        transition: transform 1s;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
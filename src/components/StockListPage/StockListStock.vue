<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel" :class="{'panel-success': trendUp, 'panel-danger': trendDown, 'panel-info': trendEq}">
            <div class="panel-heading">
                <h3 class="panel-title">{{stock.symbol}}  <small>{{stock.name}}</small></h3>
            </div>
            <div class="panel-body">
                <div class="pull-left text-center">
                    <span class="glyphicon" v-bind:class="{'glyphicon-chevron-up': trendUp, 'text-success': trendUp, 'glyphicon-chevron-down': trendDown, 'text-danger': trendDown, 'glyphicon-retweet': trendEq}" aria-hidden="true"></span>
                    <p class="stockchange">{{stock.change}}</p>
                </div>
                <div class="stockprice text-center">{{stock.price}}</div>
                </div>
                <div class="panel-footer clearfix">
                <div class="pull-right">
                    <button
                        class="btn btn-danger"
                        @click="deleteStock"
                        >Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['stock'],
        data() {
            return {
                trendUp: false,
                trendDown: false,
                trendEq: true,
            }
        },
        methods: {
            deleteStock() {
                this.$store.dispatch('delStock', this.stock.symbol);
            },
            getStockData() {
            this.$http.jsonp('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + this.stock.symbol)
                .then(response => response.json())
                .then(data => {
                    if (data) {

                        this.stock.name = data.Name;
                        this.stock.change = data.Change;
                        this.stock.price = data.LastPrice;

                        if (this.stock.change > 0) {
                            this.trendUp = true;
                            this.trendEq = false;
                        } else if (this.stock.change < 0) {
                            this.trendDown = true;
                            this.trendEq = false;
                        } else {
                            this.trendUp = false;
                            this.trendDown = false;
                            this.trendEq = true;
                        }

                        // get new stock data every 60 seconds
                        setTimeout(this.getStockData, 60000);
                    }
                });            
            }
        },
        created() {
            this.getStockData();
        }
    }
</script>

<style scoped>
    span.glyphicon {
        font-size: 3.2em;
    }
    .stockprice {
        font-size: 3.2em;
    }
    .stockchange {
        font-size: 1.2em;
    }
</style>

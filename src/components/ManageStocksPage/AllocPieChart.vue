<template>
    <div>
        <div>
            <div class="panel well">
                <highcharts ref="pie" :options="this.$data.options"></highcharts>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['remaining'],
    data() {
        return {
            history: [],
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                colors: ['#21b6a8', '#b6212d', '#b67721', '#9be1fb', '#006295', '#f37338', '#fdb632',
                    '#801638', '#b0e57c', '#ffaeae', '#7a3e48', '#666633', '#266a2e', '#34dddd'],
                title: {
                    text: 'Stocks'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                if (this.y > 0) {
                                    return '' + this.key + ': ' + this.y + '%';
                                }
                            },
                            style: {
                                color: 'black'
                            }
                        }
                    }
                },
                series: [{
                    animation: false,
                    name: 'Stocks',
                    colorByPoint: true,
                    data: []
                }]
            } // options
        }
    },
    computed: {
    },
    methods: {
        setAlloc() {
            console.log(this.$store.getters.allocations);
            let data = [];
            let alloc = this.$store.getters.allocations;
            let totalAlloc = 0;
            for (let s in alloc) {
                let percent = parseInt(alloc[s].percent);
                totalAlloc += percent;
                data.push({
                    name: alloc[s].symbol,
                    y: percent
                });
            }
            let remaining = 100.0 - totalAlloc;
            data.push({
                name: 'Unallocated',
                y: 100.0 - totalAlloc,
                color: '#111'
            });
            this.$refs.pie.chart.series[0].setData(data, true, false);
        }
    },
    mounted() {
        this.setAlloc();
    }
}
</script>

<style>

</style>

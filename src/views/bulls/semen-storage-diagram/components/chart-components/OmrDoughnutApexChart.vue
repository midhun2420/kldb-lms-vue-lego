<template>
    <div>
        <div id="chart" class="pos-r">
            <apexchart style="cursor: pointer"
                       type="donut" :options="chartOptions" :series="series" ref="chart"></apexchart>
            <h4 class="font-poppins-bold pos-a title-position">OMR {{ storageName }}</h4>
        </div>
    </div>

</template>

<script>
export default {
    name: 'OmrDoughnutApexChart',
    props: {
        storageName: {
            type: String
        }
    },
    data () {
        return {
            series: [
                1, 1, 1, 1, 1, 1
            ],
            // labels: ['Apple', 'Mango', 'Banana', 'Papaya', 'Orange'],
            chartOptions: {
                chart: {
                    type: 'donut',
                    events: {
                        dataPointSelection: this.dataPointSelectionHandler
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                dataLabels: {
                    enabled: true,
                    formatter: function (val, item) {
                        console.log('val', val, item);
                        // return val + '%';
                        const labelsText = ['A', 'B', 'C', 'D', 'E', 'F'];
                        return labelsText[item.seriesIndex];
                    },
                    borderColor: ['#000'],
                    style: {
                        colors: ['#3954A4'],
                        // backgroundColours: ['#000', '#f00'],
                        background: {
                            enabled: true,
                            borderColor: '#000'
                        },
                        borderColor: ['#000']
                    },

                    onItemHover: {
                        highlightDataSeries: true
                    },
                    // activeOffset: 50,
                    // offsetX: 6,
                    dropShadow: {
                        enabled: false,
                        top: -2,
                        left: 5,
                        blur: 8,
                        opacity: 1
                    }
                },
                fill: {
                    colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                },
                selection: {
                    enabled: true,
                    type: 'x',
                    fill: {
                        color: '#000',
                        opacity: 0.1
                    }
                },
                stroke: {
                    colors: ['#c8d0e6'],
                    opacity: 0.8
                },
                markers: {
                    colors: ['#F44336', '#E91E63', '#9C27B0']
                },
                grid: {
                    borderColor: '#000'
                },
                legend: {
                    show: false
                },
                tooltip: {
                    show: false,
                    enabled: false
                }
            }
        };
    },
    methods:
        {
            dataPointSelectionHandler (event, chartContext, config, seriesIndex) {
                console.log('dataPointSelectionHandler');
                console.log(event, chartContext, config);
                const seriesLabelsText = ['A', 'B', 'C', 'D', 'E', 'F'];
                this.$emit('event-test', seriesLabelsText[config.dataPointIndex]);
            }
        }
};
</script>

<style scoped>
.title-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

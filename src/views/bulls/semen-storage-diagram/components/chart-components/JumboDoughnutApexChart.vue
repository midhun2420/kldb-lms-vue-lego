<template>
  <div id="chart">
    <div class="pos-r">
      <apexchart style="cursor: pointer" ref="apexChart"
                 type="donut" :options="chartOptions" :series="series"></apexchart>
      <h4 class="text-primary font-poppins-bold pos-a title-position">{{ storageName }}</h4>
    </div>
    <div class="mt-5 fl-x ml-lg-7">
      <chart-labels text="Filled" box-bg-color="10"></chart-labels>
      <chart-labels text="Partially Filled" box-bg-color="9" class="ml-4"></chart-labels>
      <chart-labels text="Vacant" box-bg-color="8" class="ml-4"></chart-labels>
    </div>
  </div>
</template>

<script>
import ChartLabels from './ChartLabels';

export default {
    name: 'DoughnutApexChart',
    components: { ChartLabels },
    props: {
        colorsArray: {
            type: Array
        },
        storageName: {
            type: String
        }
    },
    mounted () {
        console.log('Colour: ', this.colorsArray);
    },
    watch: {
        colorsArray: function (newColorsArray, oldColorsArray) {
            this.chartOptions.fill.colors = newColorsArray;
            console.log('new colors');
            this.$refs.apexChart.refresh();
        }
    },
    data () {
        return {
            series: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ],
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
                        // console.log('val', val, item);
                        // return val + '%';
                        return item.seriesIndex + 1;
                    },
                    style: {
                        colors: ['#fff'],
                        backgroundColours: ['#000', '#f00']
                    },
                    onItemHover: {
                        highlightDataSeries: true
                    },
                    activeOffset: 50,
                    offsetX: 6,
                    // dropShadow: {
                    //     enabled: false,
                    //     top: -2,
                    //     left: 5,
                    //     blur: 8,
                    //     opacity: 0.5
                    // },
                    activeDropShadow: {
                        enabled: false,
                        top: -2,
                        left: 18,
                        blur: 10,
                        opacity: 0.5
                    }
                },
                fill: {
                    // colors: ['#e35151', '#f4c431', '#00a86b', '#e35151', '#00a86b', '#f4c431', '#e35151', '#f4c431', '#e35151', '#e35151', '#f4c431']
                    colors: []
                },

                // stroke: {
                //     show: false
                // },
                selection: {
                    enabled: true,
                    fill: {
                        colors: []
                        // colors: ['#e35151', '#f4c431', '#00a86b', '#e35151', '#00a86b', '#f4c431', '#e35151', '#f4c431', '#e35151', '#e35151', '#f4c431']
                    },
                    stroke: {
                        width: 1,
                        dashArray: 3,
                        color: '#fff',
                        opacity: 0.4
                    }
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
    methods: {
        dataPointSelectionHandler (event, chartContext, config, seriesIndex) {
            this.$emit('item-selected', config.dataPointIndex + 1);
        }
    }
};
</script>

<style scoped>
.title-position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

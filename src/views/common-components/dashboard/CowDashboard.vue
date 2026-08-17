<template>
    <div>
        <div v-if="data">
            <h5 class="text-primary mb-5 font-poppins-semibold mt-4">COW</h5>
            <div class="row">
                <div class="col-lg-3 mb-5">
                    <dashboard-card text="Total Cows Once Calved" :value="data.cows_once_calved || '0'"></dashboard-card>
                </div>
                <div class="col-lg-3 mb-5">
                    <dashboard-card text="Total Heifers" :value="data.total_heifer || '0'"></dashboard-card>
                </div>
                <div class="col-lg-3 mb-5">
                    <dashboard-card text="Total Breeding stock (COW)" :value="data.total_breeding_stock || '0'"></dashboard-card>
                </div>
                <div class="col-lg-3 mb-5" v-for="(item,index) in data.breed_data" :key="index">
                    <dashboard-card :text=item.breed :value="item.count || '0'"></dashboard-card>
                </div>
            </div>
            <div class="row mt-6">
                <div class="column">
                    <div class="col-lg-3">
                        <dashboard-card text="Total Cow" :value="data.total_cow || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Total Milking" :value="data.total_milking || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in milk pregnant" :value="data.milking_pregnant || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in milk open" :value="data.milking_open || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in milk covered" :value="data.milking_covered || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in VWP" :value="data.vwp || '0'"></dashboard-card>
                    </div>
                </div>
                <div class="column">
                    <div class="col-lg-3">
                        <dashboard-card text="Wet Dry Ratio" :value="data.wet_dry_ratio || '0:0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text=" Total Drying" :value="data.total_drying || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in dry pregnant" :value="data.drying_pregnant || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in dry open" :value="data.drying_open || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Cows in dry covered" :value="data.drying_covered || '0'"></dashboard-card>
                    </div>
                </div>
                <div class="column ml-8">
                    <div class="col-lg-3">
                        <dashboard-card text="Heifer > 18 months" :value="data.heifer_18_month || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Heifer > 18 months (pregnant)" :value="data.heifer_18_month_pregnant || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Heifer > 18 months (covered)" :value="data.heifer_18_month_covered || '0'"></dashboard-card>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <dashboard-card text="Heifer > 18 months (open)" :value="data.heifer_18_month_open || '0'"></dashboard-card>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <div class="fl-x-cc">
                <loading-animation/>
                <b class="ml-3">Please Wait...</b>
            </div>
        </template>
    </div>
</template>

<script>
import DashboardCard from './DashboardCard';
import axios from 'secure-axios';
import urls from '../../../data/urls';

export default {
    name: 'CowDashboard',
    components: { DashboardCard },
    data () {
        return {
            data: ''
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        async loadData () {
            try {
                const response = await axios.get(urls.dashboard.cow);
                const data = response.data;
                this.data = data.data;
                console.log('response data: ', this.data);
                if (data.success) {
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
            }
        }
    }
};
</script>

<style scoped>

</style>

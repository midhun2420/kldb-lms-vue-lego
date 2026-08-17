<template>
    <div class="mt-5">
        <div v-if="data">
            <h6 class="font-poppins-semibold text-dark mb-3">Ineligible for Breeding</h6>
            <div class="bb-1"></div>
            <div class="row mt-4">
                <div class="col-lg-4">
                    <dashboard-card-one text="OPU/IVF/ET" :value="data.et || '0'"></dashboard-card-one>
                </div>
                <div class="col-lg-4">
                    <dashboard-card-one text="Training" :value="data.training || '0'"></dashboard-card-one>
                </div>
                <div class="col-lg-4">
                    <dashboard-card-one text="Others" :value="data.others || '0'"></dashboard-card-one>
                </div>
            </div>
            <div class="row mt-6">
                <div class="col-lg-8">
                    <h6 class="font-poppins-semibold text-dark mb-3">Milk Production</h6>
                    <div class="bb-1"></div>
                    <div class="fl-x">
                        <div class="col-lg-6 pl-0">
                            <div class="mt-3 w-25r">
                                <dashboard-card-one :text=lastMonth :value="data.production.last_month || '0'"></dashboard-card-one>
                            </div>
                            <div class="mt-4 w-25r">
                                <dashboard-card-one :text=wetAvg :value="data.production.wet_average || '0'"></dashboard-card-one>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mt-3 w-25r">
                                <dashboard-card-one :text=lastDay :value="data.production.last_day || '0'"></dashboard-card-one>
                            </div>
                            <div class="mt-4 w-25r">
                                <dashboard-card-one text="Average DIM" :value="data.production.average_dim || '0'"></dashboard-card-one>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Top Cow</h6>
                    <div class="bb-1"></div>
                    <breeding-table class="mt-3" :data-list="data.top_cow || '0'"></breeding-table>
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
import BreedingTable from '../../../components/BreedingTable';
import DashboardCardOne from './DashboardCardOne';
import axios from 'secure-axios';
import urls from '../../../data/urls';

export default {
    name: 'Breeding',
    components: { DashboardCardOne, BreedingTable },
    data () {
        return {
            wetAvg: '',
            lastDay: '',
            lastMonth: '',
            data: ''
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        async loadData () {
            try {
                const response = await axios.get(urls.dashboard.breeding);
                const data = response.data;
                this.data = data.data;
                console.log('response: ', this.data);
                if (data.success) {
                    this.wetAvg = 'Wet Average (' + this.data.production.last_date + ')';
                    this.lastDay = 'Last Day (' + this.data.production.last_date + ')';
                    this.lastMonth = 'Last Month (' + this.data.production.last_month_name + ')';
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

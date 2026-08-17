<template>
    <div class="home of-h full-height">
        <h4 class="text-primary mb-5 font-poppins-semibold">DASHBOARD</h4>
        <div class="row bb-1" v-if="data">
            <div class="col-lg-3 mb-5">
                <dashboard-card text="Total Animals" :value="data.total_animal || '0'"></dashboard-card>
            </div>
            <div class="col-lg-3">
                <dashboard-card text="Total Male" :value="data.total_male || '0'"></dashboard-card>
            </div>
            <div class="col-lg-3">
                <dashboard-card text="Total Female" :value="data.total_female || '0'"></dashboard-card>
            </div>
        </div>
        <template v-else>
                <div class="fl-x-cc">
                    <loading-animation/>
                    <b class="ml-3">Please Wait...</b>
                </div>
        </template>
        <div class="row px-lg-3">
            <cow-dashboard></cow-dashboard>
        </div>
        <div class="">
            <breeding></breeding>
        </div>
        <div class="">
            <bull-dashboard></bull-dashboard>
        </div>
        <div class=" ml-3">
            <bull-produced></bull-produced>
        </div>
    </div>
</template>

<script>
import DashboardCard from './common-components/dashboard/DashboardCard';
import CowDashboard from './common-components/dashboard/CowDashboard';
import Breeding from './common-components/dashboard/Breeding';
import BullProduced from './common-components/dashboard/BullProduced';
import BullDashboard from './common-components/dashboard/BullDashboard';
import axios from 'secure-axios';
import urls from '../data/urls';
export default {
    name: 'Dashboard',
    components: { BullDashboard, BullProduced, Breeding, CowDashboard, DashboardCard },
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
                const response = await axios.get(urls.dashboard.topPart);
                const data = response.data;
                this.data = data.data;
                console.log('response: ', this.data);
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

<template>
    <div class="home of-h min-h-70v">
        <h4 class="text-primary text-center mb-6 font-poppins-semibold">REPORTS</h4>
        <div class="row px-5">
            <div class="col-lg-3">
                <dashboard-card-item to="/reports/bulls/" text="Bulls"></dashboard-card-item>
            </div>
            <div class="col-lg-3">
                <dashboard-card-item to="/reports/cows/" text="Cow"></dashboard-card-item>
            </div>
            <div class="col-lg-3">
                <dashboard-card-item to="/reports/others/" text="General"></dashboard-card-item>
            </div>
            <div class="col-lg-3">
                <dashboard-card-item to="/reports/quality-control/" text="Quality Control"></dashboard-card-item>
            </div>
            </div>
        <div>
            <br>
        </div>
        <div class="row px-5">
            <div class="col-lg-3">
                <dashboard-card-item to="/reports/training/" text="Training"></dashboard-card-item>
            </div>

        </div>
    </div>

</template>

<script>
import DashboardCardItem from '@components/ui/DashboardCardItem';

export default {
    name: 'reportsHome',
    components: { DashboardCardItem },
    data () {
        return {
            content: ''
        };
    }
};

</script>
<style scoped>

</style>

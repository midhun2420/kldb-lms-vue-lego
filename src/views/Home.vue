<template>
    <div class="home of-h full-height">
        <h4 class="text-primary text-center mb-6 font-poppins-semibold">HOME</h4>
        <div class="row px-5">
            <div class="col-lg-3">
                <dashboard-card-item to="/dashboard/" text="Dashboard"></dashboard-card-item>
<!--                <dashboard-card-item to="/" text="Semen Station"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3">
                <dashboard-card-item to="/semen-station/" text="Semen Station"></dashboard-card-item>
<!--                <dashboard-card-item to="/" text="Semen Station"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3">
                <dashboard-card-item text="Quality Control" to="/quality-control/"></dashboard-card-item>
<!--                <dashboard-card-item text="Quality Control" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3">
                <dashboard-card-item text="AH Section" to="/ah-section/"></dashboard-card-item>
<!--                <dashboard-card-item text="AH Section" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Embryo Transfer" to="/embryo-transfer/"></dashboard-card-item>
<!--                <dashboard-card-item text="Embryo Transfer" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Fodder Section" to="/fodder/"></dashboard-card-item>
<!--                <dashboard-card-item text="Fodder Section" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Training Centre" to="/training-center/"></dashboard-card-item>
<!--                <dashboard-card-item text="Training Centre" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="General" to="/general/"></dashboard-card-item>
<!--                <dashboard-card-item text="General" to="/"></dashboard-card-item>-->
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Reports" to="/reports/"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Master data" to="/master-data/"></dashboard-card-item>
            </div>
        </div>
    </div>

</template>

<script>
import DashboardCardItem from '@components/ui/DashboardCardItem';

export default {
    name: 'Home',
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

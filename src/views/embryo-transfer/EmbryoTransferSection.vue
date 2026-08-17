<template>
    <div class="home of-h min-h-70v">
        <h4 class="text-primary text-center mb-6 font-poppins-semibold">EMBRYO TRANSFER SECTION</h4>
        <div class="row px-5">
<!--            <div class="col-lg-3">-->
<!--                <dashboard-card-item to="/embryo-production/" text="Embryo Production"></dashboard-card-item>-->
<!--            </div>-->
            <div class="col-lg-3">
                <dashboard-card-item text="Embryo Stock" to="/embryo-stock/"></dashboard-card-item>
            </div>
              <div class="col-lg-3">
                <dashboard-card-item text="Embryo Transfer" to="/embryo-transfer-page/"></dashboard-card-item>
            </div>
        </div>
    </div>

</template>

<script>
import DashboardCardItem from '../../components/ui/DashboardCardItem';

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

<template>
     <div class="py-5 of-h full-height">
        <h4 class="text-primary text-center mb-6 font-poppins-semibold">GENERAL</h4>
        <div class="row px-5">
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Proposal" to="/animal-proposal-list/"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Disposal" to="/animal-disposal-list/"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Post-Mortem Details" to="/postmortem-details/"></dashboard-card-item>
            </div>

            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Semen Receipt" to="/semen-receipt/" ></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Semen Receipt Storage Add" to="/semen-receipt-storage-add/" ></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Shed Transfer" to="/shed-transfer/" ></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Milk Feeding" to="/milk-feeding/" ></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3">
                <dashboard-card-item text="Observation" to="/observation-page/"></dashboard-card-item>
            </div>
<!--            <div class="col-lg-3 mt-lg-3">-->
<!--                <dashboard-card-item text="Stock Register" to="/stock-register-page-1/"></dashboard-card-item>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'General'
};
</script>

<style scoped>

</style>

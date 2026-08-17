<template>
    <div class="py-5 of-h min-h-70v">
        <h4 class="text-primary text-center mb-6 font-poppins-semibold">FODDER SECTION</h4>
        <div class="row px-5">
            <div class="col-lg-3">
                <dashboard-card-item text="Fodder Production" to="/fodder-production/"></dashboard-card-item>
            </div>
            <div class="col-lg-3">
                <dashboard-card-item text="Fodder Distribution" to="/fodder-distribution/" ></dashboard-card-item>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Fodder'
};
</script>

<style scoped>

</style>

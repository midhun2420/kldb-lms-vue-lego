<template>
    <div>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Semen Evaluation by Flow Cytometer</h2>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-date-picker label="Date of the test" class="c-input-datepicker text-black"></validated-date-picker>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                <validated-date-picker label="Date of Production" class="c-input-datepicker text-black"></validated-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SemenEvaluation'
};
</script>

<style scoped>

</style>

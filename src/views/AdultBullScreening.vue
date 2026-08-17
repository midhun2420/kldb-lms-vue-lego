<template>
    <div>
        <h2 class="head font-poppins-bold mt-3">Adult Bull Screening</h2>
        <div class="col-lg-9 pt-4 fl-x">
            <div class="form-group w-15v">
                <validated-vue-select label="Disease Type" class="c-input-select"></validated-vue-select>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Screening Type" class="c-input-select"></validated-vue-select>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Screening Duration" class="c-input-select"></validated-vue-select>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Agency" class="c-input-select"></validated-vue-select>
            </div>
        </div>
        <div class="col-lg-9 pt-4 fl-x">
            <div class="form-group w-15v">
                <validated-date-picker label="Result Date"></validated-date-picker>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Shed No" class="c-input-select"></validated-vue-select>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Animals" class="c-input-select"></validated-vue-select>
            </div>
            <div class="form-group pl-3 w-15v">
                <validated-vue-select label="Status" class="c-input-select"></validated-vue-select>
            </div>
        </div>
        <div class="col-lg-9 pt-4 fl-x">
            <div class="form-group">
                <validated-input label="Total Animals(In Shed)"></validated-input>
            </div>
            <div class="form-group pl-3">
                <validated-input label="No of Animals Positive"></validated-input>
            </div>
            <div class="form-group pl-3">
                <validated-input label="No of Animals negative"></validated-input>
            </div>
        </div>
        <div class="col-lg-9 pt-4 fl-x">
            <div class="form-group">
                <validated-input label="Remarks"></validated-input>
            </div>
        </div>
        <div class="column fl-x-br pt-7">
            <btn text="save" class="px-4"></btn>
            <btn class="ml-2" design="basic-b" text="Cancel"></btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdultBullScreening'
};
</script>

<style scoped>
    h2 {
        color: #3954A4;
    }
</style>

<template>
    <s-form>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Artificial Insemination</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-select label="Cow Type" class="c-input-select text-black"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Registration No." class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 mb-3">
                        <h3 class="text-primary fs-lg-2 font-poppins-medium">Details of Heat</h3>
                    </div>
                    <div class="col-lg-3">
                        <validated-date-picker label="Heat Date" class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Time" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-select label="Induced / Natural" class="c-input-select text-black"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Drug Used" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="AI Date" class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                    <div class="col-lg-4">
                        <validated-checkbox label="Double Insemination" class="mt-lg-4"></validated-checkbox>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <custom-single-column-table class="ml-lg-6">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Shed No.</span><span class="ml-1">:</span></li>
                            <li><span>Breed </span><span class="ml-1">:</span></li>
                            <li>Date of Birth <span class="ml-1">:</span></li>
                            <li><span>Bull Allotted</span><span class="ml-1">:</span></li>
                            <li><span>Bull Breed</span><span class="ml-1">:</span></li>
                            <li><span>Attempt No</span> <span class="ml-1">:</span></li>
                        </ul>
                    </template>
                </custom-single-column-table>
            </div>
        </div>
        <div class="row mt-lg-4">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" class="px-4"></btn>
                        <btn text="Cancel" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>

    </s-form>
</template>

<script>

import CustomSingleColumnTable from '../../components/ui/CustomSingleColumTable';

export default {
    name: 'ArtificialInsemination',
    components: { CustomSingleColumnTable }
};
</script>

<style scoped>

</style>

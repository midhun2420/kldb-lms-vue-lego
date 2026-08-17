<template>
    <div>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Calving Details</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-select label="Reg No." class="c-input-select text-black"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date of Calving" class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="No. of female calves" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-select label="No. of male calves" class="c-input-select text-black"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-checkbox label="Twin" class="mt-lg-4"></validated-checkbox>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-select label="No. of dead calves" class="c-input-select text-black"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-select label="Calving Difficulty" class="c-input-select text-black"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <custom-single-column-table class="ml-lg-5">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Re Number :</span></li>
                            <li><span>Date of Birth :</span></li>
                            <li>Breed :</li>
                            <li><span>Pregnancy No </span><span>:</span></li>
                            <li><span>No of Times Calved</span><span>:</span></li>
                            <li><span>Date of Last AI</span> <span>:</span></li>
                            <li><span>Bull No </span> <span>:</span></li>
                            <li><span>No of Attempts</span> <span>:</span></li>
                            <li><span>Pregnancy Term</span> <span>:</span></li>
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

    </div>
</template>

<script>

import CustomSingleColumnTable from '../../components/ui/CustomSingleColumTable';

export default {
    name: 'CalvingDetails',
    components: { CustomSingleColumnTable }
};
</script>

<style scoped>

</style>

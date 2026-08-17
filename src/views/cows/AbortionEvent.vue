<template>
    <div>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Abortion Event</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Registration No." class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date of Abortion" class="c-input-datepicker text-black"></validated-date-picker>
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
                            <li><span>Date of Birth :</span></li>
                            <li>Breed :</li>
                            <li><span>Pregnancy No </span><span>:</span></li>
                            <li><span>No of Times Calved</span><span>:</span></li>
                            <li><span>Date of AI</span> <span>:</span></li>
                            <li><span>No of Attempts</span> <span>:</span></li>
                        </ul>
                    </template>
                </custom-single-column-table>
            </div>
        </div>
        <div class="row mt-lg-7">
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
    name: 'MatingProgram',
    components: { CustomSingleColumnTable }
};
</script>

<style scoped>

</style>

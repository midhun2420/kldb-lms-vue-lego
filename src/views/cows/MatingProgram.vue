<template>
    <div>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Mating Program</h2>
        <div class="row">
            <div class="col-lg-9">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-vue-select label="Shed No." class="c-input-select text-black field-required" ></validated-vue-select>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-vue-select label="Reg No." class="c-input-select text-black"></validated-vue-select>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-vue-select label="Bull Allotted" class="c-input-select text-black"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select label="Bull Breed" class="c-input-select text-black"></validated-vue-select>
                    </div>
                </div>
                 <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker label="Valid From" class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                    <div class="col-lg-3">
                        <validated-date-picker label="Valid To" class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class=""></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <custom-two-column-table heading1="Cow List" heading2="Bull Alloted">
                    <template #column1>
                        <ul class="list-unstyled list-items ml-2">
                            <li>KA 10289</li>
                            <li>KA 12829</li>
                            <li>KA 14394</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                        </ul>
                    </template>
                </custom-two-column-table>
            </div>
        </div>
        <div class="row mt-lg-5">
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
import CustomTwoColumnTable from '../../components/ui/CustomTwoColumnTable';

export default {
    name: 'MatingProgram',
    components: { CustomTwoColumnTable }
};
</script>

<style scoped>

</style>

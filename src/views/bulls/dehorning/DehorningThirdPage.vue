<template>
    <div class="full-height color-txt">
        <s-form>
            <div class="row">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">Dehorning/Disbudding</h3>
                </div>
                <div class="col-lg-2 mt-lg-5">
                    <validated-select class="c-input-select input-border-primary" placeholder="Shed"
                                      :options="shedOptions"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-5 pr-5">
                    <custom-two-column-table></custom-two-column-table>
                </div>
                <div class="col-7">
                    <div class="row px-lg-6">
                        <div class="col-lg-4">
                            <validated-input label="Animal No" v-model="model.animal"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-select class="c-input-select" label="Breed" v-model="model.breed"></validated-select>
                        </div>
                        <div class="col-lg-4">
                            <validated-date-picker format="DD-MM-YYYY"
                                label="Date of Birth" v-model="model.dob"></validated-date-picker>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Age" v-model="model.age"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-select class="c-input-select" label="Dehorning Type" v-model="model.dehorning_type"></validated-select>
                        </div>
                        <div class="col-lg-4">
                            <validated-date-picker class="c-input-datepicker" label="Dehorning Date" v-model="model.dehorningdate"></validated-date-picker>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <h4 class="text-primary fs-lg-1 font-poppins-medium mb-3">Enter Individually</h4>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Animal No / Name" v-model="model.animalno_or_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Shed No" v-model="model.shed_number"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed" v-model="model.breed"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker" label="Date of Birth" v-model="model.dob"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Age" v-model="model.age"></validated-input>
                </div>
                <div class="col-lg-2 mt-3">
                    <validated-select class="c-input-select" label="Dehorning Type" v-model="model.dehorning_type"></validated-select>
                </div>
                <div class="col-lg-2 mt-3">
                    <validated-date-picker class="c-input-datepicker" label="Dehorning Date" v-model="model.dehorningdate"></validated-date-picker>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn text="Cancel" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>

import CustomTwoColumnTable from '../../../components/ui/CustomTwoColumnTable';

export default {
    name: 'DehorningThirdPage',
    components: { CustomTwoColumnTable },
    data () {
        return {
            model: {
                renumber: null,
                breed: null,
                dob: null,
                shed_number: null,
                breeding_value: null,
                animalno_or_name: null,
                age: null,
                dehorning_type: null,
                dehorningdate: null,
                animal: null

            },
            shedOptions: [
                {
                    value: 's4',
                    label: 'shed 4'
                },
                {
                    value: 's9',
                    label: 'Shed 9'
                }
            ]
        };
    }
};
</script>

<style scoped>

</style>

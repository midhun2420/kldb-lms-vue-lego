<template>
    <div class="full-height color-txt">
        <s-form>
            <div class="row">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">Deworming</h3>
                </div>
                <div class="col-lg-2 mt-lg-5">
                    <validated-select class="c-input-select input-border-primary" placeholder="Shed"
                                      :options="shedOptions"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-5 pr-5">
                    <div class="card pl-0 pr-0 pt-5 pb-0 of-h bs-4">

                        <table style="width:100%" class="c-table-1">
                            <thead>
                            </thead>
                            <tbody class="">
                            <tr>
                                <td>KA 10289</td>
                                <td>KA 18529</td>
                            </tr>
                            <tr>
                                <td>KA 12829</td>
                                <td>KA 18630</td>
                            </tr>
                            <tr>
                                <td>KA 14394</td>
                                <td>KA 19620</td>
                            </tr>
                            <tr>
                                <td>KA 15626</td>
                                <td>KA 17001</td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="col-7">
                    <div class="row px-lg-6">
                        <div class="col-lg-4">
                            <validated-input label="Animal" v-model="model.animal"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-select class="c-input-select" label="Breed" v-model="model.breed"></validated-select>
                        </div>
                        <div class="col-lg-4">
                            <validated-date-picker format="DD-MM-YYYY" label="Date of Birth" v-model="model.dob"></validated-date-picker>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Age" v-model="model.age"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Bull Weight" v-model="model.bullweight"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Medicine Dose" v-model="model.medicineqty"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Medicine Name" v-model="model.medicine"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Medicine Batch No" v-model="model.batchno"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Deworming Date"></validated-input>
                        </div>
                        <div class="col-lg-4">
                            <validated-input label="Remarks" v-model="model.remarks"></validated-input>
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
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker" label="Date of Birth"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Age" v-model="model.age"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull Weight" v-model="model.bullweight"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Dose" v-model="model.medicineqty"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Name" v-model="model.medicine"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Batch No" v-model="model.batchno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker" label="Deworming Date" v-model="model.dewormdate"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.remarks"></validated-input>
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

export default {
    name: 'DewormingThirdPage',
    components: { },
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
                animal: null,
                bullweight: null,
                medicineqty: null,
                medicine: null,
                batchno: null,
                dewormdate: null,
                remarks: null

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

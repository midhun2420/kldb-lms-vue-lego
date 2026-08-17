<template>
    <div class="color-txt">
        <div class="container">
            <div class="mt-2">
                <h1 class="text-primary font-poppins-medium mb-4">Semen Collection</h1>
            </div>
            <div>
                <div class="col-lg-12 pl-0 mb-5">
                    <div class="row">
                        <div class="col-lg-4 pl-0">
                            <div class="row pl-0">
                                <div class="col-lg-6">
                                    <validated-date-picker label="Date"
                                                           class="c-input-datepicker" ></validated-date-picker>
                                </div>
                                <div class="col-lg-6">
                                    <validated-select label="Batch" class="c-input-select" v-model="model.batch"></validated-select>
                                </div>
                                <div class="col-lg-6">
                                    <validated-select label="Dose Type" class="c-input-select" v-model="model.dose_type"></validated-select>
                                </div>
                                <div class="col-lg-6 px-4 mt-4">
                                    <validated-file-input class="file-input-design-1"></validated-file-input>
                                </div>
<!--                                <div class="col-lg-6 ">-->
<!--                                    <validated-checkbox label="No collection"></validated-checkbox>-->
<!--                                </div>-->
                                <div class="col-lg-6 px-4 ">
                                    <validated-input label="Collection Days" v-model="model.collection_days"></validated-input>
                                </div>
                                <div class="col-lg-6 px-4 ">
                                    <validated-input label="Evaluation Remarks" v-model="model.eval_remarks"></validated-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4  mt-1">
                            <div class="card b-1 bg-grey">
                                <h5 class="text-primary font-poppins-medium mt-2 mb-3 fl-x-cc">Atmospheric Details</h5>
                                <div class="row pl-0">
                                    <div class="col-lg-6">
                                        <validated-input label="Temp(inside)" class="" v-model="model.temp_inside"></validated-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <validated-input label="Temp(outside)" class="" v-model="model.temp_outside"></validated-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <validated-input label="Humidity(inside)" class="" v-model="model.humidity_inside"></validated-input>
                                    </div>
                                    <div class="col-lg-6 ">
                                        <validated-input label="Humidity(outside)" class="" v-model="model.humidity_outside"></validated-input>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4  mt-1">
                            <div class="card b-1 bg-grey">
                                <h5 class="text-primary font-poppins-medium mt-2 mb-3 fl-x-cc">Atmospheric Details</h5>
                                <div class="row pl-0">
                                    <div class="col-lg-6">
                                        <validated-input label="Buffer PH" class="" v-model="model.buffer_ph"></validated-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <validated-input label="Diluent PH" class="" v-model="model.diluent_ph"></validated-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <validated-input label="Diluent Prepared" class="" v-model="model.diluent_prepared"></validated-input>
                                    </div>
                                    <div class="col-lg-6 ">
                                        <validated-input label="Unused Diluent" class="" v-model="model.unused_diluent"></validated-input>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 w-20r two">
                    <div class="bg-white">
                        <p class=" fl-x-cc font-poppins-semibold pt-2">Bull List</p>
                        <p class="fl-x-cc pb-1">(Not found in excel file)</p>
                    </div>
                    <p class="pl-4 pt-2">KA 5669</p>
                    <p class="pl-4 pt-2">KA 6778</p>
                    <p class="pl-4 pt-2">KA 6762</p>
                </div>

                <div class="col-lg-5 ">
                    <div class="fl-x">
                        <label class="px-5 w-15v">Bull Name</label>
                        <validated-input class="" ></validated-input>
                    </div>
                    <div class="fl-x">
                        <label class="px-5 w-15v">Bull No</label>
                        <validated-input class=" " ></validated-input>
                    </div>
                    <div class="fl-x">
                        <label class="px-5">Ejaculation No</label>
                        <validated-input class="ml-4" v-model="model.ejaculation_no"></validated-input>
                    </div>
                </div>
                <div class="col-lg-2 fl-te-c px-4">
                    <btn>Add</btn>
                </div>

            </div>
            <div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="row py-5">
                <div class="col-lg-3 ">
                    <label>collection</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-select class="c-input-select" v-model="model.collection"></validated-select>
                </div>
                <div class="col-lg-3 px-6">
                    <label>status</label>
                </div>
                <div class="col-lg-3">
                    <validated-vue-select
                        :options="statusOptionURL"
                        class="c-input-select" v-model="model.status"></validated-vue-select>
                </div>
                <div class="col-lg-3 ">
                    <label>Ejaculation No</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-select class="c-input-select" v-model="model.ejaculation_no"></validated-select>
                </div>
                <div class="col-lg-3 pl-6">
                    <label>Rejected Reasons</label>
                </div>
                <div class="col-lg-3">
                    <validated-select class="c-input-select" v-model="model.rejected_reason"></validated-select>
                </div>
                <div class="col-lg-3 ">
                    <label>Time</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.time"></validated-input>
                </div>
                <div class="col-lg-3 px-6">
                    <label>Evaluation Remarks</label>
                </div>
                <div class="col-lg-3">
                    <validated-input class="c-input-select" v-model="model.eval_remarks"></validated-input>
                </div>
                <div class="col-lg-3 ">
                    <label>Volume</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.volume"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>%Motility</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.motility"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Concentration</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.concentration"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>TEV</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.tev"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>SCPD</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.scpd"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Batch</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.batch"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Calculated Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.calculated_dose"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Used Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.used_dose"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Racked Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.racked_dose"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Frozen Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.frozen_dose"></validated-input>
                </div>
                <div class="col-lg-6">
                </div>
                <!--<div class="col-lg-3 ">
                    <label>Freezing Loss</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select"></validated-input>
                </div>-->
                <div class="col-lg-6">
                </div>
                <div class="col-lg-3 ">
                    <label>Recorded Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model.recorded_dose"></validated-input>
                </div>
            </div>
        </div>
        <div class="column fl-x-br pt-7">
            <btn text="save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
            <btn class="ml-2" design="basic-b" text="Cancel"></btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SemenCollectionNew',
    data () {
        return {
            statusOptionURL: [
                { label: 'Accepted', value: 'Accepted' },
                { label: 'Rejected', value: 'Rejected' }
            ],
            loading: false,

            model: {
                collection: null,
                batch: null,
                dose_type: null,
                collection_days: null,
                remarks: null,
                eval_remarks: null,
                temp_inside: null,
                temp_outside: null,
                humidity_inside: null,
                humidity_outside: null,
                buffer_ph: null,
                diluent_ph: null,
                diluent_prepared: null,
                unused_diluent: null,
                ejaculation_no: null,
                time: null,
                volume: null,
                motility: null,
                concentration: null,
                tev: null,
                scpd: null,
                calculated_dose: null,
                used_dose: null,
                racked_dose: null,
                frozen_dose: null,
                recorded_dose: null,
                status: null,
                rejected_reason: null
            }
        };
    }
};
</script>

<style scoped>
.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f4f4f4;
}
</style>

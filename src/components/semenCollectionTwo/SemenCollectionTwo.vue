<template>
    <div>
        <div class="col-lg-12 pl-0 mb-5 ">
            <div class="row">
                <div class="col-lg-4 pl-0">
                    <div class="row pl-0">
                        <div class="col-lg-6">
                            <validated-date-picker label="Date" class="c-input-datepicker" v-model="model.collection_date"></validated-date-picker>
                        </div>
                        <div class="col-lg-6">
                            <validated-ajax-vue-select label="Batch"
                                              :url="batchOptionURL" :rules="{required:true}"
                                              class="c-input-select" v-model="model.batch"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-6">
                            <validated-ajax-vue-select label="Dose Type"
                                                       :url="dosetypeOptionURL" :rules="{required:true}"
                                                       class="c-input-select" v-model="model.dose_type"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-6  mt-4">
                            <validated-file-input class="file-input-design-2 " ></validated-file-input>

                        </div>
                        <div class="col-lg-6 mt-4">
                            <validated-checkbox label="No Collection"></validated-checkbox>
                        </div>
                        <div class="col-lg-5 mt-4">
                            <validated-input label="Collection Days" v-model="model.collection_days"></validated-input>
                        </div>
                        <div class="col-lg-6 px-4 ">
                            <validated-input label="Remarks" v-model="model.remarks"></validated-input>
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
                        <h5 class="text-primary font-poppins-medium mt-2 mb-3 fl-x-cc">Details of Buffer / Diluent</h5>
                        <div class="row pl-0">
                            <div class="col-lg-6">
                                <validated-input label="Buffer PH" class=""  v-model="model.buffer_ph"></validated-input>
                            </div>
                            <div class="col-lg-6">
                                <validated-input label="Diluent PH" class="" v-model="model.diluent_ph"></validated-input>
                            </div>
                            <div class="col-lg-6">
                                <validated-input label="Diluent Prepared" class="" v-model="model.diluent_prepared"></validated-input>
                            </div>
                            <div class="col-lg-6 ">
                                <validated-input label="Unused Diluent" class="" v-model="model.used_dose"></validated-input>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
// import CustomFileInput from '@common-components/semencollection/FileInput';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'SemenCollectionTwo',
    components: {},
    data () {
        return {
            dosetypeOptionURL: masterURLs.master.doseType.vueSelect,
            batchOptionURL: masterURLs.master.batch.vueSelect,
            model: {
                collection_date: null,
                collection: null,
                batch: null,
                dose_type: null,
                remarks: null,
                volume: null,
                used_dose: null,
                collection_days: null,
                temp_inside: null,
                temp_outside: null,
                humidity_inside: null,
                humidity_outside: null,
                buffer_ph: null,
                diluent_ph: null,
                diluent_prepared: null

            }
        };
    }
};
</script>

<style scoped>
.bg-grey {
    background-color: #f4f4f4 !important;
}

.pos-re {
    position: relative;
    top: -16px;
}
</style>

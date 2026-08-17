<template>
    <div class="">
        <div class="col-lg-12 mt-5">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Bull No"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull Name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Ejaculate No"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="FSD Dose" v-model="model.fsd_dose"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="doseTypeOptionURL"
                        label="Dose Type" class="c-input-select" v-model="model.dose_type"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="No of Dose Taken for IBR Screening" v-model="model.no_of_dose_ibr_screening"></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="Actual FSD Dose" v-model="model.actual_fsd_dose"></validated-input>
                </div>
            </div>
            <h4 class="text-primary mt-4">Quaratine Add</h4>

        </div>
        <div class="col-lg-12 mt-4">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Actual FSD" v-model="model.actual_fsd"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Storage Type" v-model="model.fsd_storage_types"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Location" v-model="model.fsd_location"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Goblet Type" v-model="model.fsd_position"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.fsd_remarks"></validated-input>
                </div>
                <div class="col-lg-2 bn">
                    <btn text="View Storage Position" class="mt-4"></btn>

                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="IBR Screening" v-model="model.ibr_screening"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Storage Type" v-model="model.ibr_storage_type"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Location" v-model="model.ibr_location"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Position" v-model="model.ibr_position"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.ibr_remarks"></validated-input>
                </div>

            </div>
        </div>
        <div class="fl-x-br mt-6">
            <btn text="save" :loading="loading" loading-text="Saving..." class="mr-4 px-4"></btn>
            <btn text="cancel" design="basic-b"></btn>
        </div>
    </div>

</template>

<script>
import masterURLs from '../../data/masterURLs';

export default {
    name: 'SemenQuaratineThreeInput',
    data () {
        return {
            loading: false,
            doseTypeOptionURL: masterURLs.master.doseType.vueSelect,
            model: {
                fsd_dose: null,
                no_of_dose_ibr_screening: null,
                dose_type: null,
                actual_fsd_dose: null,
                actual_fsd: null,
                fsd_storage_type: null,
                fsd_location: null,
                fsd_position: null,
                fsd_remarks: null,
                ibr_screening: null,
                ibr_storage_type: null,
                ibr_location: null,
                ibr_position: null,
                semen_collection_animal: null,
                ibr_remarks: null
            }
        };
    }

};
</script>

<style scoped>
    .bn {
        position: relative;
        top: 41px;
    }
</style>

<template>
    <div>

        <s-form @submit="UploadExcel" :key="formKey">
            <div class="col-lg-12 pl-0 mb-5">
                <div class="row">
                    <div class="col-lg-4 pl-0">
                        <div class="row pl-0">
                            <div class="col-lg-6">
                                <validated-date-picker :rules="{required:true}"
                                                       label="Date" class="c-input-datepicker field-required" format="DD-MM-YYYY"
                                                       v-model="model.collection_date"></validated-date-picker>
                            </div>
                            <div class="col-lg-6">
                                <validated-ajax-vue-select label="Batch" multiple
                                                           :url="batchOptionURL" :rules="{required:true}"
                                                           class="c-input-select field-required"
                                                           v-model="model.batches"></validated-ajax-vue-select>
                            </div>
                            <div class="col-lg-6">
                                <validated-ajax-vue-select label="Dose Type"
                                                           :url="dosetypeOptionURL" :rules="{required:true}"
                                                           class="c-input-select field-required"
                                                           v-model="model.dose_type"></validated-ajax-vue-select>
                            </div>
                            <div class="col-lg-6 ">

                                <validated-file-input v-model="model.file" label="File"
                                                      class="file-input-excel-w field-required" label-text="Upload Excel File">
                                </validated-file-input>
                            </div>
                            <div class="col-lg-6  mt-3">
                                <validated-checkbox label="No collection" v-model="model.no_collection"></validated-checkbox>
                            </div>
                            <div class="col-lg-5 pr-5 mt-3">
                                <validated-input class="w-8r"
                                                 label="Collection Days" v-model="model.collection_days"></validated-input>
                            </div>
                            <div class="col-lg-6">
                                <validated-input
                                                 label="Remarks" v-model="model.remarks"></validated-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4  mt-1">
                        <div class="card b-1 bg-grey b-dark mx-4 px-4">
                            <h5 class="text-primary font-poppins-medium mt-2 mb-4 fl-x-cc">Atmospheric Details</h5>
                            <div class="row pl-0">
                                <div class="col-lg-6">
                                    <validated-input label="Temp(inside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.temp_inside"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Temp(outside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.temp_outside"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Humidity(inside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.humidity_inside"></validated-input>
                                </div>
                                <div class="col-lg-6 ">
                                    <validated-input label="Humidity(outside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.humidity_outside"></validated-input>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4  mt-1">
                        <div class="card b-1 bg-grey b-dark mx-4 px-4">
                            <h5 class="text-primary font-poppins-medium mt-2 mb-4 fl-x-cc">Details of Buffer /
                                Diluent</h5>
                            <div class="row pl-0">
                                <div class="col-lg-6">
                                    <validated-input label="Buffer PH" :rules="{required:true}"
                                                     class="field-required" v-model="model.buffer_ph"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Diluent PH" :rules="{required:true}"
                                                     class="field-required" v-model="model.diluent_ph"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Diluent Prepared" :rules="{required:true}"
                                                     class="field-required" v-model="model.diluent_prepared"></validated-input>
                                </div>
                                <div class="col-lg-6 ">
                                    <validated-input label="Unused Diluent" :rules="{required:true}"
                                                     class="field-required" v-model="model.unused_diluent"></validated-input>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col pl-0 mt3">
                        <btn class="" text="Save" type="submit" loading-text="Please wait..." :loading="loading"></btn>
                    </div>

                </div>
            </div>
        </s-form>
    </div>

</template>

<script>
// import CustomFileInput from '@common-components/semencollection/FileInput';

import axios from 'secure-axios';
import masterURLs from '../data/masterURLs';
import urls from '../data/urls';

export default {
    name: 'SemenCollectionone',
    components: {},
    data () {
        return {
            URL: urls.semenCollection.Upload,
            batchOptionURL: masterURLs.master.batch.vueSelect,
            dosetypeOptionURL: masterURLs.master.doseType.vueSelect,
            formKey: 0,
            model: {
                collection_date: '',
                batches: '',
                dose_type: '',
                no_collection: '',
                collection_days: '',
                remarks: '',

                temp_inside: '',
                temp_outside: '',
                humidity_inside: '',
                humidity_outside: '',

                buffer_ph: '',
                diluent_ph: '',
                diluent_prepared: '',
                unused_diluent: '',

                file: ''

            },
            loading: false
        };
    },
    methods: {
        //  added below fn for resetting the form
        resetForm () {
            this.model = {
                collection_date: '',
                batches: '',
                dose_type: '',
                no_collection: '',
                collection_days: '',
                remarks: '',

                temp_inside: '',
                temp_outside: '',
                humidity_inside: '',
                humidity_outside: '',

                buffer_ph: '',
                diluent_ph: '',
                diluent_prepared: '',
                unused_diluent: '',

                file: ''
            };

            // Optional: reset validation state if your s-form supports it
            this.$nextTick(() => {
                if (this.$refs.form) {
                    this.$refs.form.reset();
                }
            });
        },
        loadData () {
            if (this.model.collection_date && this.model.batches) {
                this.$emit('loadData', this.model);
            }
        },
        async UploadExcel () {
            try {
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.formKey++;
                    // this.resetForm();
                    await this.loadData();
                } else {
                    const errors = response.data.errors;
                    if (errors) {
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                let errorMessage = '';
                                if (key === '__all__') {
                                    errorMessage = `${errors[key]}`;
                                } else {
                                    errorMessage = `${key}:  ${errors[key]}`;
                                }
                                this.$notify('Warning', errorMessage, { type: 'warning' });
                                if (errors[key].startsWith('Semen collection already done')) {
                                    this.loadData();
                                }
                            }
                        }
                    } else if (response.data.message) {
                        this.$notify('Warning', response.data.message, { type: 'warning' });
                    } else {

                    }
                    this.loading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.loading = false;
            }
        }
    }

};
</script>

<style scoped>
.bg-grey {
    background-color: #f4f4f4 !important;
}

.w-8r {
    width: 8.6rem !important;
}
</style>

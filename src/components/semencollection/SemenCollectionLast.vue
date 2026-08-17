<template>
    <div>
        <s-form :key="formKey">
            <div class="col-lg-12">
                <div class="row py-5">
                    <div class="col-lg-3 ">
                        <label>collection</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-ajax-vue-select class="c-input-select no-min-h mb-0"
                                                   :url="collectionOptionURL" :rules="{required:true}" name="collection"
                                                   v-model="model.collection"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-3 px-6">
                        <label>status</label>
                    </div>
                    <div class="col-lg-2">
                        <validated-select
                            :options="statusOptionURL"
                            class="c-input-select no-min-h" v-model="model.status"></validated-select>
                    </div>
                    <div class="col-lg-3 ">
                        <label>Ejaculation No</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input type="number" :rules="{required:true}" name="ejaculation no"
                                         class="c-input-select no-min-h" v-model="model.ejaculation_no"></validated-input>
                    </div>
                    <div class="col-lg-3 pl-6" v-if="model.status === 'Rejected' && model.status !== ''">
                        <label>Rejected Reason</label>
                    </div>
                    <div class="col-lg-2" v-if="model.status === 'Rejected' && model.status !== ''">
<!--                        <validated-select-->
<!--                            :options="rejectedReasonsOption"-->
<!--                            class="c-input-select no-min-h" v-model="model.rejected_reason"></validated-select>-->
                        <validated-ajax-vue-select class="c-input-select no-min-h"
                                                   :url="reasonOptionURL" name="rejected_reason"
                                                   v-model="model.rejected_reason"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-3 pl-6" v-if="model.status !== 'Rejected'">
                        <label>Rejected Reason</label>
                    </div>
                    <div class="col-lg-2" v-if="model.status !== 'Rejected'">
<!--                        <validated-ajax-vue-select class="c-input-select no-min-h"-->
<!--                                                   :url="reasonOptionURL" name="rejected_reason"-->
<!--                                                   v-model="model.rejected_reason"></validated-ajax-vue-select>-->
                        <validated-select disabled
                            :url="reasonOptionURL"
                            class="c-input-select no-min-h" v-model="model.rejected_reason"></validated-select>
                    </div>
                    <div class="col-lg-3 ">
                        <label>Time</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.time"  placeholder="HH:MM" :rules="rules.Time"></validated-input>
                    </div>
                    <div class="col-lg-3 px-6">
                        <label>Evaluation Remarks</label>
                    </div>
                    <div class="col-lg-2">
                        <validated-text-area class="c-input-select no-min-h" v-model="model.eval_remark"></validated-text-area>
                    </div>
                    <div class="col-lg-3 ">
                        <label>Volume</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.volume" :rules="{required:true}" name="volume"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>%Motility</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.motility" :rules="{required:true}" name="motility"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Concentration</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.concentration" :rules="{required:true}" name="concentration"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>TEV</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.tev" :rules="{required:true}" name="tev"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>SCPD</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.scpd" :rules="{required:true}" name="scpd"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Batch</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.batch" :rules="{required:true}" name="batch no"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Bull Batch</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-ajax-vue-select class="c-input-select no-min-h"
                                                   :url="batchOptionURL" :rules="{required:true}" name="bull_batch"
                                                   v-model="model.bull_batch"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Calculated Dose</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.calculated_dose" :rules="{required:true}" name="calculated dose"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Used Dose</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.used_dose" :rules="{required:true}" name="used dose"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Racked Dose</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.racked_dose" :rules="{required:true}" name="racked dose"></validated-input>
                    </div>
                    <div class="col-lg-6">

                    </div>
                    <div class="col-lg-3 ">
                        <label>Frozen Dose</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.frozen_dose" :rules="{required:true}"  name="frozen dose"></validated-input>
                    </div>
                    <div class="col-lg-6">
                    </div>
                    <div class="col-lg-3 ">
                        <label>Recorded Dose</label>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="c-input-select no-min-h" v-model="model.recorded_dose" :rules="{required:true}" name="recorded dose"></validated-input>
                    </div>
                </div>

            </div>
        </s-form>

    </div>
</template>

<script>
import masterURLs from '../../data/masterURLs';

import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'SemenCollectionLast',
    props: {
        details: {
            type: Object
        },
        savedDetails: {
            type: Object
        }
    },
    watch: {
        details (newValue, oldValue) {
            if (newValue) {
                this.loadDetails();
            }
        },
        savedDetails (newValue, oldValue) {
            if (newValue) {
                this.loadDetails();
            }
        }
    },
    data () {
        return {
            formKey: 0,
            URL: urls.semenCollection.addEdit,
            statusOptionURL: [
                { label: 'Accepted', value: 'Accepted' },
                { label: 'Rejected', value: 'Rejected' }
            ],
            rejectedReasonsOption: [
                { label: 'Concentration Low', value: 'Concentration Low' },
                { label: 'Low Initial Motility', value: 'Low Initial Motility' },
                { label: 'Contamination', value: 'Contamination' },
                { label: 'Ejaculate Out', value: 'Ejaculate Out' },
                { label: 'Not Mounting', value: 'Not Mounting' },
                { label: 'Water Ejaculate', value: 'Water Ejaculate' },
                { label: 'Not Thrusting', value: 'Not Thrusting' },
                { label: 'Single Ejaculate Regine', value: 'Single Ejaculate Regine' },
                { label: 'Sick', value: 'Sick' },
                { label: 'Accidental Loss', value: 'Accidental Loss' }
            ],

            collectionOptionURL: masterURLs.master.collection.vueSelect,
            batchOptionURL: masterURLs.master.batch.vueSelect,
            reasonOptionURL: masterURLs.master.rejectedReason.vueSelect,

            model: {
                id: '',
                excel_rejected_flag: '',
                collection_date: '',
                collection_batch: '',
                dose_type: '',
                rejected_reason: '',
                collection: '',
                ejaculation_no: '',
                volume: '',
                used_dose: '',
                motility: '',
                batch: '',
                bull_batch: '',
                remarks: '',
                eval_remark: '',
                concentration: '',
                tev: '',
                buffer_ph: '',
                status: '',
                time: '',
                scpd: '',
                racked_dose: '',
                calculated_dose: '',
                frozen_dose: '',
                recorded_dose: ''

            },
            rules: {
                Time: {
                    required: false,
                    customValidator: (value) => {
                        return this.TimeValidation(value);
                    }
                }
            }
        };
    },
    methods: {
        TimeValidation (value) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use HH:MM format.';
            }
            return true;
        },
        loadDetails () {
            this.model.id = this.details.id;
            this.model.excel_rejected_flag = this.details.excel_rejected_flag;
            this.model.collection_date = this.savedDetails.collection_date;
            this.model.collection_batch = this.savedDetails.batches;
            this.model.dose_type = this.savedDetails.dose_type;

            this.model.rejected_reason = this.details.rejected_reason;
            this.model.collection = this.details.collection;
            this.model.ejaculation_no = this.details.ejaculation_no;
            this.model.volume = this.details.volume;
            this.model.used_dose = this.details.used_dose;
            this.model.motility = this.details.motility;
            this.model.batch = this.details.batch;
            this.model.remarks = this.details.remarks || '';
            this.model.eval_remark = this.details.eval_remark || '';
            this.model.concentration = this.details.concentration;
            this.model.tev = this.details.tev;

            this.model.status = this.details.status;
            this.model.time = this.details.time;
            this.model.scpd = this.details.scpd;
            this.model.racked_dose = this.details.racked_dose;
            this.model.calculated_dose = this.details.calculated_dose;
            this.model.frozen_dose = this.details.frozen_dose;
            this.model.recorded_dose = this.details.recorded_dose;
        },
        async addItem () {
            try {
                this.$emit('ss');
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.$emit('st');
                    this.$emit('success');
                    this.model.bull_batch = null;
                    this.formKey++;
                } else {
                    const errors = response.data.errors;

                    if (errors) {
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                const errorMessage = `${key}: ${errors[key]}`;
                                this.$notify('Warning', errorMessage, { type: 'warning' });
                            }
                        }
                    } else if (response.data.message) {
                        this.$notify('Warning', response.data.message, { type: 'warning' });
                    }

                    this.$emit('st');
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$emit('st');
            }
        }

    }
};
</script>

<style scoped>

</style>

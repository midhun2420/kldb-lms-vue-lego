<template>
  <div>
       <div class="row fl-x fl-j-sb">
        <h3 class="text-primary fs-lg-4 font-poppins-semibold">Semen Collection Animal </h3>
    </div>
<!--    <div class="row fl-x fl-j-c">-->
<!--      <h4 class="text-primary">Semen Collection Animal</h4>-->
<!--    </div>-->
    <s-form @submit="addItem">
      <div class="container ">
        <div class="row gap-3 fl-x fl-j-c mt-4">

          <!-- Column 1 -->
          <div class="col-lg-3">
            <label>Collection</label>
            <validated-ajax-vue-select class="c-input-select no-min-h mb-3" :url="collectionOptionURL" v-model="model.collection"></validated-ajax-vue-select>

            <label>Ejaculation No</label>
            <validated-input type="number" class="c-input-select no-min-h mb-3" v-model="model.ejaculation_no"></validated-input>

            <label>Time</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.time" placeholder="HH:MM" :rules="rules.Time"></validated-input>

            <label>Volume</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.volume"></validated-input>

            <label>Concentration</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.concentration"></validated-input>

            <label>Status</label>
            <validated-select :options="statusOptionURL" class="c-input-select no-min-h mb-3" v-model="model.status" disabled></validated-select>
          </div>

          <!-- Column 2 -->
          <div class="col-lg-3">
            <label>TEV</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.tev"></validated-input>

            <label>Bull Batch</label>
            <validated-ajax-vue-select disabled :url="batchOptionURL" class="c-input-select no-min-h mb-3" v-model="model.bull_batch" ></validated-ajax-vue-select>

            <label>Calculated Dose</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.calculated_dose"></validated-input>

            <label>Used Dose</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.used_dose"></validated-input>

            <label>Racked Dose</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.racked_dose"></validated-input>

            <label>Rejected Reason</label>
            <validated-ajax-vue-select :url="reasonOptionURL" class="c-input-select no-min-h mb-3" v-model="model.rejected_reason" :disabled="model.status !== 'Rejected'"></validated-ajax-vue-select>
          </div>
          <!-- Column 3 -->
          <div class="col-lg-3">
            <label>Frozen Dose</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.frozen_dose"></validated-input>
            <label>Batch</label>
            <validated-input class="c-input-select no-min-h mb-3" disabled v-model="model.batch"></validated-input>
            <label>Recorded Dose</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.recorded_dose"></validated-input>
            <label>Motility (%)</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.motility"></validated-input>
            <label>SCPD</label>
            <validated-input class="c-input-select no-min-h mb-3" v-model="model.scpd"></validated-input>
            <label>Evaluation Remarks</label>
            <validated-text-area class="c-input-select no-min-h mb-3" v-model="model.eval_remark"></validated-text-area>
          </div>
          <div class="col-lg-12">
            <div class="row fl-x fl-j-c">
<!--              <div class="col-lg-3">-->
<!--              </div>-->
<!--              <div class="col-lg-3">-->
<!--              </div>-->

            </div>
          </div>
        </div>
       <div class="row mt-4">
          <div class="col fl-x fl-j-e">
            <btn text="Save" type="submit" loading-text="Please wait..." :loading="loading"></btn>
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
    name: 'SemenCollectionAnimalEdit',
    data () {
        return {
            URL: urls.semenCollection.animalEdit,
            reasonOptionURL: masterURLs.master.rejectedReason.vueSelect,
            batchOptionURL: masterURLs.master.batch.vueSelect,
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

            model: {
                id: '',
                bull: '',
                semen_collection: '',
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
    mounted () {
        this.loadEditData();
    },
    methods: {
        async loadEditData () {
            const id = this.$route.params.id;
            console.log(id, 'iddddddddddddddddddddddddddd');
            try {
                const fd = new FormData();
                fd.append('id', id);
                const res = await axios.post(urls.semenCollection.animalDetails, fd);
                console.log(res, 'Response');
                const data = res.data.data;

                // Populate model
                this.model = {
                    id: data.id,
                    bull: data.bull.id,
                    semen_collection: data.semen_collection.id,
                    collection: data.collection,
                    ejaculation_no: data.ejaculation_no,
                    time: data.time,
                    volume: data.volume,
                    used_dose: data.used_dose,
                    motility: data.motility,
                    batch: data.batch,
                    bull_batch: data.bull_batch,
                    buffer_ph: data.buffer_ph ?? '',
                    remarks: data.remarks ?? '',
                    eval_remark: data.eval_remark ?? '',
                    concentration: data.concentration,
                    tev: data.tev,
                    scpd: data.scpd,
                    calculated_dose: data.calculated_dose,
                    frozen_dose: data.frozen_dose,
                    racked_dose: data.racked_dose,
                    recorded_dose: data.recorded_dose,
                    status: data.status,
                    rejected_reason: data.rejected_reason ?? ''
                };
            } catch (error) {
                console.error(error);
                this.$notify('Error', 'Unable to load data', { type: 'danger' });
            }
        },
        TimeValidation (value) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use HH:MM format.';
            }
            return true;
        },
        async addItem () {
            try {
                this.$emit('ss');
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    this.$emit('st');
                    this.$emit('success');
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

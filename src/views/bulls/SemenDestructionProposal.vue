<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Destruction - Proposal</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form class="color-txt" @submit="addItem" ref="form">
            <div class="row">
                <div class="col-lg-2">
                    <validated-date-picker label="Date of Proposal" @input="loadProposalData" format="DD-MM-YYYY"
                                           class="c-input-datepicker field-required" v-model="model.proposal_date" :rules="{required:true}"></validated-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="bullOptionURL"
                        label="Bull Reg No" v-model="model.bull" :rules="{required:true}" class="field-required c-input-select" @input="loadDetails"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Renumber" v-model="details.renumber" disable=true></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Name" v-model="details.name" disable=true></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="breedOptionURL"
                        class="c-input-select" disabled label="Breed" v-model="details.breed" disable=true></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required"
                                                               @input="loadStorage"
                                                               :url="DoseTypeOptionURL" :rules="{required:true}"
                                                               label="Dose Type" v-model="model.dose_type"></validated-ajax-vue-select>
<!--                    <validated-input label="Dose Type" v-model="model.dose_type"></validated-input>-->
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-input class="c-input-select field-required" label="Reason for Disposal" v-model="model.disposal_reason" :rules="{required:true}"></validated-input>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="reasonForDisposalOptionURL" class="c-input-select field-required" label="Reason for Disposal" v-model="model.disposal_reason" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-date-picker label="Date of Screening"
                                           class="c-input-datepicker field-required" v-model="model.screening_date" format="DD-MM-YYYY"
                                           :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-date-picker label="Date of Result"
                                           class="c-input-datepicker field-required" v-model="model.result_date" format="DD-MM-YYYY"
                                           :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-date-picker label="Date of Last Negative"
                                           class="c-input-datepicker field-required" v-model="model.last_neg_date" format="DD-MM-YYYY"
                                           :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-select :options="storageOptions"
                                                      class="c-input-select field-required" label="Storage Location" :rules="{required:true}"
                                      v-model="model.storage_loc_dose" @input="loadDose"></validated-select>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="No of Dose Disposed" :rules="{required:true}"
                                     class="field-required" v-model="model.dose_disposed_no" disabled></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <!--                    <btn text="Add" class="mt-4 px-4"></btn>-->
                    <btn text="Save" :loading="loading" loading-text="Saving..."  class="mt-4 px-4"></btn>
                </div>
                <div class="col-4 mt-3" v-if="model.proposal_date">
                    <div class="card pl-0 pr-0 pt-0 pb-0 of-h">
                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg--1">Proposal for Semen Destruction</div>
                        <table style="width:100%" class="c-table-1">
                            <thead>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Bull No</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Breed</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Dose Type</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Dose Disposed</h5></th>
                            </thead>
                            <tbody class="">
                            <tr v-for="(item, i) in viewData" :key="i">
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.bull.breed }}</td>
                                <td>{{ item.dose_type }}</td>
                                <td>{{ item.dose_disposed_no }}</td>

                            </tr>
                            </tbody>

                        </table>

                    </div>
                </div>

            </div>

            <div class="row mt-lg-4">
                <div class="col-12">
                    <div class="fl-te-c mt-6">
                        <btn type="button" text="Generate Report" class="mr-4 " @click="downloadReport">Generate Report</btn>

                        <div class="btn-group">
                            <!--                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>-->
                            <btn text="Cancel" design="basic-b" type="reset" @click="BackToHome" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>

    </div>
</template>

<script>
// import CustomFourColumnTable from '../components/ui/CustomFourColumTable';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'SemenDestructionProposal',
    components: {},
    data () {
        return {
            loadData: false,
            URL: urls.semenDestructionProposal.addEdit,
            breedOptionURL: masterURLs.master.breed.vueSelect,
            reasonForDisposalOptionURL: masterURLs.master.reasonForDisposal.vueSelect,
            // bullOptionURL: urls.bulls.vueSelect + '?status=Regularized',
            bullOptionURL: urls.bulls.allVueSelect,
            DoseTypeOptionURL: masterURLs.master.doseType.vueSelect,
            loading: false,
            formKey: 0,
            viewData: [],
            storageOptions: [],
            model: {
                proposal_date: '',
                bull: '',
                disposal_reason: '',
                screening_date: '',
                result_date: '',
                last_neg_date: '',
                storage_loc_dose: '',
                dose_disposed_no: '',
                dose_type: '',
                semen_quarantine: ''

            },
            details: {
                renumber: '',
                name: '',
                breed: '',
                shed_number: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }
            }

        };
    },
    methods: {
    /*    async saving () {
            this.addItem();
            this.loadData();
        }, */
        Validation (date) {
            const dob = this.model.proposal_date;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateObj >= dobDateObj) {
                return 'Date should be before the date of Proposal Date.';
            }

            return true;
        },
        clearData () {
            this.model.proposal_date = '';
            this.model.bull = '';
            this.details.renumber = '';
            this.details.name = '';
            this.details.breed = '';
            this.model.dose_type = '';
            this.model.disposal_reason = '';
            this.model.screening_date = '';
            this.model.result_date = '';
            this.model.last_neg_date = '';
            this.model.storage_loc_dose = '';
            this.model.dose_disposed_no = '';
            this.$refs.form.reset();
        },
        async loadStorage () {
            this.loadData = true;
            this.model.storage_loc_dose = '';
            this.storageOptions = [];
            if (this.model.bull && this.model.dose_type) {
                const response = await axios.form(urls.semenDestructionProposal.storageDetails, {
                    bull: this.model.bull,
                    dose_type: this.model.dose_type
                });
                this.storageOptions = response.data.data;
                this.loadData = false;
            } else {
                this.loadData = false;
            }
        },
        async loadDose () {
            try {
                const storageOptionsResponse = await axios.form(urls.semenDestructionProposal.storageDetails, {
                    bull: this.model.bull,
                    dose_type: this.model.dose_type
                });
                const storageOptions = storageOptionsResponse.data.data;

                const selectedStorage = storageOptions.find(option => option.value === this.model.storage_loc_dose);

                if (selectedStorage) {
                    this.model.dose_disposed_no = selectedStorage.dose;
                    this.model.semen_quarantine = selectedStorage.id;
                }
            } catch (error) {
                console.error('Error loading dose:', error);
                // Handle the error, e.g., show a notification to the user
                this.$notify('Error loading dose information', 'Error', { type: 'error' });
            }
        },
        async downloadReport () {
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.semenDestructionProposal.downloadReport + '?proposal_date=' + this.model.proposal_date);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    window.open(json.url);
                    that.model.proposal_date = '';
                } else {
                    that.downloading = false;
                    that.$notify(json.message, 'Error', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.$notify('No data found for the selected date range.', 'Error', { type: 'warning' });
            }
        },
        async loadProposalData () {
            console.log('function called load data', this.model.proposal_date);
            this.viewData = [];
            const response = await axios.form(urls.semenDestructionProposal.list, { proposal_date: this.model.proposal_date });
            console.log('Response', response);
            this.viewData = response.data.data;
            console.log('response', this.data);
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                if (response.data.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    /*  await this.loadData(); */
                    this.loading = false;
                    await this.clearData();
                    await this.loadProposalData();
                    // this.dataclear();
                    // if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                    //     this.$refs.form.reset();
                    // }
                    // this.formKey++;
                    // await this.$router.push({ path: '/bulls-list/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
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
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        async loadDetails () {
            this.model.dose_type = '';
            this.model.storage_loc_dose = '';
            this.storageOptions = [];
            this.model.dose_disposed_no = '';
            const response = await axios.form(urls.bulls.details, { id: this.model.bull });
            const data = response.data.data;
            // this.model.bull = data.id;
            this.model.age = data.age;
            console.log('Data', data);
            this.details.renumber = data.renumber;
            this.details.breed = data.breed.breed_name;
            this.details.name = data.bull_name;
        }
    }
};
</script>

<style scoped>

</style>

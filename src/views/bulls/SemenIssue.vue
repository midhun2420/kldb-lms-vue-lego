<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Issue</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form ref="form" :key="formKey">
            <div class="">
<!--                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ml-3">Semen Issue-->
<!--                </h3>-->
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" v-model="model.issue_date"
                                           class="c-input-datepicker field-required" label="Semen Issue Date" :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <validated-ajax-vue-select
                                        :url="bullOptionURL" @input="onBullChange"
                                        label="Bull No" v-model="model.bull_no" class="c-input-select field-required" :rules="{required:true}"></validated-ajax-vue-select>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input disabled
                                                     class="c-input-select" label="Bull Name" v-model="model.bullname"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input disabled
                                                     class="" label="Renumber" v-model="model.renumber"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-ajax-vue-select class="c-input-select field-required"
                                                               @input="loadAll"
                                                               :url="DoseTypeOptionURL" :rules="{required:true}"
                                                               label="Dose Type" v-model="model.dose_type"></validated-ajax-vue-select>
                                </div>
                                <div class="col-lg-6">
                                    <validated-ajax-vue-select :url="rsbOptionsURL"
                                                     ref="rsbField" class="c-input-select field-required" label="RSB Location" v-model="model.rsb_despatch_location" :rules="{required:true}"></validated-ajax-vue-select>
                                </div>
<!--                                <div class="col-lg-6">-->
<!--                                    <validated-input class="c-input-select" label="Issued to" v-model="model.issued_to"></validated-input>-->
<!--                                </div>-->
                                <div class="col-lg-6">
                                    <validated-input class="" label="No of dose issued" v-model="model.no_of_dose" disabled></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input class="c-input-select field-required" label="Despatch Location" v-model="model.despatch_location"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input class="field-required" label="PTM" v-model="model.ptm" :rules="{required:true}"></validated-input>
                                </div>

                            </div>
                            <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" @click="addItem"
                                 :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
                        </div>

                        <div class="col-lg-5">

                            <div class="card pl-0 pr-0 pt-0 pb-0 " v-if="model.bull_no && model.dose_type ">

                                <table style="width:100% ">
                                    <tr>
                                        <th class="text-primary">Location</th>
                                        <th class="text-primary">Dose</th>

                                    </tr>
                                    <tr v-for="(item, i) in detailsList" :key="i" style="cursor: pointer" @click="loadDoes(item)">
                                        <td>{{ item.location }}</td>
                                        <td>{{ item.dose }}</td>

                                    </tr>
                                    <tr v-if="!errorData && !loadData && detailsList.length ===0" class="text-center">
                                        <td colspan="2">No Data Found</td>

                                    </tr>
                                    <tr v-if="loadData" class="text-center">
                                        <td colspan="2">
                                            <loading-horizontal dot-background="rgb( 57,84,164 )"/>
                                        </td>

                                    </tr>
                                    <tr v-if="errorData" class="text-center">
                                        <td colspan="2" class="text-danger">
                                            Bull No. and Does Type Required to load data.
                                        </td>

                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="card bg-grey bs-1 w-20r two p-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc pt-3 pb-2 font-poppins-semibold">Details</p>
                                </div>
                                <p class="pl-4"><span>Name</span> &nbsp;: {{ details.bull_name }}</p>
                                <p class="pl-4"><span>Breed</span> &nbsp;:{{ details.breed }}</p>
                                <p class="pl-4"><span>Quarantine</span> &nbsp;:{{ details.quarantine }}</p>
                                <p class="pl-4"><span>Storage</span> &nbsp;:{{ details.storage }}</p>
                                <p class="pl-4 pb-2"><span>Stock</span> &nbsp;:{{ details.stock }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-lg-7">
<!--                <div class="col-12">-->
<!--                    <div class="fl-x fl-j-e">-->
<!--                        <div class="btn-group">-->
<!--                            <btn text="Save" @click="addItem"-->
<!--                                 :loading="loading" loading-text="Saving..." class="px-4"></btn>-->
<!--                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </s-form>
    </div>
</template>

<script>
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'SemenIssue',
    data () {
        return {
            loading: false,
            formKey: 0,
            URL: urls.semenIssue.addEdit,
            rsbOptionsURL: masterURLs.master.rsb.select,
            DoseTypeOptionURL: masterURLs.master.doseType.vueSelect,
            bullOptionURL: urls.bulls.issueVueselect,
            model: {
                issue_date: '',
                dose_type: '',
                semen_quarantine: '',
                rsb_despatch_location: '',
                no_of_dose: '',
                despatch_location: '',
                ptm: '',
                bull: '',
                bullname: '',
                bull_no: '',
                renumber: '',
                stock: '',
                issued_to: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                }
            },
            // details: '',
            details: {
                bull_name: '',
                breed: '',
                quarantine: '',
                storage: '',
                stock: ''
            },
            detailsList: [],
            loadData: false,
            errorData: false,

            ToWhomIssues: [
                { label: 'Mattupatty', value: 'Mattupatty' },
                { label: 'Dhoni', value: 'Dhoni' },
                { label: 'Kulathupuzha', value: 'Kulathupuzha' },
                { label: 'Kannur', value: 'Kannur' },
                { label: 'Puthuppadi', value: 'Puthuppadi' },
                { label: 'Chalakudy', value: 'Chalakudy' },
                { label: 'Muvattupuzha', value: 'Muvattupuzha' },
                { label: 'Mavelikkara', value: 'Mavelikkara' }
            ]

        };
    },
    methods: {
        clearRule () {
            this.$refs.rsbField.rules = '';
        },
        validationDate () {
            const checkDate = this.model.issue_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        async loadAll () {
            if (this.model.bull_no && this.model.dose_type) {
                await this.loadListDetails();
            }
            if (this.model.bull_no) {
                await this.loadDetails();
            }
            if (this.model.dose_type) {
                await this.loadListDetails();
            }
        },
        async loadDetails () {
            const response = await axios.form(urls.semenIssue.BullDetails, { bull: this.model.bull_no });
            const data = response.data.details;
            console.log('Data: ', data);
            this.details = response.data.details;
            this.model.bullname = data.bull_name;
            this.model.renumber = data.re_number;
            this.model.stock = data.stock;
        },
        loadDoes (data) {
            console.log('item:', data);
            this.model.no_of_dose = data.dose;
            this.model.semen_quarantine = data.id;
            this.model.ptm = data.ptm;
        },
        async loadListDetails () {
            this.loadData = true;
            this.errorData = false;
            if (this.model.bull_no && this.model.dose_type) {
                const response = await axios.form(urls.semenIssue.BullDetails, {
                    bull: this.model.bull_no,
                    dose_type: this.model.dose_type
                });
                this.detailsList = response.data.data;
                this.details = response.data.details;
                this.model.stock = this.details.stock;

                this.loadData = false;
            } else {
                this.errorData = true;
                this.loadData = false;
            }
        },
        async onBullChange () {
            // Clear old selected values
            this.model.no_of_dose = '';
            this.model.semen_quarantine = '';
            this.model.ptm = '';
            this.model.dose_type = '';
            this.model.rsb_despatch_location = '';
            this.model.despatch_location = '';

            this.detailsList = [];

            this.details = {
                bull_name: '',
                breed: '',
                quarantine: '',
                storage: '',
                stock: ''
            };

            // Load new bull details
            await this.loadAll();
        },
        async clearData () {
            this.model.semen_quarantine = '';
            this.model.rsb_despatch_location = '';
            this.model.issued_to = '';
            this.model.no_of_dose = '';
            this.model.despatch_location = '';
            this.model.issue_date = '';
            this.model.bull_no = '';
            this.model.bullname = '';
            this.model.renumber = '';
            this.model.ptm = '';
            this.model.dose_type = '';
            this.details = {
                bull_name: '',
                breed: '',
                quarantine: '',
                storage: '',
                stock: ''
            };
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.formKey++;
                    await this.clearData();
                    this.clearRule();
                    this.$refs.form.checkValidity();
                    await this.loadListDetails();
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
        }
    }
};

</script>

<style scoped>
table {
    background-color: #f3f3f3;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    color: black;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 4px;

}

.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f3f3f3 !important;
}
</style>

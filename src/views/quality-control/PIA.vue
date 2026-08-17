<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
        <div class="col-lg-12">
            <div class="row fl-x fl-j-sb ml-2">
               <h3 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">PIA</h3>
               <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
               </div>
            </div>
            <div class="row">
                <div class="col-lg-2  ">
                    <div class="form-group pl-0">
                        <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                               label="Date of the Test" :disabled-date="disabledAfterToday" v-model="model.test_date" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-lg-2 w-10r">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                           label="Date of the Production" :disabled-date="disabledAfterToday" v-model="model.production_date" :rules="rules.compare"></validated-date-picker>
                </div>
                <div class="form-group col-lg-2  w-10r">
                    <validated-vue-select :options="semenTypeOptions" label="Semen Type" class="c-input-select text-black field-required" v-model="model.semen_type" @input="loadDetails" :rules="{required:true}"></validated-vue-select>
                </div>
            </div>
        </div>

        <div class="col-lg-12 ">
            <div class="row">
                <div class="col-lg-4 pl-0" v-if="tableLoading">
                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                        <table style="width:100%">
                            <th class="text-primary">Bull No</th>
                            <th class="text-primary">EJ No</th>
                            <th class="text-primary">Dose</th>
<!--                            <th class="text-primary">Position</th>-->
                            <tr class="mt-3" v-if="loadingData">
                                        <td colspan="4">Please wait while fetching the data...</td>
                                    </tr>
                            <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                                        <td colspan="11" class="mt-3"> No data</td>
                                    </tr>
                            <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.ejaculation_no }}</td>
                                <td>{{ model.semen_type === 'Frozen'? item.actual_fsd_dose : item.recorded_dose }}</td>
<!--                                <td>{{ item.position }}</td>-->
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-lg-8 ">
                    <div class="row">
                        <div class="form-group col-lg-3">
                            <validated-input label="Bull No"
                                                  class="text-black c-input-select field-required" v-model="details.bull" disabled :rules="{required:true}"></validated-input>
                        </div>
                        <div class="form-group col-lg-3 ">
                            <validated-input label="Bull Name" class="text-black " v-model="details.bull_name" disabled></validated-input>
                        </div>
                        <div class="form-group col-lg-3">
                            <validated-input label="Breed"
                                                  class="text-black " v-model="details.breed" disabled></validated-input>
                        </div>
                        <div class="form-group  col-lg-3">
                            <validated-input label="Ejaculate No"
                                                  class="text-black field-required" v-model="details.ejaculation_no" disabled :rules="{required:true}"></validated-input>
                        </div></div>
                    <div class="form-group">
                        <h5 class="text-primary font-poppins-semibold">Acrosome</h5>
                    </div>
                    <div class="row ">
                        <div class="form-group col-lg-3">
                            <validated-input label="Normal count" class="text-black field-required" v-model="model.normal_count" :rules="rules.positiveOnly" type="number" @input="calculateTotal"></validated-input>
                        </div>

                    </div>
                    <div class="row mt-3" v-for="(alterdedopt, index) in model.alterdedopt" :key="index">
                        <div class="form-group col-lg-3">
                            <validated-vue-select :options="alterOptions" label="Altered"
                                                  class="text-black c-input-select field-required" v-model="alterdedopt.altered" :rules="{required:true}"></validated-vue-select>
                        </div>
                        <div class="form-group col-lg-3">
                            <validated-input label="count" class="text-black field-required" v-model="alterdedopt.altered_count" :rules="rules.positiveOnly" type="number" @input="calculateTotal"></validated-input>
                        </div>
                         <div class="pt-1">
                            <btn class="mt-4 px-4" v-if="index === model.alterdedopt.length - 1"
                         @click="addLocationItem(index,alterdedopt.altered, alterdedopt.altered_count)">add</btn>
                        </div>
<!--                        <div class="pl-5 pt-4">-->
<!--                            <btn class="px-4" text="Add"></btn>-->
<!--                        </div>-->
                    </div>
                    <div class="row">
                        <div class="form-group col-lg-3">
                            <validated-input class=" text-black field-required" label="Detached count" v-model="model.detached_count" :rules="rules.positiveOnly" type="number" @input="calculateTotal"></validated-input>
                        </div>
                        <div class="col-lg-6"></div>
                        <div class="form-group col-lg-3">
                            <validated-input class=" text-primary font-poppins-semibold field-required"
                                             label="Total count" v-model="model.total_count" :rules="rules.positiveOnly" type="number" disabled></validated-input>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-12 " v-if="model.semen_type==='Frozen'">
                        <div class="col-lg-6 ">
                            <p class="text-black font-poppins-semibold fs-lg--1 red-asterisk-label">PIA for frozen semen</p>
                        </div>
                        <div class="col-lg-6">
                            <div class="fl-x">
                            <validated-input class="text-black w-5r" name="PIA for frozen semen" v-model="model.pia_frozen_semen" :rules="rules.positiveOnly" disabled></validated-input>
                            <p class="mt-2 pl-2">%</p></div>
                        </div>
                            </div>
<div class="col-lg-12"  v-if="model.semen_type==='Neat'">
                        <div class="col-lg-3 "  >
                            <p class="text-black font-poppins-semibold fs-lg--1 red-asterisk-label">Acrosome integrity in neat semen</p>
                        </div>
                        <div class="col-lg-3  fl-x">
                            <validated-input class="text-black w-5r" name="Acrosome integrity in neat semen" v-model="model.acrosome_integrity_semen" :rules="rules.positiveOnly" disabled></validated-input>
                            <p class="mt-2 pl-2">%</p>
                        </div>
</div>
                    </div>
                    <div class="row">
                        <div class="form-group col-lg-3 mt-2 field-required">
                            <validated-vue-select :options="resultOptions" label="Result" @input="resultStatus"
                                                  class="text-black c-input-select " v-model="model.result_status" :rules="{required:true}"></validated-vue-select>

                        </div>
                        <div class="form-group mt-1 col-lg-3">
                            <validated-checkbox label="Discard" class="pb-0 mb-xl-n4 text-black" v-model="model.discard" :disabled="statusFlag"></validated-checkbox>
                            <validated-input class="" v-model="model.result" :rules="{required:false}" disabled></validated-input>
                        </div>
                        <div class="form-group col-lg-3 mt-2">
                            <validated-input label="Remarks" class="text-black" v-model="model.remarks"></validated-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column fl-x-br pt-7">
            <div class="btn-group">
            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
            </div>
        </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'PIA',
    data () {
        return {
            loading: false,
            tableLoading: false,
            URL: urls.pia.addEdit,
            formKey: 0,
            model: {
                test_date: '',
                production_date: '',
                semen_type: '',
                bull: '',
                ejaculate_no: '',
                normal_count: 0,

                detached_count: 0,
                total_count: 0,
                pia_frozen_semen: '',
                acrosome_integrity_semen: '',
                result_status: '',
                result: '',
                discard: '',
                remarks: '',
                semen_quarantine: '',
                alterdedopt: [
                    {
                        altered: '',
                        altered_count: 0
                    }
                ]
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                compare: {
                    required: true,
                    customValidator: (value) => {
                        return this.CompareDate(value);
                    }
                }
            },
            statusFlag: true,
            bullsList: [],
            loadingData: false,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
            },
            resultOptions: [
                { label: 'Pass', value: 'Pass' },
                { label: 'Fail', value: 'Fail' }
            ],
            alterOptions: [
                { label: 'Ruffled', value: 'Ruffled' },
                { label: 'Knobed', value: 'Knobed' },
                { label: 'Swollen', value: 'Swollen' },
                { label: 'Disintergrated', value: 'Disintergrated' }
            ],
            semenTypeOptions: [
                { label: 'Neat', value: 'Neat' },
                { label: 'Frozen', value: 'Frozen' }
            ],
            total_altered_count: 0
        };
    },
    methods: {
        addLocationItem (index, altered, count) {
            const existingItems = this.model.alterdedopt.filter(obj => obj.altered === altered);
            console.log('existingItems.length', existingItems.length);
            if (existingItems.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.model.alterdedopt.push({ altered: '', altered_count: '' });
                this.model.alterdedopt[index].altered = altered;
                this.model.alterdedopt[index].altered_count = count;
                this.total_altered_count += parseInt(count, 10);
                /* this.model.alterdedopt[index].after_fumigation = afterfumigation; */
                console.log('Locations', this.total_altered_count);
            }
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        findIntegiry () {
            const integrity = (this.model.normal_count / this.model.total_count) * 100;
            if (isFinite(integrity)) {
                if (isNaN(integrity)) {
                    this.model.acrosome_integrity_semen = '0';
                    this.model.pia_frozen_semen = '0';
                } else {
                    this.model.acrosome_integrity_semen = integrity.toFixed(2);
                    this.model.pia_frozen_semen = integrity.toFixed(2);
                }
            } else {
                this.model.acrosome_integrity_semen = '0';
                this.model.pia_frozen_semen = '0';
            }
        },
        calculateTotal () {
            let total = parseInt(this.model.normal_count, 10) + parseInt(this.model.detached_count, 10);
            // console.log('Altered Opt=', this.model.alterdedopt);
            if (Array.isArray(this.model.alterdedopt)) {
                for (const alteredOpt of this.model.alterdedopt) {
                    total += parseInt(alteredOpt.altered_count, 10);
                }
            }
            // console.log('Normal count', this.model.normal_count);
            // console.log('Detached count', this.model.detached_count);
            if (isFinite(total)) {
                if (isNaN(total)) {
                    this.model.total_count = '0';
                } else {
                    this.model.total_count = total;
                    console.log('total', this.model.total_count);
                    this.findIntegiry();
                }
            } else {
                this.model.total_count = '0';
            }
        },
        async loadDetails () {
            this.details.bull = '';
            this.details.bull_name = '';
            this.details.ejaculation_no = '';
            this.details.breed = '';
            this.model.bull = '';
            this.model.ejaculate_no = '';
            this.model.result = '';
            this.loadingData = true;
            const response = await axios.form(urls.post_thaw_motility.collectionDetails, {
                production_date: this.model.production_date,
                filter: 'pia',
                semen_type: this.model.semen_type
            });
            this.bullsList = response.data.data;
            this.loadingData = false;
            this.tableLoading = true;
        },
        async loadBullDetails () {
            const response = await axios.get(urls.bulls.details + '?id=' + this.model.bull);
            const data = response.data.data;
            this.model.breed = data.breed.breed_name;
            this.model.bull_name = data.bull_name;
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }
            if (isNaN(num)) {
                return 'Enter a valid number(whole or decimal)';
            }
            return true;
        },
        validationDate () {
            const checkDate = this.model.test_date;

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
        resultStatus () {
            if (this.model.result_status === 'Fail') {
                this.statusFlag = false;
            } else {
                this.statusFlag = true;
            }
        },
        CompareDate () {
            const checkDate = this.model.test_date;
            const prodDate = this.model.production_date;
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const prodDateParts = prodDate.split('-');
            if (prodDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const prodDateDay = parseInt(prodDateParts[0], 10);
            const prodDateMonth = parseInt(prodDateParts[1], 10);
            const prodDateYear = parseInt(prodDateParts[2], 10);

            const prodDateObj = new Date(prodDateYear, prodDateMonth - 1, prodDateDay);
            if (checkDateObj < prodDateObj) {
                return 'Production Date should be less than Test Date.';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (prodDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        clickedBull (index) {
            const indexToFetch = index;
            const data = this.bullsList;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.details.bull = dataItem.bull.reg_no;
                this.details.bull_name = dataItem.bull.bull_name;
                this.details.ejaculation_no = dataItem.ejaculation_no;
                this.details.breed = dataItem.bull.breed;
                this.model.bull = dataItem.bull_id;
                this.model.ejaculate_no = dataItem.ejaculation_no;
                this.model.result = this.model.semen_type === 'Frozen' ? dataItem.actual_fsd_dose : dataItem.recorded_dose;
                this.model.semen_quarantine = dataItem.quarantine_id;
            }
        },
        async addItem () {
            try {
                this.loading = true;

                const alterdedopt = JSON.stringify(this.model.alterdedopt);
                const response = await axios.form(this.URL, {
                    test_date: this.model.test_date,
                    production_date: this.model.production_date,
                    altered_list: alterdedopt,

                    semen_type: this.model.semen_type,
                    bull: this.model.bull,
                    ejaculate_no: this.model.ejaculate_no,
                    normal_count: this.model.normal_count,

                    detached_count: this.model.detached_count,
                    total_count: this.model.total_count,
                    pia_frozen_semen: this.model.pia_frozen_semen,
                    acrosome_integrity_semen: this.model.acrosome_integrity_semen,
                    result_status: this.model.result_status,
                    result: this.model.result,
                    discard: this.model.discard,
                    remarks: this.model.remarks,
                    semen_quarantine: this.model.semen_quarantine
                });

                /* const response = await axios.form(this.URL, this.model); */
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_date: this.model.test_date,
                        production_date: this.model.production_date,
                        semen_type: this.model.semen_type,
                        bull: '',
                        ejaculate_no: '',
                        normal_count: 0,
                        detached_count: 0,
                        total_count: 0,
                        pia_frozen_semen: '',
                        acrosome_integrity_semen: '',
                        result_status: '',
                        result: '',
                        discard: '',
                        remarks: '',
                        semen_quarantine: '',
                        alterdedopt: [
                            {
                                altered: '',
                                altered_count: 0
                            }
                        ]
                    };
                    this.details.bull = '';
                    this.details.bull_name = '';
                    this.details.ejaculation_no = '';
                    this.details.breed = '';
                    this.formKey++;
                    await this.loadDetails();
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            let errorMessage = '';
                            if (key === '__all__') {
                                errorMessage = `${errors[key]}`;
                            } else {
                                errorMessage = `${key}:  ${errors[key]}`;
                            }
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
        }
    },
    watch: {
        'model.production_date': {
            handler () {
                this.model.semen_type = '';
                this.bullsList = [];
                this.tableLoading = false;
                this.details.bull = '';
                this.details.bull_name = '';
                this.details.ejaculation_no = '';
                this.details.breed = '';
                this.model.bull = '';
                this.model.ejaculate_no = '';
                this.model.result = '';
                this.model.semen_quarantine = '';
            }
        },
        'model.result_status': {
            handler: function (after, before) {
            // Changes detected. Do work...
                console.log(after, before);

                if (after === 'Pass') {
                    this.model.discard = false;
                } else if (after === 'Fail') {
                    this.model.discard = true;
                }
            },
            deep: true
        }
    }
};
</script>

<style scoped>
table {
    background-color: #f3f3f3;
    text-align: center;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    text-align: center;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
}

table, th, tr {
    border-radius: 4px;

}
</style>

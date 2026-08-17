<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h4 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Microbial Load of Neat Semen</h4>
                <div>
                  <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>

            <div class="col-lg-2 pl-0">
                <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black field-required" label="Date of the Test" v-model="model.test_date"
                                       :rules="rules.common"></validated-date-picker>
            </div>
            <div class="col-lg-2 pl-0">
                <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black field-required" label="Date of Production" v-model="model.production_date"
                                       @input="loadBullDetails" :rules="rules.compare"></validated-date-picker>
            </div>
            <div class="col-lg-12 pl-0 ">
                <div class="row">
                    <div class="col-lg-2 pr-0">
                        <validated-vue-select :options="bullOptions" label="Bull No"
                                              class="text-black c-input-select field-required"
                                              v-model="model.bull" :rules="{required:true}" @input="loadDetails"></validated-vue-select>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input label="Bull Name" class="text-black  "
                                         v-model="model.bull_name" disabled></validated-input>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input label="Breed" class="text-black   "
                                         v-model="model.breed" disabled></validated-input>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-vue-select :options="ejaculationOptions" label="Ejaculate No" class="text-black c-input-select field-required"
                                              v-model="model.ejaculate_no" :rules="{required:true}" @input="ejaculationDetails"></validated-vue-select>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-1 pl-4"></div>
                <div class="col-lg-2 pl-6">
                    <p class="text-black">No of Colonies</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-1 pl-4 pt-3">
                    <p class="text-black red-asterisk-label">1:10</p>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input name="1:10" v-model="model.colonies_count_1_10" @input="loadResults" :rules="rules.coloniesMax1000" type="number"></validated-input>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input v-model="model.cfu_per_ml_1_10" disabled></validated-input>
                </div>
                <div class="col-lg-1 pt-2">
                    <p class="text-black">CFU/ml</p>
                </div>
                <div class="col-lg-3"></div>
            </div>
            <div class="row">
                <div class="col-lg-1 pl-4">
                    <p class="pt-4 text-black red-asterisk-label">1:100</p>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input name="1:100" v-model="model.colonies_count_1_100" @input="loadResults" :rules="rules.coloniesMax1000" type="number"></validated-input>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input v-model="model.cfu_per_ml_1_100" disabled></validated-input>
                </div>
                <div class="col-lg-1">
                    <p class="pt-2 text-black">CFU/ml</p>
                </div>
                <div class="col-lg-3"></div>
            </div>
            <div class="row">
                <div class="col-lg-1 pl-4">
                    <p class="pt-4 text-black red-asterisk-label">1:1000</p>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input name="1:1000" v-model="model.colonies_count_1_1000" @input="loadResults" :rules="rules.coloniesMax1000" type="number"></validated-input>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input v-model="model.cfu_per_ml_1_1000" disabled></validated-input>
                </div>
                <div class="col-lg-1">
                    <p class="pt-2 text-black">CFU/ml</p>
                </div>
<!--                <div class="col-lg-3">hfhfhf</div>-->
            </div>
            <div class="row">
                <div class="col-lg-1 pl-4">
                    <p class="pt-4 text-black red-asterisk-label">1:10000</p>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input name="1:10000" v-model="model.colonies_count_1_10000" @input="loadResults" :rules="rules.coloniesMax1000" type="number"></validated-input>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input v-model="model.cfu_per_ml_1_10000" disabled></validated-input>
                </div>
                <div class="col-lg-1">
                    <p class="pt-2 text-black">CFU/ml</p>
                </div>
                <div class="col-lg-3"></div>
            </div>
            <div class="row">
                <div class="col-lg-1 pl-4">
                    <p class="pt-4 text-black red-asterisk-label">1:100000</p>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input name="1:100000" v-model="model.colonies_count_1_100000" @input="loadResults" :rules="rules.coloniesMax1000" type="number"></validated-input>
                </div>
                <div class="col-lg-2 pl-6">
                    <validated-input v-model="model.cfu_per_ml_1_100000" disabled></validated-input>
                </div>
                <div class="col-lg-1">
                    <p class="pt-2 text-black">CFU/ml</p>
                </div>
                <div class="col-lg-3"></div>
                <div class="mt-xl-n8">
                      <div class="card w-20v mt-auto mb-7 p-0 bg-gray">
                    <div class="fl-x">
                        <p class=" pt-4 pl-3 mb-0 text-black pos-rel">CFU/ml &nbsp;&nbsp;=&nbsp;&nbsp;</p>
                        <p class="bb-1 pt-4 mb-0 text-black">No of colonies&nbsp;x D</p>
                    </div>
                    <p class="fl-x-bc pb-3 text-black">0.4</p>
                </div>
                </div>
            </div>
            <div class="col-lg-12 fl-x pl-0">
                <div class="col-lg-2 pl-0 mt-1">
                    <validated-vue-select :options="resultOptions" class="c-input-select text-black field-required" label="Results" @input="resultStatus" v-model="model.result_status"
                                          :rules="{required:true}"></validated-vue-select>

                </div>
                <div class="col-lg-2 ">
                    <validated-checkbox label="Discard" class="pb-0 mb-xl-n4 text-black " v-model="model.discard" :disabled="statusFlag"></validated-checkbox>
                    <validated-input class="" v-model="model.result" disabled></validated-input>
                </div>
                <div class="col-lg-2 mt-1">
                    <validated-input class="text-black " label="Remarks" v-model="model.remarks" ></validated-input>
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
    name: 'MicrobialLoadofNeatSemen',
    data () {
        return {
            loading: false,
            URL: urls.semen_microbial_load_neat.addEdit,
            formKey: 0,
            model: {
                test_date: '',
                production_date: '',
                bull: '',
                breed: '',
                bull_name: '',
                ejaculate_no: '',
                colonies_count_1_10: '',
                cfu_per_ml_1_10: '',
                colonies_count_1_100: '',
                cfu_per_ml_1_100: '',
                colonies_count_1_1000: '',
                cfu_per_ml_1_1000: '',
                colonies_count_1_10000: '',
                cfu_per_ml_1_10000: '',
                colonies_count_1_100000: '',
                cfu_per_ml_1_100000: '',
                result: '',
                result_status: '',
                discard: '',
                remarks: '',
                semen_type: 'Neat',
                semen_quarantine: ''
            },
            resultOptions: [
                { label: 'Pass', value: 'Pass' },
                { label: 'Fail', value: 'Fail' }
            ],
            table_details: [],
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                coloniesMax1000: {
                    required: true,
                    customValidator: (value) => {
                        return this.validateColoniesCount(value);
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
            bullOptions: [],
            ejaculationOptions: [],
            statusFlag: true

        };
    },
    methods: {
        async ejaculationDetails () {
            console.log('details', this.ejaculationOptions);
            /*    const shedOptionsResponse = await axios.get(this.ejaculationOptions); */
            const ejaculationArray = this.ejaculationOptions;
            const selectedShed = ejaculationArray.find(option => option.value === this.model.ejaculate_no);
            if (selectedShed) {
                const shedName2 = selectedShed.dose;
                const semenQuarantine = selectedShed.quarantine_id;
                console.log('data', shedName2);
                this.model.result = shedName2;
                this.model.semen_quarantine = semenQuarantine;
            }
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        resultStatus () {
            if (this.model.result_status === 'Fail') {
                this.statusFlag = false;
            } else {
                this.statusFlag = true;
            }
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
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
        validateColoniesCount (value) {
            if (value === '' || value === null || value === undefined) {
                return true;
            }

            const num = Number(value);

            if (isNaN(num)) {
                return 'Please enter a valid number';
            }

            if (num < 0) {
                return 'Negative values are not allowed';
            }

            if (num > 1000) {
                return 'No of colonies should not exceed 1000';
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
        async loadBullDetails () {
            this.model.bull = '';
            this.model.bull_name = '';
            this.model.breed = '';
            this.model.ejaculate_no = '';
            this.ejaculationOptions = [];
            // const response = await axios.form(urls.sperm_morphology.collectionBulls, this.model);
            const response = await axios.form(urls.sperm_morphology.collectionBulls, {
                production_date: this.model.production_date,
                filter: 'Neat'
            });
            const data = response.data;
            this.bullOptions = data.data;
        },
        async loadDetails () {
            this.model.bull_name = '';
            this.model.breed = '';
            this.model.ejaculate_no = '';
            this.ejaculationOptions = [];
            // const response = await axios.form(urls.sperm_morphology.collectionBullDetails, this.model);
            const response = await axios.form(urls.sperm_morphology.collectionBullDetails, {
                production_date: this.model.production_date,
                bull: this.model.bull,
                filter: 'Neat'
            });
            const data = response.data.data;
            // console.log(data.bull_name);
            // console.log(data);
            // console.log(data.data);
            this.model.breed = data.breed;
            this.model.bull_name = data.bull_name;
            this.ejaculationOptions = data.ejaculation_no;
        },
        async loadResults () {
            const response = await axios.form(urls.semen_microbial_load_neat.loadResult, this.model);
            const data = response.data.data;
            this.model.cfu_per_ml_1_10 = data.cfu_per_ml_1_10;
            this.model.cfu_per_ml_1_100 = data.cfu_per_ml_1_100;
            this.model.cfu_per_ml_1_1000 = data.cfu_per_ml_1_1000;
            this.model.cfu_per_ml_1_10000 = data.cfu_per_ml_1_10000;
            this.model.cfu_per_ml_1_100000 = data.cfu_per_ml_1_100000;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_date: this.model.test_date,
                        production_date: this.model.production_date,
                        bull: '',
                        breed: '',
                        bull_name: '',
                        ejaculate_no: '',
                        colonies_count_1_10: '',
                        cfu_per_ml_1_10: '',
                        colonies_count_1_100: '',
                        cfu_per_ml_1_100: '',
                        colonies_count_1_1000: '',
                        cfu_per_ml_1_1000: '',
                        colonies_count_1_10000: '',
                        cfu_per_ml_1_10000: '',
                        colonies_count_1_100000: '',
                        cfu_per_ml_1_100000: '',
                        result: '',
                        result_status: '',
                        discard: '',
                        remarks: '',
                        semen_type: 'Neat',
                        semen_quarantine: ''
                    };
                    this.formKey++;
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
    .bg-gray {
        background-color: lightgrey !important;
    }

    .pos-rel {
        position: relative;
        top: 11px;
    }
</style>

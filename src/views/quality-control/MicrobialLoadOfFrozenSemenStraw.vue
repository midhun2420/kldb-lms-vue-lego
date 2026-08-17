<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Microbial Load of Frozen Semen Straw</h2>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker   text-black  field-required"
                                           label="Date of Test" v-model="model.test_date"
                                           :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker  text-black field-required"
                                           label="Date of Production" v-model="model.production_date"
                                           @input="loadDetails" :rules="rules.compare"></validated-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="col-5 " v-if="tableLoading">
                    <table style="width:100%" class="m-height">
                        <th class="text-primary">Bull No</th>
                        <th class="text-primary">Ej No</th>
                        <th class="text-primary">Dose</th>
                        <th class="text-primary">Position</th>
                        <tr class="mt-3" v-if="loadingData">
                            <td colspan="4">Please wait while fetching the data...</td>
                        </tr>
                        <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                            <td colspan="11" class="mt-3"> No data</td>
                        </tr>
                        <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                            <td>{{ item.bull.reg_no }}</td>
                            <td>{{ item.ejaculation_no }}</td>
<!--                            <td>{{ item.frozen_dose }}</td>-->
                            <td>{{ item.actual_fsd_dose }}</td>
                            <td>{{ item.position }}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-7">
                    <div class="row  ">
                        <div class="col-lg-3">
                            <validated-input v-model="details.bull_name" disabled label="Bull Name"></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-input disabled label="Bull No" class="field-required" v-model="details.bull"
                                             :rules="{required:true}"></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-input v-model="details.breed" disabled label="Breed"></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-input v-model="details.ejaculation_no" disabled label="Ejaculate No"
                                             class="field-required" :rules="{required:true}"></validated-input>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3">
                            <p class="font-poppins-medium pl-1">No of Colonies</p>
                        </div>

                    </div>

                    <div class="row mt-2">
                        <div class="col-lg-2">
                            <p class="red-asterisk-label">1:10</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="1:10" v-model="model.colonies_count_1_10" @input="loadResults"
                                             :rules="rules.coloniesMax1000" type="number"></validated-input>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 ml-xl-n4">
                            <validated-input v-model="model.cfu_per_ml_1_10" disabled></validated-input>
                        </div>
                        <div class="col-lg-1">
                            <p>CFU/ml</p>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <p class="red-asterisk-label">1:100</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="1:100" v-model="model.colonies_count_1_100" @input="loadResults"
                                             :rules="rules.coloniesMax1000" type="number"></validated-input>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 ml-xl-n4">
                            <validated-input v-model="model.cfu_per_ml_1_100" disabled></validated-input>
                        </div>
                        <div class="col-lg-1">
                            <p>CFU/ml</p>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <p class="red-asterisk-label">1:1000</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="1:1000" v-model="model.colonies_count_1_1000" @input="loadResults"
                                             :rules="rules.coloniesMax1000" type="number"></validated-input>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 ml-xl-n4">
                            <validated-input v-model="model.cfu_per_ml_1_1000" disabled></validated-input>
                        </div>
                        <div class="col-lg-1">
                            <p>CFU/ml</p>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <p class="red-asterisk-label">1:10000</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="1:10000" v-model="model.colonies_count_1_10000" @input="loadResults"
                                             :rules="rules.coloniesMax1000" type="number"></validated-input>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 ml-xl-n4">
                            <validated-input v-model="model.cfu_per_ml_1_10000" disabled></validated-input>
                        </div>
                        <div class="col-lg-1">
                            <p>CFU/ml</p>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <p class="red-asterisk-label">1:100000</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="1:100000" v-model="model.colonies_count_1_100000"
                                             @input="loadResults" :rules="rules.coloniesMax1000"
                                             type="number"></validated-input>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 ml-xl-n4">
                            <validated-input v-model="model.cfu_per_ml_1_100000" disabled></validated-input>
                        </div>
                        <div class="col-lg-1">
                            <p>CFU/ml</p>
                        </div>

                    </div>

                    <div class="card w-20v mt-3 p-0 bg-gray">
                        <div class="fl-x">
                            <p class=" pt-4 pl-3 mb-0 text-black pos-rel">CFU/ml &nbsp;&nbsp;=&nbsp;&nbsp;</p>
                            <p class="bb-1 pt-4 mb-0 text-black">No of colonies&nbsp;x D</p>
                        </div>
                        <p class="fl-x-bc pb-3 text-black">0.4</p>
                    </div>

                    <div class="row  mt-5">
                        <div class="col-lg-3">
                            <validated-select :options="resultOptions" @input="resultStatus"
                                              class="text-black mt-1 c-input-select field-required" label="Results"
                                              v-model="model.result_status" :rules="{required:true}"></validated-select>

                        </div>
                        <div class="col-lg-3">
                            <validated-checkbox label="Discard" class="pb-0 mb-xl-n4 text-black" v-model="model.discard"
                                                :disabled="statusFlag"></validated-checkbox>
                            <validated-input v-model="model.result" disabled></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-input class="mt-1 text-black" label="Remarks"
                                             v-model="model.remarks" ></validated-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-lg-7">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
// import CustomTwoColumnTable from '@components/ui/CustomTwoColumnTable';
export default {
    name: 'MicrobialLoadOfFrozenSemenStraw',
    data () {
        return {
            statusFlag: true,
            loading: false,
            tableLoading: false,
            URL: urls.semen_microbial_load_frozen.addEdit,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
            },
            formKey: 0,
            model: {
                test_date: '',
                production_date: '',
                bull: '',
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
                semen_type: 'Frozen',
                semen_quarantine: ''
            },
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
            resultOptions: [
                { label: 'Pass', value: 'Pass' },
                { label: 'Fail', value: 'Fail' }
            ],
            bullsList: [],
            selectedIndex: '',
            loadingData: false
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
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
                filter: 'frozen'
            });
            this.bullsList = response.data.data;
            this.tableLoading = true;
            this.loadingData = false;
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
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
                this.model.result = dataItem.actual_fsd_dose;
                this.model.semen_quarantine = dataItem.quarantine_id;
            }
        },
        resultStatus () {
            if (this.model.result_status === 'Fail') {
                this.statusFlag = false;
            } else {
                this.statusFlag = true;
            }
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
                        semen_type: '',
                        semen_quarantine: ''
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
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 1.8rem;
    padding-left: 18px;
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

table, tr, th {
    border-radius: 4px;

}

.bg-gray {
    background-color: gainsboro !important;
}

.pos-rel {
    position: relative;
    top: 11px;
}

/*.m-height {*/
/*    min-height: 396px;*/
/*}*/
</style>

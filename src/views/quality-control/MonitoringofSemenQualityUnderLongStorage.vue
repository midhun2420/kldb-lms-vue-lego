<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h4 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Monitoring of Semen Quality Under Long
                    Storage</h4>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>

                <div class="row">
                <div class="form-group col-lg-2 ">
                    <validated-date-picker format="DD-MM-YYYY" label="Date of test" :disabled-date="disabledAfterToday"
                                           class="text-black c-input-datepicker field-required"
                                           v-model="model.test_date" :rules="rules.common"></validated-date-picker>
                </div>
            </div>
            <div class="col-lg-12 fl-x pl-0 ">
                <div class="form-group w-15p">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                           label="Date of Production" v-model="model.production_date" :disabled-date="disabledAfterToday"
                                           @input="loadDetails" :rules="rules.compare"></validated-date-picker>
                </div>
                <!--            <div class="form-group w-15p pl-3 mt-4">-->
                <!--                <validated-date-picker class="c-input-datepicker text-black"></validated-date-picker>-->
                <!--            </div>-->
                <div class="form-group pl-3 w-15p">
                    <validated-input label="Bull No" class="text-black field-required" v-model="details.bull" disabled
                                     :rules="{required:true}"></validated-input>
                </div>
                <div class="form-group pl-3 w-15p">
                    <validated-input label="Bull Name" class="text-black" v-model="details.bull_name"
                                     disabled></validated-input>
                </div>
                <div class="form-group pl-3 w-15p">
                    <validated-input label="Breed" class="text-black" v-model="details.breed"
                                     disabled></validated-input>
                </div>
                <div class="form-group pl-3 w-15p">
                    <validated-input label="Ejaculate No" class="text-black field-required"
                                     v-model="details.ejaculation_no" disabled
                                     :rules="{required:true}"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 pl-0 ml-3" v-if="tableLoading">
                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                        <table style="width:100%">
                            <th class="text-primary">Date</th>
                            <th class="text-primary">Bull No</th>
                            <th class="text-primary">EJ No</th>
                            <th class="text-primary">Dose</th>
                            <th class="text-primary">Position</th>
                            <tr class="mt-3" v-if="loadingData">
                                <td colspan="4">Please wait while fetching the data...</td>
                            </tr>
                            <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                                <td colspan="11" class="mt-3"> No data</td>
                            </tr>
                            <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                                <td>{{ item.collection_date }}</td>
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.ejaculation_no }}</td>
<!--                                <td>{{ item.recorded_dose }}</td>-->
                                <td>{{ item.actual_fsd_dose }}</td>
                                <td>{{ item.position }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--            -->
                <div class="col-lg-7">
                    <div class="row">
                        <validated-input class="ml-2" label="PTM%" v-model="model.ptm_per" disabled></validated-input>
                    </div>
                    <h5 class="font-poppins-medium text-primary mt-4"> INCUBATION</h5>
                    <div class="row mt-4">
                        <div class="col-lg-3">
                            <p class="pt-1 red-asterisk-label">Oth Min</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="0th Min" v-model="model.incubation_0_min_per" :rules="rules.percentageCheck"></validated-input>
                        </div>
                        <div classs="col-lg-1">
                            <p class="pt-2">%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <p class="pt-1 red-asterisk-label">3Oth Min</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input  name="30th Min" v-model="model.incubation_30_min_per" :rules="rules.percentageCheck"></validated-input>
                        </div>
                        <div classs="col-lg-1">
                            <p class="pt-2">%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <p class="pt-1 red-asterisk-label">60th Min</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="60th Min" v-model="model.incubation_60_min_per" :rules="rules.percentageCheck"></validated-input>
                        </div>
                        <div classs="col-lg-1">
                            <p class="pt-2">%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <p class="pt-1 red-asterisk-label">9Oth Min</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input  name="90th Min" v-model="model.incubation_90_min_per" :rules="rules.percentageCheck"></validated-input>
                        </div>
                        <div classs="col-lg-1">
                            <p class="pt-2">%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <p class="pt-1 red-asterisk-label" >12Oth Min</p>
                        </div>
                        <div class="col-lg-3">
                            <validated-input name="120th Min" v-model="model.incubation_120_min_per" :rules="rules.percentageCheck"></validated-input>
                        </div>
                        <div classs="col-lg-1">
                            <p class="pt-2">%</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 mt-3 fl-x">
                    <div class="col-lg-4"></div>
                    <div class="col-lg-2 mt-1">
                        <validated-vue-select :options="resultOptions" class="c-input-select text-black field-required"
                                              label="Results" v-model="model.result_status" @input="resultStatus"
                                              :rules="{required:true}"></validated-vue-select>

                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Discard" class="pb-0 mb-xl-n4 text-black" v-model="model.discard"
                                            :disabled="statusFlag"></validated-checkbox>
                        <validated-input v-model="model.result" disabled></validated-input>
                    </div>
                    <div class="col-lg-2 mt-1">
                        <validated-input class="text-black" label="Test Done by"
                                         v-model="model.test_done_by"></validated-input>
                    </div>
                    <div class="col-lg-2 mt-1">
                        <validated-input class="text-black" label="Remarks" v-model="model.remarks"
                                         ></validated-input>
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
    name: 'MonitoringofSemenQualityUnderLongStorage',
    data () {
        return {
            statusFlag: true,
            loading: false,
            tableLoading: false,
            URL: urls.semen_quality.addEdit,
            formKey: 0,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                percentageCheck: {
                    required: true,
                    customValidator: (value) => {
                        return (value >= 0 && value <= 100) || 'Percentage must be between 0 and 100';
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
            model: {
                test_date: '',
                production_date: '',
                bull: '',
                ejaculate_no: '',
                ptm_per: '',
                incubation_0_min_per: '',
                incubation_30_min_per: '',
                incubation_60_min_per: '',
                incubation_90_min_per: '',
                incubation_120_min_per: '',
                result: '',
                result_status: '',
                discard: '',
                remarks: '',
                test_done_by: '',
                semen_quarantine: ''
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
                filter: 'long_storage'
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
                this.model.ptm_per = dataItem.ptm;
                this.model.semen_quarantine = dataItem.quarantine_id;
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
                        ptm_per: '',
                        incubation_0_min_per: '',
                        incubation_30_min_per: '',
                        incubation_60_min_per: '',
                        incubation_90_min_per: '',
                        incubation_120_min_per: '',
                        result: '',
                        result_status: '',
                        discard: '',
                        remarks: '',
                        test_done_by: '',
                        semen_quarantine: ''
                    };
                    this.details = {
                        bull: '',
                        bull_name: '',
                        ejaculation_no: '',
                        breed: ''
                    };
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

.pre {
    position: relative;
    top: 4px !important;
}

.pre1 {
    position: relative;
    top: 6px !important;
}

</style>

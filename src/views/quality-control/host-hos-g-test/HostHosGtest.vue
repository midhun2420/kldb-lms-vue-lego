<template>
    <div class=" ">
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb">
                <h3 class="text-primary pl-3 font-poppins-semibold">Host/ Hos-G Test</h3>
                <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
            </div>
            <div class="row">
                <div class="col-lg-2 ">
                    <div class=" ">
                        <validated-select class="c-input-select text-black field-required" label="Test "
                                          v-model="model.test_type"
                                          placeholder="Test  " :options="testTypeOptions"
                                          :rules="{required:true}"></validated-select>
                    </div>
                </div>

                <div class="col-lg-12" v-if="model.test_type === 'Host Test' || model.test_type === 'Hos G Test'">
                    <div class="  col-lg-2 pl-0">

                        <validated-date-picker format="DD-MM-YYYY" class=" text-black c-input-datepicker field-required"
                                               label="Date of the test" :disabled-date="disabledAfterToday" v-model="model.test_date"
                                               :rules="rules.common"></validated-date-picker>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 pr-0">
                            <validated-date-picker format="DD-MM-YYYY"
                                                   class="c-input-datepicker text-black field-required"
                                                   label="Date of the Production" :disabled-date="disabledAfterToday" v-model="model.production_date"
                                                   :rules="rules.compare"></validated-date-picker>
                        </div>
                        <div class="col-lg-2">
                            <validated-vue-select :options="semenTypeOptions"
                                                  class="c-input-select text-black field-required"
                                                  label="Semen Type" v-model="model.semen_type"
                                                  @input="loadDetails" :rules="{required:true}"></validated-vue-select>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12  fl-x ">
                    <div class="row" v-if="tableLoading">
                        <div class=" col-lg-3 pl-0 pr-5">
                            <div class="card pl-0 pr-0 pb-0  w-20r">
                                <table style="width:100%">
                                    <th class="">Bull No</th>
                                    <th class="">EJ No</th>
                                    <th class="">Dose</th>
                                    <tr class="mt-3" v-if="loadingData">
                                        <td colspan="4">Please wait while fetching the data...</td>
                                    </tr>
                                    <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                                        <td colspan="11" class="mt-3"> No data</td>
                                    </tr>
                                    <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)"
                                        style="cursor: pointer">
                                        <td>{{ item.bull.reg_no }}</td>
                                        <td>{{ item.ejaculation_no }}</td>
                                        <td>{{ model.semen_type === 'Frozen' ? item.actual_fsd_dose : item.recorded_dose }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 ">
                        <div  v-if="model.test_type === 'Host Test' || model.test_type === 'Hos G Test'">
                        <div class="row">
                            <div class="col-lg-3 pl-0">
                                <validated-input label="Bull No" class="text-black field-required"
                                                 v-model="details.bull" disabled
                                                 :rules="{required:true}"></validated-input>

                            </div>
                            <div class="col-lg-3 ">
                                <validated-input label="Bull Name" class="text-black" v-model="details.bull_name"
                                                 disabled></validated-input>
                            </div>
                            <div class="col-lg-3 ">
                                <validated-input label="Breed" class="text-black" v-model="details.breed"
                                                 disabled></validated-input>
                            </div>
                            <div class=" col-lg-3">
                                <validated-input label="Ejaculate No" class="text-black field-required"
                                                 v-model="details.ejaculation_no" disabled
                                                 :rules="{required:true}"></validated-input>
                            </div>
                        </div>
                            </div>
                        <div v-if="model.test_type === 'Hos G Test'">
                            <div class="row">
                                <div class="col-lg-2 pt-2 mt-2 pl-0">
                                    <label class="text-black red-asterisk-label">HPAP</label>
                                </div>
                                <div class="col-lg-2 fl-x pr-0">
                                    <validated-input class="mt-2" name="HPAP" v-model="model.hpap"
                                                     :rules="rules.percentageCheck"></validated-input>
                                    <p class="pl-2 pt-2  mt-2">%</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2 pt-2 mt-2 pl-0 ">
                                    <label class="text-black red-asterisk-label">HPAN</label>
                                </div>
                                <div class="col-lg-2 fl-x pr-0">
                                    <validated-input class="mt-2" name="HPAN" v-model="model.hpan"
                                                     :rules="rules.percentageCheck"></validated-input>
                                    <p class="pl-2 pt-2  mt-2">%</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2 pt-2 mt-2 pl-0">
                                    <label class="text-black red-asterisk-label">HNAP</label>
                                </div>
                                <div class="col-lg-2 fl-x pr-0">
                                    <validated-input class="mt-2" name="HNAP" v-model="model.hnap"
                                                     :rules="rules.percentageCheck"></validated-input>
                                    <p class="pl-2 pt-2 mt-2">%</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2 pt-2 mt-2 pl-0">
                                    <label class="text-black red-asterisk-label">HNAN</label>
                                </div>
                                <div class="col-lg-2 fl-x pr-0">
                                    <validated-input class="mt-2" name="HNAN" v-model="model.hnan"
                                                     :rules="rules.percentageCheck"></validated-input>
                                    <p class="pl-2 pt-2 mt-2">%</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="model.test_type === 'Host Test'">

                            <div class="row ">
<!--                                <div class="col-lg-3 pl-0">-->
<!--                                    <validated-input label="Host +ve sperm counted(test)"-->
<!--                                                     v-model="model.host_positive_sperm_test_count"-->
<!--                                                     class="text-black label-font-xs field-required"-->
<!--                                                     :rules="rules.positiveOnly" type="number"></validated-input>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 ">-->
<!--                                    <validated-input label="Total Sperm counted(test)"-->
<!--                                                     v-model="model.total_sperm_test_count"-->
<!--                                                     class="text-black label-font-sm field-required"-->
<!--                                                     :rules="rules.positiveOnly" type="number"></validated-input>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <p class="pt-4 mt-2 text-black fl-x-br pr-2 fs-lg-0">Host +ve % in test</p>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 pt-3 mt-2 fl-x-tr pr-4 ">-->
<!--                                    <div class="fl-x-tr">-->
<!--                                        <validated-input class="w-5r ml-4 field-required"-->
<!--                                                         v-model="model.host_positive_test_percent"-->
<!--                                                         :rules="rules.positiveOnly"></validated-input>-->
<!--                                    </div>-->
<!--                                </div>-->
                                <div class="col-lg-3 mt-4 pl-0">
                                    <validated-input label="Host +ve sperm counted(test)"
                                                     v-model="model.host_positive_sperm_test_count" @input="positiveInTest"
                                                     class="text-black label-font-xs field-required"
                                                     :rules="rules.totalValidationTest" type="number"></validated-input>
                                </div>
                                <div class="col-lg-3 mt-4">
                                    <validated-input label="Total Sperm counted(test)" @input="positiveInTest"
                                                     v-model="model.total_sperm_test_count"
                                                     class="text-black label-font-sm field-required"
                                                     :rules="rules.totalValidationTest" type="number"></validated-input>
                                </div>
                                <div class="col-lg-3 mt-4">
                                    <p class="pt-4 mt-2 fl-x-tr pr-2 text-black fs-lg-0 red-asterisk-label">Host +ve % in test</p>
                                </div>
                                <div class="col-lg-3 pt-5 mt-2 fl-x-tr pr-4 ">
                                    <div class="fl-x-cr">
                                        <validated-input name="Host Test %" class="w-5r ml-4 field-required"
                                                         v-model="model.host_positive_test_percent"
                                                         :rules="rules.percentageCheck" disabled></validated-input>
                                        <p class="mt-2  pl-2">%</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 mt-3 pl-0  pt-2">
                                    <validated-input label="Host +ve sperm counted(control)" @input="positiveInControl(model.host_positive_sperm_control_count,model.total_sperm_control_count)"
                                                     v-model="model.host_positive_sperm_control_count"
                                                     class="text-black field-required" :rules="rules.totalValidationControl"
                                                     type="number"></validated-input>
                                </div>
                                <div class="col-lg-3 mt-3 pt-2">
                                    <validated-input label="Total Sperm counted(control)"
                                                     v-model="model.total_sperm_control_count"  @input="positiveInControl(model.host_positive_sperm_control_count,model.total_sperm_control_count)"
                                                     class="text-black label-font-xs field-required"
                                                     :rules="rules.totalValidationControl" type="number"></validated-input>
                                </div>

                                <div class="col-lg-3">
                                    <p class="pt-5 mt-2 fl-x-tr text-black pr-2 fs-lg-0 red-asterisk-label">Host +ve % in
                                        Control</p>
                                </div>
                                <div class="col-lg-3 pt-4 mt-2 fl-x-br ">
                                    <div class="fl-x-cr">
                                        <validated-input name="Host Control %" class="w-5r ml-5 field-required"
                                                         v-model="model.host_positive_control_percent"
                                                         :rules="rules.percentageCheck" disabled></validated-input>
                                        <p class="mt-2 pl-2">%</p>
                                    </div>
                                </div>
<!--                                <div class="col-lg-3">-->
<!--                                    <p class="pt-5 mt-2 fl-x-br pr-2 text-black fs-lg-0">Host +ve % in Control</p>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 pt-5 mt-2 fl-x-tr pr-4">-->
<!--                                    <div class="fl-x-tr">-->
<!--                                        <validated-input class="w-5r ml-5 field-required"-->
<!--                                                         v-model="model.host_positive_control_percent"-->
<!--                                                         :rules="rules.positiveOnly"></validated-input>-->
<!--                                        <p class=" pl-2 pt-2">%</p>-->
<!--                                    </div>-->
<!--                                </div>-->
                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <p class="pt-2 mt-2  pr-2 font-poppins-semibold fs-lg-0 text-black red-asterisk-label">
                                        HOST
                                        Result</p>
                                </div>
                                <div class="col-lg-3  mt-2 fl-x  pr-4">

                                    <validated-input name="Host Result" class="w-5r"
                                                     v-model="model.host_result_percent" disabled
                                                     :rules="rules.positiveOnly"></validated-input>
                                    <p class="mt-2 pl-2">%</p>
                                </div>
                            </div>
                        </div>
                        <div  v-if="model.test_type === 'Host Test' || model.test_type === 'Hos G Test'">
                        <div class="row">

                            <div class="col-lg-3 pl-0">
                                <validated-vue-select :options="resultOptions" @input="resultStatus"
                                                      class="c-input-select  mt-1 text-black field-required"
                                                      v-model="model.result_status" label="Results"
                                                      :rules="{required:true}"></validated-vue-select>
                            </div>

                            <div class="col-lg-3">
                                <validated-checkbox label="Discard"
                                                    class="pb-0 mb-xl-n4 text-black" v-model="model.discard"
                                                    :disabled="statusFlag"></validated-checkbox>
                                <validated-input class="" v-model="model.result" disabled></validated-input>
                            </div>
                            <div class="col-lg-3 mt-1">
                                <validated-input class=" text-black" v-model="model.remarks"
                                                 label="Remarks"></validated-input>
                            </div>
                        </div>
                            </div>

                </div>

            </div>
                </div>
            <div class="row mt-lg-7">
                    <div class="col-12 fl-x-br ">
                        <div class="fl-x fl-j-e">
                            <div class="btn-group">
                                <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                                <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b"
                                     class="px-4"></btn>
                            </div>
                        </div>
                    </div>
                </div>
        </s-form>

    </div>
</template>

<script>
import urls from '../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'HostHosGtest',
    data () {
        return {
            loading: false,
            tableLoading: false,
            formKey: 0,
            URL: urls.host_test.addEdit,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
            },
            model: {
                test_type: '',
                test_date: '',
                production_date: '',
                semen_type: '',
                bull: '',
                ejaculate_no: '',
                hpap: '',
                hpan: '',
                hnap: '',
                hnan: '',
                host_positive_sperm_test_count: '',
                host_positive_sperm_control_count: '',
                total_sperm_test_count: '',
                total_sperm_control_count: '',
                host_positive_test_percent: '0',
                host_positive_control_percent: '0',
                host_result_percent: '0',
                result_status: '',
                result: '',
                discard: '',
                remarks: '',
                semen_quarantine: ''
            },
            rules: {
                totalValidationTest: {
                    required: true,
                    customValidator: () => {
                        return this.validationTotal();
                    }
                },
                totalValidationControl: {
                    required: true,
                    customValidator: () => {
                        return this.validationTotalControl();
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
                },
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
                }
            },
            testTypeOptions: [
                {
                    value: 'Hos G Test',
                    label: 'Hos-G Test '
                },
                {
                    value: 'Host Test',
                    label: 'Host Test'
                }
            ],
            semenTypeOptions: [
                {
                    value: 'Frozen',
                    label: 'Frozen'
                },
                {
                    value: 'Neat',
                    label: 'Neat'
                }
            ],
            resultOptions: [
                { label: 'Pass', value: 'Pass' },
                { label: 'Fail', value: 'Fail' }
            ],
            bullsList: [],
            selectedIndex: '',
            loadingData: false,
            statusFlag: true
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
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        validationTotalControl () {
            if (this.model.total_sperm_control_count < 0) {
                return 'Please enter a valid number';
            }
            if (this.model.host_positive_sperm_control_count < 0) {
                return 'Please enter a valid number';
            }

            /* const positive = this.model.host_positive_sperm_test_count; */
            console.log('number is ', this.model.host_positive_sperm_test_count);
            if (parseInt(this.model.host_positive_sperm_control_count) > parseInt(this.model.total_sperm_control_count)) {
                return 'Total sperm counted must be greater than Host +ve sperm counted';
            }
            return true;
        },
        validationTotal () {
            console.log('data', this.model.total_sperm_test_count);
            if (this.model.total_sperm_test_count < 0) {
                return 'Please enter a valid number';
            }
            if (this.model.host_positive_sperm_test_count < 0) {
                return 'Please enter a valid number';
            }
            /* const positive = this.model.host_positive_sperm_test_count; */
            console.log('number is ', this.model.host_positive_sperm_test_count);
            if (parseInt(this.model.host_positive_sperm_test_count) > parseInt(this.model.total_sperm_test_count)) {
                return 'Total sperm counted must be greater than Host +ve sperm counted';
            }
            return true;
        },
        positiveInTest () {
            const positiveInTest = (this.model.host_positive_sperm_test_count / this.model.total_sperm_test_count) * 100;
            if (isFinite(positiveInTest)) {
                if (isNaN(positiveInTest)) {
                    this.model.host_positive_test_percent = '0';
                } else {
                    this.model.host_positive_test_percent = positiveInTest.toFixed(2);
                    this.totalHostCalc();
                }
            } else {
                this.model.host_positive_test_percent = '0';
            }
        },
        positiveInControl (a, b) {
            const positiveInControl = (a / b) * 100;
            if (isFinite(positiveInControl)) {
                if (isNaN(positiveInControl)) {
                    this.model.host_positive_control_percent = '0';
                } else {
                    this.model.host_positive_control_percent = positiveInControl.toFixed(2);
                    this.totalHostCalc();
                }
            } else {
                this.model.host_positive_control_percent = '0';
            }
        },
        totalHostCalc () {
            const hostPercent = parseFloat(this.model.host_positive_test_percent) - parseFloat(this.model.host_positive_control_percent);
            if (this.model.host_positive_control_percent !== '0' && this.model.host_positive_sperm_test_count !== '0') {
                if (isFinite(hostPercent)) {
                    if (isNaN(hostPercent)) {
                        this.model.host_result_percent = 0;
                    } else {
                        this.model.host_result_percent = hostPercent.toFixed(2);
                    }
                } else {
                    this.model.host_result_percent = 0;
                }
            } else {
                this.model.host_result_percent = 0;
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
                filter: 'host',
                test_type: this.model.test_type,
                semen_type: this.model.semen_type
            });
            this.bullsList = response.data.data;
            this.tableLoading = true;
            this.loadingData = false;
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
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_type: this.model.test_type,
                        test_date: this.model.test_date,
                        production_date: this.model.production_date,
                        semen_type: this.model.semen_type,
                        bull: '',
                        ejaculate_no: '',
                        hpap: '',
                        hpan: '',
                        hnap: '',
                        hnan: '',
                        host_positive_sperm_test_count: '',
                        host_positive_sperm_control_count: '',
                        total_sperm_test_count: '',
                        total_sperm_control_count: '',
                        host_positive_test_percent: '0',
                        host_positive_control_percent: '0',
                        host_result_percent: '0',
                        result_status: '',
                        result: '',
                        discard: '',
                        remarks: '',
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
    padding-top: 0.2rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    color: var(--color-primary)
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
    border-radius: 1px;

}

hr {
    height: 1px;
    color: #6c757d;
    background-color: #6c757d;
}
</style>

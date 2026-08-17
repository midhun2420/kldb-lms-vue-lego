<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Test Report of Chemical</h2>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" label="Date of Receipt" v-model="model.receipt_date"
                                           class="c-input-datepicker text-black field-required"
                                           :rules="rules.ReceiptValidation"></validated-date-picker>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" label="Date of Testing" v-model="model.test_date"
                                           class="c-input-datepicker text-black field-required"
                                           :rules="rules.tesingValidation"></validated-date-picker>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2 red-asterisk-label">A. Chemical tested</div>
                </div>
                <div class="col-lg-3">
                    <validated-input name="Chemical Tested" class="mr-7" v-model="model.chemical_tested" :rules="{required:true}"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">B. Suppliers</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.suppliers"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">C. Manufacturer</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.manufacturer"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">D. Presentation</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.presentation"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">E. Grade</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.grade"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">F. Batch No</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.batch_no"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">G. pH Test</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.ph_test_1"></validated-input>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.ph_test_2"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">H. pH Control</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.ph_control_1"></validated-input>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.ph_control_2"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">I. Test Protocol</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.test_protocol"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">J. Procedure of Testing</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.testing_procedure"></validated-input>
                </div>
            </div>
            <!--        <div class="row mt-6">-->
            <!--            <div class="col-lg-3"><p class="text-black  fs-lg-1">Bull No</p></div>-->
            <!--            <div class="col-lg-3"><h6 class="text-black fs-lg-1">PTM obtained on using <br> control extender</h6></div>-->
            <!--            <div class="col-lg-3"><h6 class="text-black fs-lg-1">PTM obtained on using <br> test extender</h6></div>-->
            <!--        </div>-->
            <div class="mt-3 row" v-for="(bull_ptm, index) in bull_ptms" :key="index">
                <div class="col-lg-3">
                    <validated-ajax-vue-select :url="bullTypeOptionUrl" label="Bull No" class="mr-lg-7 mt-4  c-input-select"
                                               v-model="bull_ptm.bull"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-lg-7 " label="PTM obtained on using control extender"
                                     v-model="bull_ptm.control_extender"></validated-input>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-lg-7 " label="PTM obtained on using test extender"
                                     v-model="bull_ptm.test_extender"></validated-input>
                </div>
                <div class="col-lg-3">
                    <btn text="Add" v-if="index === bull_ptms.length - 1"
                         @click="addBullPtmItem(index, bull_ptm.bull, bull_ptm.control_extender, bull_ptm.test_extender)"
                         type="button"
                         class="mt-lg-4"></btn>
                </div>
            </div>
            <!--        <div class="mt-3 row">-->
            <!--            <div class="col-lg-3">-->
            <!--                <validated-select class="mr-lg-7 c-input-select"></validated-select>-->
            <!--            </div>-->
            <!--            <div class="col-lg-3">-->
            <!--                <validated-input class="mr-lg-7"></validated-input>-->
            <!--            </div>-->
            <!--            <div class="col-lg-3 mr-0">-->
            <!--                <validated-input class="mr-lg-7"></validated-input>-->
            <!--            </div>-->
            <!--            <div class="col-lg-1 text-left m-0 p-0">-->
            <!--                <btn text="Add" class="px-41"></btn>-->
            <!--            </div>-->
            <!--        </div>-->
            <div class="row mt-4">
                <div class="col-lg-3">
                    <div class="c-label font-poppins-medium mt-2">Remarks</div>
                </div>
                <div class="col-lg-3">
                    <validated-input class="mr-7" v-model="model.remarks"></validated-input>
                </div>
            </div>
            <div class="row mt-lg-6">
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

export default {
    name: 'TestReportOfChemical',
    data () {
        return {
            loading: false,
            URL: urls.chemical_test.addEdit,
            bullTypeOptionUrl: urls.bulls.vueSelect,
            formKey: 0,
            model: {
                test_date: '',
                receipt_date: '',
                chemical_tested: '',
                suppliers: '',
                manufacturer: '',
                presentation: '',
                grade: '',
                batch_no: '',
                ph_test_1: '',
                ph_test_2: '',
                ph_control_1: '',
                ph_control_2: '',
                test_protocol: '',
                testing_procedure: '',
                remarks: ''

            },
            bull_ptms: [
                {
                    bull: '',
                    control_extender: '',
                    test_extender: ''
                }
            ],
            rules: {
                ReceiptValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationReceipt();
                    }
                },
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                tesingValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validationtesing(value);
                    }
                }
            }
        };
    },
    methods: {
        validationReceipt () {
            const receipt = this.model.receipt_date;

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);

            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        Validationtesing (date) {
            const receipt = this.model.receipt_date;

            const aiDateParts = date.split('-');
            if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(aiDateParts[0], 10);
            const aiMonth = parseInt(aiDateParts[1], 10);
            const aiYear = parseInt(aiDateParts[2], 10);

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);
            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(receiptDay) || isNaN(receiptMonth) || isNaN(receiptYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);
            const DateObj = new Date(aiYear, aiMonth - 1, aiDay);
            if (DateObj < receiptDateObj) {
                return 'Testing date should be After the Receipt date .';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        avoidNegetive (no) {
            const num = no;
            if (isNaN(num) || num < 0) {
                return 'Please enter a valid non-negative number';
            }
            return true;
        },
        addBullPtmItem (index, bull, control, test) {
            const existingItems = this.bull_ptms.filter(obj => obj.bull === bull);
            console.log('existingItems.length', existingItems.length);
            if (existingItems.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.bull_ptms.push({ bull: '', control_extender: '', test_extender: '' });
                this.bull_ptms[index].bull = bull;
                this.bull_ptms[index].control_extender = control;
                this.bull_ptms[index].test_extender = test;
                console.log('Bull', this.bull_ptms);
            }
        },
        async addItem () {
            try {
                this.loading = true;
                const bullPtms = JSON.stringify(this.bull_ptms);
                const response = await axios.form(this.URL, {
                    test_date: this.model.test_date,
                    receipt_date: this.model.receipt_date,
                    chemical_tested: this.model.chemical_tested,
                    suppliers: this.model.suppliers,
                    manufacturer: this.model.manufacturer,
                    presentation: this.model.presentation,
                    grade: this.model.grade,
                    batch_no: this.model.batch_no,
                    ph_test_1: this.model.ph_test_1,
                    ph_test_2: this.model.ph_test_2,
                    ph_control_1: this.model.ph_control_1,
                    ph_control_2: this.model.ph_control_2,
                    test_protocol: this.model.test_protocol,
                    testing_procedure: this.model.testing_procedure,
                    remarks: this.model.remarks,
                    bull_ptm: bullPtms
                });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_date: '',
                        receipt_date: '',
                        chemical_tested: '',
                        suppliers: '',
                        manufacturer: '',
                        presentation: '',
                        grade: '',
                        batch_no: '',
                        ph_test_1: '',
                        ph_test_2: '',
                        ph_control_1: '',
                        ph_control_2: '',
                        test_protocol: '',
                        testing_procedure: '',
                        remarks: ''
                    };
                    this.bull_ptms = [
                        {
                            bull: '',
                            control_extender: '',
                            test_extender: ''
                        }
                    ];
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
    }
};
</script>

<style scoped>

</style>

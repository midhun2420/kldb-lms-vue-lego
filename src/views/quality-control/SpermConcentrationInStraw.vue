<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-2">
            <h3 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary mb-4">Sperm Concentration In Straw</h3>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>
        <div class="col-lg-12 fl-x ml-1">
<div class="row">
    <div class="col-lg-5 pl-0">
            <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black  mr-3 field-required"
                                   label="Date of Test" :disabled-date="disabledAfterToday" v-model="model.test_date" :rules="rules.common"></validated-date-picker>
    </div>
     <div class="col-lg-5">
            <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black  field-required"
                                   label="Date of Production" :disabled-date="disabledAfterToday" v-model="model.production_date" @input="loadDetails" :rules="rules.compare"></validated-date-picker></div>
</div>
        </div>
        <div class="column fl-x">
            <div class="col-lg-4 pl-0" v-if="tableLoading">
                <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                    <table style="width:100%">
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
                            <td>{{ item.bull.reg_no }}</td>
                            <td>{{ item.ejaculation_no }}</td>
<!--                            <td>{{ item.recorded_dose }}</td>-->
                            <td>{{ item.actual_fsd_dose }}</td>
                            <td>{{ item.position }}</td>
                        </tr>

                    </table>
                </div>
            </div>
            <div class="col-lg-8 ml-4">
                <div class="column fl-x">
                    <div class="form-group  col-3">
                        <validated-input v-model="details.bull_name" disabled label="Bull Name"></validated-input>
                    </div>
                    <div class="form-group col-3">
                        <validated-input disabled label="Bull No" class="field-required" v-model="details.bull"
                                     :rules="{required:true}"></validated-input>
                    </div>
                    <div class="form-group col-3">
                        <validated-input v-model="details.breed" disabled label="Breed"></validated-input>
                    </div>
                </div>
                <div class="column fl-x">
                    <div class="form-group col-3">
                        <validated-input v-model="details.ejaculation_no" class="field-required" disabled label="Ejaculate No" :rules="{required:true}"></validated-input>
                    </div>
                    <div class="form-group col-3">
                        <validated-input label="Long Storage Position" class="text-black" v-model="details.position" disabled></validated-input>
                    </div>
                </div>
                <div class="col-lg-12 fl-x">
                    <div class="col-3 pl-0 fs-lg--1">
                        <p class="text-black">Total no of sperm counted in 80 square</p>
                    </div>
                    <div class="col-3">
                        <validated-input placeholder="N" class="text-black" v-model="model.no_of_sperm_in_80_square" @input="loadResults" :rules="rules.NValue" type="number"></validated-input>
                    </div>
                </div>
                <div class="col-lg-12 fl-x">
                    <div class="col-3 pl-0 fs-lg--1 mt-2">
                        <p class="text-black">No of Sperm per ml</p>
                    </div>
                    <div class="col-3">
                        <validated-input placeholder="5N x 10⁶" class="text-black" v-model="model.no_of_sperm_per_ml" disabled></validated-input>
                    </div>
                </div>
                <div class="col-lg-12 fl-x">
                    <div class="col-3 pl-0 fs-lg--1 mt-2">
                        <p class="text-black">No of Sperm per straw </p>
                    </div>
                    <div class="col-3">
                        <validated-input placeholder="5N x 10⁶ x 0.21" class="text-black" v-model="model.no_of_sperm_per_straw" disabled></validated-input>
                    </div>
                </div>
                <div class="col-lg-12 fl-x">
                    <div class="col-3 pl-0 fs-lg--1 mt-2">
                        <p class="text-black">Difference</p>
                    </div>
                    <div class="col-4">
                        <validated-input placeholder="(5N x 10⁶ x 0.21) - (20 x 10⁶)" class="text-black" v-model="model.difference" disabled></validated-input>
                    </div>
                </div>
                <div class="col-lg-12 fl-x">
                    <div class="col-3 pl-0 fs-lg--1 mt-2">
                        <p class="text-black">%Difference</p>
                    </div>
                    <div class="col-4">
                        <validated-input placeholder="[(5N x 10⁶ x 0.21) - (20 x 10⁶)] x 100"
                                         class="text-black" v-model="model.difference_per" disabled></validated-input>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-3 mt-2">
                        <validated-vue-select :options="resultOptions" label="Result" class="text-black c-input-select field-required" @input="resultStatus" v-model="model.result_status" :rules="{required:true}"></validated-vue-select>

                    </div>
                    <div class="form-group col-3 mt-1 ">
                        <validated-checkbox label="Discard" class="pb-0 mb-xl-n4 text-black" v-model="model.discard" :disabled="statusFlag"></validated-checkbox>
                        <validated-input v-model="model.result" disabled></validated-input>
                    </div>
                    <div class="form-group col-3 mt-2">
                        <validated-input label="Remarks" class="text-black " v-model="model.remarks"></validated-input>
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
    name: 'SpermConcentrationInStraw',
    data () {
        return {
            loading: false,
            tableLoading: false,
            URL: urls.sperm_concentration.addEdit,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: '',
                position: ''
            },
            formKey: 0,
            model: {
                test_date: '',
                production_date: '',
                bull: '',
                bull_name: '',
                breed: '',
                ejaculate_no: '',
                long_storage_position: '',
                no_of_sperm_in_80_square: '',
                no_of_sperm_per_ml: '',
                no_of_sperm_per_straw: '',
                difference: '',
                difference_per: '',
                result_status: '',
                result: '',
                discard: '',
                remarks: '',
                semen_quarantine: ''
            },
            statusFlag: true,
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                NValue: {
                    required: true,
                    customValidator: (value) => {
                        return this.validateNCount(value);
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
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        async loadDetails () {
            this.details.bull = '';
            this.details.bull_name = '';
            this.details.ejaculation_no = '';
            this.details.breed = '';
            this.model.bull = '';
            this.model.ejaculate_no = '';
            this.details.position = '';
            this.model.result = '';
            this.loadingData = true;
            const response = await axios.form(urls.post_thaw_motility.collectionDetails, {
                production_date: this.model.production_date,
                filter: 'concentration'
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
        validateNCount (value) {
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

            if (num > 429) {
                return 'Total no of sperm counted in 80 square should be less than 430';
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
                this.details.position = dataItem.position;
                this.model.bull = dataItem.bull_id;
                this.model.ejaculate_no = dataItem.ejaculation_no;
                this.model.long_storage_position = dataItem.position;
                this.model.result = dataItem.actual_fsd_dose;
                this.model.semen_quarantine = dataItem.quarantine_id;
            }
        },
        async loadResults () {
            const response = await axios.form(urls.sperm_concentration.loadResult, this.model);
            const data = response.data.data;
            this.model.no_of_sperm_per_ml = data.no_of_sperm_per_ml;
            this.model.no_of_sperm_per_straw = data.no_of_sperm_per_straw;
            this.model.difference = data.difference;
            this.model.difference_per = data.difference_per;
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
                        bull_name: '',
                        breed: '',
                        ejaculate_no: '',
                        long_storage_position: '',
                        no_of_sperm_in_80_square: '',
                        no_of_sperm_per_ml: '',
                        no_of_sperm_per_straw: '',
                        difference: '',
                        difference_per: '',
                        result_status: '',
                        result: '',
                        discard: '',
                        remarks: '',
                        semen_quarantine: ''
                    };
                    this.details.position = '';
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

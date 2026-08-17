<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Deworming</h2>
             <div>
                 <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4 mt-2 ml-1" @click="openListModal"></btn>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
<!--                <div class="col-12">-->
<!--                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">Deworming</h3>-->
<!--                    <div class="fl-x fl-j-e">-->
<!--                            <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4" @click="openListModal"></btn>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="col-lg-2 mt-lg-5">
                    <validated-ajax-vue-select class="c-input-select field-required input-border-primary" placeholder="Shed"
                                               v-model="shed_number"  @input="loadBullOptions" label="Shed" :rules="{required:true}"
                                               :url="shedOptions"></validated-ajax-vue-select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h4 class="text-primary fs-lg-1 font-poppins-medium mb-3">Enter Individually</h4>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :options="bullOptions" @input="loadDetails" class="c-input-select field-required"
                                          label="Animal No / Name" v-model="details.animalno_or_name" :rules="{required:true} "></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Renumber" v-model="details.renumber"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Shed No" v-model="details.shed_number"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Breed" v-model="details.breed"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" disabled
                        class="c-input-datepicker" v-model="details.dob" label="Date of Birth"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="Age" v-model="details.age"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull Weight" v-model="details.bullweight" type="number" :rules="rules.positiveOnly" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Dose" v-model="model.medicineqty" type="text" :rules="rules.positive"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Name" v-model="model.medicine"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Batch No" v-model="model.batchno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker field-required" label="Deworming Date" v-model="model.dewormdate" format="DD-MM-YYYY" :rules="rules.common" ></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.remarks"></validated-input>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                                                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
            <modal ref="listModal" title="Deworming List" width="80r" header-color="secondary" :no-close-on-backdrop="true">
                <div class="row">
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="from_date"
                    :disabled-date="disabledFromDate"
                    label="Dewormed From">
                </validated-date-picker>
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="to_date"
                    :disabled-date="disabledToDate"
                    label="Dewormed To">
                </validated-date-picker>
                <validated-ajax-vue-select class="c-input-select input-border-primary col-4" label="Animal" v-model="animal" :url="animalOptions" :clearable="true"></validated-ajax-vue-select>
                    </div>
                <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false"
                    :extra-params="{from_date : from_date, to_date : to_date, animal:animal}">
                    <template slot="shed_number" slot-scope="props">
                         {{ props.rowData.shed_number ? props.rowData.shed_number.name : '-' }}
                    </template>
                    <template slot="breed" slot-scope="props">
                        {{ props.rowData.breed ? props.rowData.breed.breed_code : '-' }}
                    </template>
                </vue-table>

            </modal>
        </s-form>
    </div>
</template>

<script>

import axios from 'secure-axios';
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'DewormingFirstPage',

    data () {
        return {
            URL: urls.deworming.addEdit,
            loading: false,
            formKey: 0,
            dewormingList: [],
            loadingData: false,
            shed_number: '',
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=bull',
            animalOptions: urls.bulls.allVueSelect,
            bullOptions: [],
            listURL: urls.deworming.list,
            fields: [
                {
                    name: 'animal_no',
                    sortField: 'animal_no',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Animal'
                },
                {
                    name: 'renumber',
                    sortField: 'renumber',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Renumber'
                },
                {
                    name: '__slot:shed_number',
                    sortField: 'shed_number',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Shed Number'
                },
                {
                    name: '__slot:breed',
                    sortField: 'breed',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Breed'
                },
                {
                    name: 'dob',
                    sortField: 'dob',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'DOB'
                },
                {
                    name: 'dewormdate',
                    sortField: 'dewormdate',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Deworm Date'
                },
                {
                    name: 'medicine',
                    sortField: 'medicine',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Medicine'
                },
                {
                    name: 'medicineqty',
                    sortField: 'medicineqty',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Medicine Quantity'
                },
                {
                    name: 'batchno',
                    sortField: 'batchno',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Batch No'
                }
            ],
            animal: '',
            from_date: '',
            to_date: '',
            details: {
                renumber: '',
                breed: '',
                dob: '',
                animalno_or_name: '',
                age: '',
                shed_number: '',
                bullweight: ''
            },
            model: {
                bull: '',
                bullweight: '',
                medicineqty: '',
                medicine: '',
                batchno: '',
                dewormdate: '',
                remarks: ''
            },
            rules: {
                positiveOnly: {
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                positive: {
                    customValidator: (value) => {
                        return this.avoidNegetiveValues(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }
            }
        };
    },
    watch: {
        shed_number (newValue, oldValue) {
            if (newValue) {
                this.model.bull = '';
                this.model.bullweight = '';
                this.model.medicineqty = '';
                this.model.medicine = '';
                this.model.batchno = '';
                this.model.dewormdate = '';
                this.model.remarks = '';

                this.details.renumber = '';
                this.details.shed_number = '';
                this.details.breed = '';
                this.details.dob = '';
                this.details.animalno_or_name = '';
                this.details.age = '';

                this.$refs.form.reset();
            }
        }
    },
    methods: {

        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        parseDate (dateStr) {
            if (!dateStr) return null;

            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        },
        disabledToDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const from = this.parseDate(this.from_date);

            if (from) {
                from.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
        (from && date < from)
            );
        },
        disabledFromDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const to = this.parseDate(this.to_date);

            if (to) {
                to.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
        (to && date > to) //
            );
        },

        async openListModal () {
            console.log('---inside loadList---');
            this.loadingData = true;
            this.from_date = '';
            this.to_date = '';
            this.animal = '';
            try {
                const response = await axios.get(urls.deworming.list, { params: { animal: this.animal, from_date: this.from_date, to_date: this.to_date } });
                this.dewormingList = response.data.data || []; // adjust as per API response
                console.log('API Success --------', this.dewormingList);
            } catch (error) {
                console.error('API Error --------', error);
                this.dewormingList = [];
            } finally {
                this.loadingData = false;
            }
            this.$refs.listModal.show();
        },
        async loadBullOptions () {
            const response = await axios.get(urls.bulls.vueSelects + '?shed_number=' + this.shed_number);
            this.bullOptions = response.data.data;
        },
        dataclear () {
            this.details = [{
                renumber: '',
                breed: '',
                dob: '',
                animalno_or_name: '',
                age: '',
                shed_number: '',
                bullweight: ''
            }];
            this.model.bull = '';
            this.model.bullweight = '';
            this.model.medicineqty = '';
            this.model.medicine = '';
            this.model.batchno = '';
            this.model.dewormdate = '';
            this.model.remarks = '';
            this.bullOptions = [];
            this.shed_number = '';
        },
        async loadDetails () {
            const response = await axios.form(urls.bulls.details, { id: this.details.animalno_or_name });
            const data = response.data.data;
            this.model.bull = data.id;
            this.details.age = data.age;
            this.details.renumber = data.renumber;
            this.details.breed = data.breed.breed_name;
            this.details.dob = data.dob;
            this.details.shed_number = data.shed_number;
            this.details.bullweight = data.last_recorded_weight || data.birthwt;
        },
        async addItem () {
            try {
                this.loading = true;
                this.model.bullweight = this.details.bullweight;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.dataclear();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/semen-station/' });
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
        },
        Validation (date) {
            const dob = this.details.dob;
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

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }

            return true;
        },
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        avoidNegetiveValues (value) {
            const numericValue = parseFloat(value);

            if (isNaN(numericValue)) {
                return 'Please enter a valid numeric value';
            }

            if (numericValue <= 0) {
                return 'Value must be greater than zero';
            }

            return true;
        }
    }

};
</script>

<style scoped>

</style>

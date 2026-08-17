<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Weight Recording</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" text="View" type="button" :loading="loading" loading-text="Loading..." @click="openListModal"></btn>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
    <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Weight Recording</h2>-->

        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-vue-select :options="ShedOrInduvidualOptionURL"
                                      class="c-input-select text-black" v-model="shedwise_or_individualwise" label="Shed Wise/Individual Wise"></validated-vue-select>
            </div>
        </div>
        <div class="row pt-4">

            <div class="col-lg-2" v-if="shedwise_or_individualwise === 'Shed Wise'">
                <validated-ajax-vue-select class="c-input-select text-black field-required" label="Shed No"
                                           :rules="rules.shed"
                                           :url="shedOptionsURL" @input="loadBullOptions"
                                           v-model="shed_number"></validated-ajax-vue-select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-input disabled
                                 class="c-input-select text-black field-required" v-model="details.animal" label=Animal></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-vue-select :options="bullOptions"
                                      :rules="{required:true}"
                                      label="Registration No"
                                      @input="loadDetails" class="text-black field-required c-input-select" v-model="model.bull"></validated-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-input disabled label="Re number" class="text-black" v-model="details.renumber"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input disabled label="Breed" class="text-black" v-model="details.breed"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input disabled label="Source" class="text-black" v-model="details.source"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input disabled label="Date Of Birth" class="text-black" v-model="details.dob"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY"
                                       class="text-black c-input-datepicker field-required" :rules="rules.common" label="Measurement Date"
                                       v-model="model.measurementdate" @input="changeWeight"></validated-date-picker>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-4">
                <div class="card pl-0 pr-0 pt-0 pb-0">
                    <table style="width:100%">
                        <th class="text-primary">Details</th>
                        <th></th>
                        <tr>
                            <td class="text-black">Birth Weight: {{ details.birthwt }}</td>
                        </tr>
                        <tr>
                            <td class="text-black">Last Recorded Weight: {{ details.last_recorded_weight }}</td>
                        </tr>
                        <tr>
                            <td class="text-black">Last Recorded Date: {{ details.last_weight_recorded_date }}</td>
                        </tr>
                        <tr>
                            <td class="text-black">Weight Gain Per Day: {{ details.weight_gain_per_day }}<br>(gm/day)</td>
                        </tr>
                        <tr>
                            <td class="text-black">Overall Weight Gain: {{ details.over_all_weight_gain }}<br>(gm/day)</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-lg-3">
                        <validated-input disabled label="Age(in month)" class="text-black" v-model="details.age_in_months"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Length(cms)" class="text-black " v-model="model.length" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Wither Height(cms)" class="text-black" v-model="model.witherheight" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Heart Girth(cms)" class="text-black " v-model="model.heartgirth" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 mt-4">
                        <validated-input label="Scrotal circumference(cms)" class="text-black label-font-sm--1 " v-model="model.scrotalcircumference"></validated-input>
                    </div>
                    <div class="col-lg-5 mt-4">
                        <validated-input label="Body Weight based on length and heart girth(kg)" class="text-black label-font-sm--1 "
                                         v-model="model.bodyweight_length_heartgirth" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <validated-input label="Body Weight(kg)" class="text-black field-required" v-model="model.bodyweight" type="text" :rules="rules.decimalNumber"
                                         @input="changeWeight"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class="text-black" v-model="model.remarks"></validated-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="column fl-x-br pt-7">
            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
            <btn class="ml-2" design="basic-b" type="reset" @click="BackToHome" text="Cancel"></btn>
        </div>
        <modal ref="listModal" title="Weight Record List" width="80r" header-color="secondary" :no-close-on-backdrop="true">
                <div class="row">
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="from_date"
                    :disabled-date="disabledFromDate"
                    label="Measurement From"
                    >
                </validated-date-picker>
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="to_date"
                    :disabled-date="disabledToDate"
                    label="Measurement To"
                    >
                </validated-date-picker>
                <validated-ajax-vue-select class="c-input-select input-border-primary col-4" label="Animal" v-model="animal" :url="animalOptions"></validated-ajax-vue-select>
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
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'WeightRecording1',
    computed: {
        listData () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.weightRecordList.slice(start, start + this.itemsPerPage);
        }
    },
    data () {
        return {
            animalOption: [
                { label: 'Cow', value: 'cow' },
                { label: 'Bull', value: 'bull' }
            ],
            bullOptions: [],
            formKey: 0,
            loadingData: false,
            animalOptions: urls.bulls.allVueSelect,
            listURL: urls.weightRecord.list,
            animal: '',
            from_date: '',
            to_date: '',
            weightRecordList: [],
            shed_number: '',
            shedwise_or_individualwise: '',
            loading: false,
            URL: urls.weightRecord.addEdit,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            ShedOrInduvidualOptionURL: [
                { label: 'Shed Wise', value: 'Shed Wise' },
                { label: 'Individual Wise', value: 'Individual Wise' }
            ],

            model: {
                bull: '',
                measurementdate: '',
                length: '',
                witherheight: '',
                heartgirth: '',
                scrotalcircumference: '',
                bodyweight_length_heartgirth: '',
                bodyweight: '',
                remarks: ''
            },
            fields: [
                {
                    name: 'bull',
                    sortField: 'bull',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Animal'
                },
                {
                    name: 'dob',
                    sortField: 'dob',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'DOB'
                },
                {
                    name: 'age',
                    sortField: 'age',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Age'
                },
                {
                    name: 'measurement_date',
                    sortField: 'measurement_date',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Measurement Date'
                },
                {
                    name: 'bodyweight',
                    sortField: 'bodyweight',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Weight'
                },
                {
                    name: 'scrotalcircumference',
                    sortField: 'scrotalcircumference',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Scortal Circumference'
                },
                {
                    name: 'witherheight',
                    sortField: 'witherheight',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Wither Height'
                },
                {
                    name: 'heartgirth',
                    sortField: 'heartgirth',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Heart Girth'
                }

            ],
            details: {
                animal: 'Bull',
                source: '',
                age: '',
                age_in_months: '',
                renumber: '',
                breed: '',
                dob: '',
                birthwt: '',
                last_recorded_weight: '',
                last_weight_recorded_date: '',
                weight_gain_per_day: '',
                over_all_weight_gain: ''

            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                decimalNumber: {
                    required: true,
                    customValidator: (value) => {
                        const v = String(value).trim();

                        // Matches integers or decimals: 25, 25.5, 0.75, 100.00 etc.
                        const ok = /^\d+(\.\d+)?$/.test(v);

                        return ok || 'Enter a valid number ';
                    }
                },
                shed: {
                    required: true,
                    customValidator: (value) => {
                        return this.ShedValidation(value);
                    }
                }
            }

        };
    },
    watch: {
        shedwise_or_individualwise (newValue, oldValue) {
            if (newValue === 'Individual Wise') {
                this.shed_number = '';
                this.clearAllData();
                this.loadBullOptions();
            }
        },
        shed_number (newValue, oldValue) {
            if (newValue) {
                this.clearAllData();
            }
        }
    },

    methods: {
        parseDates (dateStr) {
            if (!dateStr) return null;

            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        },
        disabledToDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const from = this.parseDates(this.from_date);

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

            const to = this.parseDates(this.to_date);

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
            // this.loadingData = true;
            this.from_date = '';
            this.to_date = '';
            this.animal = '';
            this.$refs.listModal.show();
        },
        async loadDetails () {
            console.log('this.model.bull', this.model.bull);
            /* this.model.measurementdate = '';
            this.details.age = '';
            this.details.source = '';
            this.details.renumber = '';
            this.details.breed = '';
            this.details.dob = '';
            this.details.birthwt = '';
            this.details.last_recorded_weight = '';
            this.details.last_weight_recorded_date = '';
            this.details.weight_gain_per_day = '';
            this.details.over_all_weight_gain = ''; */

            const response = await axios.form(urls.bulls.details, { id: this.model.bull });
            const data = response.data.data;
            this.model.bull = data.id;
            this.details.age = data.age;
            this.details.age_in_months = data.age_in_months;
            this.details.source = data.source_name;
            this.details.renumber = data.renumber;
            this.details.breed = data.breed.breed_name;
            this.details.dob = data.dob;
            this.details.birthwt = data.birthwt;

            this.details.last_recorded_weight = data.last_recorded_weight;
            this.details.last_weight_recorded_date = data.last_weight_recorded_date;
            this.details.weight_gain_per_day = 0;
            this.details.over_all_weight_gain = 0;
        },
        overAllWeightCalculation () {
            const currentDate = this.parseDate(this.model.measurementdate, 'DD/MM/YYYY');
            const birthWeight = this.details.birthwt;
            const bodyWeight = this.model.bodyweight;
            const birthDate = this.parseDate(this.details.dob, 'DD-MM-YYYY');
            console.log('currentdate', currentDate);
            console.log('birthDate', birthDate);
            const numberOfDays = this.calculateDaysDifference(birthDate, currentDate);
            console.log('numberOfDays', numberOfDays);
            const weight = ((bodyWeight - birthWeight) / numberOfDays) * 1000;
            console.log('weight', weight);
            if (isNaN(weight)) {
                this.details.over_all_weight_gain = 0;
            } else {
                this.details.over_all_weight_gain = weight.toFixed(2);
            }
        },
        weightGainPerDayCalculation () {
            const currentDate = this.parseDate(this.model.measurementdate, 'DD/MM/YYYY');
            const lastRecordedDate = this.parseDate(this.details.last_weight_recorded_date, 'DD/MM/YYYY');
            console.log('WG- lastRecordedDate', lastRecordedDate);
            const numberOfDays = this.calculateDaysDifference(currentDate, lastRecordedDate);
            console.log('WG- numberOfDays', numberOfDays);
            const weightGain = ((this.model.bodyweight - this.details.last_recorded_weight) / numberOfDays) * 1000;
            console.log('WG- weightGain', weightGain);
            if (isNaN(weightGain)) {
                this.details.weight_gain_per_day = 0;
            } else {
                this.details.weight_gain_per_day = weightGain.toFixed(2);
            }
        },
        parseDate (dateString, format) {
            const [day, month, year] = dateString.split(/[/-]/).map(Number);

            switch (format) {
            case 'DD/MM/YYYY':
                return new Date(year, month - 1, day);

            case 'DD-MM-YYYY':
                return new Date(year, month - 1, day);

            default:
                throw new Error('Invalid date format');
            }
        },

        calculateDaysDifference (date1, date2) {
            const oneDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((date1 - date2) / oneDay));
        },

        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        Validation (date) {
            const dob = this.details.dob;
            const lastRecordedDate = this.details.last_weight_recorded_date;
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

            const lastRecordedDateParts = lastRecordedDate.split('-');

            const lastRecordedDateDay = parseInt(lastRecordedDateParts[0], 10);
            const lastRecordedDateMonth = parseInt(lastRecordedDateParts[1], 10);
            const lastRecordedDateYear = parseInt(lastRecordedDateParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);
            const lastRecordedDateobj = new Date(lastRecordedDateYear, lastRecordedDateMonth - 1, lastRecordedDateDay);

            if (lastRecordedDateParts.length !== 3) {
                if (dateObj <= dobDateObj) {
                    return 'Date should be after the date of birth (DOB).';
                }
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (dateObj > currentDate) {
                    return 'Future Date not allowed.';
                }
                return true;
            }

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }

            if (dateObj <= lastRecordedDateobj) {
                return 'Date should be after last recorded date';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            /*
            isEmpty(this.details.last_weight_recorded_date);
            {
                return true;
            } */

            /* const lastRecordedDateObj = new Date(lastRecordedDateYear, lastRecordedDateMonth - 1, lastRecordedDateDay);
            if (dateObj < lastRecordedDateObj) {
                return 'Date must be after the last weight recorded date';
            } */

            return true;
        },
        clearAllData () {
            this.model.bull = '';
            this.model.measurementdate = '';
            this.model.length = '';
            this.model.witherheight = '';
            this.model.heartgirth = '';
            this.model.scrotalcircumference = '';
            this.model.bodyweight_length_heartgirth = '';
            this.model.bodyweight = '';
            this.model.remarks = '';

            this.details.source = '';
            this.details.age = '';
            this.details.age_in_months = '';
            this.details.renumber = '';
            this.details.breed = '';
            this.details.dob = '';
            this.details.birthwt = '';
            this.details.last_recorded_weight = '';
            this.details.last_weight_recorded_date = '';
            this.details.weight_gain_per_day = '';
            this.details.over_all_weight_gain = '';
            // this.$refs.form.reset();
            this.animal = '';
            // this.shed_number = '';
            // this.shedwise_or_individualwise = '';
        },
        ShedValidation (value) {
            console.log('Value:', value);
            return this.shedwise_or_individualwise === 'Shed Wise';
        },
        async loadBullOptions () {
            const response = await axios.get(urls.weightRecord.bullVueSelect + '?shed_number=' + this.shed_number);
            this.bullOptions = response.data.data;
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        async changeWeight () {
            this.weightGainPerDayCalculation();
            this.overAllWeightCalculation();
            // this.details.over_all_weight_gain = this.overallweightCalculation;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.clearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.shed_number = '';
                    this.shedwise_or_individualwise = '';
                    this.formKey++;
                    // await this.$router.push({ path: '/semen-station/' });
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

<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Artificial Insemination</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
                <div class="col-lg-4">
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <validated-date-picker format="DD-MM-YYYY" label="AI Date" v-model="model.ai_date" :disabled-date="disabledAfterToday" @input="loadMatingDetails"
                                                   class="c-input-datepicker text-black field-required" ></validated-date-picker>
                        </div>
                        <div class="col-lg-4">
                            <validated-checkbox label="Double Insemination" v-model="model.double_insemination" class="mt-lg-4"></validated-checkbox>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-lg-6">
                            <validated-vue-select class="c-input-select input-border-primary field-required" label="Cow Type" placeholder="Cow Type"
                                                  v-model="model.cow_type" @input="loadCowOptions" disabled
                                                  :options="cowTypeOptions" :rules="rules.checkDate"></validated-vue-select>
                        </div>
                        <div class="col-lg-6">
                            <validated-vue-select :url="cowOptionsURL" @input="loadDetails" class="c-input-select field-required"
                                     disabled label="Reg No" v-model="model.cow" :rules="{required:true}" :options="cowOptions" ></validated-vue-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <h3 class="text-primary fs-lg-2 font-poppins-medium">Details of Heat</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <validated-date-picker format="DD-MM-YYYY" label="Heat Date" v-model="model.heat_date" class="c-input-datepicker text-black field-required"
                                                   :rules="rules.heatCheckDate"></validated-date-picker>
                        </div>
                        <div class="col-lg-6">
                            <validated-input label="Time" v-model="model.time" class="text-black" placeholder="HH:MM" :rules="rules.Time"></validated-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <validated-select label="Induced / Natural" :options="inducedOptions" v-model="model.induced_or_natural"
                                              class="c-input-select text-black field-required" :rules="{required:true}"></validated-select>
                        </div>
                        <div class="col-lg-6">
                            <validated-input label="Drug Used" v-model="model.drug_used" class="text-black"></validated-input>
                        </div>
                    </div>
<!--                    <div class="row mt-3">-->
<!--                        <div class="col-lg-6">-->
<!--                            <validated-date-picker format="DD-MM-YYYY" label="AI Date" v-model="model.ai_date"-->
<!--                                                   class="c-input-datepicker text-black field-required" :rules="rules.checkDate"></validated-date-picker>-->
<!--                        </div>-->
<!--                        <div class="col-lg-4">-->
<!--                            <validated-checkbox label="Double Insemination" v-model="model.double_insemination" class="mt-lg-4"></validated-checkbox>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <validated-input label="Remarks" v-model="model.remarks" class="text-black"></validated-input>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h6 class="pl-8 text-primary fs-lg-1 font-poppins-medium">List of Active Mating Programs</h6>
                    <vue-table class="ml-5" ref="table" :fields="fields" :url="activeMatingListURL" :per-page="10" search-placeholder="Cow" :extra-params="{ ai_date: model.ai_date }">
                    </vue-table>
<!--                    <table class="c-table-1 ml-5" style="width:100%">-->
<!--                        <thead>-->
<!--                            <tr>-->
<!--                                <th class="text-primary">Date</th>-->
<!--                                <th class="text-primary">Cow</th>-->
<!--                                <th class="text-primary">Bull Allotted</th>-->
<!--                            </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->
<!--                            <tr v-if="!activeMating.length">-->
<!--                                <td colspan="3" class="text-center text-muted">No active mating records found</td>-->
<!--                            </tr>-->
<!--                            <tr v-for="(mating, index) in activeMating" :key="index" @click="selectMating(mating)" style="cursor: pointer">-->
<!--                                <td>{{ mating.mating_date }}</td>-->
<!--                                <td>{{ mating.cow.regno }}</td>-->
<!--                                <td>{{ mating.bull_allotted }}</td>-->
<!--                            </tr>-->
<!--                        </tbody>-->
<!--                    </table>-->
                </div>
                <div class="col-lg-4">
                    <custom-single-column-table class="ml-lg-6">
                        <template #default>
                            <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                                <li><span>Shed No.</span><span class="ml-1">:</span>{{ shed_number }}</li>
                                <li><span>Breed </span><span class="ml-1">:</span>{{ breed }}</li>
                                <li><span>Date of Birth</span> <span class="ml-1">:</span>{{ dob }}</li>
                                <li><span>Bull Allotted</span><span class="ml-1">:</span>{{ bull_allotted }}</li>
                                <li><span>Bull Breed</span><span class="ml-1">:</span>{{ bull_breed }}</li>
                                <li><span>Attempt No</span> <span class="ml-1">:</span>{{ attempt_no }}</li>
                            </ul>
                        </template>
                    </custom-single-column-table>
                </div>
            </div>
            <div class="row mt-lg-5">
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
// import CustomTwoColumnTable from '../../../components/ui/CustomTwoColumnTable';
// import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';
import CustomSingleColumnTable from '../../../components/ui/CustomSingleColumTable';

export default {
    name: 'ArtificialInsemination',
    components: { CustomSingleColumnTable },
    data () {
        return {
            activeMating: [],
            cow_type: '',
            loading: false,
            cowOptionsURL: urls.cows.vueSelect,
            URL: urls.artificial_insemination.addEdit,
            listURL: urls.artificial_insemination.activeMating,
            fields: [
                {
                    name: 'mating_date',
                    title: 'Date'
                },
                {
                    name: 'cow.regno',
                    title: 'Cow'
                },
                {
                    name: 'bull_allotted',
                    title: 'Bull allotted'
                }
            ],
            model: {
                cow_type: '',
                cow: '',
                heat_date: '',
                time: '',
                induced_or_natural: '',
                drug_used: '',
                ai_date: '',
                double_insemination: '',
                remarks: ''
            },
            rules: {
                checkDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.cowValidation(value);
                    }
                },
                heatCheckDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.heatDateValidation(value);
                    }
                },
                checkAIDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.AIDateValidation(value);
                    }
                },
                Time: {
                    required: false,
                    customValidator: (value) => {
                        return this.TimeValidation(value);
                    }
                }
            },
            cowOptions: [],
            breed: '',
            shed_number: '',
            dob: '',
            bull_allotted: '',
            bull_breed: '',
            attempt_no: '',
            cowTypeOptions: [

                { label: 'Heifer', value: 'Heifer' },
                { label: 'Cow', value: 'Cow' }
            ],
            inducedOptions: [
                { label: 'Induced', value: 'Induced' },
                { label: 'Natural', value: 'Natural' }
            ]
        };
    },
    mounted () {
        this.loadCowRegnoOptions();
        // this.loadMatingDetails();
    },
    computed: {
        activeMatingListURL () {
            if (!this.model.ai_date) {
                return this.listURL;
            }

            return this.listURL + '?ai_date=' + this.model.ai_date;
        }
    },
    // watch: {
    //     'model.ai_date' (newValue) {
    //         this.ai_date = newValue; // mirror the value
    //     }
    // },

    methods: {
        TimeValidation (value) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use HH:MM format.';
            }
            return true;
        },
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadCowOptions () {
            this.model.cow = '';
            const response = await axios.get(urls.artificial_insemination.cowAIVueSelect + '?cow_type=' + this.model.cow_type);
            this.cowOptions = response.data.data;
        },
        async loadCowRegnoOptions () {
            const response = await axios.get(this.cowOptionsURL);
            this.cowOptions = response.data.data || [];
        },
        cowValidation (cow) {
            if (this.model.cow === '') {
                return 'Please select a Reg No.';
            }
            const dob = this.dob;
            if (this.dob === '') {
                return 'Please provide DOB.';
            }
            const checkDate = this.model.ai_date;
            console.log('Date of Birth', dob);
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);
            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return ' ';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);
            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);
            if (checkDateObj <= dobDateObj) {
                return 'Date should be greater than the date of birth (DOB).';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        // DateValidation(checkDate) {
        //     if (this.model.cow === '') {
        //         return 'Please select a cow.';
        //     }
        //     const dob = this.dob;
        //     const checkDateParts = checkDate.split('-');
        //     if (checkDateParts.length !== 3) {
        //         return 'Please enter a valid AI date in the format DD-MM-YYYY.';
        //     }
        //     const checkDay = parseInt(checkDateParts[0], 10);
        //     const checkMonth = parseInt(checkDateParts[1], 10);
        //     const checkYear = parseInt(checkDateParts[2], 10);
        //
        //     const dobParts = dob.split('-');
        //     if (dobParts.length !== 3) {
        //         return ' ';
        //     }
        //     const dobDay = parseInt(dobParts[0], 10);
        //     const dobMonth = parseInt(dobParts[1], 10);
        //     const dobYear = parseInt(dobParts[2], 10);
        //
        //     if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
        //         return 'Please enter valid dates in the format DD-MM-YYYY.';
        //     }
        //
        //     const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
        //     const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);
        //
        //     if (checkDateObj <= dobDateObj) {
        //         return 'Date should be greater than the date of birth (DOB).';
        //     }
        //     const currentDate = new Date();
        //     currentDate.setHours(0, 0, 0, 0);
        //     if (checkDateObj > currentDate) {
        //         return 'Future Date not allowed.';
        //     }
        //
        //     return true;
        // },

        heatDateValidation (checkDate) {
            console.log('inside heat date validation------------------------');
            if (this.model.cow === '') {
                return 'Please select a Reg No.';
            }
            const dob = this.dob;
            if (this.dob === '') {
                return 'Please provide DOB.';
            }
            console.log('Date of Birth', dob);
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);
            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return ' ';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);
            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);
            if (checkDateObj <= dobDateObj) {
                return 'Date should be greater than the date of birth (DOB).';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            // NEW VALIDATION: AI DATE MUST BE ±3 DAYS FROM HEAT DATE
            console.log('ai_date inside heat date validation-----', this.model.ai_date);
            if (this.model.ai_date) {
                console.log('ai date---------------', this.model.ai_date);
                const heatParts = this.model.ai_date.split('-');
                const heatDateObj = new Date(
                    parseInt(heatParts[2]),
                    parseInt(heatParts[1]) - 1,
                    parseInt(heatParts[0])
                );

                const twoDaysBefore = new Date(heatDateObj);
                twoDaysBefore.setDate(twoDaysBefore.getDate() - 3);

                const twoDaysAfter = new Date(heatDateObj);
                twoDaysAfter.setDate(twoDaysAfter.getDate() + 3);

                if (checkDateObj > heatDateObj || checkDateObj < twoDaysBefore) {
                    return 'The Heat Date should fall within 3 days before the AI Date.';
                }
            }
            // ------------------------------------------------------------
            return true;
        },
        AIDateValidation (checkDate) {
            const dob = this.dob;
            console.log('dob', dob);
            const checkDateParts = checkDate.split('-');

            if (checkDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }

            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return ' ';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (checkDateObj <= dobDateObj) {
                return 'Date should be greater than the date of birth (DOB).';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        async loadMatingDetails () {
            try {
                this.model.cow = '';
                // this.model.heat_date = '';
                this.breed = '';
                this.shed_number = '';
                this.dob = '';
                this.bull_allotted = '';
                this.bull_breed = '';
                this.attempt_no = '';
                const response = await axios.get(urls.artificial_insemination.activeMating + '?' + 'ai_date=' + this.model.ai_date);
                const data = response.data.data;

                if (response.data.error) {
                    this.$notify(response.data.message, 'Warning', { type: 'warning' });
                    this.activeMating = [];
                } else {
                    this.activeMating = Array.isArray(data) ? data : [data];
                }
            } catch (error) {
                this.$notify('Failed to load active mating details', 'Error', { type: 'danger' });
                this.activeMating = [];
            }
        },
        async selectMating (mating) {
            this.model.cow = mating.cow?.id || '';
            this.model.cow_type = mating.cow.cow_type || '';
            await this.loadDetails();
        },
        async loadDetails () {
            // this.model.ai_date = '';
            this.model.heat_date = '';
            this.breed = '';
            this.shed_number = '';
            this.dob = '';
            this.bull_allotted = '';
            this.bull_breed = '';
            this.attempt_no = '';
            const response = await axios.get(urls.artificial_insemination.cowDetails + '?id=' + this.model.cow + '&ai_date=' + this.model.ai_date);
            const data = response.data.data;
            console.log('Data', data);
            if (response.data.error) {
                this.$notify(response.data.message, 'Warning', { type: 'warning' });
            } else {
                this.breed = data.breed;
                this.shed_number = data.shed_no;
                this.dob = data.dob;
                this.bull_allotted = data.bull_allotted;
                this.bull_breed = data.bull_breed;
                this.attempt_no = data.attempt_no;
                console.log('this.dob', this.dob);
            }
        },
        ClearAllData () {
            this.model.cow_type = '';
            this.model.cow = '';
            this.model.heat_date = '';
            this.model.time = '';
            this.model.induced_or_natural = '';
            this.model.drug_used = '';
            this.model.ai_date = '';
            this.model.double_insemination = '';
            this.model.remarks = '';
            this.cow_type = '';
            this.breed = '';
            this.shed_number = '';
            this.dob = '';
            this.bull_allotted = '';
            this.bull_breed = '';
            this.attempt_no = '';
            this.activeMating = [];
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.ClearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/ah-section/' });
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

</style>;

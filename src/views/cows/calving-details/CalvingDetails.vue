<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Calving Details</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Calving Details</h2>-->
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-ajax-vue-select :url="cowOptions" @input="loadDetails"  label="Reg No" v-model="model.cow" class="c-input-select text-black field-required" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                </div>
                 <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" label="Date of Calving" v-model="model.calving_date" :disabled-date="disabledAfterToday" @input="loadDetails" class="c-input-datepicker text-black field-required" :rules="rules.checkDate"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="No. of female calves" v-model="model.female_calves_no" class="text-black" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="No. of male calves" v-model="model.male_calves_no" class="text-black" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-checkbox label="Twin" v-model="model.twin" class="mt-lg-4"></validated-checkbox>
                    </div>
                </div>
<!--                <div class="row mt-3">-->
<!--                    <div class="col-lg-3">-->
<!--                        <validated-input label="No. of dead calves" v-model="model.dead_calves_no" class=" text-black" :rules="rules.positiveOnly"></validated-input>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="No. of female dead calves" v-model="model.female_dead_calves_no" class=" text-black" :rules="rules.positive"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="No. of male dead calves" v-model="model.male_dead_calves_no" class=" text-black" :rules="rules.positive"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Calving Difficulty" v-model="model.calving_difficulty" class=" text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <custom-single-column-table class="ml-lg-5">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Re Number :</span>{{renumber}}</li>
                            <li><span>Date of Birth :</span>{{dob}}</li>
                            <li><span>Breed :</span>{{breed}}</li>
                            <li><span>Pregnancy No </span><span>:</span>{{pregnancy_no}}</li>
                            <li><span>No of Times Calved</span><span>:</span>{{no_of_times_calved}}</li>
                            <li><span>Date of Last AI / ET</span> <span>:</span>{{ai_date}}</li>
                            <li><span>Bull No </span> <span>:</span>{{bull_no}}</li>
                            <li><span>No of Attempts</span> <span>:</span>{{attempt_no}}</li>
                            <li><span>Pregnancy Term</span> <span>:</span>{{pregnancy_term}}</li>
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
// import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';
import CustomSingleColumnTable from '../../../components/ui/CustomSingleColumTable';

export default {
    name: 'CalvingDetails',
    components: { CustomSingleColumnTable },
    data () {
        return {
            loading: false,
            URL: urls.calving_details.addEdit,
            model: {
                cow: '',
                calving_date: '',
                female_calves_no: 0,
                male_calves_no: 0,
                twin: '',
                // dead_calves_no: 0,
                female_dead_calves_no: 0,
                male_dead_calves_no: 0,
                calving_difficulty: '',
                remarks: ''
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                positive: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                checkDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                }
            },
            cowOptions: urls.artificial_insemination.cowVueSelect,
            renumber: '',
            dob: '',
            breed: '',
            pregnancy_no: '',
            no_of_times_calved: '',
            bull_no: '',
            ai_date: '',
            attempt_no: '',
            pregnancy_term: ''
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadDetails () {
            // this.renumber = '';
            // this.dob = '';
            // this.breed = '';
            // this.pregnancy_no = '';
            // this.no_of_times_calved = '';
            // this.ai_date = '';
            // this.bull_no = '';
            // this.attempt_no = '';
            // this.pregnancy_term = '';
            const response = await axios.get(urls.calving_details.cowDetails + '?id=' + this.model.cow + '&calving_date=' + this.model.calving_date);
            if (response.data.error) {
                this.$notify(response.data.message, 'Warning', { type: 'warning' });
            } else {
                const data = response.data.data;
                this.renumber = data.re_number;
                this.dob = data.dob;
                this.breed = data.breed;
                this.pregnancy_no = data.pregnancy_no;
                this.no_of_times_calved = data.no_of_times_calved;
                this.ai_date = data.ai_date;
                this.bull_no = data.bull_no;
                this.attempt_no = data.no_of_attempts;
                this.pregnancy_term = data.pregnancy_term;
            }
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        DateValidation (checkDate) {
            const dob = this.ai_date;
            if (!dob) {
                return true;
            }
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
                return 'Checkup Date should be greater than the AI Date.';
            }

            return true;
        },
        ClearAllData () {
            this.model.cow = '';
            this.model.calving_date = '';
            this.model.female_calves_no = '';
            this.model.male_calves_no = '';
            this.model.twin = '';
            this.model.female_dead_calves_no = '';
            this.model.male_dead_calves_no = '';
            this.model.calving_difficulty = '';
            this.model.remarks = '';
            this.renumber = '';
            this.dob = '';
            this.breed = '';
            this.pregnancy_no = '';
            this.no_of_times_calved = '';
            this.bull_no = '';
            this.ai_date = '';
            this.attempt_no = '';
            this.pregnancy_term = '';
            // this.cowOptions = [];
        },
        async addItem () {
            try {
                this.loading = true;
                if (this.model.female_dead_calves_no === undefined || this.model.female_dead_calves_no === null) {
                    this.model.female_dead_calves_no = 0;
                }
                if (this.model.male_dead_calves_no === undefined || this.model.male_dead_calves_no === null) {
                    this.model.male_dead_calves_no = 0;
                }
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

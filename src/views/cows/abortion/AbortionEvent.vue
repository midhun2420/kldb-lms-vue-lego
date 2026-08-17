<template>
    <div>
         <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Abortion Event</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Abortion Event</h2>-->
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-ajax-vue-select :url="cowOptions" @input="loadDetails"  label="Registration No" v-model="model.cow" class="c-input-select text-black field-required" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                </div>
                 <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date of Abortion" v-model="model.abortion_date" class="c-input-datepicker text-black field-required" format="DD-MM-YYYY" :rules="{required:true}"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Current Lactation Status" disabled v-model="this.latest_status" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-lg-6">
                        <validated-checkbox label="Continue with Current Lactation" v-model="model.continue_with_lactation_no" class="mt-lg-4"></validated-checkbox>
                    </div>
                </div>
            </div>
             <div class="col-lg-4">
                <custom-single-column-table class="ml-lg-5">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Date of Birth </span><span>:</span>{{dob}}</li>
                            <li><span>Breed </span><span>:</span>{{breed}}</li>
<!--                            <li><span>Pregnancy No </span><span>:</span>{{no_of_times_calved}}</li>-->
                            <li><span>No of Times Calved </span><span>:</span>{{no_of_times_calved}}</li>
                            <li><span>Date of AI / ET </span> <span>:</span>{{ai_date}}</li>
                            <li><span>Bull</span> <span>:</span>{{bull_no}}</li>
                            <li><span>No of Attempts </span> <span>:</span>{{attempt_no}}</li>
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
    name: 'AbortionEvent',
    components: { CustomSingleColumnTable },
    data () {
        return {
            loading: false,
            URL: urls.abortion_event.addEdit,
            model: {
                cow: '',
                abortion_date: '',
                remarks: ''
            },
            rules: {
                checkDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                }
            },
            cowOptions: urls.artificial_insemination.cowVueSelect,
            dob: '',
            breed: '',
            pregnancy_no: '',
            no_of_times_calved: '',
            ai_date: '',
            bull_no: '',
            attempt_no: '',
            latest_status: ''
        };
    },

    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        async loadDetails () {
            this.dataClear();
            const response = await axios.get(urls.abortion_event.cowDetails + '?id=' + this.model.cow);
            const data = response.data.data;
            this.dob = data.dob;
            this.breed = data.breed;
            this.pregnancy_no = data.pregnancy_no;
            this.no_of_times_calved = data.no_of_times_calved;
            this.ai_date = data.ai_date;
            this.bull_no = data.bull_no;
            this.attempt_no = data.attempt_no;
            this.latest_status = data.latest_status;
        },
        dataClear () {
            this.model.remarks = '';
            this.model.abortion_date = '';
        },
        DateValidation (checkDate) {
            const dob = this.ai_date;
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
            this.model.abortion_date = '';
            this.model.remarks = '';
            this.dob = '';
            this.breed = '';
            this.pregnancy_no = '';
            this.no_of_times_calved = '';
            this.ai_date = '';
            this.bull_no = '';
            this.attempt_no = '';
            this.latest_status = '';
            // this.cowOptions = [];
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

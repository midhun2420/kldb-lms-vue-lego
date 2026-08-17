<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Pregnancy Check-up</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <div class="col-lg-12 column fl-x pl-0">-->
<!--            <div class="col-lg-6 pl-0">-->
<!--                <h2 class="head font-poppins-bold mt-3 text-primary">Pregnancy Check-up</h2>-->
<!--            </div>-->
            <div class="col-lg-12 fl-x fl-x-br">
                <div class="fl-x fl-a-c">
<!--                    <img src="../../assets/web/icons/link_icon.svg" class="mr-1">-->
                    <a href="#" class="text-primary font-poppins-medium font-italic fl-eqh-r" @click="downloadReport(model.checkup_date)">Due for Pregnancy Checkup</a>
                </div>
            </div>
<!--        </div>-->
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                   <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" label="Date" v-model="model.checkup_date" :disabled-date="disabledAfterToday" @input="loadCowDetails" class="c-input-datepicker text-black field-required" :rules="rules.checkDate"></validated-date-picker>
                    </div>
                </div>
                 <div class="row ">
                      <div class="col-lg-3">
                        <validated-select :options="cowOptions" @input="loadDetails"  label="Registration No" v-model="model.cow" class="c-input-select text-black field-required" :rules="{required:true}"></validated-select>
                    </div>

                </div>
                <div class="row ">
                    <div class="col-lg-3">
                        <validated-select label="Result" :options="resultOptions" v-model="model.result" class="c-input-select text-black field-required" :rules="{required:true}"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-select label="Method Used" :options="methodOptions" v-model="model.method_used" class="c-input-select text-black field-required" :rules="{required:true}"></validated-select>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" ></validated-input>
                    </div>
                </div>
            </div>
             <div class="col-lg-4 mt-5">
                <custom-single-column-table class="ml-lg-5">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Date of Birth :</span>{{dob}}</li>
                            <li><span>Breed :</span>{{breed}}</li>
                            <li><span>Date of AI / ET </span> <span class="ml-1">:</span>{{ai_date}}</li>
                            <li><span>Bull No </span> <span class="ml-1">:</span>{{bull_no}}</li>
                            <li><span>No of Attempts</span> <span class="ml-1">:</span>{{attempt_no}}</li>
                            <li><span>Days after AI / ET</span> <span class="ml-1">:</span>{{days_after_insemination}}</li>
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
    name: 'PregnancyCheckup',
    components: { CustomSingleColumnTable },
    data () {
        return {
            loading: false,
            URL: urls.pregnancy_checkup.addEdit,
            model: {
                cow: '',
                checkup_date: '',
                result: '',
                method_used: '',
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
            resultOptions: [
                { label: 'Positive', value: 'Positive' },
                { label: 'Negative', value: 'Negative' },
                { label: 'Recheck', value: 'Recheck' }
            ],
            methodOptions: [
                { label: 'Rectal Examination', value: 'Rectal Examination' },
                { label: 'Ultrasound', value: 'Ultrasound' },
                { label: 'Others', value: 'Others' }
            ],
            cowOptionsUrl: urls.pregnancy_checkup.vueSelect,
            cowOptions: [],
            dob: '',
            breed: '',
            bull_no: '',
            days_after_insemination: '',
            ai_date: '',
            attempt_no: ''
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
                return 'Checkup Date should be greater than AI Date.';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        async downloadReport () {
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.pregnancy_checkup.pregnancyCheckupReport + '?checkup_date=' + this.model.checkup_date);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    that.$notify(json.message, 'Error', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.$notify('Failed to download the report. Please try again.', 'Error', { type: 'error' });
            }
        },
        async loadCowDetails () {
            this.model.cow = '';
            this.cowOptions = [];
            this.dob = '';
            this.breed = '';
            this.ai_date = '';
            this.bull_no = '';
            this.days_after_insemination = '';
            this.attempt_no = '';
            this.model.result = '';
            this.model.method_used = '';
            this.model.remarks = '';
            const response = await axios.get(this.cowOptionsUrl + '?' + 'checkup_date=' + this.model.checkup_date);
            if (response.data.error) {
                this.$notify(response.data.message, 'Warning', { type: 'warning' });
            } else {
                const data = response.data.data;
                this.cowOptions = data;
            }
        },
        async loadDetails () {
            // this.dob = '';
            // this.breed = '';
            // this.ai_date = '';
            // this.bull_no = '';
            // this.days_after_insemination = '';
            // this.attempt_no = '';
            const response = await axios.get(urls.pregnancy_checkup.cowDetails + '?id=' + this.model.cow + '&checkup_date=' + this.model.checkup_date);
            if (response.data.error) {
                this.$notify(response.data.message, 'Warning', { type: 'warning' });
            } else {
                const data = response.data.data;
                this.dob = data.dob;
                this.breed = data.breed;
                this.ai_date = data.ai_date;
                this.bull_no = data.bull_no;
                this.days_after_insemination = data.days_after_insemination;
                this.attempt_no = data.attempt_no;
            }
        },
        // async loadDayDetails () {
        //     const response = await axios.get(urls.pregnancy_checkup.dayDetails + '?id=' + this.model.checkup_date);
        //     const data = response.data.data;
        //     this.attempt_no = data.attempt_no;
        // },
        ClearAllData () {
            this.model.cow = '';
            this.model.checkup_date = '';
            this.model.result = '';
            this.model.method_used = '';
            this.model.remarks = '';
            this.dob = '';
            this.breed = '';
            this.bull_no = '';
            this.days_after_insemination = '';
            this.ai_date = '';
            this.attempt_no = '';
            this.cowOptions = [];
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

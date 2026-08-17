<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Semen Receipt</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" label="Date of Receipt" :disabled-date="disabledAfterToday" v-model="model.received_date" class="c-input-datepicker text-black field-required" :rules="rules.common"></validated-date-picker>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                <validated-input label="Received from" v-model="model.received_from" class="text-black field-required" :rules="{required:true}"></validated-input>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                    <validated-input label="Reg No." v-model="model.reg_no" class="text-black field-required" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptions" label="Breed" v-model="model.breed" class="c-input-select text-black field-required" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                    <validated-ajax-vue-select :url="doseTypeOptions" label="Dose Type" v-model="model.dose_type" class="c-input-select text-black field-required" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
            <div class="col-lg-2">
                <validated-input label="No. of Doses" v-model="model.no_of_doses" class="text-black field-required" :rules="rules.positiveOnly"></validated-input>
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
import urls from '../../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../../data/masterURLs';

export default {
    name: 'SemenReceipt',
    data () {
        return {
            loading: false,
            URL: urls.semen_receipt.addEdit,
            formKey: 0,
            model: {
                received_date: '',
                received_from: '',
                reg_no: '',
                breed: '',
                dose_type: '',
                no_of_doses: '',
                storage_add: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            },
            breedOptions: masterURLs.master.breed.vueSelect,
            doseTypeOptions: masterURLs.master.doseType.vueSelect
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        avoidNegetive (no) {
            // const num = no;
            const num = parseInt(no, 10);

            if (isNaN(num) || num < 0 || num !== parseFloat(no) || num % 1 !== 0) {
                return 'Please enter a valid positive whole number';
            }
            return true;
        },
        validationDate (checkDate) {
            // const checkDate = this.model.date_of_transfer;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
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
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
                    this.model = {
                        received_date: '',
                        received_from: '',
                        reg_no: '',
                        breed: '',
                        dose_type: '',
                        no_of_doses: '',
                        storage_add: ''
                    };
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

<template>
    <div class="">
        <s-form @submit="addItem">
            <div class="row">
                <div class="col-6">
                    <validated-date-picker label="Date" format="DD-MM-YYYY" v-model="data.vaccination_date" class="field-required" :rules="rules.dateValidation"></validated-date-picker>
                </div>
                <div class="col-6">
                    <validated-ajax-vue-select :url="vaccoption" label="Type" v-model="data.vaccination_obj" class="field-required" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-12">
                    <validated-input label="Name" v-model="data.vaccination_name" class="field-required" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-6">
                    <validated-input label="Vaccine Batch No" v-model="data.vaccination_batch_no" class="field-required" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-6">
                    <validated-date-picker label="Next Due Date" format="DD-MM-YYYY" v-model="data.next_due_date" class="field-required" :rules="rules.nextduedateValidation"></validated-date-picker>
                </div>
                <div class="col-12">
                    <validated-input label="Remarks" v-model="data.remarks"  class="field-required" :rules="{required:true}"></validated-input>
                </div>

                <div class="col-12">
                    <div class="text-right">
                        <btn text="Save" :loading="loading" loading-text="Saving..."></btn>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../../../data/masterURLs';

export default {
    name: 'VaccinationEdit',
    props: {
        data: {
            type: Object
        },
        id: {},
        animal: {
            type: String
        }
    },

    mounted () {
        console.log('vaccdata : ', this.data);
        console.log('vacc Id  : ', this.id);
        console.log(' animal  : ', this.animal);
    },
    data () {
        return {
            vacdate: this.data.vaccination_date,
            response: '',
            vaccoption: masterURLs.master.VaccinationType.vueSelect,
            loading: false,
            URL: urls.bullDetailEdit.vaccinationEdit,
            COWURL: urls.cowDetailEdit.vaccinationEdit,
            COWProfileURL: urls.cowDetailEdit.profileEdit,
            BULLProfileURL: urls.bullDetailEdit.profileedit,

            rules: {
                dateValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationdate(value);
                    }
                },
                nextduedateValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationnextduedate(value);
                    }
                }
            }
        };
    },
    methods: {
        validationnextduedate (date) {
            const dob = this.data.dob;
            const dobParts = dob.split('-');

            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const vaccdate = this.vacdate;
            console.log('vaccdate', vaccdate);
            const vaccdateParts = this.vacdate.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            if (vaccdateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }

            const dateDay = parseInt(dateParts[0], 10);
            const dateMonth = parseInt(dateParts[1], 10);
            const dateYear = parseInt(dateParts[2], 10);

            const dateDateObj = new Date(dateYear, dateMonth - 1, dateDay);

            const vaccdateDay = parseInt(vaccdateParts[0], 10);
            const vaccdateMonth = parseInt(vaccdateParts[1], 10);
            const vaccdateYear = parseInt(vaccdateParts[2], 10);

            const vaccdateDateObj = new Date(vaccdateYear, vaccdateMonth - 1, vaccdateDay);

            if (dobParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateDateObj < dobDateObj) {
                return 'Enter a date after Date Of Birth (DOB).';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (vaccdateDateObj > dateDateObj) {
                return 'Please enter a date after vaccination date.';
            }
            if (dateDateObj < currentDate) {
                return 'Please enter a date from today onwards.';
            }

            return true;
        },
        validationdate (date) {
            const dob = this.data.dob;
            const dobParts = dob.split('-');

            const dateParts = date.split('-');
            const vaccdateParts = this.data.next_due_date.split('-');

            /*       if (vaccdateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            } */
            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dateDay = parseInt(dateParts[0], 10);
            const dateMonth = parseInt(dateParts[1], 10);
            const dateYear = parseInt(dateParts[2], 10);

            const dateDateObj = new Date(dateYear, dateMonth - 1, dateDay);

            const vaccdateDay = parseInt(vaccdateParts[0], 10);
            const vaccdateMonth = parseInt(vaccdateParts[1], 10);
            const vaccdateYear = parseInt(vaccdateParts[2], 10);

            const vaccdateDateObj = new Date(vaccdateYear, vaccdateMonth - 1, vaccdateDay);
            if (dobParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateDateObj < dobDateObj) {
                return 'Enter a date after Date Of Birth (DOB).';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            if (dateDateObj > vaccdateDateObj) {
                return 'Date must before the Next Due Date. ';
            }
            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                if (this.data.vaccination_obj.value) {
                    this.data.vaccination_type = this.data.vaccination_obj.value;
                } else {
                    this.data.vaccination_type = this.data.vaccination_obj;
                }
                if (this.animal === 'cow') {
                    this.data.cows = this.id;
                } else {
                    this.data.bulls = this.id;
                }
                for (const prop in this.data) {
                    if (Object.prototype.hasOwnProperty.call(this.data, prop)) {
                        if (this.data[prop] === 'N/A') {
                            this.data[prop] = '';
                        }
                    }
                }
                if (this.animal === 'cow') {
                    this.response = await axios.form(this.COWURL, this.data);
                } else {
                    this.response = await axios.form(this.URL, this.data);
                }
                const result = this.response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    console.log('data while saving1 ', this.data.vaccination_type);
                    this.loading = false;
                    console.log('data while saving', this.data);
                    this.$emit('success', 'vaccination');
                } else {
                    const errors = this.response.data.errors;
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

</style>

<template>
    <div class="">
        <div>
            <s-form @submit="addItem">
                <div class="row">
                    <div class="col-6">
                        <validated-date-picker label="Measurement Date"
                                               v-model="data.measurementdate" format="DD-MM-YYYY" type="number" :rules="rules.dateValidation"></validated-date-picker>
                    </div>
                    <div class="col-6">
                        <validated-input label="Length"
                                         v-model="data.length" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-6">
                        <validated-input label="Wither Height"
                                         v-model="data.witherheight" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-6">
                        <validated-input label="Weight"
                                         v-model="data.bodyweight" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-6">
                        <validated-input
                            label="Heart Grith" v-model="data.heartgirth" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div v-if="animal==='bull'" class="col-6">
                        <validated-input label="Scrotal circumference"
                                         v-model="data.scrotalcircumference" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-12">
                        <validated-input label="Remarks"
                                         v-model="data.remarks"></validated-input>
                    </div>
                    <div class="col-12">
                        <div class="text-right">
                            <btn text="Save" :loading="loading" loading-text="Saving..."></btn>
                        </div>
                    </div>
                </div>
            </s-form>
        </div>

    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../../data/urls';

export default {
    props: {
        data: {
            type: Object
        },
        bullid: {},
        cowid: {},
        animal: {
            type: String
        }
    },
    mounted () {
        console.log('insideweight recording modal:objects :', this.data);
        console.log('weight record date :', this.data.measurementdate);
        console.log(' animal  : ', this.animal);
        console.log(' dob  : ', this.data.dob);
    },
    name: 'Weightrecording',
    data () {
        return {
            updtDate: '',
            response: '',
            loading: false,
            URL: urls.bullDetailEdit.weightrecord,
            URLCOW: urls.cowDetailEdit.weightrecord,
            rules: {
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },

                dateValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationdate(value);
                    }
                }
            }

        };
    },
    methods: {
        validationdate (date) {
            const dob = this.data.dob;
            console.log(dob, 'dobsgdeazhedhsrfhdcgtg');
            const dobParts = dob.split('-');

            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dateDay = parseInt(dateParts[0], 10);
            const dateMonth = parseInt(dateParts[1], 10);
            const dateYear = parseInt(dateParts[2], 10);

            const dateDateObj = new Date(dateYear, dateMonth - 1, dateDay);

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

            return true;
        },
        avoidNegetive (value) {
            const num = value;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                if (this.animal === 'cow') {
                    this.data.cow = this.cowid;
                } else {
                    this.data.bull = this.bullid;
                }
                if (this.animal === 'cow') {
                    this.response = await axios.form(this.URLCOW, this.data);
                } else {
                    this.response = await axios.form(this.URL, this.data);
                }

                const result = this.response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.$emit('success', 'weightrecording');
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

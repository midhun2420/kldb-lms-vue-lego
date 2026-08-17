<template>
    <div class="">
        <s-form @submit="addItem">
            <div class="row">
                <div class="col-6">
                    <validated-date-picker class="field-required" label="Date" format="DD-MM-YYYY" v-model="data.screening_date" :rules="rules.dateValidation"></validated-date-picker>
                </div>

                <div class="col-6">
                    <validated-ajax-vue-select class="field-required" :url="DesiesOption" label="Disease" v-model="data.disease_obj" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
<!--                <div class="col-6" v-if="this.animal==='cow'">-->
<!--                    <validated-input class="field-required" label="Screening Duration" type="number" v-model="data.screening_duration" :rules="rules.positiveOnly"></validated-input>-->
<!--                </div>-->
<!--                <div class="col-6" v-else>-->
<!--                    <validated-ajax-vue-select class="field-required" :url="frequencyURL" label="Screening Duration" v-model="data.screening_obj" :rules="rules.positiveOnly"></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-6">
                    <validated-date-picker class="field-required" label="Result" v-model="data.result_date" :rules="rules.nextduedateValidation" format="DD-MM-YYYY"></validated-date-picker>
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
    name: 'ScreeningEdit',
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
        console.log('Screendata : ', this.data);
        console.log('Screen Id  : ', this.id);
        console.log(' animal  : ', this.animal);
    },
    data () {
        return {
            frequencyURL: masterURLs.master.frequency.vueSelect,
            vacdate: this.data.screening_date,
            response: '',
            loading: false,
            DesiesOption: masterURLs.master.diseaseType.vueSelect,
            URL: urls.bullDetailEdit.screeningEdit,
            COWURL: urls.cowDetailEdit.screeningEdit,
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
                },
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            }
        };
    },
    methods: {
        avoidNegetive (value) {
            const num = value;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        validationnextduedate (date) {
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            /* const vaccdate = this.vacdate;
            console.log('vaccdate', vaccdate); */
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

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (vaccdateDateObj > dateDateObj) {
                return 'Please enter a date after Screening Date.';
            }
            /*      if (dateDateObj < currentDate) {
                return 'Please enter a date from today onwards.';
                ;
            } */

            return true;
        },
        validationdate (date) {
            const dob = this.data.dob;
            const dobParts = dob.split('-');
            const dateParts = date.split('-');
            const vaccdateParts = this.data.result_date.split('-');
            if (vaccdateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }

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
                return 'Date should less than Result Date.';
            }

            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                if (this.data.screening_obj) {
                    if (this.data.screening_obj.value) {
                        this.data.screening_frequency = this.data.screening_obj.value;
                    } else {
                        this.data.screening_frequency = this.data.screening_obj;
                    }
                }
                console.log('screening freq', this.data.screening_frequency);
                if (this.data.disease_obj.value) {
                    this.data.disease_type = this.data.disease_obj.value;
                } else {
                    this.data.disease_type = this.data.disease_obj;
                }

                if (this.animal === 'cow') {
                    this.data.cow = this.id;
                } else {
                    this.data.bull = this.id;
                }
                if (this.animal === 'cow') {
                    this.response = await axios.form(this.COWURL, this.data);
                } else {
                    this.response = await axios.form(this.URL, this.data);
                }
                const result = this.response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    console.log('final saving', this.data);
                    this.loading = false;
                    this.$emit('success', 'screening');
                } else {
                    const errors = this.response.data.errors;
                    // for (const key in errors) {
                    //     if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    //         const errorMessage = `${key}:  ${errors[key]}`;
                    //         this.$notify(errorMessage, 'Warning', { type: 'warning' });
                    //     }
                    // }
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

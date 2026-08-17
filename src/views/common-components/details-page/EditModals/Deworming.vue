<template>
    <div class="">
        <s-form @submit="addItem">
            <div class="row">
                <div class="col-6">
                    <validated-date-picker label="Date" format="DD-MM-YYYY" v-model="data.dewormdate" :rules="rules.dateValidation"></validated-date-picker>
                </div>
                <div class="col-6">
                    <validated-input label="Medicine Name" v-model="data.medicine"></validated-input>
                </div>
                <div class="col-6">
                    <validated-input label="Batch No" v-model="data.batchno"></validated-input>
                </div>
                <div class="col-6">
                    <validated-input label="Quantity" v-model="data.medicineqty"></validated-input>
                </div>
                <div class="col-12">
                    <validated-input label="Remarks" v-model="data.remarks"></validated-input>
                </div>

                <div class="col-12">
                    <div class="text-right ">
                        <btn text="Save" :loading="loading" loading-text="Saving..."></btn>
                    </div>
                </div>
            </div>
        </s-form>
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
        id: {},
        animal: {
            type: String
        }
    },
    name: 'Deworming',
    mounted () {
        console.log('dewormingdata : ', this.data);
        console.log('Deworming Id  : ', this.id);
        console.log(' animal  : ', this.animal);
    },
    data () {
        return {
            response: '',
            loading: false,
            URL: urls.bullDetailEdit.dewormingEdit,
            COWURL: urls.cowDetailEdit.dewormingEdit,
            rules: {
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
        async addItem () {
            try {
                this.loading = true;
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
                    this.loading = false;
                    this.$emit('success', 'deworming');
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

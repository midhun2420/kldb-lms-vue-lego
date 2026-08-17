<template>
    <div class="">
        <s-form @submit="addItem">
            <div class="row">
                <div class="col-12">
                    <validated-date-picker label="Date" v-model="data.dehorningdate" :rules="rules.dateValidation" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-12" v-if="!data.registration_flag">
                    <validated-ajax-vue-select :url="dehorningOptions" label="Dehorning Type" v-model="data.dehorning_obj" :rules="{required:true}"></validated-ajax-vue-select>
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
import masterURLs from '../../../../data/masterURLs';
import axios from 'secure-axios';
import urls from '../../../../data/urls';

export default {
    name: 'DehorningEdit',
    mounted () {
        console.log('animal', this.bullid);
        console.log(' animal  : ', this.animal);
    },
    props: {
        data: {
            type: Object
        },
        bullid: {},
        animal: {
            type: String
        }
    },
    data () {
        return {
            response: '',
            loading: false,
            dehorningOptions: masterURLs.master.dehorningType.vueSelect,
            URL: urls.bullDetailEdit.dehorningEdit,
            COWURL: urls.cowDetailEdit.dehorningEdit,
            COWProfileURL: urls.cowDetailEdit.profileEdit,
            BULLProfileURL: urls.bullDetailEdit.profileedit,
            rules: {
                dateValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationdate();
                    }
                }
            }
        };
    },
    methods: {
        validationdate () {
            const date = this.data.dehorningdate;
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
                if (this.data.dehorning_obj.value) {
                    this.data.dehorning_type = this.data.dehorning_obj.value;
                } else {
                    this.data.dehorning_type = this.data.dehorning_obj;
                }
                if (this.animal === 'cow') {
                    this.data.cows = this.bullid;
                } else {
                    this.data.bulls = this.bullid;
                }
                for (const prop in this.data) {
                    if (Object.prototype.hasOwnProperty.call(this.data, prop)) {
                        if (this.data[prop] === 'N/A') {
                            this.data[prop] = '';
                        }
                    }
                }
                if (this.animal === 'cow') {
                    if (this.data.registration_flag) {
                        this.data.dehorndate = this.data.dehorningdate;

                        this.response = await axios.form(this.COWProfileURL, this.data);
                    } else {
                        this.response = await axios.form(this.COWURL, this.data);
                    }
                } else {
                    if (this.data.registration_flag) {
                        this.data.dehorndate = this.data.dehorningdate;
                        this.response = await axios.form(this.BULLProfileURL, this.data);
                    } else {
                        this.response = await axios.form(this.URL, this.data);
                    }
                }
                const result = this.response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.$emit('success', 'dehorning');
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

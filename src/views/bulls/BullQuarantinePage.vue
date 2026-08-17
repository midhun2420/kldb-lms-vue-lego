<template>
    <div class="color-txt">
        <s-form @submit="addItem">
            <div class="">
                <div class="col-lg-12">
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Bull Quarantine</h3>
                    <div class="row">
                        <div class="col-lg-2">
                            <validated-ajax-vue-select class="c-input-select-multiplevalue field-required"
                                                       :url="bullOptionURL" multiple
                                                       label="Animal No" v-model="model.bull" :rules="{required:true}" ></validated-ajax-vue-select>

                        </div>
                        <div class="col-lg-2">
                            <validated-date-picker class="c-input-select field-required"
                                                       format="DD-MM-YYYY" :rules="{required:true}"
                                                       label="Start Date" v-model="model.start_date" ></validated-date-picker>

                        </div>
                        <div class="col-lg-2">
                            <validated-date-picker class="c-input-select field-required"
                                                       format="DD-MM-YYYY"
                                                       label="End Date" v-model="model.end_date" :rules="rules.endDate"></validated-date-picker>

                        </div>
                    </div>
                </div>
                <div class="col-lg-12 fl-x-br mt-7">
                    <btn text="save" :loading="loading" loading-text="Saving..." class="mr-2 px-4"></btn>
                    <btn text="Cancel" design="basic-b px-3 " type="reset" @click="BackToHome" class=""></btn>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'BullQuarantinePage',
    data () {
        return {
            URL: urls.quarantine.addEdit,
            loading: false,
            bullOptionURL: urls.quarantine.animalsVueSelect,
            model: {
                bull: '',
                start_date: '',
                end_date: ''
            },
            rules: {
                endDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                }
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$router.push({ path: '/semen-station/' });
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
        },

        // validations //
        DateValidation (endDate) {
            const startDate = this.model.start_date;
            const endDateParts = endDate.split('-');
            if (endDateParts.length !== 3) {
                return 'Please enter a valid end date in the format DD-MM-YYYY.';
            }
            const endDay = parseInt(endDateParts[0], 10);
            const endMonth = parseInt(endDateParts[1], 10);
            const endYear = parseInt(endDateParts[2], 10);

            const startDateParts = startDate.split('-');
            if (startDateParts.length !== 3) {
                return 'Please enter a valid start date in the format DD-MM-YYYY.';
            }
            const startDay = parseInt(startDateParts[0], 10);
            const startMonth = parseInt(startDateParts[1], 10);
            const startYear = parseInt(startDateParts[2], 10);

            if (isNaN(endDay) || isNaN(endMonth) || isNaN(endYear) || isNaN(startDay) || isNaN(startMonth) || isNaN(startYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const endDateObj = new Date(endYear, endMonth - 1, endDay);
            const startDateObj = new Date(startYear, startMonth - 1, startDay);

            if (endDateObj <= startDateObj) {
                return 'End date should be greater than the start date.';
            }

            return true;
        }
    }
};
</script>

<style scoped>

</style>

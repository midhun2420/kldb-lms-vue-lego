<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                SPERM MORPHOLOGY OF TRAINING BULLS
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-date-picker v-model="model.test_date"
                                           label="Date Of Test"
                                           :rules="rules.checkDate"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY"/>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="reportTypeOptions"
                                      class="field-required c-input-select"
                                      label="Download Format"
                                      :rules="{required:true}"
                                      v-model="model.format_type"/>
                </div>
                <div class="row mt-lg-9">
                    <div class="col-12">
                        <div class="fl-x fl-j-e">
                            <div class="btn-group">
                                <btn class="text-right"
                                     text="Download"
                                     loading-text="Please Wait..."
                                     :loading="loading"
                                />
                                <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"></btn>
                            </div>
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
    name: 'SPERM MORPHOLOGY OF TRAINING BULL BULLS',
    data () {
        return {
            model: {
                test_date: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            rules: {
                checkDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                },
                fromDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.FromDateValidation(value);
                    }
                }
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        DateValidation (checkDate) {
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);

            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },

        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.qualityControl.spermMorphologyOfTrainingBulls, this.model);
                const json = response.data;
                if (json.error === false) {
                    this.loading = false;
                    window.open(json.url);
                } else {
                    this.loading = false;
                    this.$notify(json.message, 'Oops!', { type: 'warning' });
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

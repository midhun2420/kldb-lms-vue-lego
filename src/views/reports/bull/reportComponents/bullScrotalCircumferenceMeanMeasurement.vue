<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Scrotal Circumference Mean Measurement
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-select v-model="model.from_month" :options="monthOptions"
                                            label="From Month"
                                            class="c-input-select field-required" :rules="{required:true}" :error-message="fromDateError"/>
                </div>
                <div class="col-lg-2">
                    <validated-select label="From Year" :options="yearOptions"
                                               v-model="model.from_year"
                                               class="c-input-select field-required" :rules="{required:true}" :error-message="fromDateError"/>
                </div>
                 <div class="col-lg-2">
                    <validated-select v-model="model.to_month" :options="monthOptions"
                                            label="To Month"
                                            class="c-input-select field-required" :rules="{required:true}" :error-message="toDateError"/>
                </div>
                <div class="col-lg-2">
                    <validated-select label="To Year" :options="yearOptions"
                                               v-model="model.to_year"
                                               class="c-input-select field-required" :rules="{required:true}" :error-message="toDateError"/>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="reportTypeOptions"
                                      class="field-required c-input-select "
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
import urls from '../../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'bullScrotalCircumferenceMeanMeasurement',
    watch: {
        'model.from_month': function (newValue, oldvalue) {
            this.fromDateError = this.DateValidation(newValue);
            if (this.fromDateError === true) {
                this.fromDateError = '';
                this.toDateError = '';
            }
        },
        'model.from_year': function (newValue, oldvalue) {
            this.fromDateError = this.DateValidation(newValue);
            if (this.fromDateError === true) {
                this.fromDateError = '';
                this.toDateError = '';
            }
        },
        'model.to_month': function (newValue, oldvalue) {
            this.toDateError = this.DateValidation(newValue);
            if (this.toDateError === true) {
                this.toDateError = '';
                this.fromDateError = '';
            }
        },
        'model.to_year': function (newValue, oldvalue) {
            this.toDateError = this.DateValidation(newValue);
            if (this.toDateError === true) {
                this.toDateError = '';
                this.fromDateError = '';
            }
        }
    },
    data () {
        return {
            toDateError: '',
            fromDateError: '',
            model: {
                from_year: '',
                from_month: '',
                to_year: '',
                to_month: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            monthOptions: [
                { value: 1, label: 'January' },
                { value: 2, label: 'February' },
                { value: 3, label: 'March' },
                { value: 4, label: 'April' },
                { value: 5, label: 'May' },
                { value: 6, label: 'June' },
                { value: 7, label: 'July' },
                { value: 8, label: 'August' },
                { value: 9, label: 'September' },
                { value: 10, label: 'October' },
                { value: 11, label: 'November' },
                { value: 12, label: 'December' }
            ],
            yearOptions: []
        };
    },
    mounted () {
        this.yearOptionsData();
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        yearOptionsData () {
            const startYear = 2000;
            const endYear = new Date().getFullYear();
            this.yearOptions = [];
            for (let year = endYear; year >= startYear; year--) {
                this.yearOptions.push({ label: year.toString(), value: year.toString() });
            }
            return this.yearOptions;
        },
        DateValidation (check) {
            const fromMonth = this.model.from_month;
            const toMonth = this.model.to_month;
            const fromYear = this.model.from_year;
            const toYear = this.model.to_year;

            const checkDay = parseInt(1, 10);
            const checkMonth = parseInt(toMonth, 10);
            const checkYear = parseInt(toYear, 10);

            const fromDateDay = parseInt(1, 10);
            const fromDateMonth = parseInt(fromMonth, 10);
            const fromDateYear = parseInt(fromYear, 10);

            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const fromDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);

            if (checkDateObj <= fromDateObj) {
                return 'To Month - Year should be greater than the From Month - Year.';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Month and Year not allowed.';
            }
            return true;
        },
        FromDateValidation (checkDate) {
            const fromDate = this.model.to_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);

            const fromDateParts = fromDate.split('-');
            if (fromDateParts.length !== 3) {
                return true;
            }
            const fromDateDay = parseInt(fromDateParts[0], 10);
            const fromDateMonth = parseInt(fromDateParts[1], 10);
            const fromDateYear = parseInt(fromDateParts[2], 10);

            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(fromDateDay) || isNaN(fromDateMonth) || isNaN(fromDateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const fromDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);

            if (checkDateObj > fromDateObj) {
                return 'From Date is earlier than or equal to the To Date';
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
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.bullScrotalCircumferenceMeanMeasurement, this.model);
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

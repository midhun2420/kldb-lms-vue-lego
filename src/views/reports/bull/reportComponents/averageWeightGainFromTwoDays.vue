<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Average weight gain between two dates
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-vue-select class="c-input-select" multiple
                                          :options="sourceOptions"
                                          label="Source" v-model="model.source"></validated-vue-select>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-vue-select class="c-input-select" multiple-->
<!--                                          :options="groupOptions"-->
<!--                                          label="Group" v-model="model.group"></validated-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Group" multiple
                                               v-model="model.group"
                                               :url="groupOptionsURL"
                                               class="c-input-select"/>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Breed" multiple
                                               v-model="model.breed"
                                               :url="breedOptionsURL"
                                               class="c-input-select"/>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select label="Registration Number"-->
<!--                                               v-model="model.regno"-->
<!--                                               :url="regNoOptionsURL"-->
<!--                                               class="c-input-select"/>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-date-picker v-model="model.from_date"
                                           label="From Date"
                                           class="c-input-datepicker"
                                           format="DD-MM-YYYY" :error-message="fromDateError"/>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker v-model="model.to_date"
                                           label="To Date"
                                           class="c-input-datepicker"
                                           format="DD-MM-YYYY" :error-message="toDateError"/>
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
    name: 'averageWeightGainFromTwoDays',
    watch: {
        'model.from_date': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
            this.fromDateError = this.FromDateValidation(newValue);
            if (this.fromDateError === true) {
                this.fromDateError = '';
                this.toDateError = '';
            }
        },
        'model.to_date': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
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
                group: '',
                source: '',
                breed: '',
                from_date: '',
                to_date: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            groupOptions: [
                { label: 'All', value: 'All' },
                { label: '0-3 months', value: '0-3 months' },
                { label: '4-6 months', value: '4-6 months' },
                { label: '7-9 months', value: '7-9 months' },
                { label: '10-12 months', value: '10-12 months' },
                { label: 'Above 12 months', value: 'Above 12 months' }

            ],
            groupOptionsURL: urls.reports.optionURLS.groupSelect,
            breedOptionsURL: urls.reports.optionURLS.breedSelect,
            sourceOptions: [
                { label: 'All', value: 'All' },
                { label: 'Farm Born', value: 'Farm Born' },
                { label: 'Unit Transfer', value: 'Unit Transfer' },
                { label: 'PT Purchase', value: 'PT Purchase' },
                { label: 'Embryo Transfer', value: 'Embryo Transfer' },
                { label: 'Import Purchase', value: 'Import Purchase' }
            ],
            regNoOptionsURL: urls.bulls.vueSelect
            // rules: {
            //     checkDate: {
            //         required: false,
            //         customValidator: (value) => {
            //             return this.DateValidation(value);
            //         }
            //     },
            //     fromDate: {
            //         required: false,
            //         customValidator: (value) => {
            //             return this.FromDateValidation(value);
            //         }
            //     }
            // }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        DateValidation (checkDate) {
            const fromDate = this.model.from_date;
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const checkDay = parseInt(checkDateParts[0], 10);
            const checkMonth = parseInt(checkDateParts[1], 10);
            const checkYear = parseInt(checkDateParts[2], 10);
            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

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
            const fromDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);

            if (checkDateObj < fromDateObj) {
                return 'From Date should be less than the To Date.';
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

            const currentDate = new Date();
            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

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
            const fromDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);

            if (checkDateObj > fromDateObj) {
                return 'From Date should be less than the To Date.';
            }

            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.averageWeightGainBetweenTwoDates, this.model);
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

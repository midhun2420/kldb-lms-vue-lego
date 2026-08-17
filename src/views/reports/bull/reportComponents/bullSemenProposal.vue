<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                SEMEN PROPOSAL
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
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
                    <validated-ajax-vue-select :url="bullOptionsURL" label="Animal No"
                                               placeholder="Bull"
                                               class="c-input-select text-black mb-0" v-model="model.bull_id"
                                               />
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="disposalReasonOptionsURL" label="Disposal Reason"
                                               placeholder="Disposal Reason"
                                               class="c-input-select text-black mb-0" v-model="model.disposal_reason"
                                               />
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
                                <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"/>
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
import masterURLs from '../../../../data/masterURLs';

export default {
    name: 'bullSemenProposal',
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
                from_date: '',
                to_date: '',
                bull_id: '',
                disposal_reason: '',
                format_type: ''
            },
            // bullOptionsURL: urls.bulls.vueSelect,
            bullOptionsURL: urls.bulls.allVueSelect,
            disposalReasonOptionsURL: masterURLs.master.reasonForDisposal.vueSelect,
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
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

            const fromDateParts = fromDate.split('-');
            if (fromDateParts.length !== 3) {
                return ' ';
            }
            const fromDateDay = parseInt(fromDateParts[0], 10);
            const fromDateMonth = parseInt(fromDateParts[1], 10);
            const fromDateYear = parseInt(fromDateParts[2], 10);

            if (isNaN(checkDay) || isNaN(checkMonth) || isNaN(checkYear) || isNaN(fromDateDay) || isNaN(fromDateMonth) || isNaN(fromDateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const checkDateObj = new Date(checkYear, checkMonth - 1, checkDay);
            const fromDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);

            if (checkDateObj < fromDateObj) {
                return 'From Date is earlier than or equal to the To Date';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
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
                const response = await axios.form(urls.reports.bulls.bullSemenProposal, this.model);
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

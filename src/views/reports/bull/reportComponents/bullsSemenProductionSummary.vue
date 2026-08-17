<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Semen Production Summary
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport">
                <div class="row">
                    <div class="col-lg-2">
                    <validated-date-picker v-model="model.from_date"
                                           label="From Date"
                                           :rules="{required:true}"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY" :error-message="fromDateError"/>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker v-model="model.to_date"
                                           label="To Date"
                                           :rules="{required:true}"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY" :error-message="toDateError"/>
                </div>
                     </div>

                <div class="row">
                    <div class="col-lg-2">
                        <validated-checkbox label="Dead" v-model="model.dead"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Alive" v-model="model.alive"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-2">
                        <validated-select :options="reportTypeOptions"
                                          class="c-input-select field-required"
                                          label="Download Format"
                                          :rules="{required:true}"
                                          v-model="model.format_type"/>
                    </div>
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
import axios from 'secure-axios';
import urls from '../../../../data/urls';

export default {
    name: 'livestockBornBetweenTwoDates',
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
                alive: false,
                dead: false,
                format_type: ''
            },
            loading: false,
            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
            // rules: {
            //     checkDate: {
            //         required: true,
            //         customValidator: (value) => {
            //             return this.DateValidation(value);
            //         }
            //     },
            //     fromDate: {
            //         required: true,
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

            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.bullsSemenProductionSummary, this.model);
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

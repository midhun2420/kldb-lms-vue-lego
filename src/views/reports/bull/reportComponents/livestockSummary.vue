<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Livestock - Summary
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport">

                <div class="row">
                    <div class="col-lg-2">
                        <validated-vue-select class="c-input-select" multiple
                                              :options="sourceOptions"
                                              label="Source" v-model="model.source"></validated-vue-select>
                    </div>
                    <div class="col-lg-2">
                        <validated-ajax-vue-select label="Breed" multiple
                                                   v-model="model.breed"
                                                   :url="breedOptionsURL"
                                                   class="c-input-select"/>
                    </div>
<!--                    <div class="col-lg-2">-->
<!--                    <validated-date-picker v-model="model.from_date"-->
<!--                                           label="From Date"-->
<!--                                           :rules="{required:true}"-->
<!--                                           class="c-input-datepicker field-required"-->
<!--                                           format="DD-MM-YYYY" :error-message="fromDateError"/>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-date-picker v-model="model.to_date"-->
<!--                                           label="To Date"-->
<!--                                           :rules="{required:true}"-->
<!--                                           class="c-input-datepicker field-required"-->
<!--                                           format="DD-MM-YYYY" :error-message="toDateError"/>-->
<!--                </div>-->
                </div>

                <div class="row">
                    <div class="col-lg-2">
                        <validated-checkbox label="Dead" v-model="model.dead"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Alive" v-model="model.alive"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Regular" v-model="model.regular"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Training" v-model="model.training"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Shed Wise" v-model="model.shed_wise"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2" v-if="model.shed_wise">
                        <validated-ajax-vue-select multiple
                            class="c-input-select input-border-primary"
                            placeholder="Shed"
                            v-model="model.shed"
                            label="shed"
                            :url="shedOptions"/>
                    </div>
                    <div class="col-lg-2">
                        <validated-select :options="reportTypeOptions"
                                          class="c-input-select field-required"
                                          label="Download Format"
                                          :rules="{required:true}"
                                          v-model="model.format_type"/>
                    </div>
                </div>

                <div class="row mt-lg-9 col-12">
                    <div class="col-12 p-0">
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
    name: 'livestockSummary',
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
        },
        'model.regular': function (newValue) {
            if (newValue !== false) {
                this.model.training = false;
                // this.model.alive = false;
                // this.model.dead = false;
                // this.model.shed_wise = false;
            }
        },
        'model.training': function (newValue) {
            if (newValue !== false) {
                this.model.regular = false; // Clear regno when renumber is filled
                // this.model.alive = false;
                // this.model.dead = false;
                // this.model.shed_wise = false;
            }
        },
        'model.dead': function (newValue) {
            if (newValue !== false) {
                // this.model.regular = false; // Clear regno when renumber is filled
                this.model.alive = false;
                // this.model.training = false;
                // this.model.shed_wise = false;
            }
        },
        'model.alive': function (newValue) {
            if (newValue !== false) {
                // this.model.regular = false; // Clear regno when renumber is filled
                // this.model.training = false;
                this.model.dead = false;
                // this.model.shed_wise = false;
            }
        }
    },
    data () {
        return {
            toDateError: '',
            fromDateError: '',
            model: {
                source: '',
                breed: '',
                from_date: '',
                to_date: '',
                alive: false,
                dead: false,
                regular: false,
                training: false,
                shed_wise: false,
                shed: '',
                format_type: ''
            },
            loading: false,
            sourceOptions: [
                { label: 'All', value: 'All' },
                { label: 'Farm Born', value: 'Farm Born' },
                { label: 'Unit Transfer', value: 'Unit Transfer' },
                { label: 'PT Purchase', value: 'PT Purchase' },
                { label: 'Embryo Transfer', value: 'Embryo Transfer' },
                { label: 'Import Purchase', value: 'Import Purchase' }
            ],
            breedOptionsURL: urls.reports.optionURLS.breedSelect,
            shedOptions: urls.reports.optionURLS.shedSelect + '?animal=bull',
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
    // watch: {
    //
    // },
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
                return 'From Date is earlier than or equal to the To Date';
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
                return 'From Date is earlier than or equal to the To Date';
            }

            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.livestockSummary, this.model);
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

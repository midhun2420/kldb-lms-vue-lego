<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Reproductive Status - Cows
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-date-picker v-model="model.from_date"
                                           label="Date"
                                           :rules="rules.fromDate"
                                           @input="loadData"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY"/>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="cowOptions" v-model="model.cow"
                                            label="Animal No"
                                            class="c-input-select"/>
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
    name: 'cowReproductiveStatus',
    data () {
        return {
            model: {
                from_date: '',
                cow: '',
                format_type: ''
            },
            loading: false,
            cowOptions: [],
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            rules: {
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
        FromDateValidation (checkDate) {
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
        async loadData () {
            this.loading = true;
            const response = await axios.get(urls.reports.cows.cowReproductiveList + '?from_date=' + this.model.from_date);
            this.cowOptions = response.data.data;
            this.loading = false;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.cows.cowReproductiveStatus, this.model);
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

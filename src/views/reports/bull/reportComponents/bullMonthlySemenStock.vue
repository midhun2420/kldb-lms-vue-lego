<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                MONTHLY SEMEN STOCK REPORT & STOCK REPORT OF FROZEN SEMEN (MONTH WISE, BULL WISE) (BREED WISE)
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL" v-model="model.breed" multiple
                                            label="Breed"
                                            class="c-input-select"/>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="bullOptionsURL" v-model="model.bull" multiple
                                            label="Animal No"
                                            class="c-input-select"/>
                </div>
                <div class="col-lg-2">
                    <validated-select v-model="model.from_month" :options="monthOptions"
                                            label="From Month"
                                            class="c-input-select field-required" :rules="{required:true}"/>
                </div>
                <div class="col-lg-2">
                    <validated-select label="From Year" :options="yearOptions"
                                               v-model="model.from_year"
                                               class="c-input-select field-required" :rules="{required:true}"/>
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
    name: 'bullMonthlySemenStock',
    data () {
        return {
            model: {
                from_year: '',
                from_month: '',
                breed: '',
                bull: '',
                format_type: ''
            },
            loading: false,
            breedOptionsURL: urls.reports.optionURLS.breedSelect,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            bullOptionsURL: urls.bulls.vueSelect,
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
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.bullMonthlySemenStock, this.model);
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

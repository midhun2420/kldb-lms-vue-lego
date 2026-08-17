<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                MICROBIAL LOAD OF NEAT SEMEN
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-select label="Year" :options="yearOptions"
                                               v-model="model.year"
                                               class="c-input-select field-required" :rules="{required:true}"/>
                </div>
                <div class="col-lg-2">
                    <validated-select v-model="model.from_month" :options="monthOptions"
                                            label="From Month"
                                            class="c-input-select field-required" :rules="rules.checkDate"/>
                </div>
                <div class="col-lg-2">
                    <validated-select v-model="model.to_month" :options="monthOptions"
                                           label="To Month"
                                           class="c-input-select field-required" :rules="rules.checkDate"/>
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
import axios from 'secure-axios';
import urls from '../../../../data/urls';

export default {
    name: 'MicrobialLoadOfNeatSemen',
    data () {
        return {
            model: {
                from_month: '',
                year: '',
                to_month: '',
                format_type: ''
            },
            rules: {
                checkDate: {
                    required: true,
                    customValidator: () => {
                        return this.monthValidation();
                    }
                }
            },
            loading: false,
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
            yearOptions: [],
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    mounted () {
        this.yearOptionsData();
    },
    methods: {
        monthValidation () {
            if (this.model.to_month && this.model.from_month) {
                if (this.model.to_month < this.model.from_month) {
                    return 'From Month must less than To Month';
                }
            }
            return true;
        },
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
                const response = await axios.form(urls.reports.qualityControl.microbialLoadOfNeatSemen, this.model);
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

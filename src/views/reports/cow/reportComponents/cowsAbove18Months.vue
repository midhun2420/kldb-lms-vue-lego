<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Cows Above 18 Months
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Registration Number"
                                               v-model="model.regno"
                                               :url="regNoOptionsURL"
                                               class="c-input-select"/>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Renumber"
                                               v-model="model.renumber"
                                               :url="renumberOptionsURL"
                                               class="c-input-select"/>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="reportTypeOptions"
                                      class="c-input-select"
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
    name: 'cowsAbove18Months',
    data () {
        return {
            model: {
                regno: '',
                renumber: '',
                format_type: ''
            },
            loading: false,
            regNoOptionsURL: urls.reports.cows.regNoAbove18Months,
            renumberOptionsURL: urls.reports.cows.renumberAbove18Months,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    watch: {
        'model.regno': function (newValue) {
            if (newValue !== '') {
                this.model.renumber = ''; // Clear renumber when regno is filled
            }
        },
        'model.renumber': function (newValue) {
            if (newValue !== '') {
                this.model.regno = ''; // Clear regno when renumber is filled
            }
        }
    },
    computed: {
        isRegnoOrRenumberRequired () {
            return !this.model.regno && !this.model.renumber;
        }
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        async downloadReport () {
            if (this.isRegnoOrRenumberRequired) {
                this.$notify('Either Registration Number or Renumber is required.', 'Warning', { type: 'warning' });
                return;
            }

            try {
                this.loading = true;
                const response = await axios.form(urls.reports.cows.above18Months, this.model);
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

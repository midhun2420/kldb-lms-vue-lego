<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Livestock - Summary (format 2)
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport">

                <div class="row">
<div class="col-lg-2">
                    <validated-ajax-vue-select label="Registration Number" multiple
                                               v-model="model.regno"
                                               :url="regNoOptionsURL"
                                               class="c-input-select"/>
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
    name: 'livestockSummaryFormat2',
    data () {
        return {
            model: {
                regno: '',
                alive: false,
                dead: false,
                format_type: ''
            },
            loading: false,
            regNoOptionsURL: urls.reports.cows.regNoAbove18Months,

            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.cows.livestockSummaryFormat2, this.model);
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

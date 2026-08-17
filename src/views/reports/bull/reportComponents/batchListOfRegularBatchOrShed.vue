<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                BATCH DETAILS  -   Display the list of bull shed wise or batch wise
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport">
                <div class="row">
                    <div class="col-lg-2">
                            <validated-ajax-vue-select label="Batch"
                                                       v-model="model.batch"
                                                       :url="batchOptionsURL"
                                                       class="c-input-select"/>
                    </div>
                    <div class="col-lg-2">
                            <validated-ajax-vue-select
                                class="c-input-select input-border-primary"
                                placeholder="Shed"
                                v-model="model.shed"
                                label="shed"
                                :url="shedOptionsURL"/>
                    </div>
                    <div class="col-lg-2">
                    <validated-select :options="reportTypeOptions"
                                      class="field-required c-input-select "
                                      label="Download Format"
                                      :rules="{required:true}"
                                      v-model="model.format_type"/>
                    </div>
                </div>
                 <div class="row">
                    <div class="col-lg-2">
                                                  <validated-checkbox label="Regular" v-model="model.regular"/>
                        </div>
                    <div class="col-lg-2">
                        <validated-checkbox label="Training" v-model="model.training"/>
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
import masterURLs from '../../../../data/masterURLs';

export default {
    name: 'batchListOfRegularBatchOrShed',
    data () {
        return {
            model: {
                batch: '',
                shed: '',
                regular: '',
                training: '',
                format_type: ''
            },
            loading: false,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            batchOptionsURL: masterURLs.master.batch.vueSelect,
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
                const response = await axios.form(urls.reports.bulls.batchListOfRegularBatchOrShed, this.model);
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

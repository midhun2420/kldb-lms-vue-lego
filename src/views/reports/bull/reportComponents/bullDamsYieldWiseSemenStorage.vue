<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                DAM’S YIELD WISE STORAGE SEARCH
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                 <div class="col-lg-2">
                            <validated-select @input="loadFilter" :options="damsYieldOptions" label="Dam's Yield"
                                              class="c-input-select field-required" placeholder="Dam's Yield" v-model="model.dams_yield" :rules="{required:true}">

                            </validated-select>
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

export default {
    name: 'bullLocationSemenStorage',
    data () {
        return {
            model: {
                dams_yield: '',
                format_type: ''
            },
            damsYieldOptions: [
                { label: 'Below 2000', value: 'Below 2000' },
                { label: '2000 - 4000', value: '2000 - 4000' },
                { label: '4000 - 6000', value: '4000 - 6000' },
                { label: '6000 - 8000', value: '6000 - 8000' },
                { label: '8000 - 10000', value: '8000 - 10000' },
                { label: 'Above 10000', value: 'Above 10000' }
            ],
            loading: false,
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
                const response = await axios.form(urls.reports.bulls.bullDamsYieldWiseSemenStorage, this.model);
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

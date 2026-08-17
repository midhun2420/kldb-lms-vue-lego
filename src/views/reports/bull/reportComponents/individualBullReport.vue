<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Individual Bull Report
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-4">
                    <validated-ajax-vue-select :url="bullOptionsURL" label="Animal No"
                                               placeholder="Choose Animal No"
                                               class="c-input-select text-black mb-0 field-required" v-model="model.bull"
                                               @input="loadDetails" :rules="{required:true}"/>
                </div>

                <div class="col-lg-2">
                    <validated-input label="Animal Name" v-model="model.bull_name" class="text-black"  disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber" class="text-black" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="UID No" v-model="model.uid_no" class="text-black" disabled></validated-input>
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
    name: 'individualBullReport',
    data () {
        return {
            model: {
                bull: '',
                format_type: '',
                bull_name: '',
                renumber: '',
                uid_no: ''
            },
            bullOptionsURL: urls.bulls.vueSelect,
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
        async loadDetails () {
            this.loading = true;
            const response = await axios.form(urls.reports.bulls.individualBullDetails, this.model);
            if (response.data) {
                this.model.bull_name = response.data.data.name;
                this.model.renumber = response.data.data.renumber;
                this.model.uid_no = response.data.data.uid;
                this.loading = false;
            } else {
                this.loading = false;
            }
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.individualReport, this.model);
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

<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Due for nose punching
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">

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
    name: 'dueForNosePunching',
    data () {
        return {
            model: {
                // from_date: '',
                // to_date: '',
                format_type: ''
            },
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
                const response = await axios.form(urls.reports.bulls.dueForNosePunching, this.model);
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

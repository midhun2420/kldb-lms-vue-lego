<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Details of training bull with good collection out of total collection
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-input v-model="model.good_collection"
                                           label="No of good collection"
                                           :rules="{required:true}"
                                           class="field-required"
                                           type="number" :error-message="fromError"/>
                </div>
                <div class="col-lg-2">
                    <validated-input v-model="model.total_collection"
                                           :rules="{required:true}"
                                           label="No of Total Collection"
                                           class="field-required"
                                           type="number" :error-message="toError"/>
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
    name: 'detailsOfTrainingBull',
    data () {
        return {
            toError: '',
            fromError: '',
            model: {
                good_collection: '',
                total_collection: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    watch: {
        'model.good_collection': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
            this.fromError = this.FromValidation(newValue);
            if (this.fromError === true) {
                this.fromError = '';
                this.toError = '';
            }
        },
        'model.total_collection': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
            this.toError = this.ToValidation(newValue);
            if (this.toError === true) {
                this.toError = '';
                this.fromError = '';
            }
        }
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        ToValidation (toValue) {
            const fromValue = parseInt(this.model.good_collection, 10);
            const toValueNumber = parseInt(toValue, 10);
            if (toValueNumber <= fromValue) {
                return 'No of Total collection should be greater than No of good collection.';
            }
            if (toValueNumber <= 0) {
                return 'No of Total collection should be greater than Zero.';
            }
            return true;
        },
        FromValidation (fromValue) {
            const toValue = parseInt(this.model.total_collection, 10);
            if (parseInt(fromValue, 10) >= toValue) {
                return 'No of Total collection should be greater than No of good collection.';
            }
            if (parseInt(fromValue, 10) <= 0) {
                return 'No of Total collection should be greater than Zero.';
            }
            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.detailsOfTrainingBull, this.model);
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

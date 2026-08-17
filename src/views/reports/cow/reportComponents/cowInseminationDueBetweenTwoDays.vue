<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                Cows Insemination Due between Two days
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-input v-model="model.from_day"
                                           label="From Day"
                                           :rules="{required:true}"
                                           class = "field-required"
                                           type="number" :error-message="fromError"
                                           />
                </div>
                <div class="col-lg-2">
                    <validated-input v-model="model.to_day"
                                           label="To Day"
                                           type="number" :error-message="toError"
                                           />
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
    name: 'cowInseminationDueBetweenTwoDays',
    watch: {
        'model.from_day': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
            this.fromError = this.FromValidation(newValue);
            if (this.fromError === true) {
                this.fromError = '';
                this.toError = '';
            }
        },
        'model.to_day': function (newValue, oldvalue) {
            console.log(newValue);
            console.log(oldvalue);
            this.toError = this.ToValidation(newValue);
            if (this.toError === true) {
                this.toError = '';
                this.fromError = '';
            }
        }
    },
    data () {
        return {
            toError: '',
            fromError: '',
            model: {
                from_day: '',
                to_day: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
            // rules: {
            //     fromDay: {
            //         required: true,
            //         customValidator: (value) => {
            //             return this.FromDateValidation(value);
            //         }
            //     },
            //     toDay: {
            //         required: false,
            //         customValidator: (value) => {
            //             return this.ToDateValidation(value);
            //         }
            //     }
            // }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        ToValidation (toValue) {
            const fromValue = parseInt(this.model.from_day, 10);
            const toValueNumber = parseInt(toValue, 10);
            if (toValueNumber <= fromValue) {
                return 'To day should be greater than From Day.';
            }
            if (toValueNumber <= 0) {
                return 'Day should be greater than Zero.';
            }
            return true;
        },
        FromValidation (fromValue) {
            const toValue = parseInt(this.model.to_day, 10);
            if (parseInt(fromValue, 10) >= toValue) {
                return 'To day should be greater than From Day.';
            }
            if (parseInt(fromValue, 10) <= 0) {
                return 'Day should be greater than Zero.';
            }
            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.cows.inseminationDueBetweenTwoDays, this.model);
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

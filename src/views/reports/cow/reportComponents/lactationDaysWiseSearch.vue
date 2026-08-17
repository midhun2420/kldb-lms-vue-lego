<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                List of cows with lactation days
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-input v-model="model.from_day"
                                           label="Days"
                                           :rules="{required:true}"
                                     class="field-required"
                                           type="number"
                                           />
                </div>
                <div class="col-lg-2">
                    <validated-select :options="conditionOptions" v-model="model.condition"
                                      :rules="{required:true}"
                                      class="field-required c-input-select"
                                           label="Condition"

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
    name: 'lactationDaysWiseSearch',
    data () {
        return {
            model: {
                from_day: '',
                condition: '',
                format_type: ''
            },
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ],
            conditionOptions: [
                { label: 'Less', value: 'less than' },
                { label: 'Greater', value: 'greater than' },
                { label: 'Equals', value: 'equal to' }
            ]

        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        FromDateValidation (checkday) {
            const toDay = this.model.to_day;
            if (checkday && toDay) {
                if (checkday > toDay) {
                    this.model.to_day = '';
                    this.$notify('Enter valid days.', 'Warning!', { type: 'warning' });
                    // return 'Enter valid days.';
                } else {
                    return true;
                }
            }
            return true;
        },
        ToDateValidation (checkday) {
            const fromDay = this.model.from_day;
            console.log(fromDay);
            console.log(checkday);
            if (checkday && fromDay) {
                if (checkday < fromDay) {
                    this.model.from_day = '';
                    this.$notify('Enter valid days.', 'Warning!', { type: 'warning' });
                    // return 'Enter valid days.';
                } else {
                    return true;
                }
            }
            return true;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.cows.lactationDaysWiseSearch, this.model);
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

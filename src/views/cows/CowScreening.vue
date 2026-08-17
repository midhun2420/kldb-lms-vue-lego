<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Cow Screening</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Cow Screening</h2>-->
        <div class="row mt-2">
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    :url="diseaseOptionURL"
                    label="Disease Type" class="c-input-select text-black field-required" v-model="model.disease_type" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" label="Screening Date" class="text-black c-input-datepicker field-required" v-model="model.screening_date" :rules="{required:true}"></validated-date-picker>
            </div>
            <div class="col-lg-2">
                <validated-input

                    label="Screening Duration" class="c-input-select field-required" v-model="model.screening_duration" type="number" :rules="rules.positiveOnly"></validated-input>

            </div>
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    :url="agencyOptionURL"
                    label="Agency" class="c-input-select field-required" v-model="model.agency" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" label="Result Date" class="c-input-datepicker field-required" v-model="model.result_date" :rules="rules.common"></validated-date-picker>
            </div>
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    :url="shedOptionURL"
                    label="Shed No" class="c-input-select field-required" @input="loadCowOptions"  v-model="model.shed_no" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-vue-select :options="cowOptions"  multiple @input="calculateCows" :show-loading-prepend="dataLoading"
                    label="Animals" class="c-input-select-multiplevalue field-required" v-model="model.cow" :rules="{required:true}"></validated-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-vue-select
                    :options="statusOptionURL" @input="calculateCows"
                    label="Status" class="c-input-select" v-model="model.status"></validated-vue-select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-lg-2">
                <validated-input label="Total Animals (in Shed )" class="" v-model="model.total_animals" disabled :show-loading-prepend="dataLoading"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="No of animals positive" class="" disabled v-model="model.no_of_animals_positive" :rules="rules.positiveOnly" :show-loading-prepend="dataLoading"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="No of animals negative" class="" disabled v-model="model.no_of_animals_negative" :rules="rules.positiveOnly" :show-loading-prepend="dataLoading"></validated-input>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-lg-2">
                <validated-input label="Remarks" class="" v-model="model.remarks"></validated-input>
            </div>
        </div>
        <div class="row mt-lg-6">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" class="px-4" :loading="loading" loading-text="Saving..."></btn>
                        <btn text="Cancel"  type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'CowScreening',
    data () {
        return {
            dataLoading: false,
            loading: false,
            URL: urls.cowScreening.addEdit,
            diseaseOptionURL: masterURLs.master.diseaseType.vueSelect,
            agencyOptionURL: masterURLs.master.agency.vueSelect,
            statusOptionURL: [
                { label: 'Positive', value: 'positive' },
                { label: 'Negative ', value: 'negative' },
                { label: 'Recheck ', value: 'recheck ' }
            ],
            shedOptionURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            screeningDurationOptinURL: masterURLs.master.frequency.vueSelect,
            model: {
                screening_duration: '',
                disease_type: '',
                screening_date: '',
                agency: '',
                result_date: '',
                status: '',
                shed_no: '',
                total_animals: 0,
                no_of_animals_positive: 0,
                no_of_animals_negative: 0,
                remarks: '',
                cow: ''

            },
            cowOptions: [],
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },

                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }

            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        totalAnimals () {
            this.model.total_animals = this.cowOptions.length;
            this.model.no_of_animals_negative = 0;
            this.model.no_of_animals_positive = 0;
        },
        async checkTotal () {
            this.loading = true;
            const response = await axios.form(urls.cowScreening.checkTotal, this.model);
            if (response.data.errors) {
                const errors = response.data.errors;

                for (const key in errors) {
                    if (Object.prototype.hasOwnProperty.call(errors, key)) {
                        let errorMessage = '';
                        if (key === '__all__') {
                            errorMessage = `${errors[key]}`;
                        } else {
                            errorMessage = `${key}:  ${errors[key]}`;
                        }
                        this.$notify(errorMessage, 'Warning', { type: 'warning' });
                    }
                }
                this.loading = false;
            }
        },

        async loadCowOptions () {
            // this.dataclear();
            this.dataLoading = true;
            this.model.status = '';
            this.model.total_animals = '';
            this.model.no_of_animals_positive = '';
            this.model.no_of_animals_negative = '';
            this.model.remarks = '';
            const response = await axios.get(urls.cowScreening.loadCows + '?shed_number=' + this.model.shed_no);
            this.cowOptions = response.data.cow.data;
            this.model.total_animals = response.data.total_count;
            this.dataLoading = false;
            this.totalAnimals();
        },
        // calculateCows () {
        //     console.log(this.model.cow.length);
        //     const selectedCows = this.model.cow.length;
        //     const totalCows = this.cowOptions.length;
        //     const remainingCows = totalCows - selectedCows;
        //     this.model.no_of_animals_positive = selectedCows;
        //     this.model.no_of_animals_negative = remainingCows;
        // },
        calculateCows () {
            const selectedCows = this.model.cow.length;
            const totalCows = this.cowOptions.length;

            if (this.model.status === 'positive') {
                this.model.no_of_animals_positive = selectedCows;
                this.model.no_of_animals_negative = totalCows - selectedCows;
            } else if (this.model.status === 'negative') {
                this.model.no_of_animals_negative = selectedCows;
                this.model.no_of_animals_positive = totalCows - selectedCows;
            } else {
                this.model.no_of_animals_positive = 0;
                this.model.no_of_animals_negative = 0;
            }
        },
        Validation (date) {
            const screeningdate = this.model.screening_date;
            const dateParts = date.split('-');

            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const screeningdateParts = screeningdate.split('-');
            if (screeningdateParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const screeningdateDay = parseInt(screeningdateParts[0], 10);
            const screeningdateMonth = parseInt(screeningdateParts[1], 10);
            const screeningdateYear = parseInt(screeningdateParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(screeningdateDay) || isNaN(screeningdateMonth) || isNaN(screeningdateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const screeningdateDateObj = new Date(screeningdateYear, screeningdateMonth - 1, screeningdateDay);

            if (dateObj <= screeningdateDateObj) {
                return 'Date should be after the Screening date';
            }

            return true;
        },
        avoidNegetive (endDate) {
            const num = endDate;
            if (num < 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        dataclear () {
            this.model.cow = '';
            this.model.total_animals = 0;
            this.model.no_of_animals_positive = 0;
            this.model.no_of_animals_negative = 0;
        },
        ClearAllData () {
            this.model.screening_duration = '';
            this.model.disease_type = '';
            this.model.screening_date = '';
            this.model.agency = '';
            this.model.result_date = '';
            this.model.status = '';
            this.model.shed_no = '';
            this.model.total_animals = '';
            this.model.no_of_animals_positive = '';
            this.model.no_of_animals_negative = '';
            this.model.remarks = '';
            this.model.cow = '';
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.ClearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/cows-list/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            let errorMessage = '';
                            if (key === '__all__') {
                                errorMessage = `${errors[key]}`;
                            } else {
                                errorMessage = `${key}:  ${errors[key]}`;
                            }
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                    this.loading = false;
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

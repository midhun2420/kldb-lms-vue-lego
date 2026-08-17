<template>
    <div>
        <s-form @submit="addItem" ref="form">
            <div class="">
                <div class="col-lg-12">
                    <div class="row fl-x fl-j-sb ml-1 mr-1">
                         <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">{{type}}</h3>
                    <div>
                                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToList">Back</btn>
                            </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <validated-ajax-vue-select :key="bullOptionURL + bullSelectKey" ref="vueSelect" class="c-input-select field-required"
                                                       :url="bullOptionURL" @input="loadDetails"
                                                       label="Animal No" v-model="model.bull" :rules="{required:true}"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-input disabled label="Renumber" v-model="details.renumber">
                                <template #prepend v-if="detailsLoading">
                                    <loading-animation></loading-animation>
                                </template>
                            </validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input disabled label="Breed" v-model="details.breed">
                                <template #prepend v-if="detailsLoading">
                                    <loading-animation></loading-animation>
                                </template>
                            </validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input disabled label="Age(in months)" v-model="details.age">
                                <template #prepend v-if="detailsLoading">
                                    <loading-animation></loading-animation>
                                </template>
                            </validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input
                                disabled
                                label="Sire No" v-model="details.sire_no">
                                <template #prepend v-if="detailsLoading">
                                    <loading-animation></loading-animation>
                                </template>
                            </validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input disabled
                                             label="Dam No" v-model="details.dam_no">
                                <template #prepend v-if="detailsLoading">
                                    <loading-animation></loading-animation>
                                </template>
                            </validated-input>
                        </div>

                    </div>
                    <div class="bb-1"></div>
                </div>
            </div>
            <h4 class="font-poppins-medium mt-5 ml-4 mb-3 text-primary">Upload Documents</h4>
            <div class="row">
                <div class="col-lg-3">
                    <h5 class="font-poppins-medium mt-3 ml-4 mb-3 text-primary">Quarantine Screening </h5>
                </div>
                <div class="col-lg-2 ">
                    <validated-date-picker class="c-input-select"
                                           format="DD-MM-YYYY"
                                           label="Start Date" v-model="model.start_date"></validated-date-picker>
                </div>
                <div class="col-lg-2 ">
                    <validated-date-picker class="c-input-select"
                                           format="DD-MM-YYYY" :disabled-date="disabledEndDate"
                                           label="End Date" v-model="model.end_date"></validated-date-picker>
                </div>
            </div>
            <file-section :key="fileInputKey" :model="model" ref="files" :file-input-key="fileInputKey" @back="BackToList"></file-section>
        </s-form>
    </div>
</template>

<script>
import FileSection from '../../components/BullQuarntine/FileSection';
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'BullQuarantine',
    props: {
        ClearData: {
            type: Boolean
        },
        type: {
            type: String
        },
        title: {
            type: String,
            default: 'Bull Quarantine'
        }
    },
    data () {
        return {
            fileInputKey: 0,
            bullSelectKey: 0,
            detailsLoading: false,
            quarantineBullDetails: urls.quarantine.quarantineBullDetails,
            URL: urls.quarantine.addEdit,
            model: {
                bull: '',
                start_date: '',
                end_date: '',
                tb_jd_report: '',
                brucella_report: '',
                ibr_report: '',
                bvd1_report: '',
                bvd2_report: '',
                others_report: '',
                karyotyping_report: '',
                genetic_disease_screening_report: '',
                breeding_soundness_report: '',
                parentage_verification_report: '',
                sire_dam_pedigree: '',
                remarks_report: '',
                tb: '',
                jd: '',
                brucella: '',
                ibr: '',
                bvd1: '',
                bvd2: '',
                others: '',
                karyotyping: '',
                dumps: '',
                citrullinemia: '',
                factor_x1: '',
                blad: '',
                remarks: '',
                uid_no: '',
                addition_date: '',
                training_date: ''
            },
            details: {
                breed: '',
                sire_no: '',
                dam_no: '',
                renumber: '',
                age: ''
            },
            rules: {
                endDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                }
            }
        };
    },
    // computed: {
    //     bullOptionURL () {
    //         return this.computeBullOptionURL();
    //     }
    // },
    computed: {
        bullOptionURL () {
            return this.type === 'Existing Bull Update'
                ? urls.quarantine.quarantineBullVueSelect
                : urls.quarantine.animalsVueSelect;
        }
    },
    watch: {
        type (newType) {
            this.bullOptionURL = this.computeBullOptionURL();
        },
        ClearData (newValue) {
            this.clearData();
        }
    },
    // mounted () {
    //     if (!this.type) {
    //         this.type = this.$route.query.type;
    //     }
    // },
    created () {
        if (!this.type) {
            this.type = this.$route.query.type;
        }
    },
    components: { FileSection },
    methods: {
        disabledBeforeToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
        },
        disabledEndDate (date) {
            if (!this.model.start_date) {
                return false;
            }

            const startDateParts = this.model.start_date.split('-');
            console.log('startDateParts', startDateParts);
            if (startDateParts.length !== 3) {
                return false;
            }

            const startDay = parseInt(startDateParts[0], 10);
            const startMonth = parseInt(startDateParts[1], 10);
            const startYear = parseInt(startDateParts[2], 10);

            const startDate = new Date(startYear, startMonth - 1, startDay);
            startDate.setHours(0, 0, 0, 0);

            date.setHours(0, 0, 0, 0);

            return date <= startDate;
        },
        clearData () {
            this.model.bull = '';
            this.model.start_date = '';
            this.model.end_date = '';
            this.model.tb_jd_report = '';
            this.model.brucella_report = '';
            this.model.ibr_report = '';
            this.model.bvd1_report = '';
            this.model.bvd2_report = '';
            this.model.others_report = '';
            this.model.karyotyping_report = '';
            this.model.genetic_disease_screening_report = '';
            this.model.breeding_soundness_report = '';
            this.model.parentage_verification_report = '';
            this.model.sire_dam_pedigree = '';
            this.model.remarks_report = '';
            this.model.tb = '';
            this.model.jd = '';
            this.model.brucella = '';
            this.model.ibr = '';
            this.model.bvd1 = '';
            this.model.bvd2 = '';
            this.model.others = '';
            this.model.karyotyping = '';
            this.model.dumps = '';
            this.model.citrullinemia = '';
            this.model.factor_x1 = '';
            this.model.blad = '';
            this.model.remarks = '';
            this.model.uid_no = '';
            this.model.addition_date = '';
            this.model.training_date = '';

            this.details.breed = '';
            this.details.sire_no = '';
            this.details.dam_no = '';
            this.details.renumber = '';
            this.details.age = '';
            this.fileInputKey++;
            this.$refs.form.reset();
        },
        computeBullOptionURL () {
            if (this.type === 'Existing Bull Update') {
                return urls.quarantine.quarantineBullVueSelect;
            } else {
                return urls.quarantine.animalsVueSelect;
            }
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        BackToList () {
            this.$router.push({ path: '/bull-quarantine/' });
        },
        async loadDetails () {
            this.detailsLoading = true;
            const response = await axios.form(urls.bulls.details, { id: this.model.bull });
            const data = response.data.data;
            this.details.breed = data.breed.breed_name;
            this.details.sire_no = data.sireno;
            this.details.dam_no = data.damno;
            this.details.renumber = data.renumber;
            this.details.age = data.age_in_months;
            this.detailsLoading = false;
            if (this.type === 'Existing Bull Update') {
                await this.loadExistBullDetails();
            }
        },
        async loadExistBullDetails () {
            try {
                const response = await axios.form(this.quarantineBullDetails, {
                    bull: this.model.bull
                });
                const result = response.data;
                console.log('Result:>', result);
                if (result) {
                    this.$notify('Data Fetched Successfully', 'Success', { type: 'success' });
                    this.model = result.data;
                    this.model.bull = result.data.bull.id;
                    console.log('Data', this.model);
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
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.files.le();
            }
        },
        async addItem () {
            try {
                console.log('this.model: ', this.model);
                this.$refs.files.ls();
                if (this.model.brucella === undefined || this.model.brucella === null) {
                    this.model.brucella = '';
                }
                if (this.model.ibr === undefined || this.model.ibr === null) {
                    this.model.ibr = '';
                }
                if (this.model.bvd1 === undefined || this.model.bvd1 === null) {
                    this.model.bvd1 = '';
                }
                if (this.model.bvd2 === undefined || this.model.bvd2 === null) {
                    this.model.bvd2 = '';
                }
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.$refs.files.le();
                    // await this.$router.push({ path: '/semen-station/' });
                    this.clearData();
                    this.bullSelectKey++;
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
                    this.$refs.files.le();
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.files.le();
            }
        },

        // validations //
        DateValidation (endDate) {
            const startDate = this.model.start_date;
            const endDateParts = endDate.split('-');
            if (endDateParts.length !== 3) {
                return 'Please enter a valid end date in the format DD-MM-YYYY.';
            }
            const endDay = parseInt(endDateParts[0], 10);
            const endMonth = parseInt(endDateParts[1], 10);
            const endYear = parseInt(endDateParts[2], 10);

            const startDateParts = startDate.split('-');
            if (startDateParts.length !== 3) {
                return 'Please enter a valid start date in the format DD-MM-YYYY.';
            }
            const startDay = parseInt(startDateParts[0], 10);
            const startMonth = parseInt(startDateParts[1], 10);
            const startYear = parseInt(startDateParts[2], 10);

            if (isNaN(endDay) || isNaN(endMonth) || isNaN(endYear) || isNaN(startDay) || isNaN(startMonth) || isNaN(startYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const endDateObj = new Date(endYear, endMonth - 1, endDay);
            const startDateObj = new Date(startYear, startMonth - 1, startDay);

            if (endDateObj <= startDateObj) {
                return 'End date should be greater than the start date.';
            }

            return true;
        }
    }
};
</script>

<style scoped>
.bb-1 {
    color: lightgray !important;
}
</style>

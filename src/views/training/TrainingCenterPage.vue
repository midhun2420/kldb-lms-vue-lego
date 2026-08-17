<template>
    <div class="color-txt">
        <div class="">
            <s-form @submit="addItem" :key="formKey">
            <div class="">
                    <div class="row fl-x fl-j-sb ml-1">
                        <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Training Centre</h3>
                    <div>
                        <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                    </div>
                    </div>
                <div class="row">
                    <div class="col-lg-2">
                        <validated-ajax-vue-select class="c-input-select label-font-xs field-required"
                                          :url="courseOptionURL"
                                          label="Name of Training(courses)" v-model="model.course" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-2 m">
                        <validated-date-picker class="c-input-datepicker label-font-sm field-required"
                                               label="Date of Commencement" format="DD-MM-YYYY" v-model="model.commencement_date" :rules="rules.commencementdateValidation"></validated-date-picker>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-date-picker class="c-input-datepicker field-required "
                                               label="End Date" format="DD-MM-YYYY" v-model="model.end_date" :rules="rules.endDateValidation"></validated-date-picker>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-input class="field-required" label="Duration(days)" v-model="model.duration" :rules="{required:true}" ></validated-input>
                    </div>

                </div>
                <div class="row">
                    <!--                    <div class="mr-3">-->
                    <!--                        <div class="card w-15v b-1">-->
                    <!--                            <p class="bb-1 fs&#45;&#45;1 pb-1">Frozen semen</p>-->
                    <!--                            <p class="bb-1 fs-lg-1 pb-1">Embreyo Transfer</p>-->
                    <!--                            <p class="bb-1 pb-1">Artificial Insennate</p>-->
                    <!--                            <p>Others</p>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="col-lg-2">
                        <validated-input label="Others" class="field-required" v-model="model.other" :rules="{required: isAgencyOrOtherRequired}" :error-message="agencyOrOtherError"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-ajax-vue-select
                            :url="agencyOptionURL"
                            class=" c-input-select field-required" label="Agency" v-model="model.agency" :rules="{required: isAgencyOrOtherRequired}" :error-message="agencyOrOtherError"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-2">
                        <validated-input class=" " label="Number of Trainees" v-model="model.no_of_trainees" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-select
                            :options="regionOption"
                            class=" c-input-select field-required" label="Region" v-model="model.region" :rules="{required:true}" @input="regionChange"></validated-select>
                        <!--                        <div class="card w-15v pos-rel b-1">-->
                        <!--                            <p class="bb-1 pb-1">hdidd</p>-->
                        <!--                            <p class="bb-1 pb-1">dbhcws</p>-->
                        <!--                            <p class="">sdbunhju</p>-->
                        <!--                        </div>-->

                    </div>
                </div>
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-2"></div>
                    <div class="col-2"></div>
                    <div class="col-2"></div>
                    <div class="col-lg-2" v-if="model.region==='Outside State'">
                        <validated-ajax-vue-select
                           :url="excludeState"
                            class="c-input-select" label="Outside State" v-model="model.outside_state"></validated-ajax-vue-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2 ">
                    </div>

                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2 mt-2" v-if="model.region==='Outside Country'">
                        <validated-ajax-vue-select
                            :url="excludeCountry"
                            label="Outside Country" class="c-input-select" v-model="model.outside_country"></validated-ajax-vue-select>
                    </div>

                </div>
            </div>
            <div class="col-lg-12 fl-x-br mt-7">
                 <btn text="Save" :loading="loading" loading-text="Saving..." class="mr-4 font-poppins-regular px-4"></btn>
                    <btn text="Cancel" design="basic-b" type="reset" @click="BackToHome" class=" "></btn>

            </div>
           </s-form>
        </div>
    </div>

</template>

<script>
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'TrainingCenterPage',
    data () {
        return {
            excludeState: urls.trainingCenter.excludeState,
            excludeCountry: urls.trainingCenter.excludeCountry,
            loading: false,
            URL: urls.trainingCenter.addEdit,
            agencyOrOtherError: '',
            model: {
                course: '',
                commencement_date: '',
                end_date: '',
                duration: '',
                agency: '',
                other: '',
                no_of_trainees: '',
                region: '',
                outside_state: '',
                outside_country: ''

            },
            stateOption: [
                {
                    name: '',
                    id: '',
                    countryName: ''
                }
            ],
            countryOption: [],
            arrayCounty: [],
            arrayState: [],
            stateFiltet: [],
            regionOption: [
                { label: 'Outside State', value: 'Outside State' },
                { label: 'Kerala', value: 'Kerala' },
                { label: 'Outside Country', value: 'Outside Country' }
            ],
            formKey: 0,
            courseOptionURL: masterURLs.master.course.vueSelect,
            countryOptionURL: masterURLs.master.location.country.vueSelect,
            stateOptionURL: masterURLs.master.location.state.vueSelect,
            agencyOptionURL: masterURLs.master.agency.vueSelect,
            rules: {
                dobValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationDob();
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                endDateValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.EndDateValidation(value);
                    }
                },
                commencementdateValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationCommencementDate();
                    }
                }
            }

        };
    },
    computed: {

        isAgencyOrOtherRequired () {
            this.validateAgencyOrOther();
            return !this.model.other && !this.model.agency;
        }
    },
    watch: {
        'model.other': function (newValue) {
            if (newValue !== '') {
                this.model.agency = '';
            }
        },
        'model.agency': function (newValue) {
            if (newValue !== '') {
                this.model.other = '';
            }
        }
    },
    methods: {
        validateAgencyOrOther () { this.agencyOrOtherError = !this.model.other && !this.model.agency ? 'Either Others or Agency field is required' : null; },
        regionChange () {
            if (this.model.region === 'Outside State') {
                this.stateOptionCall();
            } else {
                this.countryOptionCall();
            }
        },
        async stateOptionCall () {
            this.arrayState = [];
            this.stateFiltet = [];
            this.stateOption = [];
            const response = await axios.get(masterURLs.master.location.state.list);
            this.arrayState = response.data.data;
            console.log('first array', this.arrayState);

            this.arrayState.forEach((obj) => {
                console.log(`name: '${obj.name}', country name: '${obj.country.name}'`);

                // Check if the country name is 'India' or 'INDIA'
                if (obj.country.name.toLowerCase() === 'india') {
                    this.stateFiltet.push(obj.name);
                }
            });
            console.log('state After filteratiuon', this.stateFiltet);
            this.stateOption = this.stateFiltet.filter(
                (value) => value.toLowerCase() !== 'kerala');
        },
        async countryOptionCall () {
            const response = await axios.get(masterURLs.master.location.country.list);
            this.arrayCounty = response.data.data;
            console.log('first array', this.arrayCounty);

            this.countryOption = this.arrayCounty.filter((obj) => obj.name !== 'India')
                .map((item) => ({ value: item.id, label: item.name }));
            console.log('filterd array', this.countryOption);
        },
        EndDateValidation (date) {
            const commencementdate = this.model.commencement_date;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const commencementdateParts = commencementdate.split('-');
            if (commencementdateParts.length !== 3) {
                return 'Please enter Commencement Date .';
            }
            const commencementdateDay = parseInt(commencementdateParts[0], 10);
            const commencementdateMonth = parseInt(commencementdateParts[1], 10);
            const commencementdateYear = parseInt(commencementdateParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(commencementdateDay) || isNaN(commencementdateMonth) || isNaN(commencementdateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const commencementdateDateObj = new Date(commencementdateYear, commencementdateMonth - 1, commencementdateDay);

            if (dateObj < commencementdateDateObj) {
                return 'Date should be after Commencement Date.';
            }
            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // if (dateObj > currentDate) {
            //     return 'Future Date not allowed.';
            // }
            return true;
        },
        validationCommencementDate () {
            const commencementdate = this.model.commencement_date;

            const commencementdateParts = commencementdate.split('-');
            if (commencementdateParts.length !== 3) {
                return 'Please enter a valid Commencement Date';
            }
            // const commencementdateDay = parseInt(commencementdateParts[0], 10);
            // const commencementdateMonth = parseInt(commencementdateParts[1], 10);
            // const commencementdateYear = parseInt(commencementdateParts[2], 10);
            //
            // const commencementdateDateObj = new Date(commencementdateYear, commencementdateMonth - 1, commencementdateDay);

            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // if (commencementdateDateObj > currentDate) {
            //     return 'Future Date not allowed.';
            // }

            return true;
        },
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                console.log('Country', this.model.outside_country);
                console.log('State', this.model.outside_state);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/home/' });
                    this.model = {
                        course: '',
                        commencement_date: '',
                        end_date: '',
                        duration: '',
                        agency: '',
                        other: '',
                        no_of_trainees: '',
                        region: '',
                        outside_state: '',
                        outside_country: ''

                    };
                    this.formKey++;
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
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
        },
        BackToHome () {
            this.$router.push({ path: '/home/' });
        }
    }

};
</script>

<style scoped>
    .pos-rel {
        left: 0px;
        position: relative;
        top: -12px;
    }
</style>

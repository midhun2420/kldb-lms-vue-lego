<template>
    <s-form @submit="addEditItem">
        <div class="row">
            <div class="col-lg-4">
                <validated-input label="Regno" :rules="{required: false}"
                                 border-radius="1" v-model="model.regno"></validated-input>
                <validated-input label="Name" v-if="animal==='bull'" :rules="{required: false}"
                                 class="field-required" border-radius="1" v-model="model.bullname"></validated-input>
                <validated-input v-if="animal==='cow'" label="Name" :rules="{required: false}"
                                 class="field-required" border-radius="1" v-model="model.cowname"></validated-input>
            </div>
               <div class="col-lg-4">
                <validated-ajax-vue-select class="c-input-select"
                                           :url="breedOptionsURL"
                                           label="Breed" v-model="model.breed"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-4">
                <validated-input class="c-input" label="UID Number" v-model="model.uid" :rules="rules.uidValidation"></validated-input>
            </div>
            <div class="col-lg-4" v-if="model.registration_type==='Embryo Transfer' && animal==='cow'">
                <validated-date-picker :rules="rules.ETDate" v-model="model.et_date"
                                       label="ET Date" class="field-required c-input-datepicker" format="DD-MM-YYYY" disabled></validated-date-picker>
            </div>
            <div class="col-lg-4" v-if="model.registration_type==='Embryo Transfer' && animal==='bull'">
                <validated-date-picker :rules="rules.ETDate" v-model="model.etdate"
                                       label="ET Date" class="field-required c-input-datepicker" format="DD-MM-YYYY" disabled></validated-date-picker>
            </div>
            <div class="col-lg-4" v-if="model.registration_type==='Import Purchase'">
                <validated-date-picker :rules="rules.ETDate" v-model="model.et_date"
                                       label="Purchase Date" class="field-required c-input-datepicker" format="DD-MM-YYYY" disabled></validated-date-picker>
            </div>
            <div class="col-lg-4" v-else>
                <validated-date-picker :rules="rules.ETDate" v-model="model.aidate"
                                       label="AI Date" class="c-input-datepicker" format="DD-MM-YYYY" disabled></validated-date-picker>
            </div>
            <div class="col-lg-4 "  v-if=" model.registration_type === 'Import Purchase'||model.registration_type === 'Unit Transfer'||model.registration_type === 'PT Purchase'">
                <validated-input  label="Purchase Value" type="number" v-model="model.purchasevalue" :rules="rules.positiveOnly"></validated-input>
            </div>

            <div class="col-lg-4 ">
                <validated-input label="Re Number" v-model="model.renumber"></validated-input>
            </div>
             <div class="col-lg-4">
                <validated-date-picker :rules="rules.dobValidation" v-model="model.dob"
                                       label="Date of Birth" class=" c-input-datepicker" format="DD-MM-YYYY" disabled></validated-date-picker>
            </div>

<!--               <div class="col-lg-4 " v-if="model.registration_type==='Unit Transfer'">-->
<!--                <validated-input label="Unit" v-model="model.unit" :rules="rules.positiveOnly"></validated-input>-->
<!--            </div> -->
            <div class="col-lg-4 " v-if="model.registration_type==='Unit Transfer'">
                <validated-ajax-vue-select class="c-input-select" label="Unit" v-model="model.unit" :url="unitOptionsURL" ></validated-ajax-vue-select>
            </div>

             <div class="col-lg-4">
                <validated-ajax-vue-select v-if="this.animal==='bull'" class="c-input-select"
                                           :url="shedOptionsURL"
                                           label="Shed Number" v-model="model.shed_number" :rules="{required:true}"></validated-ajax-vue-select>
                <validated-ajax-vue-select v-else class="c-input-select"
                                           :url="COWshedOptionsURL"
                                           label="Shed Number" v-model="model.shedno" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
    <div class="col-lg-4" v-if="model.registration_type==='Unit Transfer'">
                <validated-date-picker v-model="model.transferdate"
                                       label="Transfer Date" class=" c-input-datepicker" format="DD-MM-YYYY" :rules="rules.transferdateValidation"></validated-date-picker>
            </div>
             <div class="col-lg-4">
                <validated-vue-select class="c-input-select"
                                           :url="countryRegionOptionURL"
                                           label="Country/State/Region" v-model="model.country_state_region" :options="countryOptions"></validated-vue-select>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Birth Weight" v-model="model.birthwt" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>

            <div class="col-lg-4">
                <validated-vue-select class="c-input-select" :options="YesOrNoOptions"

                                      label="F1 calf or not" v-model="model.f1status"></validated-vue-select>
            </div>
            <div class="col-lg-4"  v-if=" model.registration_type === 'Import Purchase'||model.registration_type === 'Unit Transfer'||model.registration_type === 'PT Purchase'">
                <validated-date-picker :rules="rules.common" v-model="model.additiondate"
                                       label="Addition Date" class=" c-input-datepicker field-required" format="DD-MM-YYYY"></validated-date-picker>
            </div>
             <div class="col-lg-4 ">
                <validated-input label="Breeding Value" v-model="model.breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
            </div>
          <div class="col-lg-4 " v-if="model.registration_type==='Unit Transfer'">
                <validated-input label="Old Number" v-model="model.old_number" type="number" :rules="rules.positiveOnly"></validated-input>
            </div>
              <div class="col-lg-4 ">
                <validated-input label="Remarks" v-model="model.remarks"></validated-input>
            </div>
            <!--            <div class="col-lg-4">
                            <validated-date-picker :rules="rules.common" v-model="model.last_vaccination_date"
                                                   label="Vaccination Date" class=" c-input-datepicker" format="DD-MM-YYYY"></validated-date-picker>
                        </div>-->
        </div>
        <div class="row">
            <div class="col-lg-4 " v-if="model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase'">
                <validated-input label="Dam No" v-model="model.damno" :disabled="true"></validated-input>
            </div>
            <div class="col-lg-4 " v-else>
                <validated-vue-select
                    :url="cowOptionsURL"
                    label="Dam's Number" v-model="model.damno" type="number" :rules="rules.positiveOnly" @input="loadDetailsDam" :disabled="true" :options="damOptions"></validated-vue-select>
            </div>
            <div class="col-lg-4">
                <validated-vue-select class="c-input-select field-required"
                                           :url="breedOptionsURL"
                                           label="Dam’s Breed" v-model="model.dambreed" :options="breedOptions" disabled></validated-vue-select>
            </div>
                        <div class="col-lg-4 ">
                <validated-input label="Dam's Name" v-model="model.dam_name" disabled></validated-input>
            </div>
                     <div class="col-lg-4 ">
                <validated-input label="Dam’s Protein %" v-model="model.protein" type="text" :rules="rules.percentage"></validated-input>
            </div>
             <div class="col-lg-4 ">
                <validated-input label="Dam Breeding Value" v-model="model.dam_breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Dam’s Lactation No" v-model="model.damlacno" type="number" :rules="rules.positiveOnly"></validated-input>
            </div>
             <div class="col-lg-4 ">
                <validated-input label="Dam’s Milk Fat %" type="text" v-model="model.milk_fat" :rules="rules.percentage"></validated-input>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Dam’s Best Lactation Yield" v-model="model.damlacyield" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Grand Dam Yield" v-model="model.granddamyield" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>
        </div>

            <!--            <div class="col-lg-4 ">
                            <validated-input label="Registration Number" v-model="model.dam_breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                        </div>-->

            <!--            <div class="col-lg-4 ">
                            <validated-input label="Source Type " v-model="model.source" :rules="rules.positiveOnly"></validated-input>
                        </div>-->

        <div class="row">
            <div class="col-lg-4 " v-if="model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase'">
                <validated-input label="Sire No" v-model="model.sireno" :disabled="true"></validated-input>
            </div>
            <div class="col-lg-4 " v-else>
                <validated-vue-select
                    :url="bullOptionsURL"
                    label="Sire Number" v-model="model.sireno" :rules="rules.positiveOnly"  @input="loadDetailsSire" disabled :options="sireOptions"></validated-vue-select>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Sire Name" v-model="model.sire_name" disabled></validated-input>
            </div>
            <div class="col-lg-4">
                <validated-vue-select class="c-input-select"
                                           :url="breedOptionsURL"
                                           label="Sire Breed" v-model="model.sirebreed" :disabled="true" :options="breedOptions"></validated-vue-select>
            </div>
             <div class="col-lg-4 ">
                <validated-input label="Sire Dam Yield" v-model="model.siredamyield" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>
             <div class="col-lg-4 ">
                <validated-input label="Sire Daughter’s Yield " v-model="model.siredaughteryield" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>
            <div class="col-lg-4 ">
                <validated-input label="Projected Yield of Daughter" v-model="model.projected_yield_of_daughter" type="text" :rules="rules.decimalNumber"></validated-input>
            </div>
            <!--            <div class="col-lg-4">
                            <validated-date-picker :rules="rules.common" v-model="model.dehorndate"
                                                   label="Dehorning Date" class=" c-input-datepicker" format="DD-MM-YYYY"></validated-date-picker>
                        </div>-->

            <!--            <div class="col-lg-4">
                            <validated-ajax-vue-select class="c-input-select"
                                                       :url="sourceOptionURL"
                                                       label="Source" v-model="model.source" ></validated-ajax-vue-select>
                        </div>-->
        </div>
        <div class="row">
            <div class="col-lg-4 " v-if="(model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase') && animal==='bull'">
                <validated-input label="Recipient No" v-model="model.recipientno" :disabled="true"></validated-input>
            </div>
            <div class="col-lg-4 " v-if="(model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase') && animal==='cow'">
                <validated-input label="Recipient No" v-model="model.recipient_no" :disabled="true"></validated-input>
            </div>

            <div class="col-lg-4 " v-if="(model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase') && animal==='bull'">
                <validated-input label="Recipient Breed" v-model="model.recipient_breed" :disabled="true"></validated-input>
            </div>
            <div class="col-lg-4 " v-if="(model.registration_type === 'Unit Transfer' || model.registration_type === 'Embryo Transfer' || model.registration_type === 'PT Purchase') && animal==='cow'">
                <validated-input label="Recipient Breed" v-model="model.recipient_breed" :disabled="true"></validated-input>
            </div>

            <!--            <div class="col-lg-4">
                            <validated-date-picker v-if="this.animal==='bull'" :rules="rules.common" v-model="model.nosepunchdate"
                                                   label="Nose Punching Date" class=" c-input-datepicker" format="DD-MM-YYYY"></validated-date-picker>
                            <validated-date-picker v-else :rules="rules.common"  v-model="model.nose_punching_date"
                                                   label="Nose Punching Date" class=" c-input-datepicker" format="DD-MM-YYYY"></validated-date-picker>
                        </div>-->

            <!--            <div class="col-lg-4">
                            <validated-ajax-vue-select class="c-input-select"
                                                       :url="vaccinationTypeOptionUrl"
                                                       label="Vaccination Type" v-model="model.vaccination_type" format="DD-MM-YYYY"></validated-ajax-vue-select>
                        </div>-->

        </div>

        <div class="row">
            <div class="col-12 text-right mt-4">
                <btn text="Save" :loading="editLoading" loading-text="Saving..." class="px-4"></btn>
            </div>
        </div>
    </s-form>
</template>
<script>
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'EditItem',
    props: {
        model: {
            type: Object
        },
        animal: {
            type: String

        }

    },
    mounted () {
        this.loadbreedOptions();
        this.loadCountryOptions();
        this.loaddamOptions();
        this.loadsireOptions();
        console.log('animal', this.animal);
        console.log('tpe of registration', this.model.registration_type);
    },
    data () {
        return {
            editLoading: false,
            damOptions: [],
            sireOptions: [],
            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            addUrl: urls.bulls.edit,
            editUrlCow: urls.cows.detailEdit,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            unitOptionsURL: masterURLs.master.unit.vueSelect,
            COWshedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            countryRegionOptionURL: masterURLs.master.location.country.vueSelect,
            vaccinationTypeOptionUrl: masterURLs.master.VaccinationType.vueSelect,
            bullOptionsURL: urls.sireDamDetails.sireVueSelect,

            /* URL: urls.bulls.addEdit, */
            cowOptionsURL: urls.sireDamDetails.damVueSelect,
            sourceOptionURL: masterURLs.master.source.vueSelect,
            loading: false,
            breedOptions: [],
            countryOptions: [],
            rules: {
                uidValidation: {
                    required: false,
                    customValidator: (value) => {
                        if (value === null || value === '' || value === undefined) {
                            return true;
                        }

                        const uid = String(value).trim();

                        // Only allow letters and numbers
                        if (!/^[A-Za-z0-9]+$/.test(uid)) {
                            return 'UID Number can contain only letters and numbers.';
                        }

                        return true;
                    }
                },
                decimalNumber: {
                    required: false,
                    customValidator: (value) => {
                        if (value === null || value === '' || value === undefined || value === 'N/A') return true;
                        const v = String(value).trim();

                        // Matches integers or decimals: 25, 25.5, 0.75, 100.00 etc.
                        const ok = /^\d+(\.\d+)?$/.test(v);

                        return ok;
                    }
                },
                percentage: {
                    required: false,
                    customValidator: (value) => {
                        if (value === null || value === '' || value === undefined || value === 'N/A') return true;

                        const num = Number(value);

                        if (isNaN(num)) return 'Enter a valid number';
                        if (num < 0 || num > 100) return 'Value must be between 0 and 100';

                        return true;
                    }
                },
                ETDate: {
                    required: false,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                },
                dobValidation: {
                    required: false,
                    customValidator: () => {
                        return this.validationDob();
                    }
                },
                common: {
                    required: false,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                transferdateValidation: {
                    required: false,
                    customValidator: (value) => {
                        return this.TranserValidation(value);
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            }
        };
    },

    methods: {
        // formatToYMD (dateStr) {
        //     if (!dateStr) return null;
        //     const parts = dateStr.split('-');
        //     if (parts.length !== 3) return null;
        //     const [day, month, year] = parts;
        //     return `${year}-${month}-${day}`;
        // },
        async loadbreedOptions () {
            const response = await axios.get(this.breedOptionsURL);
            this.breedOptions = response.data.data || [];
        },
        async loadCountryOptions () {
            const response = await axios.get(this.countryRegionOptionURL);
            this.countryOptions = response.data.data || [];
        },
        async loaddamOptions () {
            const response = await axios.get(this.cowOptionsURL);
            this.damOptions = response.data.data || [];
        },
        async loadsireOptions () {
            const response = await axios.get(this.bullOptionsURL);
            this.sireOptions = response.data.data || [];
        },
        async loadDetailsDam () {
            const response = await axios.form(urls.cows.details, { reg_no: this.model.damno });
            const data = response.data.data;
            this.model.dam_name = data.cowname;
            this.model.dambreed = data.breed.breed_name;
            console.log('Data', data);
        },
        async loadDetailsSire () {
            const response = await axios.form(urls.bulls.details, { reg_no: this.model.sireno });
            const data = response.data.data;
            this.model.sire_name = data.bull_name;
            this.model.sirebreed = data.breed.breed_name;
            console.log('Data', data);
        },
        DateValidation (aiDate) {
            const dob = this.model.dob;
            const aiDateParts = aiDate.split('-');
            /* if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            } */
            const aiDay = parseInt(aiDateParts[0], 10);
            const aiMonth = parseInt(aiDateParts[1], 10);
            const aiYear = parseInt(aiDateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            /* if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            } */

            const aiDateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (aiDateObj >= dobDateObj) {
                return 'AI date should be before the date of birth (DOB).';
            }

            return true;
        },
        validationDob () {
            const dob = this.model.dob;

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dobDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        Validation (date) {
            const dob = this.model.dob;
            const dateParts = date.split('-');
            /* if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            } */
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            /* if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            } */

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }

            return true;
        },
        TranserValidation (date) {
            const dob = this.model.dob;
            const dateParts = date.split('-');
            /* if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            } */
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            /* if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            } */

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        async addEditItem () {
            try {
                // this.model.et_date = this.formatToYMD(this.model.et_date);
                let response = '';
                this.editLoading = true;

                for (const prop in this.model) {
                    if (Object.prototype.hasOwnProperty.call(this.model, prop)) {
                        if (this.model[prop] === 'N/A') {
                            this.model[prop] = '';
                        }
                    }
                }

                console.log('model', this.model);
                if (this.animal === 'bull') {
                    response = await axios.form(this.addUrl, this.model);
                } else {
                    response = await axios.form(this.editUrlCow, this.model);
                }
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.editFormSuccess(result.data);
                    this.editLoading = false;
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
                    this.editLoading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.editLoading = false;
            }
        },
        editFormSuccess (data) {
            this.loading = false;
            this.$emit('success', data);
        },
        formSuccess () {
            this.$notify('Successfully Edited Bulls..!', 'Success',
                {
                    type: 'success'
                }
            );
            this.$emit('success');
        },

        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        }
    }
};
</script>

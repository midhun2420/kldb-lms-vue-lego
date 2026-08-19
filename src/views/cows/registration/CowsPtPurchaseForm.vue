<template>
    <div>
        <h3 class="text-primary fs-lg-2 font-poppins-medium">Animal Details</h3>
        <s-form class="mt-4" @submit="addItem" :key="formKey">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Registration Number" class="field-required" v-model="model.regno" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                </div>
                 <div class="col-lg-2">
                    <validated-input label="Name " v-model="model.cowname"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Breed"
                                               :url="breedOptionsURL"
                                               class="field-required c-input-select" v-model="model.breed_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" label="Date of Birth" type="date" class="c-input-datepicker field-required" v-model="model.dob" :rules="rules.dobValidation"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Birth Weight" v-model="model.birthwt" :rules="rules.decimalNumber" type="text"></validated-input>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-select
                        :options="YesOrNoOptions"
                        class="c-input-select" label="F1 calf or not" v-model="model.f1status"></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker " label="AI Date" v-model="model.aidate" format="DD-MM-YYYY" ></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="shedOptionsURL"
                        class="c-input-select field-required" label="Shed No" v-model="model.shedno_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker field-required" label="Addition Date" v-model="model.additiondate" :rules="rules.additionDate" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker " label="Dehorning Date" v-model="model.dehorndate" :rules="rules.nosepunching" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker " label="Nose Punching Date" v-model="model.nose_punching_date" :rules="rules.nosepunching" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input  label="Purchase Value" v-model="model.purchasevalue" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breeding Value" v-model="model.breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="PT Unit" class="field-required" v-model="model.pt_unit" :rules="{required:true}"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Dam Details</h3>
                </div>
            </div>
            <div class="row">
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select-->
<!--                        :url="cowOptionsURL"-->
<!--                        class="c-input-select field-required" label="Dam No" v-model="model.damno" :rules="{required:true}" @input="loadDetailsDam"></validated-ajax-vue-select>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Dam Name" disabled v-model="model.dam_name"></validated-input>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select-->
<!--                        :url="breedOptionsURL"-->
<!--                        class="c-input-select " label="Dam Breed" disabled v-model="model.dambreed" ></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="Dam No" v-model="model.damno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Name" v-model="model.dam_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL"
                        class="c-input-select " label="Dam Breed" v-model="model.dambreed"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam’s Lactation Yield" class="" type="number" v-model="model.damlacyield" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Lactation No" v-model="model.damlacno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Grand Dam Yield" v-model="model.granddamyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Dam Breeding Value" v-model="model.dam_breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Milk Fat %" v-model="model.milk_fat" type="text" :rules="rules.percentage"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Protein %"  v-model="model.protein" type="text" :rules="rules.percentage"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Sire Details</h3>
                </div>
            </div>
            <div class="row mt--4">
<!--                <div class="col-lg-2 mt-4">-->
<!--                    <validated-ajax-vue-select-->
<!--                        :url="bullOptionsURL"-->
<!--                        class="c-input-select field-required" label="Sire No" v-model="model.sireno" :rules="{required:true}" @input="loadDetailsSire"></validated-ajax-vue-select>-->
<!--                </div>-->
<!--                <div class="col-lg-2 mt-4">-->
<!--                    <validated-input label="Sire Name" disabled v-model="model.sire_name"></validated-input>-->
<!--                </div>-->
<!--                <div class="col-lg-2 mt-4">-->
<!--                    <validated-ajax-vue-select-->
<!--                        :url="breedOptionsURL"-->
<!--                        class="c-input-select " label="Sire Breed" disabled v-model="model.sirebreed" ></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2 mt-4">
                    <validated-input label="Sire No" v-model="model.sireno"></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="Sire Name" v-model="model.sire_name"></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-ajax-vue-select :url="breedOptionsURL"
                                               class="c-input-select " label="Sire Breed" v-model="model.sirebreed"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="Sire Dam Yield" v-model="model.siredamyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="Sire Daughter’s Yield" v-model="model.siredaughteryield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                    <validated-input label="Projected Yield of Daughter" v-model="model.projected_yield_of_daughter"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Vaccination Details</h3>
                </div>
            </div>
            <div class="row" v-for="(vaccination, index) in model.vaccinations" :key="index">
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select"
                                               :url="vaccinationTypeOptionUrl"
                                               label="Vaccination Type" v-model="vaccination.vactype"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker" format="DD-MM-YYYY" :rules="rules.TransferDateValidation"
                                           label="Last Vaccination Date" v-model="vaccination.last_vaccination_date"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <btn text="Add"  v-if="index === model.vaccinations.length - 1"
                         @click="addVaccinationItem(index, vaccination.vactype, vaccination.last_vaccination_date)"
                         class="mt-lg-4"></btn>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..."  class="px-4"></btn>
                            <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'PtPurchaseForm',
    data () {
        return {
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            vaccinationTypeOptionUrl: masterURLs.master.VaccinationType.vueSelect,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            bullOptionsURL: urls.sireDamDetails.sireVueSelect + '?status=Regularized',
            cowOptionsURL: urls.sireDamDetails.damVueSelect + '?cow_type=Cow',
            formKey: 0,
            URL: urls.cows.addEdit,
            loading: false,
            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            model: {
                registration_type: 'PT Purchase',
                regno: null,
                renumber: null,
                breed_id: null,
                dob: null,
                birthwt: null,
                f1status: null,
                shedno_id: '',
                breeding_value: null,
                damno: null,
                dam_name: null,
                dambreed: null,
                damlacyield: null,
                damlacno: null,
                granddamyield: null,
                dam_breeding_value: null,
                milk_fat: null,
                protein: null,
                sireno: null,
                sire_name: null,
                sirebreed: null,
                siredamyield: null,
                siredaughteryield: null,
                projected_yield_of_daughter: null,
                aidate: null,
                dehorndate: null,
                nose_punching_date: '',
                purchasevalue: null,
                vaccinations: [
                    {
                        vactype: '',
                        last_vaccination_date: ''
                    }
                ],
                additiondate: null,
                pt_unit: null,
                cowname: ''

            },
            rules: {
                decimalNumber: {
                    required: true,
                    customValidator: (value) => {
                        const v = String(value).trim();

                        // Matches integers or decimals: 25, 25.5, 0.75, 100.00 etc.
                        const ok = /^\d+(\.\d+)?$/.test(v);

                        return ok || 'Enter a valid number ';
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
                nosepunching: {
                    required: false,
                    customValidator: (value) => {
                        return this.NosepunchingValidation(value);
                    }
                },
                dobValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationDob();
                    }
                },
                TransferDateValidation: {
                    required: false,
                    customValidator: (value) => {
                        return this.TransferDateValidation(value);
                    }
                },
                vaccDateValidation: {
                    required: false,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                aiDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                additionDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.NosepunchingValidation(value);
                    }
                }
            }
        };
    },
    methods: {
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        TransferDateValidation (date) {
            const dob = this.model.dob;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
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

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

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
        NosepunchingValidation (date) {
            const dob = this.model.dob;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
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

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

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
        addVaccinationItem (index, type, date) {
            const existingItems = this.model.vaccinations.filter(obj => obj.vactype === type && obj.last_vaccination_date === date);
            console.log('existingItems.length', existingItems.length);
            if (existingItems.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.model.vaccinations.push({ vactype: '', last_vaccination_date: '' });
                this.model.vaccinations[index].vactype = type;
                this.model.vaccinations[index].last_vaccination_date = date;
            }
        },

        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
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
        async addItem () {
            try {
                this.loading = true;
                const data = JSON.stringify(this.model);
                console.log('Data', data);
                const response = await axios.form(this.URL, { data: data });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/cows-list/' });
                    this.model = {
                        registration_type: '',
                        regno: '',
                        renumber: '',
                        breed_id: '',
                        dob: '',
                        birthwt: '',
                        f1status: '',
                        shedno_id: '',
                        breeding_value: '',
                        damno: '',
                        dam_name: '',
                        dambreed: '',
                        damlacyield: '',
                        damlacno: '',
                        granddamyield: '',
                        dam_breeding_value: '',
                        milk_fat: '',
                        protein: '',
                        sireno: '',
                        sire_name: '',
                        sirebreed: '',
                        siredamyield: '',
                        siredaughteryield: '',
                        projected_yield_of_daughter: '',
                        aidate: '',
                        dehorndate: '',
                        nose_punching_date: '',
                        purchasevalue: '',
                        vaccinations: [
                            {
                                vactype: '',
                                last_vaccination_date: ''
                            }
                        ],
                        additiondate: '',
                        pt_unit: '',
                        cowname: ''
                    };
                    this.formKey++;
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
        },
        // validations //
        DateValidation (aiDate) {
            const dob = this.model.dob;
            const aiDateParts = aiDate.split('-');
            if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
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

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const aiDateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (aiDateObj >= dobDateObj) {
                return 'AI date should be before the date of birth (DOB).';
            }

            return true;
        },
        Validation (date) {
            const dob = this.model.dob;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
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

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }

            return true;
        }
    }

};
</script>

<style scoped>

</style>

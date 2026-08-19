<template>
    <div>
        <h3 class="text-primary fs-lg-2 font-poppins-medium">Animal Details</h3>
        <s-form class="mt-4" @submit="addItem" :key="formKey">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Registration Number" class="field-required" :rules="{required:true}" v-model="model.regno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                </div>

                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Breed" :rules="{required:true}" v-model="model.breed_id"
                                               :url="breedOptionsURL"
                                               class="field-required c-input-select"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker label="Date of Birth" :rules="rules.dobValidation" type="date" class="c-input-datepicker field-required"
                                           v-model="model.dob" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input type="text"
                                     label="Birth Weight" v-model="model.birthwt" :rules="rules.decimalNumber"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="YesOrNoOptions"
                                      class="c-input-select" label="F1 calf or not" v-model="model.f1status"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-date-picker
                        class="c-input-datepicker" format="DD-MM-YYYY"
                        label="AI Date" v-model="model.aidate"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required"
                                               :url="shedOptionsURL"
                                               label="Shed No" v-model="model.shed_number_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker field-required" label="Addition Date"
                                           :rules="rules.additionDate" format="DD-MM-YYYY"
                                           v-model="model.additiondate"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker "
                                           label="Dehorning Date" :rules="rules.nosepunching"
                                           v-model="model.dehorndate" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker
                        class="c-input-datepicker" :rules="rules.nosepunching"
                        label="Nose Punching Date"
                        v-model="model.nosepunchdate" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Purchase Value" v-model="model.purchasevalue" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breeding Value" v-model="model.breeding_value"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="PT Unit" class="field-required" :rules="{required:true}" v-model="model.pt_unit"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Dam Details</h3>
                </div>
            </div>
            <div class="row">
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select :url="cowOptionsURL"-->
<!--                                               class="c-input-select field-required" :rules="{required:true}" label="Dam No" v-model="model.damno"-->
<!--                                               @input="loadDetailsDam"></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="Dam No" v-model="model.damno" class="field-required" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Name" v-model="model.dam_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL"
                                               class="c-input-select field-required" :rules="{required:true}" label="Dam Breed"
                                               v-model="model.dambreed"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam’s Lactation Yield"  v-model="model.damlacyield"></validated-input>
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
                    <validated-input label="Protein %" v-model="model.protein" type="text" :rules="rules.percentage"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Sire Details</h3>
                </div>
            </div>
            <div class="row">
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select :url="bullOptionsURL"-->
<!--                                               label="Sire No" class="c-input-select field-required" :rules="{required:true}" v-model="model.sireno"-->
<!--                                               @input="loadDetailsSire"></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="Sire No" v-model="model.sireno" class="field-required" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Name" v-model="model.sire_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL"
                                               label="Sire Breed" v-model="model.sirebreed" class="c-input-select field-required" :rules="{required:true}"
                                               ></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Dam Yield" v-model="model.siredamyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Daughter’s Yield" v-model="model.siredaughteryield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input class="label-font-sm" label="Projected Yield of Daughter" v-model="model.projected_yield_of_daughter"></validated-input>
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
                    <validated-date-picker class="c-input-datepicker" format="DD-MM-YYYY" :rules="rules.TransferDateValidation" :key="index"
                                           label="Last Vaccination Date" v-model="vaccination.last_vaccination_date"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <btn text="Add" v-if="index === model.vaccinations.length - 1"
                         type="button"
                         @click="addVaccinationItem(index, vaccination.vactype, vaccination.last_vaccination_date)"
                         class="mt-lg-4"></btn>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../data/urls';
import masterURLs from '../../../data/masterURLs';

export default {
    name: 'PtPurchaseForm',
    data () {
        return {
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            vaccinationTypeOptionUrl: masterURLs.master.VaccinationType.vueSelect,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            bullOptionsURL: urls.sireDamDetails.sireVueSelect + '?status=Regularized',
            cowOptionsURL: urls.sireDamDetails.damVueSelect + '?cow_type=Cow',
            URL: urls.bulls.addEdit,
            loading: false,
            formKey: 0,
            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            model: {
                registration_type: 'PT Purchase',
                regno: '',
                renumber: '',
                breed_id: '',
                dob: '',
                birthwt: '',
                f1status: '',
                shed_number_id: '',
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
                nosepunchdate: '',
                purchasevalue: '',
                vaccinations: [
                    {
                        vactype: '',
                        last_vaccination_date: ''
                    }
                ],
                additiondate: '',
                pt_unit: ''

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
                        return this.NosepunchValidation(value);
                    }
                },
                aiDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                },
                TransferDateValidation: {
                    required: false,
                    customValidator: (value) => {
                        return this.TransferDateValidation(value);
                    }
                },
                dobValidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationDob();
                    }
                },
                positiveOnly: {
                    // required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                vaccinations: {
                    required: false,
                    customValidator: (value) => {
                        return this.Validation(value);
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
                        return this.NosepunchValidation(value);
                    }
                }
            }
        };
    },
    methods: {
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
            this.$router.push({ path: '/semen-station/' });
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
                    // await this.$router.push({ path: '/bulls-list/' });
                    this.model = {
                        registration_type: 'PT Purchase',
                        regno: '',
                        renumber: '',
                        breed_id: '',
                        dob: '',
                        birthwt: '',
                        f1status: '',
                        shed_number_id: '',
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
                        nosepunchdate: '',
                        purchasevalue: '',
                        vaccinations: [
                            {
                                vactype: '',
                                last_vaccination_date: ''
                            }
                        ],
                        additiondate: '',
                        pt_unit: ''

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
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
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
        },
        NosepunchValidation (date) {
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
        }
    }

};
</script>

<style scoped>

</style>

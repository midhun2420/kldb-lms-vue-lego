<template>
    <div>
        <h3 class="text-primary fs-lg-2 font-poppins-medium">Animal Details</h3>
        <s-form class="mt-4" @submit="addItem" :key="formKey">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Registration Number" :rules="{required:true}" class="field-required" v-model="model.regno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Original No" :rules="{required:true}" class="field-required" v-model="model.originalno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                </div>

                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required" :rules="{required:true}"
                                               :url="breedOptionsURL"
                                               label="Breed" v-model="model.breed_id"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker label="Date of Birth" :rules="rules.dobValidation" type="date" class="c-input-datepicker field-required"
                                           v-model="model.dob" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input type="text" label="Birth Weight" v-model="model.birthwt" :rules="rules.decimalNumber"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required"
                                               :url="shedOptionsURL"
                                               label="Shed No" v-model="model.shed_number_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker class="c-input-datepicker field-required" label="Addition Date"
                                           :rules="rules.additiondate"
                                           v-model="model.additiondate" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required" :rules="{required:true}"
                                               :url="countryRegionOptionURL"
                                               label="Country/Region" v-model="model.country_or_region"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Purchase Value" type="number" :rules="rules.positiveOnly" class="field-required" v-model="model.purchasevalue"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           class="c-input-datepicker" :rules="rules.nosepunching"
                                           label="Purchase Date" v-model="model.purchasedate"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breeding Value" v-model="model.breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           class="c-input-datepicker " :rules="rules.nosepunching"
                                           label="Dehorning Date" v-model="model.dehorndate"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           class="c-input-datepicker " :rules="rules.nosepunching"
                                           label="Nose Punching Date" v-model="model.nosepunchdate"></validated-date-picker>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Dam Details / Donor Details</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Dam No" :url="cowOptionsURL"
                                     :rules="{required:true}" class="field-required" v-model="model.damno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Name" v-model="model.dam_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL"
                                               label="Dam Breed" :rules="{required:true}" class="field-required c-input-select"
                                               v-model="model.dambreed"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam’s Best Lactation Yield" class="field-required" v-model="model.damlacyield"></validated-input>
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
                <div class="col-lg-2">
                    <validated-input :url="bullOptionsURL" :rules="{required:true}"
                                     class="c-input-select field-required" label="Sire No" v-model="model.sireno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Name" v-model="model.sire_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptionsURL" :rules="{required:true}"
                                               class="c-input-select field-required" label="Sire Breed" v-model="model.sirebreed"></validated-ajax-vue-select>
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
                    <validated-ajax-vue-select class="c-input-select" :key="index"
                                               :url="vaccinationTypeOptionUrl"
                                               label="Vaccination Type" v-model="vaccination.vactype"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker v-model="vaccination.last_vaccination_date" format="DD-MM-YYYY"
                                           :rules="rules.TransferDateValidation" :key="index"
                                           class="c-input-datepicker" label="Vaccination Date"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <btn text="Add" v-if="index === model.vaccinations.length - 1"
                         @click="addVaccinationItem(index, vaccination.vactype, vaccination.last_vaccination_date)" type="button"
                         class="mt-lg-4"></btn>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2 mt-lg-4">
                    <validated-file-input v-model="model.file" label-text="Upload Files"></validated-file-input>
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
    name: 'ImportPurchaseForm',
    data () {
        return {
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            countryRegionOptionURL: masterURLs.master.location.country.vueSelect,
            vaccinationTypeOptionUrl: masterURLs.master.VaccinationType.vueSelect,
            bullOptionsURL: urls.sireDamDetails.sireVueSelect + '?status=Regularized',
            URL: urls.bulls.addEdit,
            cowOptionsURL: urls.sireDamDetails.damVueSelect + '?cow_type=Cow',
            loading: false,
            formKey: 0,
            model: {
                registration_type: 'Import Purchase',
                regno: '',
                renumber: '',
                breed_id: '',
                dob: '',
                birthwt: '',
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
                dehorndate: '',
                nosepunchdate: '',
                purchasevalue: '',
                vaccinations: [
                    {
                        vactype: '',
                        last_vaccination_date: ''
                    }
                ],
                country_or_region: '',
                originalno: '',
                additiondate: '',
                purchasedate: '',
                file: ''

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
                TransferDateValidation: {
                    required: false,
                    customValidator: (value) => {
                        return this.TransferDateValidation(value);
                    }
                },
                nosepunching: {
                    required: false,
                    customValidator: (value) => {
                        return this.NosepunchingValidation(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                additiondate: {
                    required: true,
                    customValidator: (value) => {
                        return this.NosepunchingValidation(value);
                    }
                },
                vaccinations: {
                    required: false,
                    customValidator: (value) => {
                        return this.Validation(value);
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
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
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
                        registration_type: '',
                        regno: '',
                        renumber: '',
                        breed_id: '',
                        dob: '',
                        birthwt: '',
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
                        dehorndate: '',
                        nosepunchdate: '',
                        purchasevalue: '',
                        vaccinations: [
                            {
                                vactype: '',
                                last_vaccination_date: ''
                            }
                        ],
                        country_or_region: '',
                        originalno: '',
                        additiondate: '',
                        purchasedate: '',
                        file: ''
                    };
                    this.$emit('clearRegistrationType');
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
        }
    }
};
</script>

<style scoped>

</style>

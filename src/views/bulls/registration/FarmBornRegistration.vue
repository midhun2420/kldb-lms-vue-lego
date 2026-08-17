<template>
    <div>
        <h3 class="text-primary fs-lg-2 font-poppins-medium">Animal Details</h3>
        <s-form class="mt-4" @submit="addItem" :key="formKey">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Registration Number" :rules="{required:true}" class="field-required" v-model="model.regno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                </div>

                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Breed" v-model="model.breed_id" :url="breedOptionsURL"
                                               :rules="{required:true}" class="field-required c-input-select"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker  label="Date of Birth" :rules="rules.dobValidation" type="date" class="c-input-datepicker field-required"
                                           v-model="model.dob" format="DD-MM-YYYY" @input="onDobChange"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input  :rules="rules.decimalNumber" type="text"
                        label="Birth Weight" class="field-required" v-model="model.birthwt" @input="onBirthWeightChange" ></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="YesOrNoOptions"
                                      class="c-input-select field-required"
                                      label="F1 calf or not" :rules="{required:true}" v-model="model.f1status"></validated-select>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2">
                    <validated-date-picker  disabled :rules="rules.aiDate" v-model="model.aidate"
                        label="AI Date" class="field-required c-input-datepicker" format="DD-MM-YYYY"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required"
                                               :url="shedOptionsURL"
                                               label="Shed No" v-model="model.shed_number_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Book Value" v-model="model.bookvalue" type="number" :rules="rules.positiveOnly" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breeding Value" v-model="model.breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Dam Details</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-select :options="cowOptions"
                        label="Dam No" v-model="model.damno" :rules="{required:true}" class="field-required c-input-select" @input="loadDetailsDam"></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Name" disabled v-model="model.dam_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :url="breedOptionsURL"
                        class=" c-input-select"  label="Dam Breed" v-model="model.dambreed" disabled=true></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam’s Lactation Yield" disabled v-model="model.damlacyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Lactation No" disabled v-model="model.damlacno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Grand Dam Yield" disabled v-model="model.granddamyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Dam Breeding Value" disabled v-model="model.dam_breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Milk Fat %" disabled v-model="model.milk_fat" type="text" :rules="rules.percentage"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Protein %" disabled v-model="model.protein" type="text" :rules="rules.percentage"></validated-input>
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
<!--                        :rules="{required:true}" class="field-required c-input-select" label="Sire No" v-model="model.sireno" @input="loadDetailsSire" ></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-select :options="bullOptions" disabled
                        :rules="{required:true}" class="field-required c-input-select" label="Sire No" v-model="model.sireno" @input="loadDetailsSire" ></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Name" disabled v-model="model.sire_name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :url="breedOptionsURL"
                        class=" c-input-select" disabled label="Sire Breed" v-model="model.sirebreed"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Dam Yield" disabled v-model="model.siredamyield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Daughter’s Yield" disabled v-model="model.siredaughteryield" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Projected Yield of Daughter" disabled class="label-font-sm" v-model="model.projected_yield_of_daughter"></validated-input>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn type="submit" text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
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
    name: 'FarmBornRegistration',
    data () {
        return {
            URL: urls.bulls.addEdit,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            bullOptionsURL: urls.sireDamDetails.sireVueSelect + '?status=Regularized',
            cowOptionsURL: urls.sireDamDetails.damVueSelect,
            getBookValueURL: masterURLs.master.bookValue.getBookValue,
            bullOptions: [],
            cowOptions: [],
            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            loading: false,
            formKey: 0,
            model: {
                registration_type: 'Farm Born',
                regno: '',
                renumber: '',
                breed_id: '',
                dob: '',
                birthwt: '',
                f1status: '',
                shed_number_id: '',
                bookvalue: '',
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
                aidate: ''

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
                aiDate: {
                    required: true,
                    customValidator: (value) => {
                        return this.DateValidation(value);
                    }
                },
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
                birthweight: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        async onBirthWeightChange () {
            this.model.bookvalue = '';
            const responseBookValue = await axios.get(this.getBookValueURL, {
                params: {
                    dob: this.model.dob,
                    type: 'Bull',
                    birth_weight: this.model.birthwt
                }
            });

            this.model.bookvalue = responseBookValue.data.data.book_value;
            console.log('book value----', this.model.bookvalue);
        },
        async onDobChange () {
            console.log('inside dob change----------------------');
            this.cowOptions = [];
            this.model.aidate = '';
            this.model.damno = '';
            this.model.bookvalue = '';
            this.model.dam_name = '';
            this.model.dambreed = '';
            this.model.damlacyield = '';
            this.model.damlacno = '';
            this.model.granddamyield = '';
            this.model.dam_breeding_value = '';
            this.model.milk_fat = '';
            this.model.protein = '';
            this.bullOptions = [];
            this.model.sireno = '';
            this.model.sire_name = '';
            this.model.sirebreed = '';
            this.model.siredamyield = '';
            this.model.siredaughteryield = '';
            this.model.projected_yield_of_daughter = '';
            this.formKey++;

            try {
                const response = await axios.get(this.cowOptionsURL, {
                    params: {
                        cow_type: 'Cow',
                        dob: this.model.dob,
                        source_type: 'Farm Born',
                        reg_animal: 'bull'
                    }
                });

                this.cowOptions = response.data.data;
                console.log('cow options----', response.data.data);

                const responseBull = await axios.get(this.bullOptionsURL, {
                    params: {
                        dob: this.model.dob,
                        source_type: 'Farm Born',
                        status: 'regularized'
                    }
                });

                this.bullOptions = responseBull.data.data;
                // this.bullOptions = responseBull.data.data.map(item => ({
                //     label: item.label,
                //     value: item.value
                // }));
                console.log('bull options----', this.bullOptions);
                const responseBookValue = await axios.get(this.getBookValueURL, {
                    params: {
                        dob: this.model.dob,
                        type: 'Bull',
                        birth_weight: this.model.birthwt
                    }
                });

                this.model.bookvalue = responseBookValue.data.data.book_value;
                console.log('book value----', this.model.bookvalue);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
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
        async loadDetailsDam () {
            const response = await axios.form(urls.bulls.sireAutoFetch, { reg_no: this.model.damno, dob: this.model.dob });
            const data = response.data.data;
            this.model.dam_name = data.cowname;
            this.model.dambreed = data.breed.breed_name;
            this.model.damlacyield = data.damlacyield;
            this.model.damlacno = data.damlacno;
            this.model.granddamyield = data.granddamyield;
            this.model.dam_breeding_value = data.dam_breeding_value;
            this.model.milk_fat = data.milk_fat;
            this.model.protein = data.protein;
            this.model.aidate = data.sire_details.ai_date;
            this.model.sireno = data.sire_details.sire_no;
            this.model.sire_name = data.sire_details.sire_name;
            this.model.sirebreed = data.sire_details.sire_breed;
            this.model.siredamyield = data.sire_details.sire_dam_yield;
            this.model.siredaughteryield = data.sire_details.sire_daughter_yield;
            this.model.projected_yield_of_daughter = data.sire_details.projected_yield_daughter;
            console.log('Data', data);
        },
        async loadDetailsSire () {
            const response = await axios.form(urls.bulls.details, { reg_no: this.model.sireno });
            const data = response.data.data;
            this.model.sire_name = data.bull_name;
            this.model.sirebreed = data.breed.breed_name;
            this.model.siredamyield = data.siredamyield;
            this.model.siredaughteryield = data.siredaughteryield;
            this.model.projected_yield_of_daughter = data.projected_yield_of_daughter;
            console.log('Data', data);
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                const data = JSON.stringify(this.model);
                console.log('Data', data);
                const response = await axios.form(this.URL, { data: data });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/bulls-list/' });
                    this.model = {
                        registration_type: 'Farm Born',
                        regno: '',
                        renumber: '',
                        breed_id: '',
                        dob: '',
                        birthwt: '',
                        f1status: '',
                        shed_number_id: '',
                        bookvalue: '',
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
                        aidate: ''
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
        }
    }
};
</script>

<style scoped>

</style>

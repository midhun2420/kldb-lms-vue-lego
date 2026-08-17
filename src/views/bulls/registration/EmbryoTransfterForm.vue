<template>
    <div>
        <h3 class="text-primary fs-lg-2 font-poppins-medium">Animal Details</h3>
        <s-form class="mt-4" @submit="addItem" :key="formKey">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input :rules="{required:true}"
                                     label="Registration Number" class="field-required" v-model="model.regno"></validated-input>
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
                    <validated-date-picker  label="Date of Birth" format="DD-MM-YYYY" :rules="rules.dobValidation" type="date" class="c-input-datepicker field-required"
                                           v-model="model.dob" @input="onDobChange"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input type="text"
                        label="Birth Weight" class="field-required"  :rules="rules.decimalNumber" v-model="model.birthwt"  @input="onBirthWeightChange"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="YesOrNoOptions"
                                      class="c-input-select" label="F1 calf or not" v-model="model.f1status"></validated-select>
                </div>
            </div>
            <div class="row">
                 <div class="col-lg-2">
                    <validated-input label="ET Date" v-model="detailItem.date_of_transfer" :rules="rules.ETDate"  format="DD-MM-YYYY" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-select :options="embryoOptions" class=" field-required" label="Embryo No" v-model="model.embryo_no" @input="onEmbryoSelect(model.embryo_no)"></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="shedOptionsURL"
                                               class="c-input-select field-required" label="Shed No" v-model="model.shed_number_id" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Book Value" v-model="model.bookvalue" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breeding Value" v-model="model.breeding_value" type="number" :rules="rules.positiveOnly"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Dam Details / Donor Details</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input
                        class="c-input-select field-required" label="Dam No" :rules="{required:true}" v-model="detailItem.dam_no" :disabled="true"></validated-input>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Dam No" v-model="model.damno"></validated-input>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="Dam Name" v-model="detailItem.dam_name" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input
                        class="c-input-select " label="Dam Breed" v-model="detailItem.dam_breed" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam’s Best Lactation Yield" v-model="detailItem.best_lac_yield" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam Lactation No" v-model="detailItem.dam_lac_no" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Grand Dam Yield" v-model="detailItem.grand_dam_yield" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Dam Breeding Value" v-model="detailItem.dam_breeding_value" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Milk Fat %" v-model="detailItem.milk_fat" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2 mt-lg-3">
                    <validated-input label="Protein %" v-model="detailItem.protein" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Sire Details</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input class="c-input-select field-required" label="Sire No" v-model="detailItem.sire_no" :rules="{required:true}" :disabled="true"></validated-input>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Sire No" v-model="model.sireno"></validated-input>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="Sire Name" v-model="detailItem.sire_name" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input class="c-input-select " label="Sire Breed" v-model="detailItem.sire_breed" :disabled="true"></validated-input>
                </div>

                <div class="col-lg-2">
                    <validated-input label="Sire Dam Yield" v-model="detailItem.sire_dam_yield" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire Daughter’s Yield" v-model="detailItem.sire_daughter_yield" type="number" :rules="rules.positiveOnly" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input class="label-font-sm" label="Projected Yield of Daughter" v-model="detailItem.projected_yield_of_daughter" :disabled="true"></validated-input>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h3 class="text-primary fs-lg-2 font-poppins-medium">Recipient Details</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input
                        label="Dam No" v-model="detailItem.recipient_no" :rules="{required:true}" class="field-required c-input-select" :disabled="true"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input
                        class="c-input-select" label="Recipient Breed" v-model="detailItem.recipient_breed" :disabled="true"></validated-input>
                </div>
                <!--                <div class="col-lg-2">-->
                <!--                    <btn text="Add" class="mt-lg-4"></btn>-->
                <!--                </div>-->
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
    name: 'EmbryoTransfterForm',
    data () {
        return {
            formKey: 0,
            embryoOptions: [],
            detailItem: '',
            URL: urls.bulls.addEdit,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            /* bullOptionsURL: urls.bulls.vueSelect + '?status=Regularized',
            cowOptionsURL: urls.cows.vueSelect + '?cow_type=Cow', */
            /* shedOptionsURL: masterURLs.master.shed.vueSelect, */
            bullOptionsURL: urls.sireDamDetails.sireVueSelect + '?status=Regularized',
            cowOptionsURL: urls.sireDamDetails.damVueSelect + '?cow_type=Cow',
            embryoOptionsURL: urls.embryoTransfer.embryoNoSelect,
            embryoNoDetailURL: urls.embryoTransfer.embryoNoDetail,
            getBookValueURL: masterURLs.master.bookValue.getBookValue,
            loading: false,

            YesOrNoOptions: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            model: {
                registration_type: 'Embryo Transfer',
                regno: '',
                renumber: '',
                breed_id: '',
                dob: '',
                birthwt: '',
                f1status: '',
                etdate: '',
                embryo_no: '',
                shed_number_id: '',
                bookvalue: '',
                breeding_value: '',
                damno: '',
                dam_name: '',
                dam_breed: '',
                dam_lac_yield: '',
                dam_lac_no: '',
                grand_dam_yield: '',
                dam_breeding_value: '',
                best_lac_yield: '',
                milk_fat: '',
                protein: '',
                sireno: '',
                sire_name: '',
                sirebreed: '',
                sire_dam_yield: '',
                sire_daughter_yield: '',
                projected_yield_of_daughter: '',
                recipientno: '',
                recipient_breed: ''

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
                ETDate: {
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
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                positiveOnly: {
                    // required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                BirthWeight: {
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
            this.model.embryo_no = '';
            this.model.bookvalue = '';
            this.detailItem = {
                embryo_no: '',
                date_of_transfer: '',
                dam_no: '',
                dam_name: '',
                dam_breed: '',
                best_lac_yield: '',
                dam_lac_no: '',
                grand_dam_yield: '',
                dam_breeding_value: '',
                milk_fat: '',
                protein: '',
                sire_no: '',
                sire_name: '',
                sire_breed: '',
                sire_dam_yield: '',
                sire_daughter_yield: '',
                recipient_no: '',
                recipient_breed: ''
            };
            try {
                const responseEmbryo = await axios.form(this.embryoOptionsURL, {
                    dob: this.model.dob,
                    reg_animal: 'bull'
                });
                this.embryoOptions = responseEmbryo.data.data;

                console.log('embryo options----', this.embryoOptions);
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
                console.error('Error fetching cow options:', error);
            }
        },
        async onEmbryoSelect () {
            console.log('inside embryo select---------------------');

            try {
                const responseEmbryo = await axios.form(this.embryoNoDetailURL, {
                    id: this.model.embryo_no
                });
                this.detailItem = responseEmbryo.data.data;
                // Copy ET date to model
                this.model.etdate = this.detailItem.date_of_transfer || '';

                // Populate dam details
                this.model.damno = this.detailItem.dam_no || '';
                this.model.embryono = this.model.embryo_no || '';
                this.model.dam_name = this.detailItem.dam_name || '';
                this.model.dam_breed = this.detailItem.dam_breed || '';
                this.model.dam_lac_no = this.detailItem.dam_lac_no || '';
                this.model.best_lac_yield = this.detailItem.best_lac_yield || '';
                this.model.grand_dam_yield = this.detailItem.grand_dam_yield || '';
                this.model.dam_breeding_value = this.detailItem.dam_breeding_value || '';
                this.model.milk_fat = this.detailItem.milk_fat || '';
                this.model.protein = this.detailItem.protein || '';

                // Populate sire details
                this.model.sireno = this.detailItem.sire_no || '';
                this.model.sire_name = this.detailItem.sire_name || '';
                this.model.sirebreed = this.detailItem.sire_breed || '';
                this.model.sire_dam_yield = this.detailItem.sire_dam_yield || '';
                this.model.sire_daughter_yield = this.detailItem.sire_daughter_yield || '';
                this.model.projected_yield_of_daughter = this.detailItem.projected_yield_of_daughter || '';

                // Populate recipient details
                this.model.recipientno = this.detailItem.recipient_no || '';
                this.model.recipient_breed = this.detailItem.recipient_breed || '';

                console.log('detail options----', this.detailItem);
            } catch (error) {
                console.error('Error fetching cow options:', error);
            }
        },
        // async loadDetailsDam () {
        //     const response = await axios.form(urls.cows.details, { reg_no: this.model.damno });
        //     const data = response.data.data;
        //     this.model.dam_name = data.cowname;
        //     this.model.dambreed = data.breed.breed_name;
        //     console.log('Data', data);
        // },
        // async loadDetailsSire () {
        //     const response = await axios.form(urls.bulls.details, { reg_no: this.model.sireno });
        //     const data = response.data.data;
        //     this.model.sire_name = data.bull_name;
        //     this.model.sirebreed = data.breed.breed_name;
        //     console.log('Data', data);
        // },
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
                        registration_type: 'Embryo Transfer',
                        regno: '',
                        renumber: '',
                        breed_id: '',
                        dob: '',
                        birthwt: '',
                        f1status: '',
                        etdate: '',
                        embryo_no: '',
                        shed_number_id: '',
                        bookvalue: '',
                        breeding_value: '',
                        damno: '',
                        dam_name: '',
                        dam_breed: '',
                        dam_lac_yield: '',
                        dam_lac_no: '',
                        grand_dam_yield: '',
                        dam_breeding_value: '',
                        best_lac_yield: '',
                        milk_fat: '',
                        protein: '',
                        sireno: '',
                        sire_name: '',
                        sirebreed: '',
                        sire_dam_yield: '',
                        sire_daughter_yield: '',
                        projected_yield_of_daughter: '',
                        recipientno: '',
                        recipient_breed: ''
                    };
                    this.detailItem = {
                        embryo_no: '',
                        date_of_transfer: '',
                        dam_no: '',
                        dam_name: '',
                        dam_breed: '',
                        best_lac_yield: '',
                        dam_lac_no: '',
                        grand_dam_yield: '',
                        dam_breeding_value: '',
                        milk_fat: '',
                        protein: '',
                        sire_no: '',
                        sire_name: '',
                        sire_breed: '',
                        sire_dam_yield: '',
                        sire_daughter_yield: '',
                        projected_yield_of_daughter: '',
                        recipient_no: '',
                        recipient_breed: ''
                    };
                    this.formKey++;
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
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
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
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
                return 'ET date should be before the date of birth (DOB).';
            }

            return true;
        }
    }
};
</script>

<style scoped>

</style>

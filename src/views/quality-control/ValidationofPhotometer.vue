<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
            <div class="col-lg-12">
                <div class="row fl-x fl-j-sb ml-1">
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Validation of Photometer</h3>
                    <div>
                        <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2">
                        <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                               label="Date of the Test" :disabled-date="disabledAfterToday"
                                               v-model="model.test_date" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 fl-x pt-4 pl-0">
                        <div class="form-group col-lg-2 ">
                            <validated-date-picker format="DD-MM-YYYY" label="Date of Production" :disabled-date="disabledAfterToday"
                                                   class="c-input-datepicker text-black field-required"
                                                   v-model="model.production_date"  @input="loadBullDetails" :rules="rules.compare"></validated-date-picker>
                        </div>
                        <div class="form-group col-lg-2">

                            <validated-vue-select :options="bullOptions" label="Bull No"
                                               class="text-black c-input-select field-required"
                                               v-model="model.bull" :rules="{required:true}" @input="loadDetails"></validated-vue-select>
                        </div>
                        <div class="form-group col-lg-2 ">
                            <validated-input label="Bull Name" class="text-black  "
                                             v-model="model.bull_name" disabled></validated-input>
                        </div>
                        <div class="form-group col-lg-2 ">
                            <validated-input label="Breed" class="text-black   "
                                             v-model="model.breed" disabled></validated-input>
                        </div>

                       <div class="col-lg-2">
                    <validated-vue-select :options="ejaculationOptions" label="Ejaculate No" class="text-black c-input-select field-required"
                                     v-model="model.ejaculate_no" :rules="{required:true}"></validated-vue-select>
                </div>
                        <div class="form-group col-lg-2">
                            <validated-input label="Remarks" class="text-black "
                                             v-model="model.remarks"></validated-input>
                        </div>
                    </div>
                </div>
                <div class="col-10 fl-x pl-0">
                    <div class="col-lg-4 pl-0">
                        <p class="text-black fs-lg-0 red-asterisk-label">Concentration measurement of semen sample with photometer</p>
                    </div>
                    <div class="col-lg-2 pr-6 pl-0">
                        <validated-input class="pl-0" placeholder="a x 10⁶" name="Concentration measurement of semen sample with photometer" v-model="model.concentration_photometer"
                                         @input="loadResults" :rules="rules.positiveOnly" type="number"></validated-input>
                    </div>
                </div>
                <div class="col-10 fl-x pl-0 mt-2">
                    <div class="col-lg-4 pl-0">
                        <p class="text-black fs-lg-0 red-asterisk-label">No of spermatozoa in 80 small square</p>
                    </div>
                    <div class="col-lg-2 pr-6 pl-0">
                        <validated-input class="pl-0" placeholder="N" name="No of spermatozoa" v-model="model.no_of_spermatozoa"
                                         @input="loadResults" :rules="rules.NValue" type="number"></validated-input>
                    </div>
                </div>
                <div class="col-10 fl-x pl-0 mt-2">
                    <div class="col-lg-4 pl-0">
                        <p class="text-black fs-lg-0">Concentration measurement of semen sample with Hemocytometer</p>
                    </div>
                    <div class="col-lg-2 pr-6 pl-0">
                        <validated-input class="pl-0" placeholder="10N x 10⁶" name="Concentration measurement of semen sample with Hemocytometer" v-model="model.concentration_hemocytometer"
                                         disabled></validated-input>
                    </div>
                </div>
                <div class="col-10 fl-x pl-0 mt-2">
                    <div class="col-lg-4 pl-0">
                        <p class="text-black fs-lg-0 fl-y-br pr-1">Difference</p>
                    </div>
                    <div class="col-lg-3 pr-7 pl-0">
                        <validated-input class="pl-0" placeholder="(10N x 10⁶)-(a x 10⁶)" v-model="model.difference" disabled></validated-input>
                    </div>
                </div>
                <div class="col-10 fl-x pl-0 mt-2">
                    <div class="col-lg-4 pl-0">
                        <p class="text-black fs-lg-0 fl-y-br pr-2">% Difference</p>
                    </div>
                    <div class="col-lg-3 pr-4 pl-0">
                        <validated-input class="pl-0"  placeholder="[(10N x 10⁶)-(a x 10⁶)] x100/10N x 10⁶" v-model="model.difference_per" disabled></validated-input>
                    </div>
                </div>
                <!--                <div class="col-10 fl-x pl-0 mt-5">-->
                <!--                    <validated-input label="Remarks" class="text-black  w-10r"></validated-input>-->
                <!--                </div>-->
                <div class="column fl-x-br pt-7">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'ValidationofPhotometer',
    data () {
        return {
            loading: false,
            URL: urls.photometer_validation.addEdit,
            formKey: 0,
            model: {
                test_date: '',
                production_date: '',
                bull: '',
                bull_name: '',
                breed: '',
                ejaculate_no: '',
                concentration_photometer: '',
                concentration_hemocytometer: '',
                no_of_spermatozoa: '',
                difference: '',
                difference_per: '',
                remarks: ''
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                NValue: {
                    required: true,
                    customValidator: (value) => {
                        return this.validateNCount(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                compare: {
                    required: true,
                    customValidator: (value) => {
                        return this.CompareDate(value);
                    }
                }
            },
            bullOptions: [],
            ejaculationOptions: []
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadResults () {
            this.model.concentration_hemocytometer = '';
            this.model.difference = '';
            this.model.difference_per = '';
            const response = await axios.form(urls.photometer_validation.loadResult, this.model);
            const data = response.data.data;
            this.model.concentration_hemocytometer = data.concentration_hemocytometer;
            this.model.difference = data.difference;
            this.model.difference_per = data.difference_per;
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        validateNCount (value) {
            if (value === '' || value === null || value === undefined) {
                return true;
            }

            const num = Number(value);

            if (isNaN(num)) {
                return 'Please enter a valid number';
            }

            if (num < 0) {
                return 'Negative values are not allowed';
            }

            if (num > 214) {
                return 'No of spermatozoa should be less than 215';
            }

            return true;
        },
        validationDate () {
            const checkDate = this.model.test_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        CompareDate () {
            const checkDate = this.model.test_date;
            const prodDate = this.model.production_date;
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const prodDateParts = prodDate.split('-');
            if (prodDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const prodDateDay = parseInt(prodDateParts[0], 10);
            const prodDateMonth = parseInt(prodDateParts[1], 10);
            const prodDateYear = parseInt(prodDateParts[2], 10);

            const prodDateObj = new Date(prodDateYear, prodDateMonth - 1, prodDateDay);
            if (checkDateObj < prodDateObj) {
                return 'Production Date should be less than Test Date.';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (prodDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        async loadBullDetails () {
            this.model.bull = '';
            this.model.bull_name = '';
            this.model.breed = '';
            this.model.ejaculate_no = '';
            this.ejaculationOptions = [];
            const response = await axios.form(urls.sperm_morphology.collectionBulls, {
                production_date: this.model.production_date,
                filter: 'photometer'
            });
            // const response = await axios.form(urls.sperm_morphology.collectionBulls, this.model);
            const data = response.data;
            this.bullOptions = data.data;
        },
        async loadDetails () {
            this.model.bull_name = '';
            this.model.breed = '';
            this.model.ejaculate_no = '';
            this.ejaculationOptions = [];
            // const response = await axios.form(urls.sperm_morphology.collectionBullDetails, this.model);
            const response = await axios.form(urls.sperm_morphology.collectionBullDetails, {
                production_date: this.model.production_date,
                bull: this.model.bull,
                filter: 'photometer'
            });
            const data = response.data.data;
            // console.log(data.bull_name);
            // console.log(data);
            // console.log(data.data);
            this.model.breed = data.breed;
            this.model.bull_name = data.bull_name;
            this.ejaculationOptions = data.ejaculation_no;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_date: '',
                        production_date: '',
                        bull: '',
                        bull_name: '',
                        breed: '',
                        ejaculate_no: '',
                        concentration_photometer: '',
                        concentration_hemocytometer: '',
                        no_of_spermatozoa: '',
                        difference: '',
                        difference_per: '',
                        remarks: ''
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
        }
    }
};
</script>

<style scoped>

</style>

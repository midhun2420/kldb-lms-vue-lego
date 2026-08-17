<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h3 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Sperm Morphology</h3>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>

            <div class="row pl-0">
                <div class="col-lg-1">
                    <validated-checkbox label="Training" class="text-black"
                                        v-model="model.is_training"></validated-checkbox>
                </div>
                <div class="col-lg-1">
                    <validated-checkbox label="Regular" class="text-black ml-3"
                                        v-model="model.is_regular"></validated-checkbox>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" label="Date of the Test" :disabled-date="disabledAfterToday"
                                           class="text-black c-input-datepicker field-required"
                                           v-model="model.test_date" :rules="rules.common"></validated-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" label="Date of Production" @input="loadBullDetails"
                                           class="text-black c-input-datepicker field-required" :disabled-date="disabledAfterToday"
                                           v-model="model.production_date"
                                           :rules="rules.compare"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :options="bullOptions" label="Bull No"
                                          class="text-black c-input-select field-required"
                                          v-model="model.bull" :rules="{required:true}"
                                          @input="loadDetails"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull Name" class="text-black" v-model="model.bull_name"
                                     disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed" class="text-black" v-model="model.breed"
                                     disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :options="ejaculationOptions" label="Ejaculate No"
                                          class="text-black c-input-select field-required"
                                          v-model="model.ejaculate_no" :rules="{required:true}"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" class="text-black" v-model="model.remarks"></validated-input>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-3 mt-2">
                    <p class="fs-lg--1 text-black text-left font-poppins-medium red-asterisk-label">Total no of sperm
                        counted</p>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="" name="Total no of sperm counted" v-model="model.total_sperm_count"
                                     :rules="rules.positiveOnly" type="number"  @input="calcs"></validated-input>
                </div>
                <!--            <div class="col-lg-1"></div>-->
                <div class="col-lg-2 pl-3 pr-0">
                    <p class="fs-lg--1 text-black pl-4 mt-2 pr-2 font-poppins-medium red-asterisk-label">Normal sperm
                        counted</p>
                </div>
                <div class="col-lg-1 ">
                    <validated-input class="pl-0" name="Normal sperm counted" v-model="model.normal_sperm_count"
                                     :rules="rules.positiveOnly" type="number"></validated-input>
                </div>
                <div class="col-lg-1 pr-0">
                    <p class="fs-lg--1 text-black mt-2 font-poppins-medium red-asterisk-label">Live count</p>
                </div>
                <div class="col-lg-1 pr-0">
                    <validated-input class="pr-3" name="Live count" v-model="model.live_sperm_count"
                                     :rules="rules.positiveOnly" type="number"></validated-input>
                </div>
                <div class="col-lg-1 pr-0">
                    <p class="fs-lg--1 text-black mt-2 font-poppins-medium red-asterisk-label">Dead count</p>
                </div>
                <div class="col-lg-1">
                    <validated-input class="" name="Dead count" v-model="model.dead_sperm_count"
                                     :rules="rules.positiveOnly" type="number"></validated-input>
                </div>
            </div>
            <div class="row mt-6">
                <div class="col-lg-3">
                    <p class="text-primary fs-lg-1 font-poppins-semibold pt-3  red-asterisk-label">Head
                        Abnormalities</p>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select :url="headAbnormalityOptions" name="Head Abnormalities"-->
<!--                                      class="c-input-select " v-model="model.head_abnormality"-->
<!--                                      :rules="{required:true}"></validated-ajax-vue-select>-->
<!--                </div>-->
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">

                        <li class="fs-lg--1 mt-2 font-poppins-medium text-black  red-asterisk-label">No of head defects
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input class=" " name="No of head defects" v-model="model.head_abnormality_defects"
                                     :rules="rules.checkDefect" type="number" @input="calcs"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg--1 font-poppins-medium text-black mt-2  red-asterisk-label">Percentage of head
                            abnormalities
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled  name="Percentage of head abnormalities" v-model="model.head_abnormality_per" :rules="rules.positiveOnly"></validated-input>
                </div>
            </div>
<!--
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg&#45;&#45;1 font-poppins-medium text-black mt-2 red-asterisk-label">Total
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input name="Total" v-model="model.head_abnormality_total" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div classs="col-lg-1">
                    <p class="pt-2">%</p>
                </div>
            </div>
-->

            <div class="row mt-6 ">
                <div class="col-lg-3">
                    <p class="text-primary fs-lg-1 font-poppins-semibold pt-3 red-asterisk-label">Mid Piece
                        Abnormalities</p>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select :url="midAbnormalityOptions" class="c-input-select"-->
<!--                                               name="Mid Piece Abnormalities"-->
<!--                                               v-model="model.mid_abnormality"-->
<!--                                               :rules="{required:true}"></validated-ajax-vue-select>-->
<!--                </div>-->
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg--1 mt-2 font-poppins-medium text-black  red-asterisk-label">No of mid piece
                            defects
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input class=" " name="No of mid piece defects" v-model="model.mid_abnormality_defects"
                                     :rules="rules.checkDefect" type="number"  @input="calcs"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg--1 font-poppins-medium text-black mt-2 red-asterisk-label">Percentage of mid piece
                            abnormalities
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled name="Percentage of mid piece abnormalities" v-model="model.mid_abnormality_per" :rules="rules.positiveOnly"></validated-input>
                </div>
            </div>
<!--            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg&#45;&#45;1 font-poppins-medium text-black mt-2 red-asterisk-label">Total
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input  name="Total" v-model="model.mid_abnormality_total" :rules="rules.positiveOnly"></validated-input>
                </div>
                <div classs="col-lg-1">
                    <p class="pt-2">%</p>
                </div>
            </div>-->

            <div class="row mt-6 ">
                <div class="col-lg-3">
                    <p class="text-primary pt-2 fs-lg-1 font-poppins-semibold pt-3  red-asterisk-label">Tail
                        Abnormalities</p>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select :url="tailAbnormalityOptions" class=" c-input-select "-->
<!--                                               name="Tail Abnormalities"-->
<!--                                               v-model="model.tail_abnormality"-->
<!--                                               :rules="{required:true}"></validated-ajax-vue-select>-->
<!--                </div>-->
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg--1 mt-2 font-poppins-medium text-black  red-asterisk-label">No of tail defects
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input class=" " name="No of tail defects" v-model="model.tail_abnormality_defects"
                                     type="number" :rules="rules.checkDefect"  @input="calcs"></validated-input>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg--1 font-poppins-medium text-black mt-2  red-asterisk-label">Percentage of tail
                            abnormalities
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled name="Percentage of tail abnormalities" v-model="model.tail_abnormality_per"
                                     :rules="rules.positiveOnly"></validated-input>
                </div>
            </div>
<!--            <div class="row">
                <div class="col-lg-3">
                    <ul class="ul">
                        <li class="fs-lg&#45;&#45;1 font-poppins-medium text-black mt-2 red-asterisk-label">Total
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <validated-input name="Total" v-model="model.tail_abnormality_total"
                                     :rules="rules.positiveOnly"></validated-input>
                </div>
                <div classs="col-lg-1">
                    <p class="pt-2">%</p>
                </div>
            </div>-->
            <div class="row mt-5">
                <div class="col-lg-3  text-right">
                    <p class="text-primary font-poppins-medium text-right  pt-2 red-asterisk-label">Total %</p>
                </div>
                <div class="col-lg-2 ">
                    <validated-input name="Total%" v-model="model.abnormality_total"
                                     :rules="rules.positiveOnly" disabled></validated-input>
                </div>
<!--                <div classs="col-lg-1">
                    <p class="pt-2">%</p>
                </div>-->

            </div>

            <div class="column fl-x-br pt-7">
                <div class="btn-group">
                    <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                    <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'SpermMorphology',
    data () {
        return {
            loading: false,
            URL: urls.sperm_morphology.addEdit,
            formKey: 0,
            model: {
                is_training: true,
                is_regular: '',
                test_date: '',
                production_date: '',
                bull: '',
                bull_name: '',
                breed: '',
                ejaculate_no: '',
                remarks: '',
                total_sperm_count: '',
                normal_sperm_count: '',
                live_sperm_count: '',
                dead_sperm_count: '',
                head_abnormality: '',
                head_abnormality_defects: '',
                head_abnormality_per: '0',
                head_abnormality_total: '',
                mid_abnormality: '',
                mid_abnormality_defects: '',
                mid_abnormality_per: '0',
                mid_abnormality_total: '',
                tail_abnormality: '',
                tail_abnormality_defects: '',
                tail_abnormality_per: '0',
                tail_abnormality_total: '',
                abnormality_total: '0'
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                checkDefect: {
                    required: true,
                    customValidator: (value) => {
                        const head = Number(value) || 0;
                        const mid = Number(this.model.mid_abnormality_defects) || 0;
                        const tail = Number(this.model.tail_abnormality_defects) || 0;
                        const total = Number(this.model.total_sperm_count) || 0;
                        if (head < 0) {
                            return 'Value cannot be negative';
                        }
                        if (head > total) {
                            return 'Value should not be greater than Total no of sperm counted';
                        }
                        if (head + mid + tail > total) {
                            return 'Sum of all defects should not be greater than Total no of sperm counted';
                        }
                        return true;
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
            table_details: [],
            bullOptions: [],
            ejaculationOptions: [],
            headAbnormalityOptions: masterURLs.master.abnormality.typeVueSelect + '?type=' + 'Head',
            midAbnormalityOptions: masterURLs.master.abnormality.typeVueSelect + '?type=' + 'Mid',
            tailAbnormalityOptions: masterURLs.master.abnormality.typeVueSelect + '?type=' + 'Tail',
            resultOptions: [
                { label: 'Pass', value: 'Pass' },
                { label: 'Fail', value: 'Fail' }
            ]

        };
    },
    methods: {
        calcs () {
            this.headPercengt();
            this.midPercengt();
            this.tailsPercengt();
        },
        total () {
            if (this.model.head_abnormality_per !== '0' && this.model.mid_abnormality_per !== '0' && this.model.tail_abnormality_per) {
                const percent = parseFloat(this.model.head_abnormality_per) + parseFloat(this.model.mid_abnormality_per) + parseFloat(this.model.tail_abnormality_per);
                if (isFinite(percent)) {
                    if (isNaN(percent)) {
                        this.model.abnormality_total = '0';
                    } else {
                        this.model.abnormality_total = percent;
                    }
                } else {
                    this.model.abnormality_total = '0';
                }
            }
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        headPercengt () {
            const percentage = (parseInt(this.model.head_abnormality_defects) / parseInt(this.model.total_sperm_count)) * 100;
            if (isFinite(percentage)) {
                if (isNaN(percentage)) {
                    this.model.head_abnormality_per = '0';
                } else {
                    this.model.head_abnormality_per = percentage.toFixed(2);
                    this.total();
                }
            } else {
                this.model.head_abnormality_per = '0';
            }
        },
        midPercengt () {
            const percentage = (parseInt(this.model.mid_abnormality_defects) / parseInt(this.model.total_sperm_count)) * 100;
            if (isFinite(percentage)) {
                if (isNaN(percentage)) {
                    this.model.mid_abnormality_per = '0';
                } else {
                    this.model.mid_abnormality_per = percentage.toFixed(2);
                    this.total();
                }
            } else {
                this.model.mid_abnormality_per = '0';
            }
        },
        tailsPercengt () {
            const percentage = (parseInt(this.model.tail_abnormality_defects) / parseInt(this.model.total_sperm_count)) * 100;
            if (isFinite(percentage)) {
                if (isNaN(percentage)) {
                    this.model.tail_abnormality_per = '0';
                } else {
                    this.model.tail_abnormality_per = percentage.toFixed(2);
                    this.total();
                }
            } else {
                this.model.tail_abnormality_per = '0';
            }
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }
            if (isNaN(num)) {
                return 'Enter a valid number(whole or decimal)';
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
            // const response = await axios.form(urls.sperm_morphology.collectionBulls, this.model);
            const response = await axios.form(urls.sperm_morphology.collectionBulls, {
                production_date: this.model.production_date,
                filter: 'morphology',
                is_training: this.model.is_training,
                is_regular: this.model.is_regular
            });
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
                filter: 'morphology'
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
                        is_training: true,
                        is_regular: '',
                        test_date: '',
                        production_date: '',
                        bull: '',
                        bull_name: '',
                        breed: '',
                        ejaculate_no: '',
                        remarks: '',
                        total_sperm_count: '',
                        normal_sperm_count: '',
                        live_sperm_count: '',
                        dead_sperm_count: '',
                        head_abnormality: '',
                        head_abnormality_defects: '',
                        head_abnormality_per: '0',
                        head_abnormality_total: '',
                        mid_abnormality: '',
                        mid_abnormality_defects: '',
                        mid_abnormality_per: '0',
                        mid_abnormality_total: '',
                        tail_abnormality: '',
                        tail_abnormality_defects: '',
                        tail_abnormality_per: '0',
                        tail_abnormality_total: '',
                        abnormality_total: '0'
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
    },
    watch: {
        'model.is_training': {
            handler: function (after, before) {
                // Changes detected. Do work...
                console.log(after, before);
                if (after) {
                    this.model.is_regular = false;
                }
                this.model.production_date = '';
                this.model.bull = '';
                this.model.bull_name = '';
                this.model.breed = '';
                this.model.ejaculate_no = '';
                this.ejaculationOptions = [];
            },
            deep: true
        },
        'model.is_regular': {
            handler: function (after, before) {
                // Changes detected. Do work...
                console.log(after, before);
                if (after) {
                    this.model.is_training = false;
                }
                this.model.production_date = '';
                this.model.bull = '';
                this.model.bull_name = '';
                this.model.breed = '';
                this.model.ejaculate_no = '';
                this.ejaculationOptions = [];
            },
            deep: true
        }
    }
};
</script>

<style scoped>

</style>

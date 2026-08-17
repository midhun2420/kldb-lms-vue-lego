<template>
    <div class="color-txt">
        <s-form @submit="addItem" :key="formKey">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-12">
                            <div class="row fl-x fl-j-sb ml-1">
                               <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Milk Feeding </h3>
                            <div>
                                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                            </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker field-required"
                                                   v-model="model.feeding_date" @input="loadDetails"
                                                   label="Date" :rules="rules.common"></validated-date-picker>
                        </div>
                        <div class="col-2">
                            <validated-input class="" v-model="model.remarks" label="Remarks"></validated-input>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-lg-3 ">
                            <p class="mb-0 fl-x-cc">4 liters of milk</p>
                            <p class="fl-x-cc fs-lg--1">(0<sup>th </sup>-45<sup>th </sup> day)</p>
                            <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">Shed
                                        Details</p>
                                </div>
                                <div class="h-415   max-h-60-vh of-a  thin-scrollbar">
                                    <p class="pl-4 pt-2" v-for="(item, i) in four_ltr_list" :key="i">{{ item }}</p>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2">Milk Required&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <div>
                                        <validated-input class="w113" v-model="model.milk_required_4_liters"
                                                         :rules="rules.checkValueFour" disabled
                                        ></validated-input>
                                        <div class="text-danger mb-1" v-if="milkValueError4">
                                            {{ milkValueError4Message }}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <!--                        <div class="fl-x mt-5 fl-x-cc">-->
                            <!--                        </div>-->
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Morning&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Morning 4 Liters"
                                                     v-model="model.morning_4_liters" @input="loadTotal" :disabled="four_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Noon =</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Noon 4 Liters" v-model="model.noon_4_liters" :disabled="four_count === 0"
                                                     @input="loadTotal" :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Evening&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Evening 4 Liters"
                                                     v-model="model.evening_4_liters" @input="loadTotal" :disabled="four_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-3 ">
                            <p class="mb-0 fl-x-cc">3 liters of milk</p>
                            <p class="fl-x-cc fs-lg--1">(46<sup>th </sup>-90<sup>th </sup> day)</p>
                            <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">Shed
                                        Details</p>
                                </div>
                                <div class="h-415   max-h-60-vh of-a  thin-scrollbar">
                                    <p class="pl-4 pt-2" v-for="(item, i) in three_ltr_list" :key="i">{{ item }}</p>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2">Milk Required&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <div>
                                        <validated-input class="w113" v-model="model.milk_required_3_liters"
                                                         disabled :rules="rules.checkValueThree"></validated-input>
                                        <div class="text-danger mb-1" v-if="milkValueError3">
                                            {{ milkValueError3Message }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                        <div class="fl-x mt-5 fl-x-cc">-->
                            <!--                        </div>-->
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Morning&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Morning 3 Liters"
                                                     v-model="model.morning_3_liters" @input="loadTotal" :disabled="three_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Noon =</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Noon 3 Liters" v-model="model.noon_3_liters" :disabled="three_count === 0"
                                                     @input="loadTotal" :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Evening&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Evening 3 Liters"
                                                     v-model="model.evening_3_liters" @input="loadTotal" :disabled="three_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 ">
                            <p class="mb-0 fl-x-cc">2 liters of milk</p>
                            <p class="fl-x-cc fs-lg--1">(91<sup>th </sup>-105<sup>th </sup> day)</p>
                            <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">Shed
                                        Details</p>
                                </div>
                                <div class="h-415   max-h-60-vh of-a  thin-scrollbar">
                                    <p class="pl-4 pt-2" v-for="(item, i) in two_ltr_list" :key="i">{{ item }}</p>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2">Milk Required&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <div>
                                        <validated-input class="w113" v-model="model.milk_required_2_liters"
                                                         disabled :rules="rules.checkValueTwo"></validated-input>
                                        <div class="text-danger mb-1" v-if="milkValueError2">
                                            {{ milkValueError2Message }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                        <div class="fl-x mt-5 fl-x-cc">-->
                            <!--                        </div>-->
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Morning&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Morning 2 Liters"
                                                     v-model="model.morning_2_liters" @input="loadTotal" :disabled="two_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Evening&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Evening 2 Liters"
                                                     v-model="model.evening_2_liters" @input="loadTotal" :disabled="two_count === 0"
                                                     :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 ">
                            <p class="mb-0 fl-x-cc">1 liters of milk</p>
                            <p class="fl-x-cc fs-lg--1">(106<sup>th </sup>-120<sup>th </sup> day)</p>
                            <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">Shed
                                        Details</p>
                                </div>
                                <div class="h-415   max-h-60-vh of-a  thin-scrollbar">
                                    <p class="pl-4 pt-2" v-for="(item, i) in one_ltr_list" :key="i">{{ item }}</p>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2">Milk Required&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <div>
                                        <validated-input class="w113" v-model="model.milk_required_1_liter"
                                                         disabled :rules="rules.checkValueOne"></validated-input>
                                        <div class="text-danger mb-1" v-if="milkValueError1">
                                            {{ milkValueError1Message }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                        <div class="fl-x mt-5 fl-x-cc">-->
                            <!--                        </div>-->
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Morning&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Morning 1 Liter" v-model="model.morning_1_liter" :disabled="one_count === 0"
                                                     @input="loadTotal" :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fl-x fl-j-e">
                                    <p class="mt-2 red-asterisk-label">Evening&nbsp;=&nbsp;</p>
                                </div>
                                <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                    <validated-input class="w-6r" name="Evening 1 Liter" v-model="model.evening_1_liter" :disabled="one_count === 0"
                                                     @input="loadTotal" :rules="rules.positiveOnly"></validated-input>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="fl-x-cc mt-6">
                        <div class="row w-25r">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 fl-x">
                                        <p class="mt-2">Total Milk Required&nbsp;=&nbsp;</p>
                                    </div>
                                    <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                        <validated-input class="w113" v-model="model.total_milk_required"
                                                         disabled></validated-input>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 fl-x fl-j-e">
                                        <p class="mt-2">Morning&nbsp;=&nbsp;</p>
                                    </div>
                                    <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                        <validated-input class="w-6r" v-model="model.total_morning"
                                                         disabled></validated-input>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 fl-x fl-j-e">
                                        <p class="mt-2">Noon&nbsp;=&nbsp;</p>
                                    </div>
                                    <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                        <validated-input class="w-6r" v-model="model.total_noon"
                                                         disabled></validated-input>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 fl-x fl-j-e">
                                        <p class="mt-2">Evening&nbsp;=&nbsp;</p>
                                    </div>
                                    <div class="col-6 fl-x fl-j-s ml-0 p-0">
                                        <validated-input class="w-6r" v-model="model.total_evening"
                                                         disabled></validated-input>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-12 fl-x-br mt-5">
                        <div class="btn-group">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
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
    name: 'MilkFeeding',
    data () {
        return {
            loading: false,
            milkValueError4: false,
            milkValueError4Message: '',
            milkValueError3: false,
            milkValueError3Message: '',
            milkValueError2: false,
            milkValueError2Message: '',
            milkValueError1: false,
            milkValueError1Message: '',
            URL: urls.milk_feeding.addEdit,
            model: {
                feeding_date: '',
                remarks: '',
                milk_required_4_liters: 0,
                morning_4_liters: 0,
                noon_4_liters: 0,
                evening_4_liters: 0,
                milk_required_3_liters: 0,
                morning_3_liters: 0,
                noon_3_liters: 0,
                evening_3_liters: 0,
                milk_required_2_liters: 0,
                morning_2_liters: 0,
                evening_2_liters: 0,
                milk_required_1_liter: 0,
                morning_1_liter: 0,
                evening_1_liter: 0,
                total_milk_required: 0,
                total_morning: 0,
                total_noon: 0,
                total_evening: 0
            },
            formKey: 0,
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                checkValueFour: {
                    customValidator: (value) => {
                        return this.checkMilkValueFour(value);
                    }
                },
                checkValueThree: {
                    customValidator: (value) => {
                        return this.checkMilkValueThree(value);
                    }
                },
                checkValueTwo: {
                    customValidator: (value) => {
                        return this.checkMilkValueTwo(value);
                    }
                },
                checkValueOne: {
                    customValidator: (value) => {
                        return this.checkMilkValueOne(value);
                    }
                }
            },
            four_ltr_list: '',
            three_ltr_list: '',
            two_ltr_list: '',
            one_ltr_list: '',
            four_count: 0,
            three_count: 0,
            two_count: 0,
            one_count: 0
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        avoidNegetive (no) {
            const num = no;
            // console.log(this.four_count);
            if (num < 0) {
                return 'Please enter a valid number';
            }
            if (isNaN(num)) {
                return 'Enter a valid number(whole or decimal)';
            }
            return true;
        },
        checkMilkValueFour (no) {
            if (this.four_count === 0 && Number(no) > 0) {
                return 'Milk Required should be 0';
            }
            if (!no && this.four_count !== 0) {
                return 'Milk required should have value';
            }
            return true;
            // const num = parseInt(no, 10);
            // const num = parseFloat(no, 10);
            // console.log('Four Count -', this.four_count);
            // console.log('Milk 4 -', num);
            // const input = parseInt(this.four_count, 10);
            // this.milkValueError4 = false;
            // if (num === input) {
            //     console.log('num === input');
            //     return true;
            // } else {
            //     this.milkValueError4 = true;
            //     console.log('Milk Required should be', this.four_count);
            //     const message = 'Milk Required should be ' + this.four_count;
            //     this.milkValueError4Message = message;
            //     return '';
            // }
        },
        checkMilkValueThree (no) {
            if (this.three_count === 0 && Number(no) > 0) {
                return 'Milk Required should be 0';
            }
            console.log('Three Count -', this.three_count);
            if (!no && this.three_count !== 0) {
                return 'Milk required should have value';
            }
            return true;
            // const num = parseInt(no, 10);
            // const num = parseFloat(no, 10);
            // console.log('Milk 3 -', num);
            // this.milkValueError3 = false;
            // if (num === parseInt(this.three_count, 10)) {
            //     return true;
            // } else {
            //     this.milkValueError3 = true;
            //     const message = 'Milk Required should be ' + this.three_count;
            //     this.milkValueError3Message = message;
            //     return '';
            // }
        },
        checkMilkValueTwo (no) {
            if (this.two_count === 0 && Number(no) > 0) {
                return 'Milk Required should be 0';
            }
            if (!no && this.two_count !== 0) {
                return 'Milk required should have value';
            }
            return true;
            // const num = parseInt(no, 10);
            // const num = parseFloat(no, 10);
            // console.log('Two Count -', this.two_count);
            // console.log('Milk 2 -', num);
            // this.milkValueError2 = false;
            // if (num === parseInt(this.two_count, 10)) {
            //     return true;
            // } else {
            //     this.milkValueError2 = true;
            //     const message = 'Milk Required should be ' + this.two_count;
            //     this.milkValueError2Message = message;
            //     return '';
            // }
        },
        checkMilkValueOne (no) {
            if (this.one_count === 0 && Number(no) > 0) {
                return 'Milk Required should be 0';
            }
            if (!no && this.one_count !== 0) {
                return 'Milk required should have value';
            }
            return true;

            // const num = parseInt(no, 10);
            // const num = parseFloat(no, 10);
            // console.log('One Count -', this.one_count);
            // console.log('Milk 1 -', num);
            // this.milkValueError1 = false;
            // if (num === parseInt(this.one_count, 10)) {
            //     return true;
            // } else {
            //     this.milkValueError1 = true;
            //     const message = 'Milk Required should be ' + this.one_count;
            //     this.milkValueError1Message = message;
            //     return '';
            // }
        },
        validationDate (checkDate) {
            // const checkDate = this.model.date_of_transfer;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
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
        async loadDetails () {
            this.four_ltr_list = [];
            this.four_count = 0;
            this.three_ltr_list = [];
            this.three_count = 0;
            this.two_ltr_list = [];
            this.two_count = 0;
            this.one_ltr_list = [];
            this.one_count = 0;
            this.model.morning_4_liters = 0;
            this.model.noon_4_liters = 0;
            this.model.evening_4_liters = 0;
            this.model.morning_3_liters = 0;
            this.model.noon_3_liters = 0;
            this.model.evening_3_liters = 0;
            this.model.morning_2_liters = 0;
            this.model.evening_2_liters = 0;
            this.model.morning_1_liter = 0;
            this.model.evening_1_liter = 0;
            this.model.milk_required_1_liter = 0;
            this.model.milk_required_2_liters = 0;
            this.model.milk_required_3_liters = 0;
            this.model.milk_required_4_liters = 0;
            this.model.total_evening = 0;
            this.model.total_noon = 0;
            this.model.total_morning = 0;
            this.model.total_milk_required = 0;
            const response = await axios.get(urls.milk_feeding.animalDetail + '?feeding_date=' + this.model.feeding_date);
            const data = response.data.data;
            this.four_ltr_list = data.four_ltr_list;
            this.four_count = 4 * this.four_ltr_list.length;
            this.three_ltr_list = data.three_ltr_list;
            this.three_count = 3 * this.three_ltr_list.length;
            this.two_ltr_list = data.two_ltr_list;
            this.two_count = 2 * this.two_ltr_list.length;
            this.one_ltr_list = data.one_ltr_list;
            this.one_count = this.one_ltr_list.length;
        },
        async loadTotal () {
            const response = await axios.form(urls.milk_feeding.findTotal, this.model);
            const data = response.data.data;
            this.model.milk_required_4_liters = data.milk_required_4_liters;
            this.model.milk_required_3_liters = data.milk_required_3_liters;
            this.model.milk_required_2_liters = data.milk_required_2_liters;
            this.model.milk_required_1_liter = data.milk_required_1_liter;
            this.model.total_milk_required = data.total_milk_required;
            this.model.total_morning = data.total_morning;
            this.model.total_noon = data.total_noon;
            this.model.total_evening = data.total_evening;
        },
        async addItem () {
            try {
                this.loading = true;
                this.milkValueError1 = false;
                this.milkValueError2 = false;
                this.milkValueError3 = false;
                this.milkValueError4 = false;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.model = {
                        feeding_date: '',
                        remarks: '',
                        milk_required_4_liters: 0,
                        morning_4_liters: 0,
                        noon_4_liters: 0,
                        evening_4_liters: 0,
                        milk_required_3_liters: 0,
                        morning_3_liters: 0,
                        noon_3_liters: 0,
                        evening_3_liters: 0,
                        milk_required_2_liters: 0,
                        morning_2_liters: 0,
                        evening_2_liters: 0,
                        milk_required_1_liter: 0,
                        morning_1_liter: 0,
                        evening_1_liter: 0,
                        total_milk_required: 0,
                        total_morning: 0,
                        total_noon: 0,
                        total_evening: 0
                    };
                    this.four_ltr_list = [];
                    this.three_ltr_list = [];
                    this.two_ltr_list = [];
                    this.one_ltr_list = [];
                    this.formKey++;
                    // await this.$router.push({ path: '/general/' });
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
        }
    }
};
</script>

<style scoped>
.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f4f4f4;
}

.h-415 {
    height: 415px;
}

.w113 {
    width: 113px;
}

.w-6r {
    width: 6rem !important;
}
</style>

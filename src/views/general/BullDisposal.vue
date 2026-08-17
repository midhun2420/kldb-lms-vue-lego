<template>
    <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Disposal</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToList">Back</btn>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-1">
                        <validated-checkbox v-model="model.is_bull" label="Bulls" class="text-black"></validated-checkbox>
                    </div>
                    <div class="col-lg-1">
                        <validated-checkbox v-model="model.is_cow" label="Cow" class="text-black"></validated-checkbox>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-select :options="regnoOptions" label="Reg No." v-model="model.reg_no" @input="loadDetails" class="text-black field-required" :rules="{required:true}"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY"  label="Date of Disposal" v-model="model.disposal_date" class="text-black c-input-datepicker  field-required" :rules="rules.compare" ></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
<!--                        <validated-input label="Reason for culling" v-model="CullingReason" class="text-black"  ></validated-input>-->
                        <validated-select :options=cullingReasonOptions label="Reason for culling" v-model="model.culling_reason" class="text-black field-required" :rules="{required:true}"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Book Value" v-model="model.book_value" class="text-black" :rules="rules.positiveOnly" ></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Live Body Weight" v-model="model.live_body_weight" type="number" class="text-black" :rules="rules.positiveOnly"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Meat Value" v-model="model.meat_value" class="text-black" type="number" :rules="rules.positiveOnly" ></validated-input>
                    </div>
                    <div class="col-lg-3">
<!--                        <validated-input label="Mode of Disposal" v-model="model.disposal_mode" class="text-black field-required" :rules="{required:true}" ></validated-input>-->
                        <validated-select :options=disposalModeOptions label="Mode of Disposal" v-model="model.disposal_mode" class="text-black field-required" :rules="{required:true}"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Approval No." v-model="model.approval_no" class="text-black field-required" :rules="{required:true}"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="To Whom" v-model="model.to_whom" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4" v-if="model.is_bull || model.is_cow">
                <custom-single-column-table class="ml-lg-3 mt-7">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2 text-right"
                            v-if="model.is_bull">
                            <li>Date of Proposal<span class="ml-1">:</span>{{proposal_date}}</li>
                            <li><span>Breed</span><span class="ml-1">:</span>{{breed}}</li>
                            <li>Date of Birth<span class="ml-1">:</span>{{dob}}</li>
                            <li><span>No. Of Attempts / Collection</span><span class="ml-1">:</span>{{no_of_attempts}}</li>
                            <li><span>Dam's Lactation Yield</span><span class="ml-1">:</span>{{lac_yield}}</li>
                            <li><span>No of Doses produced</span> <span class="ml-1">:</span></li>
                            <li class="ml-7" v-for="(item, i) in doses_produced"  :key="i">
                                <span>{{ item.name }}</span> <span class="ml-1">:</span>{{item.dose}}
                            </li>
                        </ul>
                        <ul class="list-unstyled list-items ml-2 text-right"
                            v-else-if="model.is_cow">
                            <li>Date of Proposal<span class="ml-1">:</span>{{proposal_date}}</li>
                            <li><span>Breed</span><span class="ml-1">:</span>{{breed}}</li>
                            <li>Date of Birth<span class="ml-1">:</span>{{dob}}</li>
                            <li><span>No of Caving</span><span class="ml-1">:</span>{{calving}}</li>
                            <li><span>Last AI date</span><span class="ml-1">:</span>{{last_ai_date}}</li>
                            <li><span>Pregnancy Status</span><span class="ml-1">:</span>{{pregnancy_status}}</li>
                            <li><span>Cow Type</span> <span class="ml-1">:</span>{{cow_type}}</li>
                        </ul>
                    </template>
                </custom-single-column-table>
            </div>
        </div>
        <div class="row mt-lg-6">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToList" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>

    </s-form>
</template>

<script>
import CustomSingleColumnTable from '../../components/ui/CustomSingleColumTable';
import urls from '../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'BullDisposal',
    components: { CustomSingleColumnTable },
    data () {
        return {
            loading: false,
            URL: urls.disposal.addEdit,
            getBookValueURL: masterURLs.master.bookValue.getBookValue,
            cullingReasonSelectURL: masterURLs.master.reasonForCulling.vueSelect,
            getMeatValueURL: masterURLs.master.bookValue.getMeatValue,
            disposalModeSelectURL: masterURLs.master.modeOfDisposal.vueSelect,
            formKey: 0,
            model: {
                is_bull: false,
                is_cow: false,
                reg_no: '',
                disposal_date: '',
                // proposal_date: '',
                culling_reason: '',
                book_value: '',
                live_body_weight: '',
                meat_value: '',
                to_whom: '',
                approval_no: '',
                disposal_mode: '',
                remarks: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                positiveOnly: {
                    // required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                compare: {
                    required: true,
                    customValidator: (value) => {
                        return this.CompareDate(value);
                    }
                }
            },
            proposal_date: '',
            dob: '',
            breed: '',
            renumber: '',
            no_of_attempts: '',
            lac_yield: '',
            doses_produced: '',
            calving: '',
            last_ai_date: '',
            pregnancy_status: '',
            cow_type: '',
            regnoOptions: [],
            cullingReasonOptions: [],
            disposalModeOptions: [],
            currentDate: new Date()

        };
    },
    computed: {
        CullingReason: {
            get () {
                return this.model.culling_reason.toUpperCase();
            },
            set (value) {
                this.model.culling_reason = value.toUpperCase();
            }
        }
    },
    mounted () {
        this.cullingReasonSelectView();
        this.disposalModeSelectView();
    },
    methods: {
        currentDateGenerate () {
            const day = String(this.currentDate.getDate()).padStart(2, '0');
            const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
            const year = this.currentDate.getFullYear();

            this.model.disposal_date = `${day}-${month}-${year}`;
            console.log('date', this.model.disposal_date);
        },
        async loadAnimal () {
            this.model.reg_no = '';
            this.dob = '';
            this.breed = '';
            this.renumber = '';
            this.no_of_attempts = '';
            this.calving = '';
            this.last_ai_date = '';
            this.pregnancy_status = '';
            this.location_no = '';
            this.lac_yield = '';
            this.doses_produced = '';
            const response = await axios.form(urls.disposal.loadAnimal, this.model);
            if (response.data) {
                this.regnoOptions = response.data.data;
            }
        },
        async cullingReasonSelectView () {
            console.log('inside culling reason select-----------------');
            try {
                console.log('---culling reason----------------inside------------');
                this.loading = true;
                console.log('here------------------');
                const response = await axios.get(this.cullingReasonSelectURL);
                console.log('response---------------------', response);
                const result = response.data;
                this.cullingReasonOptions = response.data.data;
                console.log('culling reason-----------', this.cullingReasonOptions);
                console.log('-----result-----------', result);
                if (result.success) {
                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
                } else {
                    const errors = response.data.message;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
                            this.$notify('Warning', errorMessage, { type: 'warning' });
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
        async disposalModeSelectView () {
            console.log('inside culling reason select-----------------');
            try {
                console.log('---culling reason----------------inside------------');
                this.loading = true;
                console.log('here------------------');
                const response = await axios.get(this.disposalModeSelectURL);
                console.log('response---------------------', response);
                const result = response.data;
                this.disposalModeOptions = response.data.data;
                console.log('culling reason-----------', this.disposalModeOptions);
                console.log('-----result-----------', result);
                if (result.success) {
                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
                } else {
                    const errors = response.data.message;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
                            this.$notify('Warning', errorMessage, { type: 'warning' });
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
        CompareDate () {
            const checkDate = this.model.disposal_date;
            const prodDate = this.proposal_date;
            const checkDateParts = checkDate.split('-');
            // if (checkDateParts.length !== 3) {
            //     return 'Please enter a valid Disposal Date in the format DD-MM-YYYY.';
            // }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const prodDateParts = prodDate.split('-');
            // if (prodDateParts.length !== 3) {
            //     return 'Please enter a valid Proposal Date in the format DD-MM-YYYY.';
            // }
            const prodDateDay = parseInt(prodDateParts[0], 10);
            const prodDateMonth = parseInt(prodDateParts[1], 10);
            const prodDateYear = parseInt(prodDateParts[2], 10);

            const prodDateObj = new Date(prodDateYear, prodDateMonth - 1, prodDateDay);
            if (checkDateObj < prodDateObj) {
                return 'Disposal date should be greater than proposal date';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj < currentDate) {
                return 'Please enter the date from today onwards.';
            }
            return true;
        },
        async loadDetails () {
            this.currentDateGenerate();
            this.model.book_value = '';
            this.model.meat_value = '';
            this.model.live_body_weight = '';

            const responseBookValue = await axios.get(this.getBookValueURL, {
                params: {
                    regno: this.model.reg_no,
                    type: this.model.is_bull ? 'Bull' : 'Cow'
                }
            });

            this.model.book_value = responseBookValue.data.data.book_value;
            console.log('book value----', this.model.book_value);

            const responseMeatValue = await axios.get(this.getMeatValueURL, {
                params: {
                    regno: this.model.reg_no,
                    type: this.model.is_bull ? 'Bull' : 'Cow'
                }
            });
            this.model.meat_value = responseMeatValue.data.data.meat_value;
            const response = await axios.form(urls.disposal.animalDetail, this.model);
            if (response.data) {
                this.proposal_date = response.data.data.proposal_date;
                this.model.culling_reason = response.data.data.culling_reason;
                // this.model.book_value = response.data.data.book_value;
                // this.model.live_body_weight = response.data.data.live_body_weight;
                // this.model.meat_value = response.data.data.meat_value;
                this.model.disposal_mode = response.data.data.disposal_mode;

                this.dob = response.data.data.dob || '';
                this.breed = response.data.data.breed || '';
                this.renumber = response.data.data.renumber || '';
                this.no_of_attempts = response.data.data.collection || '';
                this.calving = response.data.data.calving || '';
                this.last_ai_date = response.data.data.last_ai_date || '';
                this.pregnancy_status = response.data.data.pregnancy_status || '';
                this.location_no = response.data.data.location_no || '';
                this.lac_yield = response.data.data.dam_location_yield || '';
                this.cow_type = response.data.data.cow_type || '';
                this.doses_produced = response.data.data.doses_produced || '';
                this.model.live_body_weight = response.data.data.live_body_weight || '';
            } else {
                this.loading = false;
                // const errors = response.data.message;
                // this.$notify('Warning', errors, { type: 'warning' });
            }
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
                    this.model = {
                        reg_no: '',
                        disposal_date: '',
                        culling_reason: '',
                        disposal_mode: '',
                        book_value: '',
                        meat_value: '',
                        live_body_weight: '',
                        approval_no: '',
                        to_whom: '',
                        remarks: ''
                    };
                    this.formKey++;
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
                            this.$notify('Warning', errorMessage, { type: 'warning' });
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
        async calculateMeatValue (weight) {
            if (!weight || !this.model.reg_no) {
                this.model.meat_value = '';
                return;
            }

            try {
                const response = await axios.get(this.getMeatValueURL, {
                    params: {
                        regno: this.model.reg_no,
                        type: this.model.is_bull ? 'Bull' : 'Cow',
                        live_body_weight: weight
                    }
                });

                this.model.meat_value = response.data.data.meat_value;
            } catch (error) {
                console.error('Error calculating meat value:', error);
                this.model.meat_value = '';
            }
        },
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        BackToList () {
            this.$router.push({ path: '/animal-disposal-list/' });
        }
    },
    watch: {
        'model.live_body_weight' (newWeight) {
            this.calculateMeatValue(newWeight);
        },
        'model.is_bull': {
            handler: function (after, before) {
                // Changes detected. Do work...
                console.log(after, before);
                if (after === true) {
                    this.model.is_cow = false;
                }
                if (after === false) {
                    this.model.is_cow = true;
                }
                this.loadAnimal();
            },
            deep: true
        },
        'model.is_cow': {
            handler: function (after, before) {
                // Changes detected. Do work...
                console.log(after, before);
                if (after === true) {
                    this.model.is_bull = false;
                }
                if (after === false) {
                    this.model.is_bull = true;
                }
                this.loadAnimal();
            },
            deep: true
        }
    }
};
</script>

<style scoped lang="scss">
    .list-items, .list-contain ul {
        /*li:not(:nth-child(1)) {*/
        li {
            margin-top: var(--spacer-4);
            font-size: 0.9rem;
            font-family: poppins-medium;
            color: var(--text-3);

            > span {
                display: inline-block;
                max-width: 15rem;
            }

            display: flex;
            align-items: flex-start;
        }
    }
</style>

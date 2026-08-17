<template>
    <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Embryo Transfer</h2>
        <div>
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-1">
                        <validated-checkbox class="mu-p" v-model="model.is_farm" label="Farm" @input="setTypeFarm"></validated-checkbox>
                    </div>
                    <div class="col-lg-1">
                        <validated-checkbox class="mu-p" label="Farmers" v-model="model.is_farmers" @input="setTypeFarmers"></validated-checkbox>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <validated-ajax-vue-select
                            :url="embryoNoURL"
                            class="c-input-select text-black field-required" label="Embryo No" v-model="model.embryo_no" @input="setDetails" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black field-required" label="Date of Transfer" v-model="model.date_of_transfer" :rules="rules.common"  @input="loadCowOptions"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <validated-vue-select v-if="model.is_farm === true"
                            :options="cowOptions" class="c-input-select text-black field-required" label="Recipient No" v-model="model.recipient_no" @input="loadDetails" :rules="{required:true}"></validated-vue-select>
                        <validated-input v-else class="text-black field-required" label="Recipient No" v-model="model.recipient_no_outside" :rules="{required:true}"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-ajax-vue-select v-if="model.is_farm" :url="breedOptionURL" class="text-black c-input-select" label="Recipient Breed" v-model="model.recipient_breed" disabled></validated-ajax-vue-select>
                        <validated-ajax-vue-select v-else :url="breedOptionURL" class="text-black" label="Recipient Breed" v-model="model.recipient_breed"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" v-if="model.is_farm" class="c-input-datepicker text-black" label="Recipient DOB" v-model="model.recipient_dob" disabled></validated-date-picker>
                        <validated-date-picker format="DD-MM-YYYY" v-else class="c-input-datepicker text-black" label="Recipient DOB" v-model="model.recipient_dob" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <validated-vue-select v-if="model.is_farm"
                            :options="cowHeiferOptions"
                            class="c-input-select text-black" label="Cow / Heifer" v-model="model.cow_heifer" disabled></validated-vue-select>
                         <validated-vue-select v-else
                            :options="cowHeiferOptions"
                            class="c-input-select text-black" label="Cow / Heifer" v-model="model.cow_heifer"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="inducedNaturalOptions"
                            class="c-input-select text-black" label="Induced / Natural" v-model="model.induced_natural"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="drugUsedOptions"
                            class="c-input-select text-black" label="Drug used" v-model="model.drug_used"></validated-vue-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="clSideOptions"
                            class="c-input-select text-black" label="CL side" v-model="model.cl_side"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="clQualityOptions"
                            class="c-input-select text-black" label="CL quality" v-model="model.cl_quality"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="transferQualityOptions"
                            class="c-input-select text-black" label="Transfer quality" v-model="model.transfer_quality"></validated-vue-select>
                    </div>
                </div>
                <div class="row" v-if="model.is_farmers">
                    <div class="col-12 mt-3 mb-4">
                        <h6 class="font-poppins-semibold text-primary">Farmer Details</h6>
                    </div>
                    <div class="col-lg-3">
                        <validated-input class="text-black" label="Farmer's Name" v-model="model.farmer_name"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input class="text-black" label="Farmer's Address" v-model="model.farmer_address"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input class="text-black" label="Phone No" v-model="model.farmer_phone_no"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input class="text-black" label="Pin Code" v-model="model.farmer_pincode"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <custom-single-column-table class="ml-lg-5 mr-4">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2">
                            <li><span>Sire No :</span><span>{{ details.sire_no }}</span></li>
                            <li>Sire Name : <span></span>{{details.sire_name}}</li>
                            <li><span>Sire Breed : </span><span>{{details.sire_breed}}</span></li>
                            <li><span>Dam No : </span><span>{{ details.dam_no }}</span></li>
                            <li><span>Dam Name : </span><span>{{ details.dam_name }}</span></li>
                            <li><span>Dam Breed : </span> <span>{{ details.dam_breed }}</span></li>
                            <li><span>Grade of Embryo : </span><span>{{ details.embryo_grade }}</span></li>
                        </ul>
                    </template>
                </custom-single-column-table>
            </div>
        </div>
        <div class="row mt-lg-7">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4 mr-3"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
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
    name: 'EmbryoTransferPage',
    components: { CustomSingleColumnTable },
    data () {
        return {
            loading: false,
            loadingData: false,
            URL: urls.embryoTransfer.addEdit,
            recipientNoOptionURL: urls.cows.dateofBirth,
            typeFarm: true,
            typeFarmers: false,
            cowOptions: [],
            embryoNoURL: urls.embryoStock.vueSelect,
            breedOptionURL: masterURLs.master.breed.vueSelect,
            clSideOptions: [
                { label: 'Left', value: 'Left' },
                { label: 'Right', value: 'Right' }
            ],
            drugUsedOptions: [
                { label: 'Prostaglandin', value: 'Prostaglandin' },
                { label: 'Progesterone', value: 'Progesterone' },
                { label: 'GnRH', value: 'GnRH' },
                { label: 'Estrogen', value: 'Estrogen' },
                { label: 'No drug used', value: 'No drug used' }
            ],

            cowHeiferOptions: [
                { label: 'Cow', value: 'Cow' },
                { label: 'Heifer', value: 'Heifer' }
            ],
            inducedNaturalOptions: [
                { label: 'Induced', value: 'Induced' },
                { label: 'Natural', value: 'Natural' }
            ],
            clQualityOptions: [
                { label: 'Grade I', value: 'Grade I' },
                { label: 'Grade II', value: 'Grade II' },
                { label: 'Grade III', value: 'Grade III' }
            ],
            transferQualityOptions: [
                { label: 'Grade I', value: 'Grade I' },
                { label: 'Grade II', value: 'Grade II' },
                { label: 'Grade III', value: 'Grade III' }
            ],
            formKey: 0,
            model: {
                is_farm: true,
                is_farmers: '',
                embryo_no: '',
                date_of_transfer: '',
                recipient_no: '',
                recipient_no_outside: '',
                recipient_breed: '',
                recipient_dob: '',
                cow_heifer: '',
                induced_natural: '',
                drug_used: '',
                cl_side: '',
                cl_quality: '',
                transfer_quality: '',
                farmer_name: '',
                farmer_address: '',
                farmer_phone_no: '',
                farmer_pincode: ''
            },
            details: {
                dam_name: '',
                dam_no: '',
                dam_breed: '',
                sire_no: '',
                sire_name: '',
                sire_breed: '',
                embryo_grade: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
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
        setTypeFarm () {
            this.model.is_farm = true;
            this.model.is_farmers = false;
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadCowOptions () {
            const params = {
                transfer_date: this.model.date_of_transfer
            };
            this.model.recipient_no = '';
            this.model.recipient_breed = '';
            this.model.recipient_dob = '';
            this.model.cow_heifer = '';
            this.model.recipient_no_outside = '';
            const response = await axios.get(urls.cows.dateofBirth, { params });
            this.cowOptions = response.data.data;
        },
        async loadDetails () {
            this.model.recipient_breed = '';
            this.model.recipient_dob = '';
            this.model.cow_heifer = '';
            const response = await axios.form(urls.cows.details, { id: this.model.recipient_no });
            const data = response.data.data;
            this.model.recipient_dob = data.dob;
            this.model.recipient_breed = data.breed.id;
            this.model.cow_heifer = data.cow_type;
        },
        async setDetails () {
            this.loadingData = true;
            this.details.dam_name = '';
            this.details.dam_no = '';
            this.details.dam_breed = '';
            this.details.sire_no = '';
            this.details.sire_name = '';
            this.details.sire_breed = '';
            this.details.embryo_grade = '';
            const response = await axios.form(urls.embryoStock.embryoNoDetails, { id: this.model.embryo_no });
            this.data = response.data.data;
            this.details.dam_name = this.data.dam_name;
            this.details.dam_no = this.data.dam_no;
            this.details.dam_breed = this.data.dam_breed;
            this.details.sire_no = this.data.sire_no;
            this.details.sire_name = this.data.sire_name;
            this.details.sire_breed = this.data.sire_breed;
            this.details.embryo_grade = this.data.embryo_grade;
            this.loadingData = false;
        },
        setTypeFarmers () {
            this.model.is_farmers = true;
            this.model.is_farm = false;
            this.model.recipient_breed = '';
            this.model.recipient_dob = '';
            this.model.recipient_no = '';
            this.model.cow_heifer = '';
        },
        validationDate (checkDate) {
            // const checkDate = this.model.date_of_transfer;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
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
        BackToHome () {
            this.$router.push({ path: '/embryo-transfer/' });
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/embryo-transfer/' });
                    this.model = {
                        is_farm: true,
                        is_farmers: '',
                        embryo_no: '',
                        date_of_transfer: '',
                        recipient_no: '',
                        recipient_no_outside: '',
                        recipient_breed: '',
                        recipient_dob: '',
                        cow_heifer: '',
                        induced_natural: '',
                        drug_used: '',
                        cl_side: '',
                        cl_quality: '',
                        transfer_quality: '',
                        farmer_name: '',
                        farmer_address: '',
                        farmer_phone_no: '',
                        farmer_pincode: ''
                    };
                    this.details = {
                        dam_name: '',
                        dam_no: '',
                        dam_breed: '',
                        sire_no: '',
                        sire_name: '',
                        sire_breed: '',
                        embryo_grade: ''
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
span{
padding-right: 2px;
}

</style>

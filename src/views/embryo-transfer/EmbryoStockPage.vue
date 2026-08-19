<template>
    <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Embryo Stock</h2>
        <div>
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-input class="text-black field-required" label="Embryo No" v-model="model.embryo_no" :rules="{required:true}"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-ajax-vue-select class="text-black c-input-select field-required"
                                           :url="embriyoBreedOptionURL"
                                           label="Embryo Breed" v-model="model.embryo_breed" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-select
                    :options="embryotypeOptions"
                    class="text-black c-input-select field-required" label="Embryo Type" v-model="model.embryo_type" :rules="{required:true}"></validated-select>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-3 mb-2">
                <h6 class="font-poppins-semibold text-primary">Dam Details</h6>
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black field-required" label="Dam No"  v-model="model.dam_no" @input="getDamno" :disabled="damDisabled" :rules="{required:true}"></validated-input>
<!--                <validated-ajax-vue-select class="text-black field-required c-input-select" label="Dam No"-->
<!--                                           :url="cowOptionURL"-->
<!--                                           v-model="model.dam_no" :rules="{required:true}" @input="loadDetailsDam"></validated-ajax-vue-select>-->
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black " label="Dam Name" v-model="model.dam_name" :disabled="damDisabled" ></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    class="text-black" label="Dam Breed" v-model="model.dam_breed" :url="breedOptionsURL" :disabled="damDisabled" ></validated-ajax-vue-select>
<!--                <validated-input class="text-black" label="Dam Breed"  v-model="model.dam_breed"></validated-input>-->
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black" label="Dam's Yield"  v-model="model.dam_yield" :disabled="damDisabled" ></validated-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-3 mb-2">
                <h6 class="font-poppins-semibold text-primary">Sire Details</h6>
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black field-required" label="Sire No"  v-model="model.sire_no"  @input="getSireno" :disabled="sireDisabled" :rules="{required:true}"></validated-input>
<!--                <validated-ajax-vue-select class="text-black field-required c-input-select"-->
<!--                                           :url="bullOptionURL"-->
<!--                                           label="Sire No" v-model="model.sire_no" :rules="{required:true}" @input="loadDetailsSire"></validated-ajax-vue-select>-->
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black " label="Sire Name"  v-model="model.sire_name" :disabled="sireDisabled" ></validated-input>
            </div>
            <div class="col-lg-2">
<!--                <validated-input class="text-black" label="Sire Breed"  v-model="model.sire_breed"></validated-input>-->
                <validated-ajax-vue-select
                    class="text-black" label="Sire Breed" v-model="model.sire_breed" :url="breedOptionsURL" :disabled="sireDisabled" ></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black" label="Sire Daughter Yield"  v-model="model.sire_yield" :disabled="sireDisabled" ></validated-input>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-input class="text-black" label="Embryo Grade" v-model="model.embryo_grade"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input class="text-black" label="Container No" v-model="model.container_no"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    class="text-black" label="Position" v-model="model.position" :url="positionOptionsURL"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY"  class="c-input-datepicker text-black" label="Date of Transfer" v-model="model.production_date"></validated-date-picker>
            </div>
        </div>
        <div class="row mt-lg-4">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4 mr-3"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome"  design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
    </s-form>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';

export default {

    name: 'EmbryoStockPage',
    data () {
        return {
            embriyoBreedOptionURL: masterURLs.master.breed.vueSelect,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            positionOptionsURL: masterURLs.master.embryoStockPosition.vueSelect,
            cowOptionURL: urls.cows.vueSelect + '?no_cow_type=Young Female',
            bullOptionURL: urls.bulls.vueSelect + '?status=Regularized',
            URL: urls.embryoStock.addEdit,
            damDetailsURL: urls.embryoStock.damDetails,
            sireDetailsURL: urls.embryoStock.sireDetails,
            embryotypeOptions: [
                { label: 'Imported', value: 'Imported' },
                { label: 'MOET', value: 'MOET' },
                { label: 'IVF', value: 'IVF' }
            ],
            formKey: 0,
            loading: false,
            damDisabled: false,
            sireDisabled: false,
            model: {
                cow: '',
                bull: '',
                embryo_no: '',
                embryo_breed: '',
                embryo_type: '',
                dam_no: '',
                dam_name: '',
                dam_breed: '',
                dam_yield: '',
                sire_no: '',
                sire_name: '',
                sire_breed: '',
                sire_yield: '',
                embryo_grade: '',
                container_no: '',
                position: '',
                production_date: ''

            }
        };
    },
    methods: {
        async getDamno () {
            const response = await axios.form(this.damDetailsURL, { dam_no: this.model.dam_no });
            const data = response.data.data;
            if (response.data.success) {
                this.model.dam_name = data.dam_name || '';
                this.model.dam_breed = data.dam_breed || '';
                this.model.dam_yield = data.damlacyield || '';
                this.damDisabled = true;
            } else {
                this.model.dam_name = '';
                this.model.dam_breed = '';
                this.model.dam_yield = '';
                this.damDisabled = false;
                // const errorMessage = response.data.message;
                // this.$notify(errorMessage, 'Warning', { type: 'warning' });
            }
        },
        async getSireno () {
            const response = await axios.form(this.sireDetailsURL, { sire_no: this.model.sire_no });
            const data = response.data.data;
            if (response.data.success) {
                this.model.sire_name = data.sire_name || '';
                this.model.sire_breed = data.sire_breed || '';
                this.model.sire_yield = data.damlacyield || '';
                this.sireDisabled = true;
            } else {
                this.model.sire_name = '';
                this.model.sire_breed = '';
                this.model.sire_yield = '';
                this.sireDisabled = false;
                // const errorMessage = response.data.message;
                // this.$notify(errorMessage, 'Warning', { type: 'warning' });
            }
        },
        async loadDetailsDam () {
            const response = await axios.form(urls.cows.details, { id: this.model.dam_no });
            const data = response.data.data;
            this.model.dam_name = data.cowname;
            this.model.dam_breed = data.breed.id;
            this.model.dam_yield = data.damlacyield;
            console.log('Data', data);
        },
        async loadDetailsSire () {
            const response = await axios.form(urls.bulls.details, { id: this.model.sire_no });
            const data = response.data.data;
            this.model.sire_name = data.bull_name;
            this.model.sire_breed = data.breed.id;
            this.model.sire_yield = data.siredaughteryield;
            console.log('Data', data);
        },
        BackToHome () {
            this.$router.push({ path: '/embryo-transfer/' });
        },
        async addItem () {
            try {
                // this.model.cow = this.model.dam_no;
                // this.model.bull = this.model.sire_no;
                this.loading = true;
                if (this.model.dam_name === undefined || this.model.dam_name === null) {
                    this.model.dam_name = '';
                }
                if (this.model.dam_yield === undefined || this.model.dam_yield === null) {
                    this.model.dam_yield = '';
                }
                if (this.model.dam_breed === undefined || this.model.dam_breed === null) {
                    this.model.dam_breed = '';
                }
                if (this.model.sire_name === undefined || this.model.sire_name === null) {
                    this.model.sire_name = '';
                }
                if (this.model.sire_yield === undefined || this.model.sire_yield === null) {
                    this.model.sire_yield = '';
                }
                if (this.model.sire_breed === undefined || this.model.sire_breed === null) {
                    this.model.sire_breed = '';
                }
                if (this.model.embryo_grade === undefined || this.model.embryo_grade === null) {
                    this.model.embryo_grade = '';
                }
                if (this.model.container_no === undefined || this.model.container_no === null) {
                    this.model.container_no = '';
                }
                if (this.model.position === undefined || this.model.position === null) {
                    this.model.position = '';
                }
                if (this.model.production_date === undefined || this.model.production_date === null) {
                    this.model.production_date = '';
                }
                console.log(this.URL);
                console.log(this.model);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/embryo-transfer/' });
                    this.model = {
                        cow: '',
                        bull: '',
                        embryo_no: '',
                        embryo_breed: '',
                        embryo_type: '',
                        dam_no: '',
                        dam_name: '',
                        dam_breed: '',
                        dam_yield: '',
                        sire_no: '',
                        sire_name: '',
                        sire_breed: '',
                        sire_yield: '',
                        embryo_grade: '',
                        container_no: '',
                        position: '',
                        production_date: ''
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

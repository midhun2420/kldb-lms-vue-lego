<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
            <div class="color-txt">
                <div class="row fl-x fl-j-sb ml-1">
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ml-3">Shed Transfer</h3>
                    <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="col-lg-4">
                    <div class="row">
                        <validated-date-picker format="DD-MM-YYYY" label="Date" v-model="model.transfer_date" :disabled-date="disabledAfterToday" @input="loadMatingDetails"
                                                   class="c-input-datepicker w-15v text-black field-required" ></validated-date-picker>
                    </div>
                        </div>
                    <div class="row">

                        <div class="col-lg-4">
                           <validated-ajax-vue-select :url="shedOptions" @input="loadShed1Details" name="From Shed"
                                                       class="c-input-select w-15v field-required" v-model="model.shed_from"
                                                       label="Shed No" :selected-label="model.shed_to.label" :rules="{required:true}"></validated-ajax-vue-select>
                            <div class="card bg-grey mt-5 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 ">
                                <div class="bg-white">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">
                                        {{ shedName1 }}</p>
                                </div>
                                 <div class=" h-415   max-h-60-vh of-a  thin-scrollbar  ">
                                <p class="pl-4" v-for="(item, i) in animalOptions" :key="i">{{ item.label }}</p>
                                 </div></div>

                        </div>
                        <div class="col-lg-3">
                            <validated-select :options="animalOptions" class="c-input-select w-15v mt-0 field-required" multiple
                                              v-model="model.reg_no" label="Reg No" :rules="{required:true}"></validated-select>
                        </div>

                        <div class="col-lg-4">
                            <validated-ajax-vue-select :url="shedOptions" @input="loadShed2Details" name="To Shed"
                                                       class="c-input-select w-15v field-required" v-model="model.shed_to"
                                                       label="Shed No" :selected-label="model.shed_to.label" :rules="{required:true}"></validated-ajax-vue-select>

                            <div class="card bg-grey   bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 mt-5">
                                <div class="bg-white ">
                                    <p class=" fl-x-cc color-txt font-poppins-semibold pt-4 pb-4 text-primary">{{ shedName2 }}</p>
                                </div>
                                <div class=" h-415   max-h-60-vh of-a  thin-scrollbar  ">
                                    <p class="pl-4 " v-for="(item, i) in shed2_details" :key="i">{{ item.label }}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div class="fl-x-br mt-6">
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
import masterURLs from '../../data/masterURLs';

export default {
    name: 'ShedTransfer',
    data () {
        return {
            loading: false,
            URL: urls.shed_transfer.addEdit,
            formKey: 0,
            model: {
                shed_from: '',
                shed_to: '',
                reg_no: '',
                transfer_date: ''
            },
            shedName1: 'Shed Details',
            shedName2: 'Shed Details',
            shedOptions: masterURLs.master.shed.vueSelect,
            animalOptions: [],
            shed2_details: []
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadShed1Details () {
            this.model.reg_no = '';
            try {
                // Fetch shed options
                const shedOptionsResponse = await axios.get(this.shedOptions);
                const shedOptions = shedOptionsResponse.data.data;

                // Find the corresponding object in shedOptions array
                const selectedShed = shedOptions.find(option => option.value === this.model.shed_from);
                if (selectedShed) {
                    this.shedName1 = selectedShed.label;

                    // Now you can make the additional API request with the selected shed
                    const response = await axios.get(urls.shed_transfer.animalDetail + '?shed_number=' + this.model.shed_from);
                    this.animalOptions = response.data.data;
                }
            } catch (error) {
                console.error('Error loading shed details:', error);
            }
        },
        async loadShed2Details () {
            const response = await axios.get(urls.shed_transfer.animalDetail + '?shed_number=' + this.model.shed_to);
            this.shed2_details = response.data.data;
            const shedOptionsResponse = await axios.get(this.shedOptions);
            const shedOptions = shedOptionsResponse.data.data;
            const selectedShed = shedOptions.find(option => option.value === this.model.shed_to);
            if (selectedShed) {
                this.shedName2 = selectedShed.label;
            }
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.model = {
                        shed_from: '',
                        shed_to: '',
                        reg_no: '',
                        transfer_date: ''
                    };

                    this.animalOptions = [];
                    this.shed2_details = [];
                    this.shedName1 = 'Shed Details';
                    this.shedName2 = 'Shed Details';
                    this.formKey++;
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
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
.field-required{
position: relative;
}
.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f4f4f4;
}

.h-415 {
    height: 415px;
}
</style>

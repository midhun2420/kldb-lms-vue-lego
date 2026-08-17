<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
        <div class="color-txt">
            <div class="row">
                <div class="col-12">
                    <div class="row fl-x fl-j-sb ml-1">
                        <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Observation </h3>
                        <div>
                           <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker field-required" :disabled-date="disabledAfterToday" v-model="model.observation_date" label="Date" :rules="rules.common"></validated-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <validated-select :options="sectionOptions" class="c-input-select field-required" v-model="model.section" label="Section" :rules="{required:true}" @input="cleardata"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <validated-select :options="typeOption2" v-if="model.section==='Fodder'" class="c-input-select field-required" v-model="model.type" label="Type" :rules="{required:true}"></validated-select>

                    <validated-select v-else :options="typeOptions" class="c-input-select field-required" v-model="model.type" label="Type" :rules="{required:true}"></validated-select>
                </div>
                <div class="col-2" v-if="model.type === 'Animal'">
                    <validated-select :options="animalOptions" class="c-input-select" v-model="model.animal_no" label="Animal No" :rules="{required: model.type === 'Animal'}" ></validated-select>
                </div>
                <div class="col-2" v-if="model.type === 'Shed'">
                    <validated-select :options="shedOptions" class="c-input-select" v-model="model.shed_no" label="Shed No" :rules="{required: model.type === 'Shed'}"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <validated-text-area class="c-textarea field-required" v-model="model.detailed_info" label="Detailed Information" :rules="{required:true}"></validated-text-area>
                </div>

            </div>

        </div>
        <div class="fl-x-br mt-6">
            <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                   </div>
        </div>
            </s-form>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../../data/masterURLs';
export default {
    name: 'ObservationPage',
    data () {
        return {
            loading: false,
            URL: urls.observation.addEdit,
            animal: '',
            formKey: 0,
            model: {
                observation_date: '',
                section: '',
                type: '',
                animal_no: '',
                shed_no: '',
                detailed_info: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                }
            },
            typeOption2: [
                {
                    value: 'Others',
                    label: 'Others'
                }
            ],
            typeOptions: [
                {
                    value: 'Animal',
                    label: 'Animal'
                },
                {
                    value: 'Shed',
                    label: 'Shed'
                },
                {
                    value: 'Others',
                    label: 'Others'
                }
            ],
            sectionOptions: [
                {
                    value: 'CSB',
                    label: 'CSB'
                },
                {
                    value: 'AH Section',
                    label: 'AH Section'
                },
                {
                    value: 'Fodder',
                    label: 'Fodder'
                }
            ],
            animalOptions: [],
            shedOptions: []
        };
    },
    methods: {
        cleardata () {
            this.model.type = '';
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        async updateOptions () {
            const aresponse = await axios.get(urls.observation.animalVueSelect + '?animal=' + this.animal);
            if (aresponse.data) {
                this.animalOptions = aresponse.data.data;
            }
            const sresponse = await axios.get(masterURLs.master.shed.vueSelect + '?animal=' + this.animal);
            if (sresponse.data) {
                this.shedOptions = sresponse.data.data;
            }
            // this.shedOptions = masterURLs.master.shed.vueSelect + '?animal=' + this.animal;
            // this.animalOptions = urls.observation.animalVueSelect + '?animal=' + this.animal;
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
        async loadDetails () {
            const response = await axios.get(urls.observation.animalDetail + '?reg_no=' + this.model.reg_no);
            const data = response.data.data;
            this.model.breed = data.breed;
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
                        observation_date: '',
                        section: '',
                        type: '',
                        animal_no: '',
                        shed_no: '',
                        detailed_info: ''
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
        'model.section': {
            handler: function (after, before) {
            // Changes detected. Do work...
                console.log(after, before);

                if (after === 'AH Section') {
                    this.animal = 'cow';
                } else if (after === 'CSB') {
                    this.animal = 'bull';
                }
                this.updateOptions();
            },
            deep: true
        }
    }
};
</script>

<style scoped lang="scss">

</style>

<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Vaccination</h2>
             <div>
                 <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4 mt-2 ml-1" @click="openListModal"></btn>

                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Vaccination</h2>-->
<!--            <div class="fl-x fl-j-e">-->
<!--            <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4" @click="openListModal"></btn>-->
<!--        </div>-->
        <div class="row mt-4">
            <div class="col-lg-2 mt-4">
                <validated-ajax-vue-select
                    :url="vaccinataionOptionURL"
                    label="Vaccinataion Type" class="c-input-select text-black field-required" v-model="model.vaccination_type" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2 mt-4">
                <validated-date-picker format="DD-MM-YYYY" label="Vaccination Date" class="text-black c-input-datepicker field-required"  v-model="model.vaccination_date" :rules="rules.FututreValidation"></validated-date-picker>
            </div>
            <div class="col-lg-2 mt-4">
                <validated-date-picker format="DD-MM-YYYY" label="Next Due Date" class="text-black c-input-datepicker field-required" v-model="model.next_due_date" :rules="rules.common"></validated-date-picker>
            </div>
<!--            <div class="col-lg-2">-->
<!--                <validated-checkbox label="Seromonitoring (Post)" class="pb-0 mt&#45;&#45;2 mb-xl-n4 text-2"></validated-checkbox>-->
<!--                <validated-input></validated-input>-->
<!--            </div>-->
            <div class="col-lg-2 pl-3 w-10r mt-3">
                    <validated-checkbox label="Seromonitoring(post)" class="pb-0 mb-xl-n4 text-black" v-model="model.seromonitoring"></validated-checkbox>
                <validated-input></validated-input>
                </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                <validated-ajax-vue-select
                    :url="shedOptionURL"
                    label="Shed" class="c-input-select text-black field-required" v-model="model.shedno" @input="loadCowOptions" :rules="{required:true}"></validated-ajax-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-vue-select multiple :options="cowOptions" label="Animal" class="c-input-select-multiplevalue text-black field-required" v-model="model.cows" :rules="{required:true}"></validated-vue-select>
            </div>
            <div class="col-lg-2">
                <validated-input label="Vaccine Name" class="text-black field-required" v-model="model.vaccination_name" :rules="{required:true}"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Vaccine Batch No" class="text-black field-required" v-model="model.vaccination_batch_no" :rules="{required:true}"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Remarks" class="text-black field-required" v-model="model.remarks" :rules="{required:true}"></validated-input>
            </div>
        </div>
        <div class="row mt-lg-7">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                </div>
            </div>
        </div>
            <modal ref="listModal" title="Vaccination List" width="80r" header-color="secondary" :no-close-on-backdrop="true">
                <div class="row">
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-3"
                    v-model="from_date"
                    :disabled-date="disabledFromDate"
                    label="Measurement From"
                    >
                </validated-date-picker>
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-3"
                    v-model="to_date"
                    :disabled-date="disabledToDate"
                    label="Measurement To"
                    >
                </validated-date-picker>
                    <validated-ajax-vue-select class="c-input-select input-border-primary col-3" label="Vaccination Type" v-model="vaccination_type" :url="vaccinataionOptionURL"></validated-ajax-vue-select>

                <validated-ajax-vue-select class="c-input-select input-border-primary col-3" label="Animal" v-model="animal" :url="animalOptions"></validated-ajax-vue-select>
                </div>
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false"
                    :extra-params="{from_date : from_date, to_date : to_date, animal:animal, vaccination_type: vaccination_type}">
                    <template slot="animal" slot-scope="props">
                         {{ props.rowData.animal ? props.rowData.animal.reg_no : '-' }}
                    </template>
                    <template slot="shed_number" slot-scope="props">
                        {{ props.rowData.shed_number ? props.rowData.shed_number.name : '-' }}
                    </template>
                <template slot="vaccination_obj" slot-scope="props">
                        {{ props.rowData.vaccination_obj ? props.rowData.vaccination_obj.label : '-' }}
                    </template>
                </vue-table>

            </modal>
            </s-form>
    </div>
</template>

<script>
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'CowVaccination',
    data () {
        return {
            formKey: 0,
            loading: false,
            URL: urls.cowVaccination.addEdit,
            vaccinataionOptionURL: masterURLs.master.VaccinationType.vueSelect,
            animalOptions: urls.cows.allVueSelect,
            shedOptionURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            cowOptions: [],
            listURL: urls.cowVaccination.list,
            animal: '',
            vaccination_type: '',
            from_date: '',
            to_date: '',
            fields: [
                {
                    name: '__slot:animal',
                    sortField: 'animal',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Animal'
                },
                {
                    name: '__slot:shed_number',
                    sortField: 'shed_number',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Shed Number'
                },
                {
                    name: '__slot:vaccination_obj',
                    sortField: '__slot:vaccination_obj',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Vaccination Type'
                },
                {
                    name: 'vaccination_date',
                    sortField: 'vaccination_date',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Vaccination Date'
                },
                {
                    name: 'vaccination_name',
                    sortField: 'vaccination_name',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Vaccination Name'
                },
                {
                    name: 'vaccination_batch_no',
                    sortField: 'vaccination_batch_no',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Batch No'
                },
                {
                    name: 'next_due_date',
                    sortField: 'next_due_date',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Next Due Date'
                }

            ],
            model: {
                cows: [],
                shed_number: '',
                next_due_date: '',
                seromonitoring: '',
                vaccination_name: '',
                vaccination_batch_no: '',
                remarks: '',
                vaccination_type: '',
                vaccination_date: ''
            },
            rules: {

                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                },
                FututreValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.ValidationFuture(value);
                    }
                }
            }
        };
    },
    methods: {
        parseDates (dateStr) {
            if (!dateStr) return null;

            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        },
        disabledToDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const from = this.parseDates(this.from_date);

            if (from) {
                from.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
        (from && date < from)
            );
        },
        disabledFromDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const to = this.parseDates(this.to_date);

            if (to) {
                to.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
        (to && date > to) //
            );
        },
        async openListModal () {
            console.log('---inside loadList---');
            // this.loadingData = true;
            this.from_date = '';
            this.to_date = '';
            this.animal = '';
            this.vaccination_type = '';
            this.$refs.listModal.show();
        },
        ValidationFuture (date) {
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);
            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (dateObj > currentDate) {
                return 'Please enter a date from today onwards.';
            }
            return true;
        },

        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        async loadCowOptions () {
            this.model.cow = '';
            const response = await axios.get(urls.cows.vueSelect + '?shed_number=' + this.model.shedno);
            this.cowOptions = response.data.data;
        },

        Validation (date) {
            const vacc = this.model.vaccination_date;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const vaccParts = vacc.split('-');
            if (vaccParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const vaccDay = parseInt(vaccParts[0], 10);
            const vaccMonth = parseInt(vaccParts[1], 10);
            const vaccYear = parseInt(vaccParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(vaccDay) || isNaN(vaccMonth) || isNaN(vaccYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const vaccDateObj = new Date(vaccYear, vaccMonth - 1, vaccDay);

            if (dateObj <= vaccDateObj) {
                return 'Date should be after the date of Vaccination Date.';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj < currentDate) {
                return 'Please enter a date from today onwards.';
            }
            return true;
        },
        ClearAllData () {
            this.model.shedno = '';
            this.model.cows = '';
            this.model.next_due_date = '';
            this.model.seromonitoring = '';
            this.model.vaccination_name = '';
            this.model.vaccination_batch_no = '';
            this.model.remarks = '';
            this.model.vaccination_type = '';
            this.model.vaccination_date = '';
            this.vaccination_type = '';
            this.animal = '';
        },
        async addItem () {
            try {
                this.loading = true;
                const formData = new FormData();

                this.model.cows.forEach(cow => {
                    formData.append('cows', cow.id ?? cow);
                });

                formData.append('vaccination_type', this.model.vaccination_type);
                formData.append('vaccination_date', this.model.vaccination_date);
                formData.append('next_due_date', this.model.next_due_date);
                formData.append('seromonitoring', this.model.seromonitoring || false);
                formData.append('vaccination_name', this.model.vaccination_name);
                formData.append('vaccination_batch_no', this.model.vaccination_batch_no);
                formData.append('remarks', this.model.remarks);

                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.ClearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                } else {
                    Object.entries(result.errors || {}).forEach(([k, v]) => {
                        this.$notify(`${k}: ${v}`, 'Warning', { type: 'warning' });
                    });
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.loading = false;
            } finally {
                this.loading = false;
            }
        }
    }

};
</script>

<style scoped>
</style>

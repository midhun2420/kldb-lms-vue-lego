<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Deworming</h2>
             <div>
                 <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4 mt-2 ml-1" @click="openListModal"></btn>

                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>

        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
<!--                <div class="col-12">-->
<!--                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">Deworming</h3>-->
<!--                     <div class="fl-x fl-j-e">-->
<!--                            <btn text="View" type="button" :loading="loading" loading-text="Loading..." class="px-4" @click="openListModal"></btn>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="col-lg-2 mt-lg-5">
                    <validated-ajax-vue-select class="c-input-select input-border-primary field-required" placeholder="Shed"
                                               v-model="shed_number" @input="loadCowOptions" label="Shed"
                                               :url="shedOptions" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
            </div>
            <p class="fs-lg-2 text-primary font-poppins-semibold"> Enter Individually</p>
            <div class="row">
                <div class="col-lg-2">
                    <validated-vue-select :options="cowOptions" @input="loadDetails" class="c-input-select field-required"
                                          label="Animal No / Name" v-model="details.animalno_or_name" :rules="{required:true}"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" v-model="details.renumber" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Shed No" v-model="details.shed_number" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed" v-model="details.breed" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker" label="Date of Birth" v-model="details.dob" disabled></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Age" v-model="model.age" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Cow Weight" v-model="details.cowweight" :rules="rules.positiveOnly" type="number" disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Dose" v-model="model.medicineqty" :rules="rules.positive"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Name" v-model="model.medicine"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Medicine Batch No" v-model="model.batchno"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker field-required" label="Deworming Date" v-model="model.dewormdate" :rules="rules.common"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.remarks"></validated-input>
                </div>
            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
            <modal ref="listModal" title="Deworming List" width="80r" header-color="secondary" :no-close-on-backdrop="true">
                <div class="row">
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="from_date"
                    :disabled-date="disabledFromDate"
                    label="Dewormed From"
                    >
                </validated-date-picker>
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    class="c-input-datepicker col-4"
                    v-model="to_date"
                    :disabled-date="disabledToDate"
                    label="Dewormed To"
                    >
                </validated-date-picker>
                <validated-ajax-vue-select class="c-input-select input-border-primary col-4" label="Animal" v-model="animal" :url="animalOptions" ></validated-ajax-vue-select>
                    </div>
                <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false"
                    :extra-params="{from_date : from_date, to_date : to_date, animal:animal}">
                    <template slot="shed_number" slot-scope="props">
                         {{ props.rowData.shed_number ? props.rowData.shed_number.name : '-' }}
                    </template>
                    <template slot="breed" slot-scope="props">
                        {{ props.rowData.breed ? props.rowData.breed.breed_code : '-' }}
                    </template>
                </vue-table>
            </modal>
        </s-form>
           <!-- <div class="row">
            <div class="col-lg-12" v-if="shedType === 's4'">
                <cows-deworming-second-page></cows-deworming-second-page>
            </div>
            <div class="col-12" v-else-if="shedType === 's9'">
                <cows-deworming-third-page></cows-deworming-third-page>
            </div>

        </div>-->

    </div>
</template>

<script>
// import CowsDewormingThirdPage from '@/views/cows/deworming/CowsDewormingThirdPage';
// import CowsDewormingSecondPage from '@/views/cows/deworming/CowsDewormingSecondPage';
import urls from '../../../data/urls';
import masterURLs from '../../../data/masterURLs';
import axios from 'secure-axios';
export default {
    name: 'CowsDewormingFirstPage',
    // components: { CowsDewormingSecondPage, CowsDewormingThirdPage },

    data () {
        return {
            formKey: 0,
            shed_number: null,
            URL: urls.cowDeworming.addEdit,
            loading: false,
            dewormingList: [],
            currentPage: 1,
            itemsPerPage: 10,
            loadingData: false,
            animalOptions: urls.cows.allVueSelect,
            listURL: urls.cowDeworming.list,
            fields: [
                {
                    name: 'animal_no',
                    sortField: 'animal_no',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Animal'
                },
                {
                    name: 'renumber',
                    sortField: 'renumber',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Renumber'
                },
                {
                    name: '__slot:shed_number',
                    sortField: 'shed_number',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Shed Number'
                },
                {
                    name: '__slot:breed',
                    sortField: 'breed',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Breed'
                },
                {
                    name: 'dob',
                    sortField: 'dob',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'DOB'
                },
                {
                    name: 'deworm_date',
                    sortField: 'deworm_date',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Deworm Date'
                },
                {
                    name: 'medicine',
                    sortField: 'medicine',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Medicine'
                },
                {
                    name: 'medicine_qty',
                    sortField: 'medicine_qty',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Medicine Quantity'
                },
                {
                    name: 'batch_no',
                    sortField: 'batch_no',
                    dataClass: 'text-center',
                    titleClass: 'text-center',
                    title: 'Batch No'
                }
            ],
            animal: '',
            from_date: '',
            to_date: '',
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=cow',
            cowOptions: [],
            details: {
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                animalno_or_name: '',
                cowweight: ''

            },
            model: {
                cow: '',
                age: '',
                bullweight: '',
                medicineqty: '',
                medicine: '',
                batchno: '',
                dewormdate: '',
                remarks: ''
            },
            rules: {
                positiveOnly: {
                    // required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }

                },
                positive: {
                    // required: true,
                    customValidator: (value) => {
                        return this.avoidNegetiveValues(value);
                    }

                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }
            }
        };
    },
    methods: {
        async loadDetails () {
            const response = await axios.form(urls.cows.details, { id: this.details.animalno_or_name });
            const data = response.data.data;
            this.model.cow = data.id;
            this.model.age = data.age;
            this.details.renumber = data.renumber;
            this.details.breed = data.breed.breed_name;
            this.details.dob = data.dob;
            this.details.shed_number = data.shedno.name;
            this.details.cowweight = data.last_recorded_weight || data.birthwt;
        },
        Validation (date) {
            const dob = this.details.dob;
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
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        parseDate (dateStr) {
            if (!dateStr) return null;

            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        },
        disabledToDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const from = this.parseDate(this.from_date);

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

            const to = this.parseDate(this.to_date);

            if (to) {
                to.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
        (to && date > to)
            );
        },

        async openListModal () {
            console.log('---inside loadList---');
            // this.loadingData = true;
            this.from_date = '';
            this.to_date = '';
            this.animal = '';
            // try {
            //     const response = await axios.get(urls.cowDeworming.list, { params: { animal: this.animal, from_date: this.from_date, to_date: this.to_date } });
            //     this.dewormingList = response.data.data || []; // adjust as per API response
            //     console.log('API Success --------', this.dewormingList);
            // } catch (error) {
            //     console.error('API Error --------', error);
            //     this.dewormingList = [];
            // } finally {
            //     this.loadingData = false;
            // }
            this.$refs.listModal.show();
        },
        async loadCowOptions () {
            this.dataclear();
            const response = await axios.get(urls.cows.vueSelect + '?shed_number=' + this.shed_number);
            this.cowOptions = response.data.data;
        },

        dataclear () {
            this.model.age = '';
            this.model.cow = '';
            this.details.dob = '';
            this.details.renumber = '';
            this.details.breed = '';
            this.details.shed_number = '';
            this.details.animalno_or_name = '';
            this.details.cowweight = '';
        },
        ClearAllData () {
            this.model.bullweight = '';
            this.model.medicineqty = '';
            this.model.medicine = '';
            this.model.batchno = '';
            this.model.dewormdate = '';
            this.model.remarks = '';
            this.model.age = '';
            this.model.cow = '';
            this.details.dob = '';
            this.details.renumber = '';
            this.details.breed = '';
            this.details.shed_number = '';
            this.details.animalno_or_name = '';
            this.details.cowweight = '';
            this.shed_number = '';
        },
        avoidNegetive (endDate) {
            const num = endDate;
            if (num <= 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        avoidNegetiveValues (value) {
            const numericValue = parseFloat(value);

            if (isNaN(numericValue)) {
                return 'Please enter a valid numeric value';
            }

            if (numericValue <= 0) {
                return 'Value must be greater than zero';
            }

            return true;
        },

        async addItem () {
            try {
                this.loading = true;
                this.model.bullweight = this.details.cowweight;
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
                    // await this.$router.push({ path: '/cows-list/' });
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
    computed: {
        listData () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.dewormingList.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.dewormingList.length / this.itemsPerPage);
        },
        shedType () {
            return this.models.shedType;
        }
    }
};
</script>

<style scoped>

</style>

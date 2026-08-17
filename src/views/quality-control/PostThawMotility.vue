<template>
    <div>
        <s-form :key="formKey" @submit="addItem">
        <div class="row fl-x fl-j-sb ml-1">
        <h3 class="head font-poppins-semibold fs-lg-4 mt-2 text-primary ml-4 mb-5">Post-Thaw Motility</h3>
        <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
        </div>
<!--        <div class="col-lg-2">-->
<!--            <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required" v-model="model.post_thaw_date" label="Date" :rules="{required:true}"></validated-date-picker>-->
<!--        </div>-->
            <div class="col-lg-2">
            <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                       label="Date of the Production" v-model="model.production_date" :disabled-date="disabledAfterToday" @input="loadDetails" :rules="rules.common"></validated-date-picker>
        </div>

        <div class="column fl-x" v-if="tableLoading">
            <div class="col-lg-12  ">
                <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                    <table style="width:100%">
                        <th class="text-primary">SI No</th>
                        <th class="text-primary">Bull No</th>
                        <th class="text-primary">Bull Name</th>
                        <th class="text-primary">Breed</th>
                        <th class="text-primary">EJ No</th>
                        <th class="text-primary">Collection</th>
                        <th class="text-primary">Time</th>
                        <th class="text-primary">Motility%</th>
                        <th class="text-primary ">Concentration</th>
                        <th class="text-primary">TEV</th>
                        <th class="text-primary">Recorded Dose</th>
                        <tr class="mt-3" v-if="loadingData">
                                        <td colspan="4">Please wait while fetching the data...</td>
                                    </tr>
                        <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                                <td colspan="11" class="mt-3"> No data</td>
                            </tr>
                        <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                            <td>{{ i+1 }}</td>
                            <td>{{ item.bull.reg_no }}</td>
                            <td>{{ item.bull.bull_name }}</td>
                            <td>{{ item.bull.breed }}</td>
                            <td>{{ item.ejaculation_no }}</td>
                            <td>{{ item.collection }}</td>
                            <td>{{ item.time }}</td>
                            <td>{{ item.motility }}</td>
                            <td>{{ item.concentration }}</td>
                            <td>{{ item.tev }}</td>
                            <td>{{ item.recorded_dose }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-12 fl-x mt-5">
            <div class="col-2">
                <validated-input label="Animal No" class="text-black field-required" v-model="details.bull" disabled :rules="{required:true}"></validated-input>
            </div>
            <div class="col-2">
                <validated-input label="Breed" class=" text-black" v-model="details.breed" disabled></validated-input>
            </div>
            <div class="col-2">
                <validated-input label="Ejaculation No" class=" text-black" v-model="details.ejaculation_no" disabled></validated-input>
            </div>
        </div>
        <div class="col-12 fl-x mt-4">
            <div class="col-3">
                <p class="text-black red-asterisk-label">PTM%</p>
            </div>
            <div class="col-2">
                <validated-input name="PTM%" class="text-black field-required" v-model="model.ptm" :rules="rules.ptmPercentage" @input="getDose"></validated-input>
            </div>
            <div class="col-1"></div>
            <div class="col-lg-2">
                <p class="text-black ">FSD Status</p>
            </div>
            <div class="col-lg-2">
                <validated-input name="FSD Status" class=" text-black" v-model="model.fsd_status" :rules="{required:false}"></validated-input>
            </div>
        </div>
         <div class="col-12 fl-x mt-4">
            <div class="col-3">
                <p class="text-black red-asterisk-label">FSD Stock</p>
            </div>
<!--             <div class="col-1"></div>-->
            <div class="col-lg-2">
                <validated-input name="FSD Stock" class="text-black field-required" v-model="model.fsd_stock" :rules="rules.positiveOnly" :disabled="doseDisable"></validated-input>
            </div>
         </div>
         <div class="col-12 fl-x mt-4">
            <div class="col-3">
                <p class="text-black red-asterisk-label">Total Straw Discarded</p>
            </div>
            <div class="col-lg-2">
                <validated-input name="Total Straw Discarded" class="text-black field-required" v-model="model.total_straw_discarded" :rules="rules.positiveOnly" type="number" :disabled="doseDisable"></validated-input>
            </div>
         </div>
        <div class="col-12 fl-x mt-4">
            <div class="col-3">
                <p class="text-black">Remarks</p>
            </div>
<!--            <div class="col-4"></div>-->
            <div class="col-lg-2">
                <validated-input name="Remarks" class=" text-black" v-model="model.remarks" :rules="{required:false}"></validated-input>
            </div>
        </div>
            <div class="column fl-x-br pt-7">
        <div class="btn-group">
            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
            </div>
            </div>
        </s-form>

        <div class="column fl-x mt-3" v-if="tableLoading">
            <div class="col-lg-12  ">
                <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                    <table style="width:100%">
                        <th class="text-primary">SI No</th>
                        <th class="text-primary">Bull No</th>
                        <th class="text-primary">Bull Name</th>
                        <th class="text-primary">Breed</th>
                        <th class="text-primary">EJ No</th>
                        <th class="text-primary">Ptm</th>
                        <th class="text-primary">FSD Status</th>
                        <th class="text-primary">FSD Stock</th>
                        <th class="text-primary ">Total Straw Discarded</th>
                        <th class="text-primary ">Remarks</th>
                        <tr class="mt-3" v-if="loadingData">
                                        <td colspan="4">Please wait while fetching the data...</td>
                                    </tr>
                        <tr v-if="!loadingData && savedBullsList.length === 0" class="text-center">
                                <td colspan="11" class="mt-3"> No data</td>
                            </tr>
                        <tr v-for="(item, i) in savedBullsList" :key="i" @click="clickedSavedBull(i)" style="cursor: pointer">
                            <td>{{ i+1 }}</td>
                            <td>{{ item.bull.reg_no }}</td>
                            <td>{{ item.bull.bull_name }}</td>
                            <td>{{ item.bull.breed }}</td>
                            <td>{{ item.ejaculation_no }}</td>
                            <td>{{ item.ptm }}</td>
                            <td>{{ item.fsd_status }}</td>
                            <td>{{ item.fsd_stock }}</td>
                            <td>{{ item.total_straw_discarded }}</td>
                            <td>{{ item.remarks }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
export default {
    name: 'PostThawMotility',
    data () {
        return {
            loading: false,
            tableLoading: false,
            is_edit: false,
            doseDisable: true,
            formKey: 0,
            URL: urls.post_thaw_motility.addEdit,
            model: {
                post_thaw_date: '',
                production_date: '',
                bull: '',
                breed: '',
                ejaculation_no: '',
                ptm: '',
                fsd_status: '',
                fsd_stock: '',
                total_straw_discarded: '',
                remarks: '',
                semen_collection: '',
                id: ''
            },
            rules: {
                ptmPercentage: {
                    required: true,
                    customValidator: (value) => {
                        return (value >= 0 && value <= 100) || 'PTM% must be between 0 and 100';
                    }
                },
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                }
            },
            bullsList: [],
            savedBullsList: [],
            loadingData: false,
            details: {
                bull: '',
                ejaculation_no: '',
                breed: ''
            }
        };
    },
    mounted () {
        if (this.$route.query.production_date) {
            this.model.production_date = this.$route.query.production_date;
            this.loadDetails();
        }
    },
    watch: {
        'model.ptm' (newVal) {
            const ptm = parseFloat(newVal);
            if (!isNaN(ptm) && ptm >= 50) {
                this.doseDisable = false; // ✅ enable inputs
            } else {
                this.doseDisable = true; // 🚫 disable inputs
                this.model.fsd_stock = '';
                this.model.total_straw_discarded = '';
            }
        }
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
        async getDose () {
            const response = await axios.form(urls.post_thaw_motility.getDose, { ptm: this.model.ptm, semen_collection: this.model.semen_collection });
            const data = response.data.data;
            if (response.data.success) {
                this.model.fsd_stock = data.fsd_stock;
                this.model.total_straw_discarded = data.total_straw_discarded;
                // this.doseDisable = true;
            } else {
                this.model.fsd_stock = '';
                this.model.total_straw_discarded = '';
                // this.doseDisable = false;
                if (response.data.message) {
                    const errorMessage = response.data.message;
                    this.$notify(errorMessage, 'Warning', { type: 'warning' });
                }
            }
            console.log('Data', data);
        },
        async loadDetails () {
            this.details.bull = '';
            this.details.ejaculation_no = '';
            this.details.breed = '';
            this.model.bull = '';
            this.model.ejaculation_no = '';
            this.model.semen_collection = '';
            this.model.ptm = '';
            this.model.fsd_status = '';
            this.model.fsd_stock = '';
            this.model.total_straw_discarded = '';
            this.model.remarks = '';
            this.model.id = '';
            this.loadingData = true;
            const response = await axios.form(urls.post_thaw_motility.collectionDetails, {
                production_date: this.model.production_date,
                filter: 'post_thaw'
            });
            this.bullsList = response.data.data;
            const sresponse = await axios.form(urls.post_thaw_motility.savedCollectionDetails, {
                production_date: this.model.production_date,
                filter: 'post_thaw'
            });
            this.savedBullsList = sresponse.data.data;
            this.tableLoading = true;
            this.loadingData = false;
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
            const checkDate = this.model.production_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Date in the format DD-MM-YYYY.';
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
        clearData () {
            this.model.id = '';
            this.model.bull = '';
            this.model.breed = '';
            this.model.ejaculation_no = '';
            this.model.ptm = '';
            this.model.fsd_status = '';
            this.model.fsd_stock = '';
            this.model.total_straw_discarded = '';
            this.model.semen_collection = '';
            this.$refs.form.reset();
        },
        clickedBull (index) {
            const indexToFetch = index;
            const data = this.bullsList;
            this.is_edit = false;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.details.bull = dataItem.bull.reg_no;
                this.details.ejaculation_no = dataItem.ejaculation_no;
                this.details.breed = dataItem.bull.breed;
                this.model.bull = dataItem.bull_id;
                this.model.ejaculation_no = dataItem.ejaculation_no;
                this.model.semen_collection = dataItem.id;
                this.model.ptm = '';
                this.model.fsd_status = '';
                this.model.remarks = '';
                this.model.fsd_stock = '';
                this.model.total_straw_discarded = '';
                this.model.id = '';
            }
        },
        clickedSavedBull (index) {
            const indexToFetch = index;
            const data = this.savedBullsList;
            this.is_edit = true;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.details.bull = dataItem.bull.reg_no;
                this.details.bull_name = dataItem.bull.bull_name;
                this.details.ejaculation_no = dataItem.ejaculation_no;
                this.details.breed = dataItem.bull.breed;
                this.model.ejaculation_no = dataItem.ejaculation_no;
                this.model.id = dataItem.id;
                this.model.bull = dataItem.bull.id;
                this.model.ptm = dataItem.ptm;
                this.model.fsd_status = dataItem.fsd_status;
                this.model.remarks = dataItem.remarks;
                this.model.fsd_stock = dataItem.fsd_stock;
                this.model.total_straw_discarded = dataItem.total_straw_discarded;
                this.model.semen_collection = dataItem.semen_collection;
            }
        },
        async addItem () {
            try {
                this.loading = true;
                if (this.model.fsd_status === undefined || this.model.fsd_status === null) {
                    this.model.fsd_status = '';
                }
                if (this.model.remarks === undefined || this.model.remarks === null) {
                    this.model.remarks = '';
                }
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    if (this.is_edit) {
                        this.$notify('Edited Successfully', 'Success', { type: 'success' });
                    } else {
                        this.$notify('Added Successfully', 'Success', { type: 'success' });
                    }
                    this.$router.replace({
                        path: this.$route.path,
                        query: {
                            production_date: this.model.production_date
                        }
                    });
                    if (!this.model.production_date) {
                        this.model.production_date = this.$route.query.production_date;
                    }
                    this.formKey++;
                    this.loadDetails();

                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
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
    table {
        background-color: #f3f3f3;
        text-align: center;
    }

    th {
        background-color: white;
        border: 0px;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
        padding-left: 18px;
        text-align: center;
    }

    td {
        padding-left: 18px;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
    }

    table, td, tr {
        border: none;
        border-collapse: collapse;
    }

    table, th, tr {
        border-radius: 4px;

    }
</style>

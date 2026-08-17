<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Daily Milk Recording</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Daily Milk Recording</h2>-->
        <div class="row">
            <div class="col-lg-9">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker :key="dateInputKey" format="DD-MM-YYYY" label="Date" v-model="model.milk_date" @input="loadDetails"
                                               class="c-input-datepicker text-black mr-4 field-required" :rules="rules.Futurevalidation"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-2">
                        <validated-file-input :key="fileInputKey" label="Milk Record File" v-model="model.milk_record_file"  class="w-10r" ref="fileInput" label-text="choose excel file"></validated-file-input>
                        <btn :loading="loading" loading-text="Saving..." type="button" @click="loadTableDetails">Upload</btn>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" class="mr-4 text-black"></validated-input>
                    </div>
                </div>
            </div>
<!--            <div class="col-lg-2">-->
<!--                    <btn text="Get Table Data" @click="addItemLoadTable" class="mt-lg-4"></btn>-->
<!--                </div>-->
            <div class="col-lg-3">
                <table style="width:100%" class="m-height c-table-2">

                            <th class="bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">Cow List</th>
                            <th class="bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">DIM</th>
<!--                            <th class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">Status</th>-->

                            <tr v-for="(item, i) in details" :key="i">
                                <td>{{ item.value }}</td>
                                <td>{{ item.label }}</td>
<!--                                <td>{{ item.status }}</td>-->
                    </tr>
                </table>
<!--                <custom-two-column-table heading1="Cow List" heading2="DIM">-->
<!--                    <template #column1>-->
<!--                        <ul class="list-unstyled list-items ml-2">-->
<!--                            <li v-for="(item, i) in details" :key="i">{{ item.value }}</li>-->
<!--                        </ul>-->
<!--                    </template>-->
<!--                    <template #column2>-->
<!--                        <ul class="list-unstyled list-items ml-2">-->
<!--                            <li v-for="(item, i) in details" :key="i">{{ item.label }}</li>-->
<!--                        </ul>-->
<!--                    </template>-->
<!--                </custom-two-column-table>-->
            </div>
            <div class="col-8 mt-5">
                <template>
<!--                    <div class="card pl-0 pr-0 pt-0 pb-0 w-60r">-->
<!--                        <table style="width:100%" class="c-table-1">-->
<!--                            <th>Sl No</th>-->
<!--                            <th>Reg No</th>-->
<!--                            <th>Morning Quantity</th>-->
<!--                            <th>Evening Quantity</th>-->
<!--                            <th>Total Quantity</th>-->
<!--                            <th>DIM</th>-->
<!--                            <th>Status</th>-->
<!--                            <tr v-for="(item, i) in table_details" :key="i">-->
<!--                                <td>{{ item.sl_no }}</td>-->
<!--                                <td @click="loadCowDetails(item, table_details)">{{ item.cow_name }}</td>-->
<!--                                <td>{{ item.morning_milk }}</td>-->
<!--                                <td>{{ item.evening_milk }}</td>-->
<!--                                <td>{{ item.total_milk }}</td>-->
<!--                                <td>{{ item.dim }}</td>-->
<!--                                <td>{{ item.status }}</td>-->
<!--                            </tr>-->
<!--                        </table>-->

<!--                    </div>-->

                    <div class="card pb-0 bs-4 border-r-1 of-h p-0" v-if="tableLoading">
                        <table style="width:100%" class="m-height c-table-2">
                            <th class="text-primary">Sl No</th>
                            <th class="text-primary">Reg No</th>
                            <th class="text-primary">Morning Quantity</th>
                            <th class="text-primary">Evening Quantity</th>
                            <th class="text-primary">Total Quantity</th>
                            <th class="text-primary">DIM</th>
                            <th class="text-primary">Status</th>
                            <tr v-if="!loadingData && table_details.length === 0" class="text-center">
                                <td colspan="8" class="mt-3"> No data</td>
                            </tr>
                            <tr class="mt-3 text-primary" v-if="loadingData">
                                                <td colspan="4">Please wait while fetching the data...</td>
                                            </tr>
                            <tr v-for="(item, i) in table_details" :key="i" @click="clickedCow(i)" style="cursor: pointer">
                                <td>{{ i+1 }}</td>
                                <td>{{ item.cow_name }}</td>
                                <td>{{ item.morning_milk }}</td>
                                <td>{{ item.evening_milk }}</td>
                                <td>{{ item.total_milk }}</td>
                                <td>{{ item.dim }}</td>
                                <td>{{ item.status }}</td>
                    </tr>
                </table>

<!--                        <div class="row headings">-->
<!--                            <div class="col-1">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Sl No</h5>-->
<!--                            </div>-->
<!--                            <div class="col-2 m-0 ">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Reg No</h5>-->
<!--                            </div>-->
<!--                            <div class="col-2 m-0 p-0">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Morning Quantity</h5>-->
<!--                            </div>-->
<!--                            <div class="col-2 m-0 p-0">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Evening Quantity</h5>-->
<!--                            </div>-->
<!--                            <div class="col-2 m-0 p-0">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Total Quantity</h5>-->
<!--                            </div>-->
<!--                            <div class="col-1 m-0 p-0">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">DIM</h5>-->
<!--                            </div>-->
<!--                            <div class="col-2 m-0 p-0">-->
<!--                                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Status</h5>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="row mt-3 bg-3 pb-6">-->
<!--                            <div class="col-1">-->
<!--                                <slot name="column1"></slot>-->
<!--                                <ul class="list-unstyled list-items ml-2" v-if="!$slots.column1">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.sl_no }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <slot name="column2"></slot>-->
<!--                                <ul class="list-unstyled list-items">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i" @click="loadCowDetails(item, table_details)">{{ item.cow_name }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <slot name="column3"></slot>-->
<!--                                <ul class="list-unstyled list-items" v-if="!$slots.column3">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.morning_milk }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <slot name="column3"></slot>-->
<!--                                <ul class="list-unstyled list-items" v-if="!$slots.column3">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.evening_milk }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <slot name="column3"></slot>-->
<!--                                <ul class="list-unstyled list-items" v-if="!$slots.column3">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.total_milk }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-1">-->
<!--                                <slot name="column3"></slot>-->
<!--                                <ul class="list-unstyled list-items" v-if="!$slots.column3">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.dim }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div class="col-2">-->
<!--                                <slot name="column3"></slot>-->
<!--                                <ul class="list-unstyled list-items" v-if="!$slots.column3">-->
<!--                                    <li v-for="(item, i) in table_details" :key="i">{{ item.status }}</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                </template>

            </div>
<!--            <div class="col-8 mt-5">-->
<!--                <daily-milk-recording-table></daily-milk-recording-table>-->
<!--            </div>-->
        </div>
        <div class="row mt-5">
            <div class="col-2">
<!--                <validated-input  label="Reg No."></validated-input>-->
                <validated-input label="Registration No" v-model="cow_name" class="text-black field-required" disabled></validated-input>
            </div>
            <div class="col-2">
                <validated-input v-model="model.fat" label="Fat %" :rules="rules.positiveOnly" type="number"></validated-input>
            </div>
            <div class="col-2">
                <validated-input v-model="model.snf" label="SNF" :rules="rules.positiveOnly" type="number"></validated-input>
            </div>
            <div class="col-2">
                <validated-input v-model="model.somatic_cell_count" label="Somatic Cell Count" :rules="rules.positiveOnly" type="number"></validated-input>
            </div>
            <div class="col-2">
                <validated-input v-model="model.protein" label="Protein %" :rules="rules.positiveOnly" type="number"></validated-input>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-2">
                <validated-checkbox v-model="model.dnb" label="DNB"></validated-checkbox>
            </div>
        </div>

        <div class="row mt-lg-8">
            <div class="col-12">
                <div class="fl-x fl-j-e">
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
// import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';
// import CustomTwoColumnTable from '../../../components/ui/CustomTwoColumnTable';
// import DailyMilkRecordingTable from './DailyMilkRecordingTable';

export default {
    name: 'DailyMilkRecording',
    // components: { DailyMilkRecordingTable, CustomTwoColumnTable },
    // components: { CustomTwoColumnTable },
    data () {
        return {
            fileInputKey: 0,
            dateInputKey: 0,
            loading: false,
            loadingData: false,
            tableLoading: false,
            URL: urls.daily_milk_recording.addEdit,
            model: {
                cow: '',
                milk_date: '',
                milk_record_file: '',
                fat: '',
                snf: '',
                somatic_cell_count: '',
                protein: '',
                dnb: '',
                remarks: '',
                saved_flag: false

            },
            rules: {
                Futurevalidation: {
                    required: true,
                    customValidator: () => {
                        return this.validationFuture();
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            },
            // cowOptions: urls.cows.vueSelect,
            details: [],
            table_details: [],
            cows_data: [],
            cow_name: '',
            table_id: ''
            // cowOptions: []
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/cows-daily-milk-recording-list/' });
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        clearData () {
            this.model.cow = '';
            this.model.milk_record_file = '';
            this.model.fat = '';
            this.model.milk_date = '';
            this.model.snf = '';
            this.model.somatic_cell_count = '';
            this.model.protein = '';
            this.model.dnb = '';
            this.model.remarks = '';
            this.$refs.fileInput.text = '';
            this.$refs.form.reset();
        },
        async loadDetails () {
            this.model.cow = '';
            this.model.milk_record_file = '';
            this.loadingData = true;
            const response = await axios.get(urls.daily_milk_recording.cowDetails + '?milk_date=' + this.model.milk_date);
            this.details = response.data.details;
            this.table_details = response.data.cows_data;
            this.tableLoading = true;
            // this.cowOptions = response.data.data;
            this.loadingData = false;
        },
        async loadTableDetails () {
            this.model.cow = '';
            this.cow_name = '';
            const response = await axios.form(urls.daily_milk_recording.excelUpload, this.model);
            if (response.data.errors) {
                this.loading = false;
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
                        alert(errorMessage);
                    }
                }
            } else {
                this.table_details = response.data.cows_data;
                this.tableLoading = true;
                if (response.data.message) {
                    this.$notify(response.data.message, 'Success', { type: 'success' });
                }
                this.model.milk_record_file = '';
                this.fileInputKey += 1;
                // this.cowOptions = response.data.data;
            }
        },
        async clickedCow (index) {
            const indexToFetch = index;
            const data = this.table_details;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.model.cow = dataItem.cow_id;
                this.id = dataItem.id;
                this.cow_name = dataItem.cow_name;
            }
        },
        validationFuture () {
            const dob = this.model.milk_date;

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dobDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(urls.daily_milk_recording.loadAfterSave, this.model);
                const result = response.data;
                if (result.success) {
                    if (result.errors) {
                        const errors = response.data.errors;
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                let errorMessage = '';
                                if (key === '__all__') {
                                    errorMessage = `${errors[key]}`;
                                } else {
                                    errorMessage = `${key}:  ${errors[key]}`;
                                }
                                this.$notify('Added Successfully', 'Success', { type: 'success' });
                                this.$notify(errorMessage, 'Warning', { type: 'warning' });
                            }
                        }
                        this.loading = false;
                        this.table_details = response.data.cows_data;
                        this.model.cow = '';
                        this.model.remarks = '';
                        this.model.milk_record_file = '';
                        this.cow_name = '';
                        this.cowOptions = response.data.data;
                        this.model.fat = '';
                        this.model.snf = '';
                        this.model.somatic_cell_count = '';
                        this.model.protein = '';
                        this.model.dnb = '';
                        this.$refs.fileInput.text = '';
                        this.model.milk_date = '';
                        this.dateInputKey += 1;
                    } else {
                        this.$notify('Added Successfully', 'Success', { type: 'success' });
                        await this.loadDetails();
                        /* this.$router.push({ path: '/ah-section/' }); */
                    }
                    this.table_details = response.data.cows_data;
                    this.model.cow = '';
                    this.model.remarks = '';
                    this.model.milk_record_file = '';
                    this.cow_name = '';
                    this.cowOptions = response.data.data;
                    this.model.fat = '';
                    this.model.snf = '';
                    this.model.somatic_cell_count = '';
                    this.model.protein = '';
                    this.model.dnb = '';

                    this.$refs.fileInput.text = '';
                    this.loading = false;
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

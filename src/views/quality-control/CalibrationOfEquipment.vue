<template>
    <div class="color-txt">
        <s-form :key="formKey" @submit="addItem">
        <div>
            <div class="row fl-x fl-j-sb ml-1 mr-2">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Calibration of Equipment</h2>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="row mt-5">
                    <div class="col-lg-2 pl-0">
                        <validated-ajax-vue-select :url="equipmentOptions" @input="loadDetails" v-model="model.equipment" class="c-input-select " label="List of Equipment">
                        </validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-2">

                        <validated-input v-model="model.equipment_cost" label="Cost of Equipment" type="number" :rules="rules.positiveOnly"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-date-picker  format="DD-MM-YYYY" v-model="model.calibration_date" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black"
                                               label="Date of Calibration" :rules="rules.CalibrationValidation"></validated-date-picker>

                    </div>
                    <div class="col-lg-2">
                        <validated-date-picker format="DD-MM-YYYY" v-model="model.amc_date" class="c-input-datepicker  text-black"
                                               label="Date of AMC"></validated-date-picker>
                    </div>
                    <div class="col-lg-2">
                        <validated-date-picker format="DD-MM-YYYY" v-model="model.warranty_start_date" class="c-input-datepicker text-black "
                                               label="Warranty Start Date " :rules="rules.startDate"></validated-date-picker>
                    </div>
                    <div class="col-lg-2">
                        <validated-date-picker format="DD-MM-YYYY" v-model="model.warranty_end_date" class="c-input-datepicker text-black"
                                               label="Warranty End Date " :rules="rules.endDate"></validated-date-picker>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-4 ">
                    <div class="card p-0  bs-4 border-r-1 of-h mh236 bg-gray">
                        <div class="bg-white pt-3 pb-2">
                            <h5 class="text-center bg-2 font-poppins-medium fs-lg-1 text-primary">Details</h5>

                        </div>
                        <div class="p-2">
                            <div class="row mt-3  pb-4">
                                <div class="col-12 list-contain">
                                    <slot></slot>
                                    <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                                        <li><span>Last Calibration Date&nbsp;&nbsp; :&nbsp;&nbsp;</span><span
                                            class="text-primary">{{ last_cal_date }}</span></li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-8">
                    <div class="row  ">
                        <div class="col-lg-3">
                            <validated-date-picker format="DD-MM-YYYY" v-model="model.calibration_due_date" class="text-black  c-input-datepicker "
                                                   label="Due Date of Calibration" :rules="rules.duedateValidation"></validated-date-picker>
                        </div>
                        <div class="col-lg-3">
                            <validated-date-picker format="DD-MM-YYYY" v-model="model.amc_due_date" class="c-input-select circle text-black "
                                                   label="Due Date of AMC" :rules="rules.amcDueDateValidation"></validated-date-picker>

                        </div>
                        <div class="col-lg-3 ">
                            <validated-input class=" text-black " type="number" v-model="model.amc_cost" label="Cost of AMC" :rules="rules.positiveOnly"></validated-input>
                        </div>

                    </div>
                    <div class="row ">
                        <div class="col-lg-2  mt-3  ">
                            <validated-file-input :key="fileInputKey" label="Calibration Report" v-model="model.calibration_report" label-text="Upload file" :rules="{ customValidator: validateFileSize }" @input="onFileChange"></validated-file-input>
                            <p style="font-size:small; width: 12rem">Note: Upload file below 2 MB</p>
                        </div>
                    </div>

                    <div class="row  ">
                        <div class="col-lg-3 ">
                            <validated-input class="text-black mt-1" v-model="model.remarks"
                                             label="Remarks"></validated-input>
                        </div>
                        <div class="col-3">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group mt-4">
                    <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                    <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                    </div>
                </div>

                    </div>
                </div>
<!--            </div>-->
<!--            <div class="row mt-lg-7">-->

            </div>
        </div>
        <div>
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" search-placeholder="Collection Date">
            </vue-table>
        </div>
<!--            <div class="column mt-4">-->
<!--&lt;!&ndash;        <div class="col-lg-12 ">&ndash;&gt;-->
<!--                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto">-->
<!--&lt;!&ndash;                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg&#45;&#45;1">Milk Disposal</div>&ndash;&gt;-->
<!--                        <table style="width:100%" class="c-table-1" v-if="viewData.length">-->
<!--                            <thead>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Equipment</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Calibration Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">AMC Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Warranty Start Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Warranty End Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Calibration Due Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">AMC Due Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Equipment Cost</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">AMC Cost</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Calibration Report</h5></th>-->
<!--                            </thead>-->
<!--                            <tbody class="">-->
<!--                            <tr v-for="(item, i) in paginatedData" :key="i">-->
<!--                                <td>{{ item.equipment ? item.equipment.name : '-' }}</td>-->
<!--                                <td>{{ item.calibration_date }}</td>-->
<!--                                <td>{{ item.amc_date }}</td>-->
<!--                                <td>{{ item.warranty_start_date }}</td>-->
<!--                                <td>{{ item.warranty_end_date }}</td>-->
<!--                                <td>{{ item.calibration_due_date }}</td>-->
<!--                                <td>{{ item.amc_due_date }}</td>-->
<!--                                <td>{{ item.equipment_cost }}</td>-->
<!--                                <td>{{ item.amc_cost }}</td>-->
<!--                                <td>-->
<!--                                  <a-->
<!--                                    :href="item.calibration_report"-->
<!--                                    target="_blank"-->
<!--                                    rel="noopener noreferrer"-->
<!--                                    v-if="item.calibration_report"-->
<!--                                  >-->
<!--                                    {{ getFileName(item.calibration_report) }}-->
<!--                                  </a>-->
<!--                                  <span v-else>-</span>-->
<!--                                </td>-->

<!--                            </tr>-->
<!--                            </tbody>-->

<!--                        </table>-->
<!--                        <div class="pagination text-center" v-if="viewData.length">-->
<!--                            <btn-group class="ml-2">-->
<!--                              <btn type="button" class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                              <btn type="button" class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                </btn-group>-->
<!--                        </div>-->

<!--                    </div>-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--        </div>-->
        </s-form>

    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
export default {
    name: 'CalibrationOfEquipment',
    data () {
        return {
            loading: false,
            URL: urls.equipment_calibration.addEdit,
            listURL: urls.equipment_calibration.list,
            fields: [
                {
                    name: 'equipment.name',
                    sortField: 'equipment.name',
                    title: 'Equipment'
                },
                {
                    name: 'calibration_date',
                    sortField: 'calibration_date',
                    title: 'Calibration Date'
                },
                {
                    name: 'amc_date',
                    sortField: 'amc_date',
                    title: 'AMC Date'
                },
                {
                    name: 'warranty_start_date',
                    sortField: 'warranty_start_date',
                    title: 'Warranty Start Date'
                },
                {
                    name: 'warranty_end_date',
                    sortField: 'warranty_end_date',
                    title: 'Warranty End Date'
                },
                {
                    name: 'calibration_due_date',
                    sortField: 'calibration_due_date',
                    title: 'Calibration Due Date'
                },
                {
                    name: 'amc_due_date',
                    sortField: 'amc_due_date',
                    title: 'AMC Due Date'
                },
                {
                    name: 'equipment_cost',
                    sortField: 'equipment_cost',
                    title: 'Equipment Cost'
                },
                {
                    name: 'amc_cost',
                    sortField: 'amc_cost',
                    title: 'AMC Cost'
                },
                {
                    name: 'calibration_report',
                    sortField: 'calibration_report',
                    title: 'Calibration Report'
                }
            ],
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            fileInputKey: 0,
            formKey: 0,
            model: {
                equipment: '',
                equipment_cost: '',
                calibration_date: '',
                amc_date: '',
                warranty_start_date: '',
                warranty_end_date: '',
                calibration_due_date: '',
                amc_due_date: '',
                amc_cost: '',
                remarks: '',
                calibration_report: ''
            },
            rules: {
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
                // CalibrationValidation: {
                //     required: false,
                //     customValidator: (value) => {
                //         return this.Validation(value);
                //     }
                // },
                // startDate: {
                //     required: false,
                //     customValidator: () => {
                //         return this.startDateValidation();
                //     }
                // },

                // endDate: {
                //     required: false,
                //     customValidator: (value) => {
                //         return this.endDateValidation(value);
                //     }
                // },
                // duedateValidation: {
                //     required: false,
                //     customValidator: (value) => {
                //         return this.dueDateValidation(value);
                //     }
                // },
                // amcDueDateValidation: {
                //     required: false,
                //     customValidator: (value) => {
                //         return this.amcDueDateValidation(value);
                //     }
                // }

            },
            last_cal_date: '',
            equipmentOptions: masterURLs.master.equipment.vueSelect
        };
    },
    mounted () {
        this.loadData();
    },
    computed: {
        paginatedData () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.viewData.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.viewData.length / this.itemsPerPage);
        }
    },
    methods: {
        validateFileSize (file) {
            const MAX_SIZE = 2 * 1024 * 1024;
            if (!file) return true;
            if (file.size > MAX_SIZE) {
                return 'File size exceeded. Maximum size is 2 MB';
            }
            return true;
        },
        onFileChange (file) {
            const MAX_SIZE = 2 * 1024 * 1024;

            if (file && file.size > MAX_SIZE) {
                this.$notify(
                    'File size exceeded. Maximum size is 2 MB',
                    'Warning',
                    { type: 'warning' }
                );
                this.model.calibration_report = '';
                this.fileInputKey++;
            }
        },
        nextPage () {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage () {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        async loadData () {
            this.viewData = [];
            const response = await axios.get(urls.equipment_calibration.list);
            this.viewData = response.data.data;
            console.log('response', this.data);
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        amcDueDateValidation (data) {
            const receipt = this.model.amc_date;

            const aiDateParts = data.split('-');
            if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(aiDateParts[0], 10);
            const aiMonth = parseInt(aiDateParts[1], 10);
            const aiYear = parseInt(aiDateParts[2], 10);

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);
            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(receiptDay) || isNaN(receiptMonth) || isNaN(receiptYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);
            const DateObj = new Date(aiYear, aiMonth - 1, aiDay);
            if (DateObj < receiptDateObj) {
                return 'Due Date of AMC should be After the Date of AMC .';
            }
            /* const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            } */

            return true;
        },
        startDateValidation () {
            const receipt = this.model.warranty_start_date;

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);

            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        endDateValidation (data) {
            const receipt = this.model.warranty_start_date;

            const aiDateParts = data.split('-');
            if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(aiDateParts[0], 10);
            const aiMonth = parseInt(aiDateParts[1], 10);
            const aiYear = parseInt(aiDateParts[2], 10);

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);
            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(receiptDay) || isNaN(receiptMonth) || isNaN(receiptYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);
            const DateObj = new Date(aiYear, aiMonth - 1, aiDay);
            if (DateObj < receiptDateObj) {
                return 'Warranty end date should be After the Warranty start date .';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        dueDateValidation (data) {
            const receipt = this.model.calibration_date;

            const aiDateParts = data.split('-');
            if (aiDateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(aiDateParts[0], 10);
            const aiMonth = parseInt(aiDateParts[1], 10);
            const aiYear = parseInt(aiDateParts[2], 10);

            const receiptParts = receipt.split('-');
            if (receiptParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const receiptDay = parseInt(receiptParts[0], 10);
            const receiptMonth = parseInt(receiptParts[1], 10);
            const receiptYear = parseInt(receiptParts[2], 10);
            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(receiptDay) || isNaN(receiptMonth) || isNaN(receiptYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }
            const receiptDateObj = new Date(receiptYear, receiptMonth - 1, receiptDay);
            const DateObj = new Date(aiYear, aiMonth - 1, aiDay);
            if (DateObj < receiptDateObj) {
                return 'Due Date of Calibration should be After the Date of Calibration .';
            }
            /* const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (receiptDateObj > currentDate) {
                return 'Future Date not allowed.';
            } */

            return true;
        },

        Validation (date) {
            const lastcalibrationdate = this.last_cal_date;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);
            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const lastcalibrationdateParts = lastcalibrationdate.split('-');
            if (lastcalibrationdateParts.length !== 3) {
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (dateObj > currentDate) {
                    return 'Future Date not allowed.';
                }
                return true;
            }
            const lastcalibrationdateDay = parseInt(lastcalibrationdateParts[0], 10);
            const lastcalibrationdateMonth = parseInt(lastcalibrationdateParts[1], 10);
            const lastcalibrationdateYear = parseInt(lastcalibrationdateParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(lastcalibrationdateDay) || isNaN(lastcalibrationdateMonth) || isNaN(lastcalibrationdateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const lastcalibrationdateDateObj = new Date(lastcalibrationdateYear, lastcalibrationdateMonth - 1, lastcalibrationdateDay);

            if (dateObj < lastcalibrationdateDateObj) {
                return 'Date should be after the Last Calibration Date.';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        async loadDetails () {
            this.last_cal_date = '';
            const response = await axios.form(urls.equipment_calibration.lastDetails, this.model);
            const data = response.data.data;
            this.last_cal_date = data.last_cal_date;
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        async addItem () {
            try {
                if (this.model.calibration_report) {
                    const file = this.model.calibration_report;
                    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

                    if (file.size && file.size > MAX_SIZE) {
                        this.$notify('File size exceeded. Maximum size is 2 MB', 'Warning', { type: 'warning' });
                        return;
                    }
                }
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.model.equipment = '';
                    this.model.equipment_cost = '';
                    this.model.amc_date = '';
                    this.model.amc_cost = '';
                    this.model.amc_due_date = '';
                    this.model.warranty_end_date = '';
                    this.model.warranty_start_date = '';
                    this.model.calibration_report = '';
                    this.model.calibration_date = '';
                    this.model.calibration_due_date = '';
                    this.model.remarks = '';
                    this.last_cal_date = '';
                    this.fileInputKey++;
                    this.formKey++;
                    this.loadData();
                    await this.$router.push({ path: '/calibration-of-equipment/' });
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

<style scoped lang="scss">
.mh236 {
    min-height: 236px;
}

.bg-white {
    background-color: white;
}

.bg-gray {
    background-color: gainsboro !important;
}

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

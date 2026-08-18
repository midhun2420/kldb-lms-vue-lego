<template>
    <div class="color-txt">
        <s-form :key="formKey" @submit="addItem">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Testing of AI Sheath</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" label="Date" class="text-black c-input-datepicker field-required" v-model="model.test_date" :rules="rules.common"></validated-date-picker>
            </div>
            <div class="col-lg-2">
<!--                <validated-select-->
<!--                    :options="sampleNoOption"-->
<!--                    label="Sample No" class="text-black c-input-select" v-model="model.sample_no"></validated-select>-->
                <validated-input
                    label="Sample No" class="text-black" v-model="model.sample_no"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Lot No" class="text-black" v-model="model.lot_no" :rules="rules.positiveOnly" type="number"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Purchase Type" class="text-black" v-model="model.purchase_type"></validated-input>
            </div>
        </div>
        <div class="pt-3 row">
            <div class="col-lg-2">
                <validated-file-input :key="fileInputKey" label-text="Upload file" class="w-10r" v-model="model.test_report" :rules="{ customValidator: validateFileSize }"></validated-file-input>
                <p style="font-size:small; width: 12rem">Note: Upload file below 2 MB</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-2 mt-2">
                <div class="form-group ">
                    <validated-input class="" placeholder="" label="Remarks" v-model="model.remarks"></validated-input>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel"  type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>

            </s-form>
        <div class="mt-4">
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" search-placeholder="Sample No">
                <template slot="test_report" slot-scope="props">
                    <a
                        v-if="props.rowData.test_report"
                        :href="props.rowData.test_report"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ getFileName(props.rowData.test_report) }}
                    </a>
                    <span v-else>-</span>
                </template>
            </vue-table>
        </div>
<!--        <div class="column fl-x mt-4"  v-if="viewData.length">-->
<!--        <div class="col-lg-12 ">-->
<!--                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto">-->
<!--&lt;!&ndash;                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg&#45;&#45;1">Milk Disposal</div>&ndash;&gt;-->
<!--                        <table style="width:100%" class="c-table-1" v-if="viewData.length">-->
<!--                            <thead>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Test Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Sample No</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Lot No</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Purchase Type</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Report</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Remarks</h5></th>-->
<!--                            </thead>-->
<!--                            <tbody class="">-->
<!--                            <tr v-for="(item, i) in paginatedData" :key="i">-->
<!--                                <td>{{ item.test_date }}</td>-->
<!--                                <td>{{ item.sample_no }}</td>-->
<!--                                <td>{{ item.lot_no }}</td>-->
<!--                                <td>{{ item.purchase_type }}</td>-->

<!--                                <td>-->
<!--                                  <a-->
<!--                                    :href="item.test_report"-->
<!--                                    target="_blank"-->
<!--                                    rel="noopener noreferrer"-->
<!--                                    v-if="item.test_report"-->
<!--                                  >-->
<!--                                    {{ getFileName(item.test_report) }}-->
<!--                                  </a>-->
<!--                                  <span v-else>-</span>-->
<!--                                </td>-->
<!--                                <td>{{ item.remarks }}</td>-->

<!--                            </tr>-->
<!--                            </tbody>-->

<!--                        </table>-->
<!--                        <div class="pagination text-center" v-if="viewData.length">-->
<!--                            <btn-group class="ml-2">-->
<!--                              <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                              <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                </btn-group>-->
<!--                        </div>-->

<!--                    </div>-->
<!--                </div>-->
<!--        </div>-->
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'TestingOfAiSheathPage',
    data () {
        return {
            loading: false,
            URL: urls.aisheath_test.addEdit,
            listURL: urls.aisheath_test.list,
            fields: [
                {
                    name: 'test_date',
                    title: 'Test Date'
                },
                {
                    name: 'sample_no',
                    title: 'Sample No'
                },
                {
                    name: 'lot_no',
                    title: 'Lot No'
                },
                {
                    name: 'purchase_type',
                    title: 'Purchase Type'
                },
                {
                    name: '__slot:test_report',
                    title: 'Report'

                },
                {
                    name: 'remarks',
                    title: 'remarks'
                }
            ],
            sampleNoOption: [
                { label: 'Large ', value: 'Large' },
                { label: 'Medium ', value: 'Medium' },
                { label: 'Small ', value: 'Small' }
            ],
            viewData: [],
            // currentPage: 1,
            // itemsPerPage: 10,
            fileInputKey: 0,
            formKey: 0,
            model: {
                test_date: '',
                sample_no: '',
                lot_no: '',
                purchase_type: '',
                test_report: '',
                remarks: ''

            },
            rules: {
                positiveOnly: {
                    // required: true,
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
            }
        };
    },
    // mounted () {
    //     this.loadData();
    // },
    // computed: {
    //     paginatedData () {
    //         const start = (this.currentPage - 1) * this.itemsPerPage;
    //         return this.viewData.slice(start, start + this.itemsPerPage);
    //     },
    //     totalPages () {
    //         return Math.ceil(this.viewData.length / this.itemsPerPage);
    //     }
    // },
    methods: {
        validateFileSize (file) {
            const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

            if (!file) return true;

            if (file.size > MAX_SIZE) {
                return 'File size exceeded. Maximum size is 2 MB';
            }

            return true;
        },
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        // nextPage () {
        //     if (this.currentPage < this.totalPages) {
        //         this.currentPage++;
        //     }
        // },
        // prevPage () {
        //     if (this.currentPage > 1) {
        //         this.currentPage--;
        //     }
        // },
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        // async loadData () {
        //     this.viewData = [];
        //     const response = await axios.get(urls.aisheath_test.list);
        //     this.viewData = response.data.data;
        //     console.log('response', this.data);
        // },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }
            return true;
        },
        validationDate () {
            const checkDate = this.model.test_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
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
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.model.remarks = '';
                    this.model.lot_no = '';
                    this.model.purchase_type = '';
                    this.model.sample_no = '';
                    this.model.test_date = '';
                    this.model.test_report = '';
                    this.fileInputKey++;
                    this.formKey++;
                    this.loadData();
                    await this.$router.push({ path: '/testing-Of-ai-sheath-page/' });
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

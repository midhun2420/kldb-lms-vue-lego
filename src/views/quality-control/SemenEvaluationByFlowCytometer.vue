<template>
    <div class="row">

        <div class="column-6">
        <s-form :key="formKey" @submit="addItem">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary mb-4">Semen Evaluation By Flow
                Cytometer</h2>
            <div class="row mb-4">
                <div class="col-lg-4">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday"
                                           class="c-input-datepicker  text-black  field-required"
                                           label="Date of Test" v-model="model.test_date"
                                           :rules="rules.common"></validated-date-picker>
                </div>

                <div class="col-lg-4">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker  text-black field-required"
                                           label="Date of Production" v-model="model.production_date"
                                           @input="loadDetails"
                                           :rules="rules.compare"></validated-date-picker>
                </div>
            </div>
                <div class="row">
                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto col-12" v-if="tableLoading">
                        <table class="c-table-1" style="width:100%">
                            <th class=""><h5 class="w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Bull No</h5></th>
                            <th class=""><h5 class="w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Bull Name</h5></th>
                            <th class=""><h5 class="w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Breed</h5></th>
                            <th class=""><h5  class="w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">EJ No</h5></th>
                            <th class=""><h5  class="w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Position</h5></th>
                            <tr class="mt-3" v-if="loadingData">
                                <td colspan="4">Please wait while fetching the data...</td>
                            </tr>
                            <tr v-if="!loadingData && bullsList.length === 0" class="text-center">
                                <td colspan="11" class="mt-3"> No data</td>
                            </tr>
                            <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.bull.bull_name }}</td>
                                <td>{{ item.bull.breed }}</td>
                                <td>{{ item.ejaculation_no }}</td>
                                <td>{{ item.position }}</td>
<!--                                <td>{{ item.position }}</td>-->
                            </tr>
                        </table>
                    </div>
                    </div>
            <div class="row">
                    <div class="col-12">
                        <div class="row  ">
                            <div class="col-lg-4">
                                <validated-input label="Bull No" class="text-black field-required"
                                                 v-model="details.bull"
                                                 disabled :rules="{required:true}"></validated-input>
                            </div>
                            <div class="col-lg-4">
                                <validated-input label="Bull Name" class="text-black" v-model="details.bull_name"
                                                 disabled></validated-input>
                            </div>

                        </div>
                        <div class="row  ">
                            <div class="col-lg-4">
                                <validated-input label="Breed" class="text-black" v-model="details.breed"
                                                 disabled></validated-input>
                            </div>
                            <div class="col-lg-4">
                                <validated-input label="Ejaculate No" class="text-black field-required"
                                                 v-model="details.ejaculation_no" disabled
                                                 :rules="{required:true}"></validated-input>
                            </div>
                        </div>
                        <h4 class="head font-poppins-medium mb-0 mt-3 text-primary">Upload Documents</h4>
                        <p class="text-black fs-lg--1">Supported file formats : pdf, jpg, jpeg, png</p>
                        <p class="text-black fs-lg--1 text-danger">*Note*: Upload files below 2 MB</p>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class="text-black">Cell concentration assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.cell_concentration_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class="p text-black">Live and dead cell Eestimation</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.live_death_cell_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Acrosome status assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.acrosome_status_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Mitochondrial status assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.mitochondrial_status_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Bacterial concentration assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.bacterial_concentration_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Sperm structural assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.sperm_structural_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Oxidation assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.oxidation_assay_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Calcium level assesment assay</p>

                            </div>
                            <div class="col-lg-6">
                                <validated-file-input :key="fileInputKey" label="" label-text="Upload file"
                                                      v-model="model.calcium_assessment_file"
                                                      class="w-10r"></validated-file-input>

                            </div>
                             <div class="col-6">
                        <div class="fl-x fl-j-e">
                            <div class="btn-group">
                                <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                                <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                            </div>
                        </div>
                    </div>
                        </div>

                    </div>

                </div>

        </s-form>
    </div>
        <div class="col-6 ml-4" v-if="viewData.length">
                    <div class="row fl-j-e">
                        <btn class="px-4 mt-2" style="cursor: pointer" @click="BackToHome">Back</btn>
                    </div>
                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto mt-6">
<!--                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg&#45;&#45;1">Milk Disposal</div>-->
                        <table style="width:100%" class="c-table-1" v-if="viewData.length">
                            <thead>
                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Test Date</h5></th>
                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Production Date</h5></th>
                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Bull No</h5></th>
                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Ejaculation No</h5></th>
                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Action</h5></th>
                            </thead>
                            <tbody class="">
                            <tr v-for="(item, i) in paginatedData" :key="i">
                                <td>{{ item.test_date }}</td>
                                <td>{{ item.production_date }}</td>
                                <td>{{ item.bull }}</td>
                                <td>{{ item.ejaculate_no }}</td>
                                <td><btn text="view" @click="detailsPage(item.id)" icon="fa fa-eye" size="xs" class="mb-0"></btn></td>

                            </tr>
                            </tbody>

                        </table>
                        <div class="pagination text-center" v-if="viewData.length">
                            <btn-group class="ml-2">
                              <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>
                              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>
                              <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>
                                </btn-group>
                        </div>

                    </div>
                </div>
            </div>

</template>

<script>

// import CustomFiveCoulumnTable from '@components/ui/CustomFiveCoulumnTable';
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'SemenEvaluationByFlowCytometer',
    data () {
        return {
            loading: false,
            tableLoading: false,
            URL: urls.semen_evaluation_cytometer.addEdit,
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            fileInputKey: 0,
            formKey: 0,
            details: {
                bull: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
            },
            model: {
                test_date: '',
                production_date: '',
                bull: '',
                ejaculate_no: '',
                cell_concentration_assay_file: '',
                live_death_cell_assay_file: '',
                acrosome_status_assay_file: '',
                mitochondrial_status_assay_file: '',
                bacterial_concentration_assay_file: '',
                sperm_structural_assay_file: '',
                oxidation_assay_file: '',
                calcium_assessment_file: '',
                remarks: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                compare: {
                    required: true,
                    customValidator: (value) => {
                        return this.CompareDate(value);
                    }
                }
            },
            bullsList: [],
            selectedIndex: '',
            loadingData: false
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
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
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
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        async loadData () {
            this.viewData = [];
            const response = await axios.get(urls.semen_evaluation_cytometer.list);
            this.viewData = response.data.data;
            console.log('response', this.data);
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        detailsPage (id) {
            this.$router.push({ path: '/semen-evaluation-by-flow-cytometer/' + id + '/details/' });
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
        CompareDate () {
            const checkDate = this.model.test_date;
            const prodDate = this.model.production_date;
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const prodDateParts = prodDate.split('-');
            if (prodDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const prodDateDay = parseInt(prodDateParts[0], 10);
            const prodDateMonth = parseInt(prodDateParts[1], 10);
            const prodDateYear = parseInt(prodDateParts[2], 10);

            const prodDateObj = new Date(prodDateYear, prodDateMonth - 1, prodDateDay);
            if (checkDateObj < prodDateObj) {
                return 'Production Date should be less than Test Date.';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (prodDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        async loadDetails () {
            this.details.bull = '';
            this.details.bull_name = '';
            this.details.ejaculation_no = '';
            this.details.breed = '';
            this.model.bull = '';
            this.model.ejaculate_no = '';
            this.loadingData = true;
            const response = await axios.form(urls.post_thaw_motility.collectionDetails, {
                production_date: this.model.production_date,
                filter: 'cytometer'
            });
            this.bullsList = response.data.data;
            this.tableLoading = true;
            this.loadingData = false;
        },
        clickedBull (index) {
            const indexToFetch = index;
            const data = this.bullsList;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.details.bull = dataItem.bull.reg_no;
                this.details.bull_name = dataItem.bull.bull_name;
                this.details.ejaculation_no = dataItem.ejaculation_no;
                this.details.breed = dataItem.bull.breed;
                this.model.bull = dataItem.bull_id;
                this.model.ejaculate_no = dataItem.ejaculation_no;
            }
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
                    this.model.acrosome_status_assay_file = '';
                    this.model.bull = '';
                    this.model.bacterial_concentration_assay_file = '';
                    this.model.test_date = '';
                    this.model.calcium_assessment_file = '';
                    this.model.cell_concentration_assay_file = '';
                    this.model.ejaculate_no = '';
                    this.model.live_death_cell_assay_file = '';
                    this.model.mitochondrial_status_assay_file = '';
                    this.model.oxidation_assay_file = '';
                    this.model.production_date = '';
                    this.model.sperm_structural_assay_file = '';
                    this.details.bull = '';
                    this.details.bull_name = '';
                    this.details.ejaculation_no = '';
                    this.details.breed = '';
                    this.bullsList = [];
                    this.tableLoading = false;
                    this.fileInputKey++;
                    this.formKey++;
                    this.loadData();
                    await this.$router.push({ path: '/semen-evaluation-by-flow-cytometer/' });
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

<style scoped lang="scss">
.bg-gray {
    background-color: gainsboro;
}

.list-items {
    /*li:not(:nth-child(1)) {*/
    li {
        margin-top: var(--spacer-4);
        font-size: 0.9rem;
        font-family: poppins-medium;
    }
}

</style>

<template>
    <div>
        <s-form @submit="addItem">
            <div class="row fl-x fl-j-sb ml-1">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary mb-4">Semen Evaluation By Flow
                Cytometer</h2>
            <div>
                        <btn class="mt-2" style="cursor: pointer" @click="BackToHome">Back</btn>
                    </div>
            </div>
            <div class="row mb-4">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday"
                                           class="c-input-datepicker  text-black  field-required"
                                           label="Date of Test" v-model="viewData.test_date"
                                           :rules="rules.common" disabled=""></validated-date-picker>
                </div>

                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="c-input-datepicker  text-black field-required"
                                           label="Date of Production" v-model="viewData.production_date"
                                           @input="loadDetails"
                                           :rules="rules.compare" disabled=""></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull No" class="text-black field-required"
                                     v-model="viewData.bull"
                                     disabled :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Bull Name" class="text-black" v-model="viewData.bull_name"
                                     disabled></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed" class="text-black" v-model="viewData.breed"
                                     disabled></validated-input>
                </div>
                  <div class="col-lg-2">
                <validated-input label="Ejaculate No" class="text-black field-required"
                                 v-model="viewData.ejaculate_no" disabled
                                 :rules="{required:true}"></validated-input>
            </div>
            </div>

                <div class="row">
<!--                    <div class="col-5" v-if="tableLoading">-->
<!--                        <table class="c-table-2" style="width:100%">-->
<!--                            <th class="text-primary">Bull NO</th>-->
<!--                            <th class="text-primary">Bull Name</th>-->
<!--                            <th class="text-primary">Breed</th>-->
<!--                            <th class="text-primary">EJ No</th>-->
<!--&lt;!&ndash;                            <th class="text-primary">Position</th>&ndash;&gt;-->
<!--                            <tr class="mt-3" v-if="loadingData">-->
<!--                                <td colspan="4">Please wait while fetching the data...</td>-->
<!--                            </tr>-->
<!--                            <tr v-if="!loadingData && bullsList.length === 0" class="text-center">-->
<!--                                <td colspan="11" class="mt-3"> No data</td>-->
<!--                            </tr>-->
<!--                            <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">-->
<!--                                <td>{{ viewData.bull }}</td>-->
<!--                                <td>{{ viewData.bull_name }}</td>-->
<!--                                <td>{{ viewData.breed }}</td>-->
<!--                                <td>{{ viewData.ejaculate_no }}</td>-->
<!--&lt;!&ndash;                                <td>{{ item.position }}</td>&ndash;&gt;-->
<!--&lt;!&ndash;                                <td>{{ item.position }}</td>&ndash;&gt;-->
<!--                            </tr>-->
<!--                        </table>-->
<!--                    </div>-->
                    <div class="col-7">

                        <h4 class="head font-poppins-medium mb-0 mt-3 text-primary">Upload Documents</h4>
<!--                        <p class="text-black fs-lg&#45;&#45;1">Supported file formats : pdf, jpg, jpeg, png</p>-->

                     <div class="row">
                      <div class="col-lg-6">
                        <p class="text-black">Cell concentration assay</p>
                      </div>
                      <div class="col-lg-6">
                         <a
                                    :href="viewData.cell_concentration_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.cell_concentration_assay_file"
                                  >
                                    {{ getFileName(viewData.cell_concentration_assay_file) }}
                                  </a>
                                  <span v-else>-</span>
                          </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class="p text-black">Live and dead cell Eestimation</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.live_death_cell_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.live_death_cell_assay_file"
                                  >
                                    {{ getFileName(viewData.live_death_cell_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Acrosome status assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.acrosome_status_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.acrosome_status_assay_file"
                                  >
                                    {{ getFileName(viewData.acrosome_status_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Mitochondrial status assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.mitochondrial_status_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.mitochondrial_status_assay_file"
                                  >
                                    {{ getFileName(viewData.mitochondrial_status_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Bacterial concentration assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.bacterial_concentration_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.bacterial_concentration_assay_file"
                                  >
                                    {{ getFileName(viewData.bacterial_concentration_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Sperm structural assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.sperm_structural_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.sperm_structural_assay_file"
                                  >
                                    {{ getFileName(viewData.sperm_structural_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Oxidation assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.oxidation_assay_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.oxidation_assay_file"
                                  >
                                    {{ getFileName(viewData.oxidation_assay_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6">
                                <p class=" text-black">Calcium level assesment assay</p>

                            </div>
                            <div class="col-lg-6">
                                <a
                                    :href="viewData.calcium_assessment_file"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    v-if="viewData.calcium_assessment_file"
                                  >
                                    {{ getFileName(viewData.calcium_assessment_file) }}
                                  </a>
                                  <span v-else>-</span>

                            </div>
                        </div>

                    </div>

                </div>

<!--                <div class="row mt-lg-7">-->
<!--                    <div class="col-12">-->
<!--                        <div class="fl-x fl-j-e">-->
<!--                            <div class="btn-group">-->
<!--                                <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>-->
<!--                                <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
        </s-form>
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
            viewData: [],
            URL: urls.semen_evaluation_cytometer.addEdit,
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
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-evaluation-by-flow-cytometer/' });
        },
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        async loadData () {
            this.viewData = [];
            const response = await axios.form(urls.semen_evaluation_cytometer.details, { id: this.$route.params.id });
            this.viewData = response.data.data;
            console.log('response', this.data);
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
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
                    await this.$router.push({ path: '/quality-control/' });
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

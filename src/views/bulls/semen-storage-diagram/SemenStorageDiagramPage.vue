<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Storage Diagram</h2>
             <div class="mr-4" v-if="!isModal">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form>
            <div class="row">

                <div class="col-lg-2">
                    <validated-select v-model="model.storage_type" :options="typeOptions" class="c-input-select"
                                      label="Type" @input="StorageOptions"
                    ></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-select v-model="model.storage_name" class="c-input-select"
                                      :options="storageNameOptions" @input="clearData"
                                      :label="setNoLabel"></validated-select>
                </div>
            </div>
            <div class="row mt-4" v-if="model.storage_type && model.storage_name">
                <!--                <transition-fade>-->
                <div class="col-lg-5">
                    <jumbo-doughnut-apex-chart :storage-name="getLabelByValue(model.storage_name)"
                                               v-if="model.storage_type === 'JUMBO'"
                                               :colors-array="colorsArray"
                                               @item-selected="chartClickEventHandler"/>
                    <omr-doughnut-apex-chart :storage-name="getLabelByValue(model.storage_name)"
                                             v-if="model.storage_type === 'OMR'"
                                             @event-test="chartClickEventHandler"/>
                </div>
                <div class="col-lg-3 fl-y mt-6" key="omr-pyramid" v-if="model.storage_type === 'OMR'">
                    <data-pyramid :chamber="chamberNumber" v-if="chamberNumber"
                                  :filled-data="normalizedData"
                                  @item="loadCanister"></data-pyramid>
                </div>
                <div v-if="showDoseModal" class="dose-modal-overlay">
                  <div class="dose-modal-box">

                    <!-- Header -->
                    <div class="dose-modal-header">
                      <h5>Dose Details</h5>
                      <button class="dose-close-btn" @click="closeDoseModal">&times;</button>
                    </div>

                    <!-- Body -->
                    <div class="dose-modal-body">
                      <div class="dose-row">
                        <span class="label">Bull No</span>
                        <span class="value">{{ selectedDose.title || '' }}</span>
                      </div>

                      <div class="dose-row">
                      <span class="label">{{ selectedDose.date_flag === 'receipt' ? 'Date of Receipt' : 'Production Date' }}</span>
                      <span v-if="productionDates.length > 0" class="value">
                        {{ productionDates.length }} Dates
                        <btn v-if="productionDates.length > 0" icon="fa fa-eye" size="xs" class="view-link" @click.prevent="showProductionDates = true"></btn>
<!--                        <a href="#" class="view-link" @click.prevent="showProductionDates = true">-->
<!--                          View-->
<!--                        </a>-->
                      </span>
                    </div>

                    <!-- Small modal / popup -->
                    <div v-if="showProductionDates && productionDates.length >0" class="mini-modal">
                      <div class="mini-modal-box fl-eqh-r">
                          <li v-for="(date, index) in productionDates" :key="index">
                            {{ date }}
                          </li>
                        <btn class="btn btn-xs btn-primary mt-2" @click="showProductionDates = false">
                          Close
                        </btn>
                      </div>
                    </div>
                      <div class="dose-row">
                        <span class="label">Ejaculation No</span>
                        <span class="value">{{ selectedDose.ejaculation_no || '' }}</span>
                      </div>

                      <div class="dose-row">
                        <span class="label">Dose Count</span>
                        <span class="value">{{ selectedDose.dose }}</span>
                      </div>

                      <hr />

                      <div class="dose-row">
                        <span class="label">Quarantine</span>
                        <span
                          class="status"
                          :class="selectedDose.is_quarantine ? 'status-no' : 'status-yes'"
                        >
                          {{ selectedDose.is_quarantine ? 'Yes' : 'No' }}
                        </span>
                      </div>

                      <div class="dose-row">
                        <span class="label">Clubbed</span>
                        <span
                          class="status"
                          :class="selectedDose.is_clubbed ? 'status-yes' : 'status-no'"
                        >
                          {{ selectedDose.is_clubbed ? 'Yes' : 'No' }}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-lg-4 fl-y fl-j-c">

                    <div>
                        <div class="card text-center" v-if="jumboLoading">
                            <loading-horizontal dot-background="rgb( 57,84,164 )"/>
                        </div>
                        <div class="card text-center text-primary p-0"
                             v-else-if="jumboTableData && !jumboLoading &&
                                jumboTableData.length === 0 &&
                                chamberNumber &&
                                model.storage_type === 'JUMBO'">
                            <div class="fl-te-c pt-2 px-3 py-2 bg-primary">
                                <p class="text-white w-100p m-0 text-center font-poppins-semibold">Chamber {{ chamberNumber }}</p>
                            </div>
                            <div class="p-3">
                                <h5 class="mt-3 mb-3"> - Empty - </h5>
                            </div>
                        </div>
                        <div v-else>
                            <transition-fade>
                                <chart-table key="jumbo-table" v-if="!jumboLoading && chamberNumber && model.storage_type === 'JUMBO'" :fields="tableFields" :data="jumboTableData">
                                    <template #heading>
                                        <p class="text-white w-100p m-0 text-center font-poppins-semibold">Chamber {{ chamberNumber }}</p>
                                    </template>
                                    <template #chamber="{rowData}">
                                        <div class="py-1 text-primary font-poppins-extra-bold fs-lg-1">{{ rowData.chamber }}</div>
                                    </template>
                                   <template #data="{ rowData }">
                                      <div class="dose-row-line">
                                        <div class="dose-title">
                                          <strong>Large :</strong><span>{{ rowData.large.title }}</span>
                                        </div>
                                        <div class="dose-count">
                                          {{ rowData.large.dose }}
                                        </div>
                                        <div class="dose-action">
                                          <btn v-if="hasDose(rowData.large.dose)" @click="openDoseModal(rowData.large)" icon="fa fa-eye" size="xs"/>
                                        </div>
                                      </div>

                                      <div class="dose-row-line">
                                        <div class="dose-title">
                                          <strong>Small :</strong><span>{{ rowData.small.title }}</span>
                                        </div>
                                        <div class="dose-count">
                                          {{ rowData.small.dose }}
                                        </div>
                                        <div class="dose-action">
                                          <btn v-if="hasDose(rowData.small.dose)" @click="openDoseModal(rowData.small)" icon="fa fa-eye" size="xs"/>
                                        </div>
                                      </div>
                                   </template>

                                </chart-table>
                            </transition-fade>
                        </div>
                    </div>
                    <div>
                        <div class="card text-center" v-if="omrLoading">
                            <loading-horizontal dot-background="rgb( 57,84,164 )"/>
                        </div>
                        <div class="card text-center text-primary p-0"
                             v-if="omrTableData && !omrLoading &&
                                omrTableData.length === 0 &&
                                chamberNumber && canisterNumber &&
                                model.storage_type === 'OMR'">
                            <div class="fl-te-c pt-2 px-3 py-2 bg-primary">
                                <p class="text-white w-100p m-0 py-1 text-center" v-html="getName(chamberNumber, canisterNumber)"></p>
                            </div>
                            <div class="p-3">
                                <h5 class="mt-3 mb-3"> - Empty - </h5>
                            </div>
                        </div>
                        <div v-else>
                            <transition-fade>
                                <chart-table key="omr-table"
                                             v-if="!omrLoading && chamberNumber&& canisterNumber && model.storage_type === 'OMR'"
                                             :fields="tableFields" :data="omrTableData">
                                    <template #heading>
                                        <p class="text-white w-100p m-0 py-1 text-center" v-html="getName(chamberNumber, canisterNumber)"></p>
                                    </template>
                                    <template #chamber="{rowData}">
                                        <div class="py-1 text-primary font-poppins-extra-bold fs-lg-1">{{ rowData.chamber }}</div>
                                    </template>
                                    <template #data="{ rowData }">
                                      <div class="dose-row-line">
                                        <div class="dose-title">
                                          <strong>Large :</strong><span>{{ rowData.large.title }}</span>
                                        </div>
                                        <div class="dose-count">
                                          {{ rowData.large.dose }}
                                        </div>
                                        <div class="dose-action">
                                          <btn v-if="hasDose(rowData.large.dose)" @click="openDoseModal(rowData.large)" icon="fa fa-eye" size="xs"/>
                                        </div>
                                      </div>

                                      <div class="dose-row-line">
                                        <div class="dose-title">
                                          <strong>Small :</strong><span>{{ rowData.small.title }}</span>
                                        </div>
                                        <div class="dose-count">
                                          {{ rowData.small.dose }}
                                        </div>
                                        <div class="dose-action">
                                          <btn v-if="hasDose(rowData.small.dose)" @click="openDoseModal(rowData.small)" icon="fa fa-eye" size="xs"/>
                                        </div>
                                      </div>
                                   </template>
                                </chart-table>
                            </transition-fade>
                        </div>
                    </div>

                </div>
                <!--                </transition-fade>-->
            </div>
            <div class="row mt-3 ml-lg-6" v-if="model.storage_name && model.storage_type === 'OMR'">
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-lg-2">
                            <chart-labels text="A - vaccant" box-bg-color="8"></chart-labels>
                        </div>
                        <div class="col-lg-2">
                            <chart-labels text="A - filled" box-bg-color="9" class=""></chart-labels>

                        </div>
                        <div class="col-lg-2">
                            <chart-labels text="Upto B - filled" box-bg-color="5" class=""></chart-labels>

                        </div>
                        <div class="col-lg-2">
                            <chart-labels text="Upto C - filled" box-bg-color="11" class=""></chart-labels>

                        </div>
                        <div class="col-lg-2">
                            <chart-labels text="Upto D - filled" box-bg-color="12" class=""></chart-labels>

                        </div>
                        <div class="col-lg-2">
                            <chart-labels text="Upto E - Filled" box-bg-color="10" class=""></chart-labels>

                        </div>
                    </div>
                </div>

            </div>
        </s-form>
    </div>
</template>

<script>
import ChartLabels from '@/views/bulls/semen-storage-diagram/components/chart-components/ChartLabels';
// import DetailsTableOne from '@/views/bulls/semen-storage-diagram/components/chart-components/DetailsTableOne';
// import DetailsTableTwo from '@/views/bulls/semen-storage-diagram/components/chart-components/DetailsTableTwo';
import ChartTable from '../../../components/details-page/chart-table';
import JumboDoughnutApexChart from './components/chart-components/JumboDoughnutApexChart';
import OmrDoughnutApexChart from './components/chart-components/OmrDoughnutApexChart';
import DataPyramid from './components/chart-components/data-Pyramid';
import axios from 'secure-axios';
import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';

export default {
    name: 'SemenStorageDiagramPage',
    components: {
        DataPyramid,
        OmrDoughnutApexChart,
        JumboDoughnutApexChart,
        ChartLabels,
        ChartTable
    },
    props: {
        isModal: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            bgColor1: '#f7f7f7',
            textColor1: 'blue',
            bgColor2: '#f7f7f7',
            textColor2: 'black',
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            typeOptions: [
                {
                    label: 'OMR',
                    value: 'OMR'
                },
                {
                    label: 'JUMBO',
                    value: 'JUMBO'
                }
            ],
            model: {
                storage_type: '',
                storage_name: '',
                chamber: ''
            },
            CountModel: {
                storage_type: '',
                storage_name: '',
                chamberNumber: ''
            },
            normalizedData: [],
            colorsArray: [],
            countData: [],
            storageNameOptions: [],
            chamberNumber: '',
            canisterNumber: '',
            result: [],
            jumboLoading: false,
            omrLoading: false,
            countLoading: false,
            showProductionDates: false,
            tableFields: [
                {
                    name: '__slot:chamber',
                    title: '',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset d-none',
                    dataClass: 'text-2 my-3  mb-3 w-5r fs-lg-0 h-80p mt-n3 bt-1 b-dark'
                },
                {
                    name: '__slot:data',
                    title: '',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset d-none',
                    dataClass: 'text-2 my-3 w-30r  fs-lg-0 h-80p mt-n3 bt-1 b-dark'
                }
            ],
            jumboTableData: [],
            omrTableData: [],
            pattern: ['A1', 'B1', 'B2', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'D4', 'E1', 'E2', 'E3', 'E4', 'E5', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6'],
            showDoseModal: false,
            selectedDose: {}
        };
    },
    computed: {
        productionDates () {
            if (!this.selectedDose.production_date) return [];
            return this.selectedDose.production_date.split(',');
        },
        setNoLabel () {
            if (this.model.storage_type === 'JUMBO') {
                return 'JUMBO NO';
            } else if (this.model.storage_type === 'OMR') {
                return 'OMR NO';
            } else {
                return 'NO';
            }
        }
    },
    watch: {
        'model.storage_type': 'a',
        'model.storage_name': 'b',
        'model.chamber': 'checkLoadData',
        canisterNumber: 'checkLoadData',
        chamberNumber: 'c',
        'CountModel.chamberNumber': 'checkCountData',
        'CountModel.storage_type': 'checkCountData',
        'CountModel.storage_name': 'checkCountData',
        normalizedData: 'renderKeyValuePairs'
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        hasDose (dose) {
            if (!dose) return false;
            const value = parseInt(dose);
            return !isNaN(value) && value > 0;
        },
        openDoseModal (dose) {
            this.selectedDose = dose;
            this.showDoseModal = true;
        },
        closeDoseModal () {
            this.showDoseModal = false;
            this.selectedDose = {};
        },
        chartClickEventHandler (dataPointIndex) {
            // console.log('dataPointIndex: ', dataPointIndex);
            this.chamberNumber = dataPointIndex;
            this.model.chamber = dataPointIndex;
            // console.log('chartClickEventHandler Test', dataPointIndex);
        },
        async StorageOptions () {
            this.model.storage_name = '';
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + this.model.storage_type);
            this.storageNameOptions = response.data.data;
        },
        getLabelByValue (value) {
            const dataArray = this.storageNameOptions;
            const matchedItem = dataArray.find(item => item.value === value);
            return matchedItem ? matchedItem.label : null;
        },
        clearData () {
            this.chamberNumber = '';
        },
        checkCountData () {
            if (this.CountModel.storage_type === 'JUMBO' && !this.CountModel.chamberNumber) {
                this.checkCountJumboData();
            } else {
                this.checkCountOMRData();
            }
        },
        checkCountJumboData () {
            console.log('I am the Problem: checkCountJumboData');
            if (this.CountModel.storage_type === 'JUMBO' && this.CountModel.storage_name !== '') {
                this.loadCountData();
            }
        },
        checkCountOMRData () {
            console.log('I am the Problem: checkCountOMRData');
            if (this.CountModel.storage_type === 'OMR' && this.CountModel.storage_name !== '' && this.chamberNumber) {
                this.loadCountData();
            }
        },
        a () {
            this.CountModel.storage_type = this.model.storage_type;
            this.checkLoadData();
        },
        b () {
            this.CountModel.storage_name = this.model.storage_name;
            this.checkLoadData();
        },
        c () {
            this.CountModel.chamberNumber = this.chamberNumber;
            this.checkLoadData();
        },
        checkLoadData () {
            if (this.model.storage_type === 'JUMBO' && this.model.storage_name !== '' && this.model.chamber !== '') {
                this.loadJumboData();
            }
            if (this.model.storage_type === 'OMR' &&
                this.model.storage_name !== '' &&
                this.model.chamber !== '' &&
                this.canisterNumber !== ''
            ) {
                this.loadOMRData();
            }
        },
        loadCanister (canister) {
            // console.log('canister : ', canister);
            this.canisterNumber = canister;
        },
        getName (chamber, canister) {
            const OMRName = this.model.storage_name;
            const fullName = this.getLabelByValue(OMRName) + chamber + canister;
            return fullName;
        },
        async loadCountData () {
            try {
                this.countLoading = true;
                let response = '';
                if (this.CountModel.storage_type === 'JUMBO') {
                    response = await axios.form(urls.semen_storage.getCountData, {

                        storage_type: this.CountModel.storage_type,
                        storage_name: this.CountModel.storage_name
                    });
                } else if (this.CountModel.storage_type === 'OMR') {
                    response = await axios.form(urls.semen_storage.getOMRCountData, {
                        storage_type: this.CountModel.storage_type,
                        storage_name: this.CountModel.storage_name,
                        chamber: this.chamberNumber

                    });
                }
                const result = response.data;
                console.log(result);
                if (result.success) {
                    this.countData = [];
                    if (this.CountModel.storage_type === 'OMR') {
                        console.log('CountModel: OMR: ', result.data[0]);
                        this.countData.push(result.data[0]);
                        console.log('this.countData', this.countData);
                    } else {
                        this.countData = result.data;
                    }

                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.countLoading = false;

                    this.checkNormalization();
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
                            this.$notify('Warning', errorMessage, { type: 'warning' });
                        }
                    }
                    this.countLoading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.countLoading = false;
            }
        },
        checkNormalization () {
            if (this.model.storage_type === 'OMR') {
                this.updateInputValues();
            }
            if (this.model.storage_type === 'JUMBO') {
                this.normalizeDataLoad();
            }
        },
        normalizeDataLoad () {
            const keysToCheck = Array.from({ length: 11 }, (_, i) => (i + 1).toString());

            this.normalizedData = this.countData.map((item) => {
                const normalizedItem = {};

                keysToCheck.forEach((key) => {
                    normalizedItem[key] = item[key] || 0;
                });

                return normalizedItem;
            });
        },
        updateInputValues () {
            if (this.countData.length === 0) {
                this.normalizedData = this.pattern.map(key => ({ [key]: 'X' }));
            } else {
                this.normalizedData = this.countData.map((inputObject) => {
                    const updatedObject = { ...inputObject };
                    this.pattern.forEach((key) => {
                        if (!updatedObject[key]) {
                            this.$set(updatedObject, key, 'X');
                        }
                    });
                    return updatedObject;
                });
            }
        },
        renderKeyValuePairs () {
            this.colorsArray = [];

            for (let i = 0; i < this.normalizedData.length; i++) {
                const currentObject = this.normalizedData[i];
                for (const key in currentObject) {
                    const value = currentObject[key];
                    // if (value >= 1 && value <= 3) {
                    //     this.colorsArray.push('#f4c431');
                    // } else if (value === 4) {
                    //     this.colorsArray.push('#e35151');
                    // } else if (value === 0) {
                    //     this.colorsArray.push('#00a86b');
                    // }
                    // if (value >= 2) {
                    //     this.colorsArray.push('#e35151');
                    // } else if (value === 1) {
                    //     this.colorsArray.push('#f4c431');
                    // } else if (value === 0) {
                    //     this.colorsArray.push('#00a86b');
                    // }
                    if (value >= 4) {
                        this.colorsArray.push('#e35151'); // Filled
                    } else if (value >= 1 && value <= 3) {
                        this.colorsArray.push('#f4c431'); // Partially Filled
                    } else {
                        this.colorsArray.push('#00a86b'); // Vacant
                    }
                }
            }
        },
        async loadJumboData () {
            try {
                this.jumboLoading = true;
                const response = await axios.form(urls.semen_storage.getData, this.model);
                const result = response.data;
                if (result.success) {
                    // console.log('Response: ', result.data);
                    this.jumboTableData = result.data.jumboTableData;
                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.jumboLoading = false;
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
                            this.$notify('Warning', errorMessage, { type: 'warning' });
                        }
                    }
                    this.jumboLoading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.jumboLoading = false;
            }
        },
        async loadOMRData () {
            try {
                this.omrLoading = true;
                const response = await axios.form(urls.semen_storage.getOMRData, {
                    storage_type: this.model.storage_type,
                    storage_name: this.model.storage_name,
                    chamber: this.model.chamber,
                    sub_chamber: this.canisterNumber

                });
                const result = response.data;
                if (result.success) {
                    // console.log('Response: ', result.data);
                    this.omrTableData = result.data.OmrTableData;
                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.omrLoading = false;
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
                            this.$notify('Warning', errorMessage, { type: 'warning' });
                        }
                    }
                    this.omrLoading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.omrLoading = false;
            }
        }
    }
};
</script>

<style scoped>
/* Overlay */
.dose-row-line {
  display: grid;
  grid-template-columns: 1fr 90px 40px;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

/* Title column */
.dose-title {
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Dose column */
.dose-count {
  text-align: right;
  font-weight: 600;
  white-space: nowrap;
}

/* Eye column */
.dose-action {
  display: flex;
  justify-content: center;
}

.dose-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Box */
.dose-modal-box {
  width: 430px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: fadeInScale 0.2s ease;
}

/* Header */
.dose-modal-header {
  background: #3954a4;
  color: #fff;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dose-modal-header h5 {
  margin: 0;
  font-weight: 600;
}

/* Close */
.dose-close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}

/* Body */
.dose-modal-body {
  padding: 16px;
  font-size: 14px;
}

/* Rows */
.dose-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.dose-row .label {
  font-weight: 600;
  color: #555;
}

.dose-row .value {
  color: #222;
}

/* Status */
.status {
  font-weight: 600;
}

.status-yes {
  color: #00a86b; /* green */
}

.status-no {
  color: #e35151; /* red */
}

/* Divider */
hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 12px 0;
}

/* Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

<template>
    <div>
        <div class="col-lg-12 mb-5">
            <div class="row">
                <div class="col-lg-12 vertical pl-0 pr-0">
                    <div class="card pl-0 pr-0 pt-0 pb-0 ml-lg-auto">

                        <table style="width:100% ">
                            <tr>
                                <th class="text-primary">Bull Name</th>
                                <th class="text-primary">Bull No</th>
                                <th class="text-primary">Renumber</th>
                                <th class="text-primary">Breed</th>
                                <th class="text-primary">Dam's Yield</th>
                                <th class="text-primary">Year/Date</th>
                                <th class="text-primary">Location</th>
                                <th class="text-primary">Dose</th>
                            </tr>
                            <tr v-if="!loadingMain && data.length === 0" class="text-center">
                                <td colspan="8" class="mt-3"> No data</td>
                            </tr>
                            <tr v-if="loadingMain" class="text-center">
                                <td colspan="8" class="mt-3"> Please wait while fetching data...</td>
                            </tr>
                            <tr v-for="(item, i) in paginatedData" :key="i" @click="selectBull(item)" style="cursor: pointer">
                                <td>{{ item.bull_name }}</td>
                                <td>{{ item.reg_no }}</td>
                                <td>{{ item.renumber }}</td>
                                <td>{{ item.breed }}</td>
                                <td>{{ item.dam_yield }}</td>
                                <td>{{ item.production_date }}</td>
                                <td>{{ item.location }}</td>
                                <td>{{ item.dose }}</td>

                            </tr>
                        </table>
                        <div class="pagination mt-4 text-center">
                            <btn-group>
                              <btn v-if="currentPage > 1" @click="prevPage"><img src="../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>
                              <span>Page {{ currentPage }} of {{ totalPages }}</span>
                              <btn v-if="currentPage < totalPages" @click="nextPage"><img src="../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>
                                </btn-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5" v-if="selectedItem">
                <div class="row">
                    <div class="col-12">
                        <h5 class="text-primary mt-2 mb-4 font-poppins-semibold">Selected Bull</h5>
                    </div>
                    <div class="col-lg-12 vertical pl-0 pr-0">
                        <div class="card pl-0 pr-0 pt-0 pb-0 ml-lg-auto">

                            <table style="width:100% ">
                                <tr>
                                    <th class="text-primary">Bull Name</th>
                                    <th class="text-primary">Bull No</th>
                                    <th class="text-primary">Renumber</th>
                                    <th class="text-primary">Breed</th>
                                    <th class="text-primary">Dam's Yield</th>
                                    <th class="text-primary">Year/Date</th>
                                    <th class="text-primary">Location</th>
                                    <th class="text-primary">Dose</th>
                                </tr>
                                <tr v-if="!loadingSelected && data.length === 0" class="text-center">
                                    <td colspan="8" class="mt-3"> No data</td>
                                </tr>
                                <tr v-if="loadingSelected" class="text-center">
                                    <td colspan="8" class="mt-3"> Please wait while fetching data...</td>
                                </tr>
                                <tr>
                                    <td>{{ selectedItem.bull_name }}</td>
                                    <td>{{ selectedItem.reg_no }}</td>
                                    <td>{{ selectedItem.renumber }}</td>
                                    <td>{{ selectedItem.breed }}</td>
                                    <td>{{ selectedItem.dam_yield }}</td>
                                    <td>{{ selectedItem.production_date }}</td>
                                    <td>{{ selectedItem.location }}</td>
                                    <td>{{ selectedItem.dose }}</td>

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <s-form @submit="addItem" ref="form">
                <div class="mt-5">

                    <div class="row">

                        <div class="col-lg-2 pl-0">
                            <validated-ajax-vue-select :url="RSBOptionsURL" label="Despatch to RSB" class="c-input-select field-required" v-model="model.rsb_despatch" :rules="{required:true}"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="PTM" v-model="model.ptm"  disabled></validated-input>
                        </div>
                    </div>
                </div>
                <div class="mt-5">

                    <div class="row">
                        <div class="col-lg-2 pl-0">
                            <validated-input label="Location" class="field-required" v-model="model.location" :rules="{required:true}" disabled></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Dose" v-model="model.dose" type="number" class="field-required" :rules="{required:true}" disabled></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Container No" v-model="model.container_no" class="field-required" :rules="{required:true}"></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Position" class="field-required" v-model="model.position" :rules="{required:true}"></validated-input>
                        </div>
                         <div class="col-lg-2" v-if="show_flag">
                             <validated-checkbox label="Despatch Done" class="pb-0 mb-xl-n4 text-black" v-model="model.despatch_done" ></validated-checkbox>
                         </div>
                        <!--                        <div class="fl-x-br mt-1  mb-3">-->
                        <!--                            <btn text="Add" class=" px-4" type="reset"></btn>-->
                        <!--                        </div>-->
                    </div>
                    <div class="row mt-7 fl-x-br">
                        <div class="col-lg-6 pl-0">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="mr-4 px-5"></btn>
                        </div>
                        <div class="col-lg-6 fl-x-tr">
                            <btn text="Show Despatch"
                                 @click="ShowDispatch" class="mr-4 font-poppins-regular" type="reset"></btn>
<!--                            <btn text="Take Print" @click="downloadReportModal" :loading="downloading"-->
<!--                                 loading-text="Please Wait..."-->
<!--                                 design="basic-b" class="mr-4" type="reset"></btn>-->
                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </s-form>
            <div class="mt-4 ml-lg-n3">
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" search-placeholder="Bull No">
            </vue-table>
            </div>
<!--            <div class="row mt-4" v-if="tableLoading">-->
<!--            <div class="col-lg-12  vertical pl-0 pr-0">-->
<!--                <div class="card pl-0 pr-0 pb-0 ml-lg-auto">-->
<!--                    <table style="width:100%">-->
<!--                        <th class="text-primary">SI No</th>-->
<!--                        <th class="text-primary">Bull No</th>-->
<!--                        <th class="text-primary">Bull Name</th>-->
<!--                        <th class="text-primary">Breed</th>-->
<!--                        <th class="text-primary">RSB</th>-->
<!--                        <th class="text-primary">Ptm</th>-->
<!--                        <th class="text-primary">Position</th>-->
<!--                        <th class="text-primary">Dose</th>-->
<!--                        <th class="text-primary ">Container_no</th>-->
<!--                        <th class="text-primary ">Location</th>-->
<!--                        <tr class="mt-3" v-if="loadingSaved">-->
<!--                                        <td colspan="4">Please wait while fetching the data...</td>-->
<!--                                    </tr>-->
<!--                        <tr v-if="!loadingSaved && paginatedSavedBullList.length === 0" class="text-center">-->
<!--                                <td colspan="11" class="mt-3"> No data</td>-->
<!--                            </tr>-->
<!--                        <tr v-for="(item, i) in paginatedSavedBullList" :key="i" @click="clickedSavedBull(i)" style="cursor: pointer">-->
<!--                            <td>{{ (i + 1) + (savedCurrentPage - 1) * savedPageSize }}</td>-->
<!--                            <td>{{ item.bull.reg_no }}</td>-->
<!--                            <td>{{ item.bull.bull_name }}</td>-->
<!--                            <td>{{ item.bull.breed }}</td>-->
<!--                            <td>{{ item.rsb_despatch }}</td>-->
<!--                            <td>{{ item.ptm }}</td>-->
<!--                            <td>{{ item.position }}</td>-->
<!--                            <td>{{ item.dose }}</td>-->
<!--                            <td>{{ item.container_no }}</td>-->
<!--                            <td>{{ item.location }}</td>-->

<!--                        </tr>-->
<!--                    </table>-->
<!--                    <div class="pagination mt-4 text-center">-->
<!--                            <btn-group>-->
<!--                              <btn v-if="savedCurrentPage  > 1" @click="prevSavedPage"><img src="../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                              <span>Page {{ savedCurrentPage  }} of {{ savedTotalPages  }}</span>-->
<!--                              <btn v-if="savedCurrentPage  < savedTotalPages " @click="nextSavedPage"><img src="../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                </btn-group>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

            <modal ref="takePrint" title=" ">
                <div class="row">
                    <s-form @submit="downloadReport" class="col-12">

                        <div class="col-lg-12">
                            <validated-ajax-vue-select
                                :url="downloadOptionURL"
                                class="c-input-select text-black"
                                label="RSB" v-model="downloadVariable"></validated-ajax-vue-select>
                        </div>
                        <div class="col-12 text-right">
                            <btn text="Take Print" :loading="downloading"
                                 loading-text="Please Wait..."
                                 design="basic-b" type="submit"></btn>
                        </div>

                    </s-form>

                </div>

            </modal>
        </div>
    </div>

</template>

<script>
import axios from 'secure-axios';
import urls from '../data/urls';
import masterURLs from '../data/masterURLs';

export default {
    name: 'VirtualDespatchingTable',
    props: {
        sendModel: {
            type: Object
        }
    },
    data () {
        return {
            URL: urls.virtualDespatching.addEdit,
            RSBOptionsURL: masterURLs.master.rsb.vueSelect,
            listURL: urls.virtualDespatching.DespatchPendingList,
            fields: [
                {
                    name: 'bull.reg_no',
                    title: 'Bull No'
                },
                {
                    name: 'bull.bull_name',
                    title: 'Bull Name'
                },
                {
                    name: 'bull.breed',
                    title: 'Breed'
                },
                {
                    name: 'rsb_despatch',
                    title: 'RSB'
                },
                {
                    name: 'ptm',
                    title: 'PTM'
                },
                {
                    name: 'position',
                    title: 'Position'
                },
                {
                    name: 'dose',
                    title: 'Dose'
                },
                {
                    name: 'container_no',
                    title: 'Container No'
                },
                {
                    name: 'location',
                    title: 'Location'
                }
            ],
            loading: false,
            tableLoading: false,
            loadingData: false,
            downloading: false,
            loadingMain: false,
            loadingSelected: false,
            loadingSaved: false,
            savedBullsList: [],
            show_flag: false,
            currentPage: 1,
            itemsPerPage: 10,
            savedCurrentPage: 1,
            savedPageSize: 10,
            model: {
                semen_quarantine: '',
                rsb_despatch: '',
                ptm: '',
                position: '',
                dose: '',
                container_no: '',
                location: '',
                id: '',
                despatch_done: false

            },
            data: [],
            selectedItem: '',
            downloadVariable: '',
            downloadOptionURL: urls.virtualDespatching.RSBVUeSelect
        };
    },
    computed: {
        paginatedData () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.data.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        savedTotalPages () {
            return Math.ceil(this.savedBullsList.length / this.savedPageSize);
        },
        paginatedSavedBullList () {
            const start = (this.savedCurrentPage - 1) * this.savedPageSize;
            return this.savedBullsList.slice(start, start + this.savedPageSize);
        }
    },
    mounted () {
        this.loadData();
    },
    methods: {
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
        nextSavedPage () {
            if (this.savedCurrentPage < this.savedTotalPages) this.savedCurrentPage++;
        },
        prevSavedPage () {
            if (this.savedCurrentPage > 1) this.savedCurrentPage--;
        },
        downloadReportModal () {
            this.$refs.takePrint.show();
        },
        clearData () {
            this.model.semen_quarantine = '';
            this.model.rsb_despatch = '';
            this.model.ptm = '';
            this.model.position = '';
            this.model.dose = '';
            this.model.container_no = '';
            this.model.location = '';
            this.model.despatch_done = '';
            this.$emit('clear');
            this.$refs.form.reset();
        },
        async loadData () {
            this.loadingData = true;
            this.loadingMain = true;
            this.loadingSaved = true;
            const response = await axios.form(urls.virtualDespatching.DespatchList, this.sendModel);
            this.data = response.data.data;
            this.loadingMain = false;
            const sresponse = await axios.get(urls.virtualDespatching.DespatchPendingList);
            this.savedBullsList = sresponse.data.data;
            this.tableLoading = true;
            this.loadingData = false;
            this.loadingSaved = false;
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        selectBull (data) {
            this.model.semen_quarantine = data.id;
            this.selectedItem = data;
            this.model.rsb_despatch = '';
            this.model.ptm = data.ptm || '';
            this.model.position = '';
            this.model.dose = data.dose;
            this.model.container_no = '';
            this.model.location = data.location || '';
            this.model.id = '';
            this.model.despatch_done = false;
        },
        clickedSavedBull (index) {
            const indexToFetch =
              ((this.savedCurrentPage - 1) * this.savedPageSize) + index;
            // const indexToFetch = index;
            this.show_flag = true;
            this.model.rsb_despatch = '';
            this.model.ptm = '';
            this.model.position = '';
            this.model.dose = '';
            this.model.container_no = '';
            this.model.location = '';
            this.model.id = '';
            this.model.despatch_done = '';
            const data = this.savedBullsList;
            if (indexToFetch >= 0 && indexToFetch < data.length) {
                const dataItem = data[indexToFetch];
                this.model.semen_quarantine = dataItem.quarantine.id;
                this.model.id = dataItem.id;
                this.model.rsb_despatch = dataItem.rsb_despatch;
                this.model.ptm = dataItem.ptm;
                this.model.position = dataItem.position;
                this.model.dose = dataItem.dose;
                this.model.container_no = dataItem.container_no;
                this.model.location = dataItem.location;
                this.model.despatch_done = dataItem.despatch_done;
            }
        },
        clearSelected () {
            this.selectedItem = '';
        },
        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                let modelId = false;
                if (this.model.id) {
                    modelId = true;
                }
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$refs.table.refreshTable();
                    if (modelId) {
                        await this.clearSelected();
                        await this.clearData();
                        const sresponse = await axios.get(urls.virtualDespatching.DespatchPendingList);
                        this.savedBullsList = sresponse.data.data;
                        this.tableLoading = true;
                        this.$refs.table.refreshTable();
                        this.loadingData = false;
                    } else {
                        await this.clearSelected();
                        await this.clearData();
                        await this.loadData();
                    }
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
        },
        async downloadReport () {
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.virtualDespatching.downloadReport + '?rsb_despatch=' + that.downloadVariable);
                const json = response.data;
                if (json.success === true) {
                    that.downloading = false;
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    that.$notify('Something went wring..!', 'Error', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.$notify('Failed to download the report. Please try again.', 'Error', { type: 'warning' });
            }
        },
        ShowDispatch () {
            this.$router.push({ path: '/virtual-dispatching/details/' });
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
    color: black;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 1px;

}
.pagination button {
    margin: 0 8px;
    padding: 5px 12px;
}
</style>

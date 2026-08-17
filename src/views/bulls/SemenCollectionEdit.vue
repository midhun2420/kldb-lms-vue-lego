<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Edit Semen Collection Details</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
<!--        <div class="row fl-x fl-j-sb">-->
<!--        <h3 class="text-primary fs-lg-4 font-poppins-semibold">Edit Semen Collection Details </h3>-->
<!--    </div>-->
        <s-form @submit="UploadExcel">
            <div class="col-lg-12 pl-0 mb-5 mt-2">
                <div class="row">
                    <div class="col-lg-4 pl-0">
                        <div class="row pl-0">
                            <div class="col-lg-6">
                                <validated-date-picker :rules="{required:true}"
                                                       label="Date" class="c-input-datepicker field-required" format="DD-MM-YYYY" disabled
                                                       v-model="model.collection_date"></validated-date-picker>
                            </div>
                            <div class="col-lg-6">
                                <validated-ajax-vue-select label="Batch" multiple
                                                           :url="batchOptionURL" :rules="{required:true}" disabled
                                                           class="c-input-select field-required" :reduce="option => option.id"
                                                           v-model="model.batches"></validated-ajax-vue-select>
                            </div>
                            <div class="col-lg-6">
                                <validated-ajax-vue-select label="Dose Type"
                                                           :url="dosetypeOptionURL" :rules="{required:true}"
                                                           class="c-input-select field-required" :reduce="option => option.id"
                                                           v-model="model.dose_type"></validated-ajax-vue-select>
                            </div>
<!--                            <div class="col-lg-6 ">-->

<!--                                <validated-file-input v-model="model.file" label="File"-->
<!--                                                      class="file-input-excel-w field-required" label-text="Upload Excel File">-->
<!--                                </validated-file-input>-->
<!--                            </div>-->
                            <div class="col-lg-6  mt-3">
                                <validated-checkbox label="No collection" v-model="model.no_collection"></validated-checkbox>
                            </div>
                            <div class="col-lg-5 pr-5 mt-3">
                                <validated-input class="w-8r"
                                                 label="Collection Days" v-model="model.collection_days"></validated-input>
                            </div>
                            <div class="col-lg-6">
                                <validated-input label="Remarks" v-model="model.remarks"></validated-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4  mt-1">
                        <div class="card b-1 bg-grey b-dark mx-4 px-4">
                            <h5 class="text-primary font-poppins-medium mt-2 mb-4 fl-x-cc">Atmospheric Details</h5>
                            <div class="row pl-0">
                                <div class="col-lg-6">
                                    <validated-input label="Temp(inside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.temp_inside"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Temp(outside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.temp_outside"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Humidity(inside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.humidity_inside"></validated-input>
                                </div>
                                <div class="col-lg-6 ">
                                    <validated-input label="Humidity(outside)" :rules="{required:true}"
                                                     class="field-required" v-model="model.humidity_outside"></validated-input>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4  mt-1">
                        <div class="card b-1 bg-grey b-dark mx-4 px-4">
                            <h5 class="text-primary font-poppins-medium mt-2 mb-4 fl-x-cc">Details of Buffer /
                                Diluent</h5>
                            <div class="row pl-0">
                                <div class="col-lg-6">
                                    <validated-input label="Buffer PH" :rules="{required:true}"
                                                     class="field-required" v-model="model.buffer_ph"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Diluent PH" :rules="{required:true}"
                                                     class="field-required" v-model="model.diluent_ph"></validated-input>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Diluent Prepared" :rules="{required:true}"
                                                     class="field-required" v-model="model.diluent_prepared"></validated-input>
                                </div>
                                <div class="col-lg-6 ">
                                    <validated-input label="Unused Diluent" :rules="{required:true}"
                                                     class="field-required" v-model="model.unused_diluent"></validated-input>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col pl-0 mt3">
                        <btn class="" text="Save" type="submit" loading-text="Please wait..." :loading="loading"></btn>
                    </div>

                </div>
            </div>
        </s-form>
        <div class="ml-4 mt-1"><h5 class="text-danger">*Note: Collection Details can only be edited before PTM is completed.*</h5></div>
        <div class="column fl-x" v-if="tableLoading">
        <div class="col-lg-12  ">
            <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                <table class="c-table-1" v-if="viewData.length" style="width:100%;">
                    <thead>
                        <th class="text-primary">Collection Date</th>

                        <th class="text-primary">Reg No</th>
                        <th class="text-primary">Bull Name</th>
                        <th class="text-primary">Ejaculation No</th>
                        <th class="text-primary">PTM</th>
                        <th class="text-primary">Recorded Dose</th>
<!--                        <th class="text-primary">Status</th>-->
                        <th class="text-primary">Action</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in paginatedData" :key="i">
                        <td>{{ item.collection_date }}</td>
                        <td>{{ item.bull.reg_no }}</td>
                        <td>{{ item.bull.bull_name }}</td>
                        <td>{{ item.ejaculation_no }}</td>
                        <td>{{ item.ptm }}</td>
                        <td>{{ item.recorded_dose}}</td>
<!--                        <td>{{ item.status}}</td>-->
                        <td><btn class="btn btn-sm btn-primary border-r-1 bordered p-1" @click="detailsPage(item.id)" style="cursor: pointer">Edit</btn></td>
                    </tr>
                    </tbody>
<!--                    <tr class="mt-3" v-if="loadingData">-->
<!--                        <td colspan="4">Please wait while fetching the data...</td>-->
<!--                    </tr>-->
<!--                    <tr v-if="!loadingData && collectionList.length === 0" class="text-center">-->
<!--                        <td colspan="6" class="mt-3"> No data</td>-->
<!--                    </tr>-->
                </table>
                <div v-if="loadingData" class="text-center mt-3 mb-3">
                    Please wait while fetching the data...
                  </div>
                  <div v-if="!loadingData && viewData.length === 0" class="text-center mt-3 mb-3">
                    No data
                  </div>
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
    </div>
</template>

<script>
// import CustomFileInput from '@common-components/semencollection/FileInput';

import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'SemenCollectionEdit',
    components: {},
    data () {
        return {
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            tableLoading: false,
            loadingData: false,
            URL: urls.semenCollection.addedit,
            batchOptionURL: masterURLs.master.batch.vueSelect,
            dosetypeOptionURL: masterURLs.master.doseType.vueSelect,
            model: {
                id: '',
                collection_date: '',
                batches: '',
                dose_type: '',
                no_collection: '',
                collection_days: '',
                remarks: '',

                temp_inside: '',
                temp_outside: '',
                humidity_inside: '',
                humidity_outside: '',

                buffer_ph: '',
                diluent_ph: '',
                diluent_prepared: '',
                unused_diluent: '',

                file: ''

            },
            loading: false
        };
    },
    async mounted () {
        await this.loadEditData();
        await this.loadCollectionList();
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
            this.$router.push({ path: '/semen-collection/' });
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
        async loadEditData () {
            const id = this.$route.params.id;
            this.model.id = id;
            console.log(id, 'iddddddddddddddddddddddddddd');
            const fd = new FormData();
            fd.append('id', id);

            try {
                const res = await axios.post(urls.semenCollection.details, fd);
                console.log(res, 'Response');
                const data = res.data.data;

                // Populate model
                this.model = {
                    id: id,
                    collection_date: data.collection_date,
                    // batch: data.batch?.id || '',
                    batches: data.batch ? data.batch.map(b => b.id) : [],
                    dose_type: data.dose_type?.id || '',
                    no_collection: data.no_collection,
                    collection_days: data.collection_days,
                    remarks: data.remarks,

                    temp_inside: data.temp_inside,
                    temp_outside: data.temp_outside,
                    humidity_inside: data.humidity_inside,
                    humidity_outside: data.humidity_outside,

                    buffer_ph: data.buffer_ph,
                    diluent_ph: data.diluent_ph,
                    diluent_prepared: data.diluent_prepared,
                    unused_diluent: data.unused_diluent
                };
            } catch (error) {
                console.error(error);
                this.$notify('Error', 'Unable to load data', { type: 'danger' });
            }
        },
        async UploadExcel () {
            try {
                const payload = {
                    ...this.model
                };
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, payload);
                const result = response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.loadData();
                } else {
                    const errors = response.data.errors;
                    if (errors) {
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                let errorMessage = '';
                                if (key === '__all__') {
                                    errorMessage = `${errors[key]}`;
                                } else {
                                    errorMessage = `${key}:  ${errors[key]}`;
                                }
                                this.$notify('Warning', errorMessage, { type: 'warning' });
                                if (errors[key].startsWith('Semen collection already done')) {
                                    this.loadData();
                                }
                            }
                        }
                    } else if (response.data.message) {
                        this.$notify('Warning', response.data.message, { type: 'warning' });
                    } else {

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
            } finally {
                this.loading = false;
            }
        },
        async loadCollectionList () {
            if (!this.model.batches || !this.model.collection_date) {
                return;
            }
            this.loadingData = true;
            this.tableLoading = false;
            const id = this.$route.params.id;
            const date = this.model.collection_date;
            const batches = this.model.batches;
            let formattedDate = '';
            if (date) {
                const parts = date.split('-'); // ["13","11","2025"]
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // "2025-11-13"
                }
            }
            try {
                const res = await axios.get(urls.semenCollection.listAnimal, {
                    params: {
                        semen_collection_id: id,
                        collection_date: formattedDate,
                        batch_id: batches
                    }
                });
                this.viewData = res.data.data || [];
            } catch (error) {
                console.error(error);
                this.viewData = [];
            }

            this.tableLoading = true;
            this.loadingData = false;
        },
        detailsPage (id) {
            this.$router.push({
                name: 'SemenCollectionAnimalEdit',
                params: { id: id }
            });
        }
    }
};
</script>

<style scoped>
.bg-grey {
    background-color: #f4f4f4 !important;
}

.w-8r {
    width: 8.6rem !important;
}
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

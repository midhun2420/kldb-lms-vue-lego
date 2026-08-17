<template>
    <div class="full-height">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Calf Selection</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="bullCalfSelection" ref="form1">
<!--            <h2 class="head font-poppins-semibold mt-3 text-primary">Bull Calf Selection</h2>-->
            <div class="row mt-5">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           label="Selection Date" class="text-black c-input-datepicker field-required" :rules="{required:true}"
                                           v-model="model.selection_date"></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="shed No"
                                               :url="shedOptionsURL" @input="loadBullOptions" :rules="{required:true}"
                                               class="c-input-select text-black field-required"
                                               v-model="shed_number"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select label="Animal" multiple
                                          :options="AnimalOption"
                                          class="c-input-select-multiplevalue text-black field-required" :rules="{required:true}"
                                          v-model="model.bull"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select label="Status" class="c-input-select text-black field-required" :rules="{required:true}"
                                          v-model="model.status" :options="statusOptionURL"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" class="text-black" v-model="model.remarks"></validated-input>
                </div>
                <div class="col-lg-2">
                    <div class="fl-x">
                        <div class="px-4 mt-4 ml-1">
                            <validated-file-input ref="FileInput" size="xs"
                                v-model="model.file"
                                label-text="Upload" ></validated-file-input>
                        </div>
                        <div>
                            <btn text="Save"
                                 :loading="loading" loading-text="Saving..." class="px-4 mt-4 ml-1"></btn>
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
        <s-form ref="quarantineForm" @submit="QuarantineAdd">
<!--            <div class="row">-->
<!--                <div class="col-12">-->
<!--                     <h6 class="font-poppins-medium text-primary">Quarantine Details</h6>-->
<!--                </div>-->
<!--            </div>-->
            <div class="row">
                <div class="col-6">
<!--                    <div class="row">-->
<!--                        <div class="col-4">-->
<!--                            <validated-vue-select class="c-input-select text-black field-required"-->
<!--                                                       :options="selectedQurantinedBullsList" label="Selected Bulls"-->
<!--                                                       v-model="model1.id" :rules="{required:true}"></validated-vue-select>-->
<!--                        </div>-->
<!--                        <div class="col-4">-->
<!--                            <validated-vue-select class="c-input-select text-black field-required" label="Quarantine Month"-->
<!--                                                  :options="quarantineOptions"-->
<!--                                                  v-model="model1.month" :rules="{required:true}"></validated-vue-select>-->
<!--                        </div>-->
<!--                        <div class="col-4 d-flex align-items-end mt-0">-->
<!--                            <btn text="Save" :loading="loading1" loading-text="Saving..." class="px-4 mt-4 ml-1"></btn>-->
<!--                            <btn class="px-4 mt-4 ml-1" design="basic-b" type="reset" @click="BackToHome" text="Cancel"></btn>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="row">
                        <div class="col-12">
                            <div class="card pl-0 pr-0 pt-0 pb-0 of-h">
                                <div class="heading font-poppins-medium text-primary pt-2  bg-2 fl-x-cc fs-lg-0 mb-3">Bull Calf Selection Details
                                </div>
        <!--                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg&#45;&#45;1">Milk Disposal</div>-->
                                <table style="width:100%" class="c-table-1 mt-2" v-if="viewData.length">
                                    <thead>
                                    <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Selection Date</h5></th>
                                    <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Animal No</h5></th>
<!--                                    <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Quarantine Month</h5></th>-->
                                    <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Status</h5></th>
                                    <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Uploaded File</h5></th>
                                    </thead>
                                    <tbody class="">
                                    <tr v-for="(item, i) in viewData" :key="i">
                                        <td>{{ item.selection_date }}</td>
                                        <td>{{ item.animal.reg_no }}</td>
<!--                                        <td>{{ item.quarantine_month }}</td>-->
                                        <td>{{ item.status }}</td>
                                        <td>
                                          <a
                                            :href="item.file"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            v-if="item.file"
                                          >
                                            {{ getFileName(item.file) }}
                                          </a>
                                          <span v-else>-</span>
                                        </td>

                                    </tr>
                                    </tbody>

                                </table>
<!--                                <div class="pagination text-center" v-if="viewData.length">-->
<!--                                    <btn-group class="ml-2">-->
<!--                                      <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                      <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                                      <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                        </btn-group>-->
<!--                                </div>-->
                                <div class="pagination text-center" v-if="viewData.length" style="font-size: 20px;">
                                  <!-- Previous -->
                                  <span v-if="currentPage > 1" @click="prevPage" style="color: primary; cursor: pointer; margin-right: 10px;">
                                    &lt;
                                  </span>

                                  <!-- Current page info -->
                                  <span class="font-poppins-small fs-lg-0 text-primary">
                                    Page {{ currentPage }} of {{ totalPages }}
                                  </span>

                                  <!-- Next -->
                                  <span v-if="currentPage < totalPages" @click="nextPage" style="color: primary; cursor: pointer; margin-left: 10px;">
                                    &gt;
                                  </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 mt-4 mr-0">
                    <div class="card pl-0 pr-0 pb-0 mt--2 w-100">
                        <div class="heading font-poppins-medium text-primary pt-2  bg-2 fl-x-cc fs-lg-0 mb-3">Due
                            for Selection
                        </div>
                        <table style="width:100%">
                            <th class="text-primary">Animal No</th>
                            <th class="text-primary">Breed</th>
                            <th class="text-primary">Shed</th>
                            <th class="text-primary">Age</th>
                            <th class="text-primary">Dam's Yield</th>
                            <tr v-for="(item, i) in selectedBullsList" :key="i" @click="selectBull(item)" style="cursor:pointer">
                                <td>{{ item.animal_no }}</td>
                                <td>{{ item.breed ? item.breed.breed_name : '-' }}</td>
                                <td>{{ item.shed ? item.shed.shed_no : '-' }}</td>
                                <td>{{ item.age }}</td>
                                <td>{{ item.dams_yield }}</td>
                            </tr>
                            <tr :key="i" v-if="selectedBullsList.length ===0">
                                <td colspan="4">No data Found</td>

                            </tr>
                        </table>
                    </div>
                </div>
            </div>

<!--            <div class="column fl-x-br pt-7">-->
<!--                <div>-->
<!--                    <btn text="save" :loading="loading1" loading-text="Saving..." class="px-4"></btn>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <btn class="ml-2 text-primary" design="basic-b" type="reset" @click="BackToHome" text="Cancel"></btn>-->

<!--                </div>-->
<!--            </div>-->
        </s-form>
    </div>
</template>

<script>
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'BullCalfSelection1',
    components: {},
    data () {
        return {
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            BullURL: urls.calfSelection.addEdit,
            QuarantineAddURL: urls.calfSelection.quarantineDetailsSave,
            loading: false,
            loading1: false,
            BullOptionURL: urls.calfSelection.selectedBullsList,
            QuarantineOptionURL: urls.quarantine.vueSelect,
            statusOptionURL: [
                { label: 'Selected', value: 'Selected' },
                { label: 'Waiting List', value: 'Waiting List' },
                { label: 'Culling', value: 'Culling' }
            ],
            shed_number: '',
            AnimalOption: [],
            selectedBullsList: [],
            // for list api on 04-11-2025------------------------------
            viewData: [],
            currentPage: 1,
            totalPages: 1,
            perPage: 10,
            totalItems: 0,
            // ---------------------------------------------------
            selectedQurantinedBullsList: [],
            model: {
                bull: [],
                status: '',
                remarks: '',
                selected_bulls: '',
                quarantine_month: '',
                selection_date: '',
                file: ''

            },
            model1: {
                id: '',
                month: ''
            },
            quarantineOptions: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' }
            ]
        };
    },
    watch: {
        shed_number (newValue, oldValue) {
            if (newValue) {
                this.model.bull = [];
                this.model.status = '';
                this.model.remarks = '';
                this.model.selected_bulls = '';
                this.model.quarantine_month = '';
                this.$refs.FileInput.text = '';
                this.model.file = '';
                this.$refs.form1.reset();
            }
        }
    },
    mounted () {
        this.loadQurantineBullOptions();
        this.loadSelectedBullOptions();
        // for list api on 04-11-2025------------------------------
        this.loadData();
        //     -------------------------------
    },
    // for list api on 04-11-2025------------------------------
    // computed: {
    //     paginatedData () {
    //         const start = (this.currentPage - 1) * this.itemsPerPage;
    //         return this.viewData.slice(start, start + this.itemsPerPage);
    //     }
    //     // totalPages () {
    //     //     return Math.ceil(this.viewData.length / this.itemsPerPage);
    //     // }
    // },
    // ------------------------------------------------------------------
    methods: {
        // for list api on 04-11-2025------------------------------
        nextPage () {
            if (this.currentPage < this.totalPages) {
                this.loadData(this.currentPage + 1); // <-- call loadData for next page
            }
        },
        prevPage () {
            if (this.currentPage > 1) {
                this.loadData(this.currentPage - 1); // <-- call loadData for previous page
            }
        },
        async selectBull (item) {
            // set shed first
            if (item.shed) {
                this.shed_number = item.shed.id;
                await this.loadBullOptions();
            }
            if (!Array.isArray(this.model.bull)) {
                this.model.bull = [];
            }
            // avoid duplicates
            if (!this.model.bull.includes(item.id)) {
                this.model.bull.push(item.id);
            }
            this.model.remarks = item.remarks || '';
            console.log('selected item', item);
        },

        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        // async loadData () {
        //     this.viewData = [];
        //     const response = await axios.get(urls.calfSelection.list);
        //     this.viewData = response.data.data;
        //     console.log('response#----------------', this.viewData);
        //     console.log('response#-view data length---------------', this.viewData.length);
        // },
        async loadData (page = 1) {
            try {
                const response = await axios.get(urls.calfSelection.list + `?page=${page}`);
                const res = response.data;
                this.viewData = res.data; // current page data
                this.currentPage = res.current_page;
                this.totalPages = res.last_page;
                this.perPage = res.per_page;
                this.totalItems = res.total;
                console.log('list response-------------', this.viewData);
                console.log('list response-------------', res);
            } catch (error) {
                console.error(error);
            }
        },

        //  ---------------------------------------------------
        clearDataModel () {
            this.shed_number = '';
            this.model.bull = [];
            this.model.status = '';
            this.model.remarks = '';
            this.model.selected_bulls = '';
            this.model.quarantine_month = '';
            this.model.selection_date = '';
            this.model.file = '';
            this.$refs.FileInput.text = '';
            this.$refs.form1.reset();
        },
        clearDataModel1 () {
            this.model1.id = '';
            this.model1.month = '';
            this.$refs.quarantineForm.reset();
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        async loadBullOptions () {
            const response = await axios.get(urls.calfSelection.calfAnimalVueSelect + '?shed_number=' + this.shed_number);
            this.AnimalOption = response.data.data;
            await this.loadSelectedBullOptions();
        },
        async loadSelectedBullOptions () {
            const response = await axios.get(urls.calfSelection.calfDueForSelectionList + '?shed_number=' + this.shed_number);
            this.selectedBullsList = response.data.data;
        },
        async loadQurantineBullOptions () {
            const response = await axios.get(this.BullOptionURL);
            this.selectedQurantinedBullsList = response.data.data;
        },
        async bullCalfSelection () {
            try {
                this.loading = true;
                const response = await axios.form(this.BullURL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.clearDataModel();
                    await this.loadSelectedBullOptions();
                    await this.loadQurantineBullOptions();
                    this.loadData();
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
        },
        async QuarantineAdd () {
            try {
                this.loading1 = true;
                const response = await axios.form(this.QuarantineAddURL, this.model1);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading1 = false;
                    await this.clearDataModel1();
                    await this.loadQurantineBullOptions();
                    await this.loadData();
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                    this.loading1 = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.loading1 = false;
            }
        }
    }
};
</script>

<style scoped>
btn {
    object-fit: cover;
}

table {
    background-color: #f3f3f3;
    text-align: center;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.2rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
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
    border-radius: 2px;

}

hr {
    height: 1px;
    color: #6c757d;
    background-color: #6c757d;
}

card {
    height: 155px;
}

heading {
    text-align: center;
    width: 25rem;
    height: 2rem;
}
</style>

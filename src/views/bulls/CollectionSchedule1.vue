<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Collection Schedule</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form">
<!--            <h2 class="head font-poppins-semibold mt-3">Collection Schedule</h2>-->
            <div class="row mt-4">
                <div class="col-2">
                    <validated-date-picker label="Schedule Date" :rules="{required:true}" format="DD-MM-YYYY"
                    class="c-input-datepicker field-required" v-model="model.schedule_date" @input="onScheduleDateChange"></validated-date-picker>
                </div>
                <div class="col-2">
                    <validated-vue-select class="c-input-select field-required"
                                          :options="typeOptions" :rules="{required:true}" @input="loadBatchOption"
                                          label="Type" v-model="model.collection_type"></validated-vue-select>

                </div>
                <div class="col-2 ">
                    <validated-ajax-vue-select class="c-input-select field-required"
                                               :url="shedOptionURL" @input="loadBatchOption"
                                               label="Shed" v-model="model.shed_number " :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-2 ">
                    <validated-vue-select class="c-input-select field-required" label="Animal"
                                          :options="animalOption"
                                          v-model="model.bull" :rules="{required:true}"></validated-vue-select>
                </div>
                <div class="col-2 ">
                    <validated-vue-select class="c-input-select"
                                          :options="batchOption" @input="loadAnimalOption"
                                          label="Batch to be Scheduled" v-model="model.batch"></validated-vue-select>
                </div>

                <div class="col-1 pl-4 pt-4 mt-1">
                    <div class="row">
                        <btn text="Add" :loading="loading" loading-text="Adding..." class="px-4"></btn>
                    </div>
                </div>
            </div>
        </s-form>
<!--        <div class="col-lg-4" v-if="model.schedule_date">-->
<!--                    <div class="card pl-0 pr-0 pt-0 pb-0 of-h">-->
<!--                    <h6 class="text-primary fs-lg-1 font-poppins-medium ml-6 mt-3">List of Animals in the Scheduled Date</h6>-->
<!--                        <div v-if="loadingData" class="text-center mt-3">-->
<!--                            Please wait while fetching the data...-->
<!--                        </div>-->
<!--                        <div v-if="!loadingData && scheduledList.length === 0" class="text-center mt-3">-->
<!--                            No data Available-->
<!--                        </div>-->

<!--                        <table class="c-table-1" style="width:100%" v-if="scheduledList.length">-->
<!--                        <thead>-->
<!--                            <tr>-->
<!--                                <th class="text-primary">Batch</th>-->
<!--                                <th class="text-primary">Animal</th>-->
<!--                            </tr>-->
<!--                        </thead>-->
<!--                        <tr v-for="(item, i) in paginatedData" :key="i" style="cursor: pointer">-->
<!--                            <td>{{ item.batch }}</td>-->
<!--                            <td>{{ item.animal.reg_no }}</td>-->
<!--                        </tr>-->
<!--                    </table>-->
<!--            <div class="pagination text-center" v-if="scheduledList.length">-->
<!--                            <btn-group class="ml-2">-->
<!--                              <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                              <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                </btn-group>-->
<!--                        </div>-->
<!--                        </div>-->
<!--                </div>-->
        <div class="row">
            <div class="col-12 text-center mt-5" v-if="loadingBatchList">
                <span class="text-primary font-poppins-medium">
                    Loading batches, please wait...
                </span>
            </div>
            <div class="col-3 pl-0 pr-0 pt-0 pb-0" v-for="(item,i) in batchList" :key="i">
                <div class="card pl-0 pr-0 pt-0 pb-0 mt-5">
                    <table style="width:100%">
                        <thead>
                        <th class="text-primary" :class="{'br-black': i< batchList.length-1 && i!==3} ">{{ item.batch_name }}</th>
                        </thead>
                        <tbody>
                        <tr v-for="(j,k) in item.bulls" :key="k">
                            <td class="" :class="{'br-black': i< batchList.length-1 && i!==3}">{{ j.reg_no }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="column fl-x-br pt-7">
            <!--            <btn text="Save" @click="saveData" class="px-4"></btn>-->
            <div class="btn-group">
            <btn class="ml-2" design="basic-b" type="reset" @click="DownloadSchedule" text="Download"></btn>
            <btn class="ml-2" design="basic-b" type="reset" @click="BackToHome" text="Cancel"></btn>
                </div>
        </div>
    </div>
</template>

<script>
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'CollectionSchedule1',
    data () {
        return {
            URL: urls.collectionSchedule.addEdit,
            loading: false,
            loadingData: false,
            loadingBatchList: false,
            batchOption: [],
            shedOptionURL: urls.reports.optionURLS.shedSelect + '?animal=bull',
            // shedOptionURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            typeOptions: [
                { label: 'Training', value: 'Training' },
                { label: 'Regular', value: 'Regular' }
            ],
            animalOption: [],
            batchList: [],
            scheduledList: [],
            currentPage: 1,
            itemsPerPage: 5,
            model: {
                bull: '',
                collection_type: '',
                batch: '',
                shed_number: '',
                animal: '',
                schedule_date: ''
            }
        };
    },
    // mounted () {
    //     this.loadBatchList();
    // },
    computed: {
        paginatedData () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.scheduledList.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.scheduledList.length / this.itemsPerPage);
        }
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

        clearData () {
            this.model.bull = '';
            this.model.collection_type = '';
            this.model.batch = '';
            this.model.shed_number = '';
            this.model.animal = '';
            // this.model.schedule_date = '';
            this.$refs.form.reset();
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        async loadBatchList () {
            this.loadingBatchList = true;
            this.batchList = [];

            try {
                const response = await axios.get(
                    urls.collectionSchedule.batchList + '?schedule_date=' + this.model.schedule_date
                );
                this.batchList = response.data.data || [];
                console.log('BatchList', this.batchList);
            } catch (error) {
                console.error(error);
                this.batchList = [];
            } finally {
                this.loadingBatchList = false;
            }
        },
        async DownloadSchedule () {
            const that = this;
            that.downloading = true;
            try {
                const response = await axios.form(urls.collectionSchedule.report, { schedule_date: that.model.schedule_date });

                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    this.$notify(json.message, 'Warning',
                        { type: 'warning' }
                    );
                }
            } catch (error) {
                that.downloading = false;
                that.$notify(
                    'Something Went Wrong..!!', 'Error',
                    { type: 'danger' }
                );
            }
        },
        async downloadReport () {
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.semenDestructionProposal.downloadReport + '?proposal_date=' + this.model.proposal_date);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    that.$notify('Enter proposal date .', 'Error', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.$notify('No data found for the selected date range.', 'Error', { type: 'warning' });
            }
        },
        async onScheduleDateChange () {
            if (!this.model.schedule_date) return;
            await this.clearData();
            await this.loadAnimalsBySchedule();
            await this.loadBatchList();
        },
        async loadAnimalsBySchedule () {
            this.loadingData = true;
            this.scheduledList = [];
            try {
                const response = await axios.get(urls.collectionSchedule.scheduleList + '?schedule_date=' + this.model.schedule_date);
                this.scheduledList = response.data.data;
                console.log('Scheduled List', this.scheduledList);
            } catch (error) {
                console.error(error);
                this.scheduledList = [];
            } finally {
                this.loadingData = false;
            }
        },
        async loadBatchOption () {
            this.model.batch = '';
            this.model.bull = '';
            const response = await axios.get(masterURLs.master.batch.vueSelect + '?shed_number=' + this.model.shed_number);
            this.batchOption = response.data.data;
            const aresponse = await axios.get(urls.collectionSchedule.collectionBulls + '?shed_number=' + this.model.shed_number + '&schedule_date=' + this.model.schedule_date + '&type=' + this.model.collection_type);
            this.animalOption = aresponse.data.data;
        },
        // async loadAnimalOption () {
        //     const response = await axios.get(urls.collectionSchedule.collectionBulls + '?shed_number=' + this.model.shed_number + '&type=' + this.model.collection_type);
        //     this.animalOption = response.data.data;
        // },
        async saveData () {
            await this.$router.push({ path: '/semen-station/' });
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.clearData();
                    await this.loadBatchList();
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
    h2 {
        color: #3954A4;
    }

    h6 {
        color: #3954A4;
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
    }

    td {
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

    .c-table-b-r {
        th {
            border-right: 1px solid black !important;
        }
    }

    .br-black {
        border-right: 1px solid black !important;
    }

    //.v1 {
    //   border-right: 1px solid black;
    //}

</style>

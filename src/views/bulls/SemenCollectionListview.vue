<template>
    <div>
    <div class="row fl-x fl-j-sb">
        <h3 class="text-primary fs-lg-4 font-poppins-semibold">Semen Collection Details </h3>
        <div class="mr-4 mb-2">
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="SemenCollectionAdd">Add Semen Collection</btn>
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>

        </div>
    </div>
        <div class="table-container">
            <div class="filter-container">
                <validated-date-picker
                    format="DD-MM-YYYY"
                    :clearable="true"
                    v-model="collection_date"
                    label="Collection Date"
                    class="c-input-datepicker">
                </validated-date-picker>
            </div>
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false"
                       :extra-params="{ collection_date: collection_date }">
                <template slot="actions" slot-scope="props">
                    <div class="btn-group">
                        <btn text="" size="sm" icon="fa fa-pencil" color="primary"
                                     @click="detailsPage(props.rowData.id)"/>
                    </div>
                </template>
            </vue-table>
        </div>
<!--        <div v-if="loadingData" class="text-center my-5">-->
<!--            <div class="spinner"></div>-->
<!--            <p class="mt-2">Please wait while fetching the data...</p>-->
<!--        </div>-->
<!--            <div v-else-if="viewData.length" class="card pl-0 pr-0 pb-0 ml-lg-auto">-->
<!--                <table class="c-table-1" style="width:100%;">-->
<!--                    <thead>-->
<!--                        <th class="text-primary">Collection Date</th>-->
<!--                        <th class="text-primary">Batch</th>-->
<!--                        <th class="text-primary">Dose Type</th>-->
<!--                        <th class="text-primary">No of Animals</th>-->
<!--                        <th class="text-primary">Action</th>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        <tr v-for="(item, i) in paginatedData" :key="i">-->
<!--                        <td>{{ item.collection_date }}</td>-->
<!--&lt;!&ndash;                        <td>{{ item.batch.name }}</td>&ndash;&gt;-->
<!--                        <td>{{ item.batch.map(b => b.name).join(', ') }}</td>-->
<!--                        <td>{{ item.dose_type.name }}</td>-->
<!--                        <td>{{ item.animals_count}}</td>-->
<!--                        <td><btn class="btn btn-sm  border-r-1 bordered p-1" @click="detailsPage(item.id)" style="cursor: pointer">Edit</btn></td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--&lt;!&ndash;                    <tr class="mt-3" v-if="loadingData">&ndash;&gt;-->
<!--&lt;!&ndash;                        <td colspan="4">Please wait while fetching the data...</td>&ndash;&gt;-->
<!--&lt;!&ndash;                    </tr>&ndash;&gt;-->
<!--&lt;!&ndash;                    <tr v-if="!loadingData && semenList.length === 0" class="text-center">&ndash;&gt;-->
<!--&lt;!&ndash;                        <td colspan="11" class="mt-3"> No data</td>&ndash;&gt;-->
<!--&lt;!&ndash;                    </tr>&ndash;&gt;-->
<!--                </table>-->
<!--&lt;!&ndash;                <div v-if="loadingData" class="text-center mt-3 mb-3">&ndash;&gt;-->
<!--&lt;!&ndash;                    Please wait while fetching the data...&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div v-if="!loadingData && viewData.length === 0" class="text-center mt-3 mb-3">&ndash;&gt;-->
<!--&lt;!&ndash;                    No data&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                <div class="pagination text-center" >-->
<!--                            <btn-group class="ml-2">-->
<!--                              <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                              <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                            </btn-group>-->
<!--                </div>-->
<!--            </div>-->
<!--       <div v-else class="text-center my-5">-->
<!--            <p>No data</p>-->
<!--        </div>-->
</div>
</template>
<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'SemenCollectionList',
    data () {
        return {
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            collection_date: '',
            // tableLoading: false,
            loadingData: false,
            listURL: urls.semenCollection.list,
            fields: [
                {
                    name: 'collection_date',
                    // sortField: 'collection_date',
                    title: 'Collection Date'
                },
                {
                    name: 'batch_names',
                    // sortField: 'batch_names',
                    title: 'Batch'
                },
                {
                    name: 'dose_type.name',
                    // sortField: 'dose_type.name',
                    title: 'Dose Type'
                },
                {
                    name: 'animals_count',
                    // sortField: 'animals_count',
                    title: 'No of Animals'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ]
        };
    },
    mounted () {
        this.loadSemenList();
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
    watch: {
        collection_date () {
            this.$nextTick(() => {
                this.$refs.table.loadData();
            });
        }
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
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
        SemenCollectionAdd () {
            this.$router.push({ path: '/semen-collection-add/' });
        },
        async loadSemenList () {
            this.loadingData = true;
            // this.tableLoading = false;

            try {
                const res = await axios.get(urls.semenCollection.list);
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
                name: 'SemenCollectionEdit',
                params: { id: id }
            });
        }
    }
};

</script>
<style>
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
    .table-container {
        background-color: #fff;
        border-radius: 12px;
        padding: 20px;
    }

    .filter-container {
        width: 250px;
        margin-bottom: 10px;
    }
</style>

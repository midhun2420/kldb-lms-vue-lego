<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Quarantine</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <div>
            <div class="col-lg-12">
<!--                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Bull Quarantine</h3>-->

                <div class="row">
                    <div class="col-lg-2">
                        <validated-vue-select class="c-input-select field-required"
                                              :options="typeOptions"
                                              label="Type of Quarantine"
                                              v-model="selectedType" :rules="{required:true}"></validated-vue-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-12" >
                        <div>
                            <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Bull Quarantine List</h3>
                        </div>
                        <div>
                            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" search-placeholder="Bull">
                                <template slot="actions" slot-scope="item">
                                    <div class="btn-group">
                                        <btn text="Detail" class="btn btn-sm"
                                             @click="quarantineDetails(item.rowData.id)"/>
                                    </div>
                                </template>
                            </vue-table>
                        </div>
<!--                        <div v-if="loadingData" class="text-center my-5">-->
<!--                            <div class="spinner"></div>-->
<!--                            <p class="mt-2">Please wait while fetching the data...</p>-->
<!--                        </div>-->
<!--                        <div v-else-if="paginatedBulls.length">-->
<!--                            <table style="width:100%" class="c-table-1 mt-2">-->
<!--                                <th class="text-primary">Bull</th>-->
<!--                                <th class="text-primary">Start Date</th>-->
<!--                                <th class="text-primary">End Date</th>-->
<!--&lt;!&ndash;                                <th class="text-primary">Training Date</th>&ndash;&gt;-->
<!--                                <th class="text-primary">Addition Date</th>-->
<!--                                <th class="text-primary">Breed</th>-->
<!--                                <th class="text-primary">Shed</th>-->
<!--                                <th class="text-primary">Status</th>-->
<!--                                <th class="text-primary">Detail</th>-->
<!--&lt;!&ndash;                                <th class="text-primary">Shed</th>&ndash;&gt;-->
<!--                                <tr v-for="(item, i) in paginatedBulls" :key="i">-->
<!--                                    <td>{{ item.bull ? item.bull.reg_no : '-' }}</td>-->
<!--                                    <td>{{ item.start_date ? item.start_date : '-' }}</td>-->
<!--                                    <td>{{ item.end_date ? item.end_date : '-' }}</td>-->
<!--&lt;!&ndash;                                    <td>{{ item.training_date ? item.training_date : '-' }}</td>&ndash;&gt;-->
<!--                                    <td>{{ item.addition_date ? item.addition_date : '-' }}</td>-->
<!--                                    <td>{{ item.bull ? item.bull.breed : '-'}}</td>-->
<!--                                    <td>{{ item.bull ? item.bull.shed : '-'}}</td>-->
<!--                                    <td>{{ item.bull ? item.bull.status : '-'}}</td>-->

<!--                                    <td>-->
<!--                                        <div>-->
<!--                                            <btn text="View" @click="quarantineDetails(item.id)" class="btn btn-sm"-->
<!--                                                 :loading="loading" loading-text="Saving..."></btn>-->
<!--                                        </div>-->
<!--                                    </td>-->
<!--                                </tr>-->
<!--                                <tr v-if="paginatedBulls.length === 0">-->
<!--                                  <td colspan="9" class="text-center text-muted p-3">-->
<!--                                      <strong>No data found</strong>-->
<!--                                  </td>-->
<!--                                </tr>-->

<!--                            </table>-->
<!--                            &lt;!&ndash; Pagination Buttons &ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="pagination-container mt-3">&ndash;&gt;-->
<!--&lt;!&ndash;                                <button&ndash;&gt;-->
<!--&lt;!&ndash;                                    v-for="n in totalPages"&ndash;&gt;-->
<!--&lt;!&ndash;                                    :key="n"&ndash;&gt;-->
<!--&lt;!&ndash;                                    @click="currentPage = n"&ndash;&gt;-->
<!--&lt;!&ndash;                                    :class="['pagination-btn', { active: currentPage === n }]">&ndash;&gt;-->
<!--&lt;!&ndash;                                    {{ n }}&ndash;&gt;-->
<!--&lt;!&ndash;                                </button>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                             <div class="pagination text-center">-->
<!--                                <btn-group class="ml-2">-->
<!--                                  <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                  <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--                                  <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                                    </btn-group>-->
<!--                            </div>-->

<!--                        </div>-->
                </div>
            </div>
        </div>
        <div class="color-txt" v-if="selectedType !==''">
            <bull-quarantine :clear-data="clearData" :type="selectedType"></bull-quarantine>
        </div>
        </div>
    </div>
</template>

<script>
// import BullQuarantine from '../../components/BullQuarntine/BullQuarantine';
import urls from '../../data/urls';
// import BullQuarantineDetails from '../../components/BullQuarntine/quarantineDetail';
import axios from 'secure-axios';

export default {
    name: 'BullQuaratineTwo',
    // components: { BullQuarantine },
    data () {
        return {
            selectedType: '',
            // # added below for test on 06-11-2025
            selectedBullsList: [],
            //  for pagination
            currentPage: 1,
            itemsPerPage: 10,
            loadingData: false,
            listURL: urls.quarantine.list,
            // ----------------------------------
            clearData: false,
            typeOptions: [
                {
                    label: 'New Bull Quarantine',
                    value: 'New Bull Quarantine'
                },
                {
                    label: 'Existing Bull Update',
                    value: 'Existing Bull Update'
                }
            ],
            fields: [
                {
                    name: 'bull.reg_no',
                    // sortField: 'bull',
                    title: 'Bull'
                },
                {
                    name: 'start_date',
                    // sortField: 'start_date',
                    title: 'Start Date'
                },
                {
                    name: 'end_date',
                    // sortField: 'end_date',
                    title: 'End Date'
                },
                {
                    name: 'addition_date',
                    // sortField: 'addition_date',
                    title: 'Addition Date'
                },
                {
                    name: 'bull.breed',
                    // sortField: 'breed',
                    title: 'Breed'
                },
                {
                    name: 'bull.shed',
                    // sortField: 'shed',
                    title: 'Shed'
                },
                {
                    name: 'bull.status',
                    // sortField: 'status',
                    title: 'Status'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ]
        };
    },
    //  for pagination
    computed: {
        paginatedBulls () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.selectedBullsList.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.selectedBullsList.length / this.itemsPerPage);
        }
    },
    // -----------------------------------------------------------------------------

    mounted () {
        console.log('---inside mounted---');
        this.loadBulls();
    },
    // added the below watch for redirecting to the add page by midhun on 18-11-2025
    watch: {
        selectedType (newVal) {
            console.log('inside watch---------------------');
            if (!newVal) return;

            const targetRoute = {
                name: 'BullQuarantine',
                query: { type: newVal }
            };

            // Prevent navigating to same page with same params
            if (this.$route.name === 'BullQuarantine' &&
        this.$route.query.type === newVal) {
                return; // already there
            }
            console.log('target route---------', targetRoute);
            this.$router.push(targetRoute).catch(() => {});
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
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        ChangeData () {
            this.clearData = !this.clearData;
        },
        // #added for test on 06-11-2025
        // list of the bulls
        async loadBulls () {
            console.log('---inside loadBulls---');
            this.loadingData = true;
            try {
                const response = await axios.get(urls.quarantine.list);
                this.selectedBullsList = response.data.data || []; // adjust as per API response
                console.log('API Success --------', this.selectedBullsList);
            } catch (error) {
                console.error('API Error --------', error);
                this.selectedBullsList = [];
            } finally {
                this.loadingData = false;
            }
        },
        async quarantineDetails (quarantineId) {
            console.log('---inside quarantineDetails---');
            console.log('---quarantine id--', quarantineId);
            this.$router.push({
                name: 'BullQuarantineDetails',
                params: { id: quarantineId }
            });
            // try {
            //     const response = await axios.form(urls.quarantine.details, { id: quarantineId });
            //     this.detailItem = response.data.data || []; // adjust as per API response
            //     console.log('API Success --------', this.detailItem);
            // } catch (error) {
            //     console.error('API Error --------', error);
            //     this.detailItem = [];
            // }
        }

    }
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  gap: 8px; /* space between buttons */
  margin-top: 16px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.pagination-btn:hover {
  background-color: #007bff;
  color: #fff;
}

.pagination-btn.active {
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
}

</style>

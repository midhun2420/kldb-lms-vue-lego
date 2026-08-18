<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Milk Disposal</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form :key="formKey" @submit="addItem">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Milk Disposal</h2>-->
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-date-picker label="Date" :rules="{required:true}" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black field-required" v-model="model.milk_disposal_date" format="DD-MM-YYYY"></validated-date-picker>
            </div>

            <div class="col-lg-2 mt-4">
                <validated-file-input :key="fileInputKey" class="w-10r" label-text="Upload Excel File"  v-model="model.milk_disposal_file"></validated-file-input>
            </div>
        </div>
            <div class="row mt-4">
                <div class="col-lg-4">
                    <validated-text-area class="field-required" label="Remarks" :rules="{required:true}" v-model="model.remarks"></validated-text-area>
                </div>

             <div class="col-lg-8 mt-5">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
        </s-form>
        <div class="table-container">
            <div class="filter-container">
                <validated-date-picker
                        format="DD-MM-YYYY"
                        :clearable="true"
                        class="c-input-datepicker"
                        v-model="milk_disposal_date"
                        label="Disposal Date">
                </validated-date-picker>
            </div>
            <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false"
                       :extra-params="{ milk_disposal_date: milk_disposal_date }">
                <template slot="milk_disposal_file" slot-scope="props">
                    <a
                        v-if="props.rowData.milk_disposal_file"
                        :href="props.rowData.milk_disposal_file"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ getFileName(props.rowData.milk_disposal_file) }}
                    </a>
                    <span v-else>-</span>
                </template>
                <template slot="action" slot-scope="props">
                    <div class="btn-group">
                        <btn class="btn btn-sm btn-primary border-r-1 bordered p-1" @click="detailsPage(props.rowData.id)" style="cursor: pointer">Edit</btn>
                    </div>
                </template>
            </vue-table>
        </div>
<!--        <div class="col-12 mt-3">-->
<!--                    <div class="card pl-0 pr-0 pt-0 pb-0 of-h">-->
<!--&lt;!&ndash;                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg&#45;&#45;1">Milk Disposal</div>&ndash;&gt;-->
<!--                        <table style="width:100%" class="c-table-1" v-if="viewData.length">-->
<!--                            <thead>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Disposal Date</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Disposal File</h5></th>-->
<!--                            <th class=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary fl-y-tc">Remarks</h5></th>-->
<!--                            </thead>-->
<!--                            <tbody class="">-->
<!--                            <tr v-for="(item, i) in paginatedData" :key="i">-->
<!--                                <td>{{ item.milk_disposal_date }}</td>-->

<!--                                <td>-->
<!--                                  <a-->
<!--                                    :href="item.milk_disposal_file"-->
<!--                                    target="_blank"-->
<!--                                    rel="noopener noreferrer"-->
<!--                                    v-if="item.milk_disposal_file"-->
<!--                                  >-->
<!--                                    {{ getFileName(item.milk_disposal_file) }}-->
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

    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'MilkDisposal',
    data () {
        return {
            URL: urls.cowMilkDisposal.addEdit,
            listURL: urls.cowMilkDisposal.list,
            milk_disposal_date: '',
            fields: [
                {
                    name: 'milk_disposal_date',
                    title: 'Disposal Date'
                },
                {
                    name: '__slot:milk_disposal_file',
                    title: 'Disposal File'
                },
                {
                    name: 'remarks',
                    title: 'Remarks'
                }
            ],
            loading: false,
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            fileInputKey: 0,
            formKey: 0,
            model: {
                milk_disposal_date: '',
                milk_disposal_file: '',
                remarks: ''

            }
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
    watch: {
        milk_disposal_date () {
            this.$nextTick(() => {
                this.$refs.table.loadData();
            });
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
            this.$router.push({ path: '/ah-section/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadData () {
            this.viewData = [];
            const response = await axios.get(urls.cowMilkDisposal.list);
            this.viewData = response.data.data;
            console.log('response', this.data);
        },
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
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
                    this.model.milk_disposal_date = '';
                    this.model.milk_disposal_file = '';
                    this.fileInputKey++;
                    this.formKey++;
                    this.loadData();
                    // await this.$router.push({ path: '/cows-milk-disposal/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
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

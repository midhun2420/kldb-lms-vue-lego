<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Regularization</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="AddRecord">Add Bull Regularization</btn>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10">

            <template slot="actions" slot-scope="props">
                <div class="btn-group">
                    <btn text="" size="sm" icon="fa fa-pencil" color="primary"
                         @click="editItem(props.rowData)"/>
                </div>

            </template>
        </vue-table>
        <modal ref="editRecord" :no-close-on-backdrop="true" title="Edit Bull Regularization" header-color="primary">
            <s-form @submit="EditRecord">
                <div class="row">
                    <validated-input label="Animal No" disabled class="col-3" v-model="editingItem.animal_no"></validated-input>
                    <validated-input label="Renumber" disabled class="col-3" v-model="editingItem.renumber"></validated-input>
                    <validated-input label="Breed" disabled class="col-3" v-model="editingItem.breed"></validated-input>
                    <validated-input label="Age(in Months)" disabled class="col-3" v-model="editingItem.age"></validated-input>
                    <validated-input label="Sire no" disabled class="col-3" v-model="editingItem.sire_no"></validated-input>
                    <validated-input label="Dam No" disabled class="col-3" v-model="editingItem.dam_no"></validated-input>
                    <validated-date-picker format="DD-MM-YYYY" disabled
                                           label="First Collection Date" class="col-3" v-model="editingItem.first_collection_date"
                                           :rules=rules.Date></validated-date-picker>
                    <validated-date-picker format="DD-MM-YYYY" disabled
                                           label="Regular Date"  class="col-3" v-model="editingItem.regular_date" :rules=rules.Date></validated-date-picker>
                    <validated-input label="Bull Name" disabled class="col-3" v-model="editingItem.bull_name"></validated-input>
                    <validated-input label="INAPH Code" class="col-3" v-model="editingItem.inaph_code"></validated-input>
                    <validated-vue-select label="Group Allotted"
                                          :options="groupOption"
                                          class="col-3 c-input-select-2"
                                          v-model="editingItem.group"></validated-vue-select>
<!--                    <validated-vue-select label="Allotted District" multiple disabled-->
<!--                                          :options="distictOption"-->
<!--                                          class="col-3" v-model="editingItem.district"></validated-vue-select>-->
                    <validated-input label="Remarks" class="col-3" v-model="editingItem.remarks"></validated-input>
                </div>
                    <div class="col-12 text-right mt-4">
                        <btn type="submit" text="Save" :loading="editLoading" class="px-4"></btn>
                    </div>

            </s-form>
        </modal>
</div>

</template>
<script>
import axios from 'secure-axios';
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'BullRegularizationList',
    data () {
        return {
            viewData: [],
            groupOptionURL: masterURLs.master.group.vueSelect,
            distictOptionURL: masterURLs.master.location.district.vueSelect,
            distictOption: [],
            groupOption: [],
            currentPage: 1,
            itemsPerPage: 10,
            // tableLoading: false,
            loadingData: false,
            listURL: urls.regularization.list,
            editLoading: false,
            editStatus: false,
            editingItem: {
                id: null,
                animal_no: null,
                renumber: null,
                breed: null,
                age: null,
                first_collection_date: null,
                regular_date: null,
                bull_name: null,
                inaph_code: null,
                // district: null,
                name: null,
                sire_no: null,
                dam_no: null,
                remarks: null,
                group: null
            },
            fields: [
                {
                    name: 'bull.reg_no',
                    // sortField: '',
                    title: 'Animal No'
                },
                {
                    name: 'bull_name',
                    sortField: 'bull_name',
                    title: 'Name'
                },
                {
                    name: 'first_collection_date',
                    sortField: 'first_collection_date',
                    title: 'First Collection Date'
                },
                {
                    name: 'regular_date',
                    sortField: 'regular_date',
                    title: 'Regular Date'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ],
            rules: {
                positiveOnly: {
                    customValidator (value) {
                        return value < 0 ? 'Please enter a valid number' : true;
                    }
                }
            }

        };
    },
    mounted () {
        this.loadDist();
        this.loadGroup();
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        editItem (item) {
            console.log('edit-item:>>>:', item);
            this.editStatus = true;
            this.editingItem.id = item.id;
            this.editingItem.bull = item.bull.id;
            this.editingItem.animal_no = item.bull.reg_no;
            this.editingItem.renumber = item.bull.renumber;
            this.editingItem.breed = item.bull.breed;
            this.editingItem.age = item.bull.age;
            this.editingItem.first_collection_date = item.first_collection_date;
            this.editingItem.regular_date = item.regular_date;
            this.editingItem.bull_name = item.bull_name;
            this.editingItem.inaph_code = item.inaph_code;
            // this.editingItem.district = item.district;
            this.editingItem.name = item.name;
            this.editingItem.sire_no = item.bull.sire_no;
            this.editingItem.dam_no = item.bull.dam_no;
            this.editingItem.remarks = item.remarks;
            this.editingItem.group = item.group.id || '';
            this.$refs.editRecord.show();
        },
        async loadDist () {
            const response = await axios.get(this.distictOptionURL);
            this.distictOption = response.data.data;
        },
        async loadGroup () {
            const response = await axios.get(this.groupOptionURL);
            this.groupOption = response.data.data;
        },
        AddRecord () {
            this.$router.push({ path: '/bull-regularization/' });
        },
        // FilterAndLoadDistrict (value) {
        //     const selectedGroup = this.groupOption.find(group => group.value === value);
        //     if (selectedGroup) {
        //         this.editingItem.district = selectedGroup.district_id;
        //     }
        // },
        async EditRecord () {
            this.editLoading = true;
            console.log('Inside Edit------------------');
            if (this.editingItem.group === undefined || this.editingItem.group === null) {
                this.editingItem.group = '';
            } try {
                const response = await axios.form(urls.regularization.edit, this.editingItem);
                const result = response.data;
                if (result.success) {
                    this.$notify(
                        'Updated Successfully',
                        'Success',
                        { type: 'success' }
                    );

                    this.$refs.editRecord.close();
                    this.$refs.table.refreshTable();
                } else if (result.errors) {
                    const errors = result.errors;

                    for (const key in errors) {
                        let errorMessage = '';

                        if (key === '__all__') {
                            errorMessage = `${errors[key]}`;
                        } else {
                            errorMessage = `${key}: ${errors[key]}`;
                        }

                        this.$notify(
                            errorMessage,
                            'Warning',
                            { type: 'warning' }
                        );
                    }
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
            } finally {
                this.editLoading = false;
            }
        },
        // detailsPage (id) {
        //     this.$router.push({
        //         name: 'DailyMilkRecordingEdit',
        //         params: { id: id }
        //     });
        // },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
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
</style>

<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Disposal</h2>
             <div class="row fl-j-e mr-3 mt-3">
                 <div class="mr-1"><btn class="btn btn-sm  border-r-1 bordered p-1" style="cursor: pointer" @click="AddRecord">Add Disposal</btn></div>
                 <div><btn class="btn btn-sm  border-r-1 bordered p-1" style="cursor: pointer" @click="BackToHome">Back</btn></div>
             </div>
        </div>
        <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10">

            <template slot="actions" slot-scope="props">
                <div class="btn-group">
                    <btn text="" size="sm" icon="fa fa-pencil" color="primary"
                         @click="editItem(props.rowData)"/>
                    <btn text="" size="sm" icon="fa fa-trash" color="danger"
                         @click="deleteItem(props.rowData.id)"/>
                </div>

            </template>
        </vue-table>
        <modal ref="editRecord" :no-close-on-backdrop="true" title="Edit Disposal" header-color="primary">
            <s-form @submit="EditRecord">
                <div class="row">
                    <validated-input label="Proposal Date" :rules="{required: true}"
                                         class="col-3" border-radius="1" v-model="editingItem.disposal_date" disabled></validated-input>
                    <validated-input label="Register No" :rules="{required: true}"
                                         class="col-3" border-radius="1" v-model="editingItem.reg_no" disabled></validated-input>
                    <validated-input label="Book Value" :rules="{required: true, ...rules.positiveOnly}"
                                         class="col-3" border-radius="1" v-model="editingItem.book_value" disabled></validated-input>
                    <validated-input label="Meat Value" :rules="{required: true, ...rules.positiveOnly}"
                                         class="col-3" border-radius="1" v-model="editingItem.meat_value" disabled></validated-input>
                    <validated-ajax-vue-select class="col-6 field-required"
                                               :ajax-method="'get'"
                                               :url="cullingReasonSelectURL" :rules="{required:true}"
                                               label="Reason for culling" v-model="editingItem.culling_reason"></validated-ajax-vue-select>
                    <validated-ajax-vue-select class="col-6 field-required"
                                               :ajax-method="'get'"
                                               :url="disposalModeSelectURL" :rules="{required:true}"
                                               label="Disposal Mode" v-model="editingItem.disposal_mode"></validated-ajax-vue-select>
                    <validated-input label="Live Body Weight" :rules="{required: true, ...rules.positiveOnly}"
                                         class="col-3 field-required" border-radius="1" v-model="editingItem.live_body_weight"></validated-input>
                    <validated-input label="Approval No" :rules="{required: true, ...rules.positiveOnly}"
                                         class="col-3 field-required" border-radius="1" v-model="editingItem.approval_no"></validated-input>
                    <validated-checkbox class="col-3 mt-4" v-model="editingItem.approval_no" label="Disposed" disabled></validated-checkbox>
                    <validated-input label="Remarks" class="col-12" border-radius="1" v-model="editingItem.remarks"></validated-input>

                </div>
                    <div class="col-12 text-right mt-4">
                        <btn type="submit" text="Save" :loading="editLoading" class="px-4"></btn>
                    </div>

            </s-form>
        </modal>

        <delete-modal ref="deleteModal" :no-close-on-backdrop="true" enter-animation="animated slideInDown" exit-animation="animated slideOutUp" :url="deleteURL" :params="{id : itemID}"
                      @response="deleteComplete">
            <p> Are you sure ?</p>
            <template #loading>
                <div class="fl-x">
                    <loading-animation/>
                    <b class="ml-3">Please Wait...</b>
                </div>
            </template>
        </delete-modal>

</div>

</template>
<script>
import axios from 'secure-axios';
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'DailyMilkRecordingList',
    data () {
        return {
            viewData: [],

            currentPage: 1,
            itemsPerPage: 10,
            // tableLoading: false,
            loadingData: false,
            listURL: urls.disposal.list,
            cullingReasonSelectURL: masterURLs.master.reasonForCulling.vueSelect,
            disposalModeSelectURL: masterURLs.master.modeOfDisposal.vueSelect,
            deleteURL: urls.disposal.delete,
            getMeatValueURL: masterURLs.master.bookValue.getMeatValue,
            itemID: null,
            editLoading: false,
            editStatus: false,
            editingItem: {
                id: null,
                is_bull: null,
                is_cow: null,
                reg_no: null,
                disposal_date: null,
                culling_reason: null,
                book_value: null,
                live_body_weight: null,
                meat_value: null,
                disposal_mode: null,
                remarks: null,
                approval_no: null
            },
            fields: [
                {
                    name: 'disposal_date',
                    sortField: 'disposal_date',
                    title: 'Disposal Date'
                },
                {
                    name: 'reg_no',
                    sortField: 'reg_no',
                    title: 'Register No'
                },
                {
                    name: 'book_value',
                    sortField: 'book_value',
                    title: 'Book Value'
                },
                {
                    name: 'meat_value',
                    sortField: 'meat_value',
                    title: 'Meat Value'
                },
                {
                    name: 'disposal_mode',
                    sortField: 'disposal_mode',
                    title: 'Disposal Mode'
                },
                {
                    name: 'culling_reason',
                    sortField: 'culling_reason',
                    title: 'Culling Reason'
                },
                {
                    name: 'approval_no',
                    sortField: 'approval_no',
                    title: 'Approval No'
                },
                {
                    name: 'live_body_weight',
                    sortField: 'live_body_weight',
                    title: 'Live Body Weight'
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

    methods: {
        editItem (item) {
            console.log('edit-item:>>>:', item);
            this.editStatus = true;
            this.editingItem.id = item.id;
            this.editingItem.is_bull = item.is_bull;
            this.editingItem.is_cow = item.is_cow;
            this.editingItem.reg_no = item.reg_no;
            this.editingItem.disposal_date = item.disposal_date;
            this.editingItem.culling_reason = item.culling_reason;
            this.editingItem.book_value = item.book_value;
            this.editingItem.live_body_weight = item.live_body_weight;
            this.editingItem.meat_value = item.meat_value;
            this.editingItem.disposal_mode = item.disposal_mode;
            this.editingItem.remarks = item.remarks;
            this.editingItem.approval_no = item.approval_no;
            this.$refs.editRecord.show();
        },
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        deleteItem (item) {
            this.itemID = item;
            this.$refs.deleteModal.show();
        },
        deleteComplete (response) {
            const data = response.data || response;
            console.log(data);
            if (data.success === true) {
                this.$notify(
                    data.message || 'Deleted Successfully',
                    'Success',
                    { type: 'success' }
                );
                this.$refs.table.refreshTable();
            } else {
                this.$notify(
                    data.message || 'Unable to delete record',
                    'Warning',
                    { type: 'warning' }
                );
            }

            this.$refs.deleteModal.close();
        },
        AddRecord () {
            this.$router.push({ path: '/bull-disposal/' });
        },
        // async EditRecord () {
        //     this.editLoading = true;
        //     console.log('Inside Edit------------------');
        //     try {
        //         const response = await axios.form(urls.disposal.addEdit, this.editingItem);
        //         const result = response.data;
        //         if (result.success) {
        //             if (result.errors) {
        //                 const errors = response.data.errors;
        //                 for (const key in errors) {
        //                     if (Object.prototype.hasOwnProperty.call(errors, key)) {
        //                         let errorMessage = '';
        //                         if (key === '__all__') {
        //                             errorMessage = `${errors[key]}`;
        //                         } else {
        //                             errorMessage = `${key}:  ${errors[key]}`;
        //                         }
        //                         this.$notify('Added Successfully', 'Success', { type: 'success' });
        //                         this.$notify(errorMessage, 'Warning', { type: 'warning' });
        //                     }
        //                 }
        //             }
        //         }
        //         this.editLoading = false;
        //         this.$refs.editRecord.close();
        //         this.$refs.table.refreshTable();
        //     } catch (error) {
        //         this.$notify(
        //             'Something Went Wrong..!!',
        //             error.response.status + ' ' + error.response.statusText,
        //             { type: 'danger' }
        //         );
        //         this.editLoading = false;
        //     }
        // },
        async EditRecord () {
            this.editLoading = true;
            console.log('Inside Edit------------------');

            try {
                const response = await axios.form(urls.disposal.addEdit, this.editingItem);
                const result = response.data;

                if (result.success) {
                    this.$notify(
                        result.message || 'Updated Successfully',
                        'Success',
                        { type: 'success' }
                    );

                    if (result.errors) {
                        const errors = result.errors;

                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
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
                    }

                    this.$refs.editRecord.close();
                    this.$refs.table.refreshTable();
                } else {
                    this.$notify(
                        result.message || 'Unable to update record',
                        'Warning',
                        { type: 'warning' }
                    );
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
        detailsPage (id) {
            this.$router.push({
                name: 'DailyMilkRecordingEdit',
                params: { id: id }
            });
        },
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        async calculateMeatValue (weight) {
            if (!weight || !this.editingItem.reg_no) {
                this.editingItem.meat_value = '';
                return;
            }

            try {
                const response = await axios.get(this.getMeatValueURL, {
                    params: {
                        regno: this.editingItem.reg_no,
                        type: this.editingItem.is_bull ? 'Bull' : 'Cow',
                        live_body_weight: weight
                    }
                });

                this.editingItem.meat_value = response.data.data.meat_value;
            } catch (error) {
                console.error('Error calculating meat value:', error);
                this.editingItem.meat_value = '';
            }
        }
    },
    watch: {
        'editingItem.live_body_weight' (newWeight) {
            this.calculateMeatValue(newWeight);
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

<template>
    <div class="container">
        <div class="mt-5 mb-2 fl-te-c card">
            <h4 class="text-primary mb-0 font-poppins-semibold">BOOK VALUE</h4>
            <div>
                <btn size="sm" text="ADD" icon="fa fa-plus"
                     @click="$refs.addBookValue.show();"></btn>
                <btn size="sm" text="BACK" icon="fa fa-arrow-left" class="ml-1"
                     @click="BackToHome"></btn>
            </div>
        </div>
        <div class="card mt-2">
            <div class="row m-0">
                <div class="col-12">
                    <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" :show-search-box="false">
                        <template slot="actions" slot-scope="props">
                            <div class="btn-group">
                                <btn text="" size="sm" icon="fa fa-pencil" color="primary"
                                     @click="editItem(props.rowData)"/>
                                <btn text="" size="sm" icon="fa fa-trash" color="danger"
                                     @click="deleteItem(props.rowData.id)"/>
                            </div>

                        </template>
                    </vue-table>

                </div>

            </div>
        </div>

        <modal ref="addBookValue" :no-close-on-backdrop="true" title="Book Value" :show-additional-buttons="true">
            <template #buttons>
                <a @click="addClose"><i class="fa fa-close"></i></a>
            </template>
            <s-form @submit="addEditItem">
                 <div class="row">
                    <div class="col-lg-6">
                        <validated-date-picker v-model="model.starting_from" :disabled-date="disabledAfterToday"
                                           label="Date"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY"/>
                    </div>
                 </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="At Birth" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.at_birth"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Upto 3 Months" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.upto_3"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="3 to 4" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_3_4"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="4 to 5" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_4_5"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="5 to 6" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_5_6"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="6 to 9" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_6_9"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="9 to 15" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_9_15"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="15 to 20" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_15_20"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="20 to 28" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_20_28"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="28 to 32" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.month_28_32"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Bull 32 to 80" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.bull_32_80"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Bull more than 80" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.bull_more_80"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation Upto 1500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.cow_lact_upto_1500"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation 1500 to 2000" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.cow_lact_1501_2000"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation 2000 to 2500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.cow_lact_2001_2500"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation Above 2500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.cow_lact_above_2500"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="After 4 Lactation Reduce" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.after_4_lact_price_reduce"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Culled Animal price" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="model.culled_animal_price"></validated-input>
                    </div>

                    <div class="col-12 text-right mt-4">
                        <btn text="Save" :loading="addLoading" loading-text="Saving..." class="px-4"></btn>
                    </div>
                </div>
            </s-form>
        </modal>
        <modal ref="editBookValue" :no-close-on-backdrop="true" title="Book Value">
            <s-form @submit="addEditItem">
                <div class="row">
                    <div class="col-lg-6">
                        <validated-date-picker v-model="editingItem.starting_from" :disabled-date="disabledAfterToday"
                                           label="Date"
                                           class="c-input-datepicker field-required"
                                           format="DD-MM-YYYY"/>
                    </div>
                 </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="At Birth" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.at_birth"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Upto 3 Months" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.upto_3"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="3 to 4" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_3_4"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="4 to 5" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_4_5"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="5 to 6" :rules="{required: true}"
                                         class="" border-radius="1" v-model="editingItem.month_5_6"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="6 to 9" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_6_9"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="9 to 15" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_9_15"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="15 to 20" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_15_20"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="20 to 28" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_20_28"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="28 to 32" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.month_28_32"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Bull 32 to 80" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.bull_32_80"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Bull more than 80" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.bull_more_80"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation Upto 1500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.cow_lact_upto_1500"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation 1500 to 2000" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.cow_lact_1501_2000"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation 2000 to 2500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.cow_lact_2001_2500"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <validated-input label="Cow Lactation Above 2500" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.cow_lact_above_2500"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="After 4 Lactation Reduce" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.after_4_lact_price_reduce"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Culled Animal price" :rules="{required: true}"
                                         class="field-required" border-radius="1" v-model="editingItem.culled_animal_price"></validated-input>
                    </div>
                    <div class="col-12 text-right mt-4">
                        <btn text="Save" :loading="editLoading" loading-text="Saving..." class="px-4"></btn>
                    </div>
                </div>
            </s-form>
        </modal>

        <delete-modal ref="deleteModal" enter-animation="animated slideInDown" exit-animation="animated slideOutUp" :url="deleteURL" :params="{id : itemID}"
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
import masterURLs from '../../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'BookValue',
    data () {
        return {
            addEditURL: masterURLs.master.bookValue.addEdit,
            listURL: masterURLs.master.bookValue.list,
            deleteURL: masterURLs.master.bookValue.delete,
            itemID: null,
            addLoading: false,
            editLoading: false,
            editStatus: false,
            editingItem: {
                id: null,
                starting_from: null,
                at_birth: null,
                upto_3: null,
                month_3_4: null,
                month_4_5: null,
                month_5_6: null,
                month_6_9: null,
                month_9_15: null,
                month_15_20: null,
                month_20_28: null,
                month_28_32: null,
                bull_32_80: null,
                bull_more_80: null,
                cow_lact_upto_1500: null,
                cow_lact_1501_2000: null,
                cow_lact_2001_2500: null,
                cow_lact_above_2500: null,
                after_4_lact_price_reduce: null,
                culled_animal_price: null
            },
            model: {
                starting_from: null,
                at_birth: null,
                upto_3: null,
                month_3_4: null,
                month_4_5: null,
                month_5_6: null,
                month_6_9: null,
                month_9_15: null,
                month_15_20: null,
                month_20_28: null,
                month_28_32: null,
                bull_32_80: null,
                bull_more_80: null,
                cow_lact_upto_1500: null,
                cow_lact_1501_2000: null,
                cow_lact_2001_2500: null,
                cow_lact_above_2500: null,
                after_4_lact_price_reduce: null,
                culled_animal_price: null
            },
            fields: [
                {
                    name: 'starting_from',
                    sortField: 'starting_from',
                    title: 'Start Date'
                },
                {
                    name: 'at_birth',
                    sortField: 'at_birth',
                    title: 'At Birth'
                },
                {
                    name: 'culled_animal_price',
                    sortField: 'culled_animal_price',
                    title: 'Culled Animal Price'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ]
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/master-data/' });
        },
        resetAddForm () {
            this.model = {
                starting_from: null,
                at_birth: null,
                upto_3: null,
                month_3_4: null,
                month_4_5: null,
                month_5_6: null,
                month_6_9: null,
                month_9_15: null,
                month_15_20: null,
                month_20_28: null,
                month_28_32: null,
                bull_32_80: null,
                bull_more_80: null,
                cow_lact_upto_1500: null,
                cow_lact_1501_2000: null,
                cow_lact_2001_2500: null,
                cow_lact_above_2500: null,
                after_4_lact_price_reduce: null,
                culled_animal_price: null
            };
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async addEditItem () {
            try {
                if (this.editStatus) {
                    this.editLoading = true;
                } else {
                    this.addLoading = true;
                }
                const response = await axios.form(this.addEditURL, this.editStatus ? this.editingItem : this.model);
                const result = response.data;
                if (result.success) {
                    if (this.editStatus) {
                        this.$notify('Book Value Updated Successfully', 'Success', { type: 'success' });
                        this.editLoading = false;
                        this.editFormSuccess();
                    } else {
                        this.$notify('Book Value Added Successfully', 'Success', { type: 'success' });
                        this.addLoading = false;
                        this.addFormSuccess();
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
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                    this.editLoading = false;
                    this.addLoading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.editLoading = false;
                this.addLoading = false;
            }
        },
        addFormSuccess () {
            this.$refs.addBookValue.close();
            // this.model.name = null;
            this.resetAddForm();
            this.$refs.table.refreshTable();
        },
        editFormSuccess () {
            this.editStatus = false;
            this.$refs.editBookValue.close();
            this.$refs.table.refreshTable();
        },
        editItem (item) {
            console.log('edit-item:>>>:', item);
            this.editStatus = true;
            this.editingItem.id = item.id;
            this.editingItem.starting_from = item.starting_from;
            this.editingItem.at_birth = item.at_birth;
            this.editingItem.upto_3 = item.upto_3;
            this.editingItem.month_3_4 = item.month_3_4;
            this.editingItem.month_4_5 = item.month_4_5;
            this.editingItem.month_5_6 = item.month_5_6;
            this.editingItem.month_6_9 = item.month_6_9;
            this.editingItem.month_9_15 = item.month_9_15;
            this.editingItem.month_15_20 = item.month_15_20;
            this.editingItem.month_20_28 = item.month_20_28;
            this.editingItem.month_28_32 = item.month_28_32;
            this.editingItem.bull_32_80 = item.bull_32_80;
            this.editingItem.bull_more_80 = item.bull_more_80;
            this.editingItem.cow_lact_upto_1500 = item.cow_lact_upto_1500;
            this.editingItem.cow_lact_1501_2000 = item.cow_lact_1501_2000;
            this.editingItem.cow_lact_2001_2500 = item.cow_lact_2001_2500;
            this.editingItem.cow_lact_above_2500 = item.cow_lact_above_2500;
            this.editingItem.after_4_lact_price_reduce = item.after_4_lact_price_reduce;
            this.editingItem.culled_animal_price = item.culled_animal_price;
            this.$refs.editBookValue.show();
        },
        deleteItem (item) {
            this.itemID = item;
            this.$refs.deleteModal.show();
        },
        deleteComplete () {
            this.$refs.table.refreshTable();
            this.$notify('Deleted Successfully', 'Success', {
                type: 'success'
            });
            this.$refs.deleteModal.close();
        },
        addClose () {
            this.model.name = '';
            this.resetAddForm();
            this.$refs.addBookValue.close();
        }
    }
};
</script>

<style scoped>

</style>

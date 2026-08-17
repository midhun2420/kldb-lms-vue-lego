<template>
    <div class="">
        <div class="mt-1 mb-2 fl-te-c card w-33r">
            <h4 class="text-primary mb-0 font-poppins-semibold">DISTRICT</h4>
            <div>
                <btn size="sm" text="ADD" icon="fa fa-plus"
                     @click="$refs.addRegistrationType.show();"></btn>
            </div>
        </div>
        <div class="card w-33r mt-2">
            <div class="row m-0">
                <div class="col-12">
                    <vue-table ref="table" :fields="fields" :url="listURL" :per-page="10" search-placeholder="District">
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

        <modal ref="addRegistrationType" :no-close-on-backdrop="true" title="District" :show-additional-buttons="true">
            <template #buttons>
                <a @click="addClose"><i class="fa fa-close"></i></a>
            </template>
            <s-form ref="form" @submit="addEditItem">
                <div class="row">
                    <div class="col-lg-12">
                        <validated-ajax-vue-select label="Country" :rules="{required: true}"
                                                   class="" border-radius="1" v-model="country"
                                                   :url="optionsURLC"
                        ></validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-12">
                        <validated-vue-select label="State" :rules="{required: true}"
                                              class="" border-radius="1" v-model="model.state"
                                              :options="stateOptions"
                        ></validated-vue-select>
                    </div>
                    <div class="col-lg-12">
                        <validated-input label="District" :rules="{required: true}"
                                         class="" border-radius="1" v-model="model.name"></validated-input>
                    </div>
                    <div class="col-12 text-right mt-4">
                        <btn text="Save" :loading="addLoading" loading-text="Saving..." class="px-4"></btn>
                    </div>
                </div>
            </s-form>
        </modal>

        <modal ref="editRegistrationType" :no-close-on-backdrop="true" title="District" :show-additional-buttons="true">
            <template #buttons>
                <a @click="editClose"><i class="fa fa-close"></i></a>
            </template>
            <s-form ref="form" @submit="addEditItem">
                <div class="row">

                    <div class="col-lg-12">
                        <validated-ajax-vue-select label="Country" :url="optionsURLC" @input="fieldUpdate"
                                                   class="" border-radius="1" v-model="country"
                        ></validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-12">
                        <validated-vue-select label="State" :options="stateOptions"
                                              class="" border-radius="1" v-model="editingItem.state"
                        ></validated-vue-select>
                    </div>
                    <div class="col-lg-12">
                        <validated-input label="District" :rules="{required: true}"
                                         class="" border-radius="1" v-model="editingItem.name"></validated-input>
                    </div>
                    <div class="col-12 text-right mt-4">
                        <btn text="Update" :loading="editLoading" loading-text="Saving..." class="px-4"></btn>
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
    name: 'district',
    data () {
        return {
            addEditURL: masterURLs.master.location.district.addEdit,
            listURL: masterURLs.master.location.district.list,
            deleteURL: masterURLs.master.location.district.delete,
            optionsURL: masterURLs.master.location.state.vueSelect,
            optionsURLC: masterURLs.master.location.country.vueSelect,
            itemID: '',
            addLoading: false,
            editLoading: false,
            editStatus: false,
            country: '',
            stateOptions: [],
            editingItem: {
                id: '',
                state: '',
                name: ''
            },
            model: {
                state: '',
                name: ''
            },
            fields: [
                {
                    name: 'country.name',
                    sortField: '',
                    title: 'Country'
                },
                {
                    name: 'state.name',
                    sortField: '',
                    title: 'State'
                },
                {
                    name: 'name',
                    sortField: 'name',
                    title: 'District'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ]
        };
    },
    watch: {
        country (newValue, oldValue) {
            if (newValue) {
                this.loadState();
                this.model.state = '';
                this.model.name = '';
            }
        }
    },
    methods: {
        async loadState () {
            const states = await axios.get(this.optionsURL + '?country=' + this.country);
            this.stateOptions = states.data.data;
        },
        fieldUpdate () {
            this.editingItem.state = '';
            this.editingItem.name = '';
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
                        this.$notify('District Updated Successfully', 'Success', { type: 'success' });
                        this.editLoading = false;
                        this.editFormSuccess();
                    } else {
                        this.$notify('District Added Successfully', 'Success', { type: 'success' });
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
            this.$refs.addRegistrationType.close();
            this.country = null;
            this.model.state = null;
            this.model.name = null;
            this.$refs.table.refreshTable();
        },
        editFormSuccess () {
            this.editStatus = false;
            this.$refs.editRegistrationType.close();
            this.$refs.table.refreshTable();
        },
        editItem (item) {
            console.log('edit-item:>>>:', item);
            this.editStatus = true;
            this.editingItem.id = item.id;
            this.country = item.country.id;
            this.editingItem.state = item.state.id;
            this.editingItem.name = item.name;
            this.$refs.editRegistrationType.show();
        },
        deleteItem (item) {
            console.log('delete-item:>>>:', item);
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
        editClose () {
            this.country = '';
            this.model.state = '';
            this.model.name = '';
            this.$refs.editRegistrationType.close();
        },

        addClose () {
            this.country = '';
            this.model.state = '';
            this.model.name = '';
            this.$refs.addRegistrationType.close();
        },
        refreshData () {
            this.$refs.table.refreshTable();
        }
    }
};
</script>

<style scoped>

</style>

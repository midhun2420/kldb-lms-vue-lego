<template>
    <div class="container">
        <div class="mt-5 mb-2 fl-te-c card">
            <h4 class="text-primary mb-0 font-poppins-semibold">GLASSWARE VOLUME</h4>
            <div>
                <btn size="sm" text="ADD" icon="fa fa-plus"
                     @click="$refs.addRegistrationType.show();"></btn>
                <btn size="sm" text="BACK" icon="fa fa-arrow-left" class="ml-1"
                     @click="BackToHome"></btn>
            </div>
        </div>
        <div class="card mt-2">
            <div class="row m-0">
                <div class="col-12">
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

                </div>

            </div>
        </div>

        <modal ref="addRegistrationType" :no-close-on-backdrop="true" title="Glassware Volume" :show-additional-buttons="true">
            <template #buttons>
                <a @click="addClose"><i class="fa fa-close"></i></a>
            </template>
            <s-form @submit="addEditItem">
                <div class="row">
                    <div class="col-lg-12">
                        <validated-input label="Glassware Volume" :rules="{required: true}"
                                         class="" border-radius="1" v-model="model.volume"></validated-input>
                    </div>
                    <div class="col-12 text-right mt-4">
                        <btn text="Save" :loading="addLoading" loading-text="Saving..." class="px-4"></btn>
                    </div>
                </div>
            </s-form>
        </modal>
        <modal ref="editRegistrationType" :no-close-on-backdrop="true" title="Glassware Volume">
            <s-form @submit="addEditItem">
                <div class="row">
                    <div class="col-lg-12">
                        <validated-input label="Glassware Volume" :rules="{required: true}"
                                         class="" border-radius="1" v-model="editingItem.volume"></validated-input>
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
    name: 'GlasswareVolume',
    data () {
        return {
            addEditURL: masterURLs.master.glasswareVolume.addEdit,
            listURL: masterURLs.master.glasswareVolume.list,
            deleteURL: masterURLs.master.glasswareVolume.delete,
            itemID: null,
            addLoading: false,
            editLoading: false,
            editStatus: false,
            editingItem: {
                id: null,
                volume: null
            },
            model: {
                volume: null
            },
            fields: [
                {
                    name: 'volume',
                    sortField: 'volume',
                    title: 'Glassware Volume'
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
                        this.$notify('Glassware Volume Updated Successfully', 'Success', { type: 'success' });
                        this.editLoading = false;
                        this.editFormSuccess();
                    } else {
                        this.$notify('Glassware Volume Added Successfully', 'Success', { type: 'success' });
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
            this.model.volume = null;
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
            this.editingItem.volume = item.volume;
            this.$refs.editRegistrationType.show();
        },
        deleteItem (item) {
            this.itemID = item;
            this.$refs.deleteModal.show();
        },
        // deleteComplete () {
        //     this.$refs.table.refreshTable();
        //     this.$notify('Deleted Successfully', 'Success', {
        //         type: 'success'
        //     });
        //     this.$refs.deleteModal.close();
        // },
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
        addClose () {
            this.model.volume = '';
            this.$refs.addRegistrationType.close();
        }
    }
};
</script>

<style scoped>

</style>

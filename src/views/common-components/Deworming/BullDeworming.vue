<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="dewormListURL" :per-page="10" search-placeholder="Medicine Name">
            <template slot="actions" slot-scope="props">
                <div class="btn-group" v-if="currentUser.admin && props.rowData.is_latest">
                    <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                         @click="editDeworming(props.rowData)"/>
                </div>
            </template>
        </vue-table>
        <div>
            <modal title="Edit Details" ref="dewormingEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <Deworming :data="{...editingDeworming}" :id="id" :animal="animal" @success="formSuccess"></Deworming>
            </modal>
        </div>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';
import Deworming from '../details-page/EditModals/Deworming.vue';

export default {
    name: 'BullDeworming',
    components: { Deworming },
    computed: {
        ...mapGetters(['currentUser']),
        dewormListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.dewormInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            editingDeworming: [],
            fields: [
                {
                    name: 'dewormdate',
                    title: 'Deworming Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                },
                {
                    name: 'medicine',
                    title: 'Medicine Name',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0 text-break'
                },
                {
                    name: 'batchno',
                    title: 'Batch No.',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'medicineqty',
                    title: 'Quantity',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0 text-break'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 w-15r b-unset fs-lg-0 text-break'
                }
            ],
            loading: false
        };
    },

    mounted () {
        this.id = this.$route.params.id;
    },
    methods: {
        formSuccess (modal) {
            if (modal === 'deworming') {
                this.$refs.dewormingEdit.close();
                this.$refs.table1.refreshTable();
            }
        },
        editDeworming (item) {
            console.log('editItem:editDeworming: ', item);
            this.editingDeworming = [];
            this.editingDeworming = item;
            this.id = item.bull_id || this.$route.params.id;
            this.$refs.dewormingEdit.show();
        }
    }
};
</script>

<style scoped>
</style>

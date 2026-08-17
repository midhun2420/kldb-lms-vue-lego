<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="screeningListURL" :per-page="10" search-placeholder="Disease">
            <template slot="actions" slot-scope="props">
                <div class="btn-group" v-if="currentUser.admin && props.rowData.is_latest">
                    <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                         @click="editScreening(props.rowData)"/>
                </div>
            </template>
        </vue-table>
        <div>
            <modal title="Edit Details" ref="screenEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <ScreeningEdit :data="{...editingScreening}" :id="id" :animal="animal" @success="formSuccess"></ScreeningEdit>
            </modal>
        </div>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';
import ScreeningEdit from '../details-page/EditModals/ScreeningEdit.vue';

export default {
    name: 'BullScreening',
    components: { ScreeningEdit },
    computed: {
        ...mapGetters(['currentUser']),
        screeningListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.screeningInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            editingScreening: [],
            fields: [
                {
                    name: 'screening_date',
                    title: 'Screening Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                },
                {
                    name: 'disease_obj.label',
                    title: 'Disease',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-25r fs-lg-0'
                },
                {
                    name: 'result_date',
                    title: 'Result Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
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
            if (modal === 'screening') {
                this.$refs.screenEdit.close();
                this.$refs.table1.refreshTable();
            }
        },
        editScreening (item) {
            console.log('editItem:editScreening: ', item);
            this.editingScreening = [];
            this.editingScreening = item;
            this.id = this.$route.params.id;
            this.$refs.screenEdit.show();
        }
    }
};
</script>

<style scoped>
</style>

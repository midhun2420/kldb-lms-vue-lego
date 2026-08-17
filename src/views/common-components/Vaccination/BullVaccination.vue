<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="vaccineListURL" :per-page="10" search-placeholder="Name">
            <template slot="actions" slot-scope="props">
                <div class="btn-group" v-if="currentUser.admin && props.rowData.is_latest">
                    <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                         @click="editVaccination(props.rowData)"/>
                </div>
            </template>
        </vue-table>
        <div>
            <modal title="Edit Details" ref="vaccEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <VaccinationEdit :data={...editingVaccination} :id=id :animal="animal" @success="formSuccess"></VaccinationEdit>
            </modal>
        </div>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';
import VaccinationEdit from '../details-page/EditModals/VaccinationEdit.vue';

export default {
    name: 'BullVaccination',
    components: { VaccinationEdit },
    computed: {
        ...mapGetters(['currentUser']),
        vaccineListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.vaccineInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            editingVaccination: [],
            fields: [
                {
                    name: 'vaccination_date',
                    title: 'Vaccination Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'vaccination_type',
                    title: 'Type',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'vaccination_name',
                    title: 'Name',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0 text-break'
                },
                {
                    name: 'vaccination_batch_no',
                    title: 'Vaccine Batch No',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'next_due_date',
                    title: 'Next DueDate',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0 text-break'
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
            if (modal === 'vaccination') {
                this.$refs.vaccEdit.close();
                this.$refs.table1.refreshTable();
            }
        },
        editVaccination (item) {
            console.log('editItem:editVaccination: ', item);
            this.editingVaccination = [];
            this.editingVaccination = item;
            this.id = item.bull_id || this.$route.params.id;
            this.$refs.vaccEdit.show();
        }
    }
};
</script>

<style scoped>
</style>

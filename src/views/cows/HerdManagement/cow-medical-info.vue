<template>
    <div>
        <row>
            <col-12>
                <details-tabs class="mt-n3">
                    <tab title="Deworming">
                        <cow-deworming class="ml-2"></cow-deworming>
                    </tab>
                    <tab title="Vaccination">
                        <cow-vaccination class="ml-2"></cow-vaccination>
                    </tab>
                    <tab title="Screening">
                        <cow-screening class="ml-2"></cow-screening>
                    </tab>
                </details-tabs>
<!--                <details-table ref="table1"-->
<!--                               :fields="deworming.fields" :data="deworming.tableData">-->
<!--                    <template #heading>-->
<!--                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Deworming</h5>-->
<!--                    </template>-->
<!--                    <template slot="actions" slot-scope="props">-->
<!--                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">-->
<!--                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"-->
<!--                                 @click="editDeworming(props.rowData)"/>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </details-table>-->
            </col-12>
<!--            <col-12 lg="6">-->
<!--                <details-table ref="table2"-->
<!--                               :fields="vaccination.fields" :data="vaccination.tableData">-->
<!--                    <template #heading>-->
<!--                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Vaccination</h5>-->
<!--                    </template>-->
<!--                    <template slot="actions" slot-scope="props">-->
<!--                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">-->
<!--                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"-->
<!--                                 @click="editVaccination(props.rowData)"/>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </details-table>-->
<!--            </col-12>-->
<!--            <col-12 class="mt-4">-->
<!--                <details-table ref="table3"-->
<!--                               :fields="screening.fields" :data="screening.tableData">-->
<!--                    <template #heading>-->
<!--                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Screening</h5>-->
<!--                    </template>-->
<!--                    <template slot="actions" slot-scope="props">-->
<!--                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">-->
<!--                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"-->
<!--                                 @click="editScreening(props.rowData)"/>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </details-table>-->
<!--            </col-12>-->
        </row>

        <div>
            <modal title="Edit Details" ref="dewormingEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <Deworming :data={...editingDeworming} :id=id :animal="animal" @success="formSuccess"></Deworming>
            </modal>
        </div>

        <div>
            <modal title="Edit Details" ref="vaccEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <VaccinationEdit :data={...editingVaccination} :id=id :animal="animal" @success="formSuccess"></VaccinationEdit>
            </modal>
        </div>

        <div>
            <modal title="Edit Details" ref="screenEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <ScreeningEdit :data={...editingScreening} :id=id :animal="animal" @success="formSuccess"></ScreeningEdit>
            </modal>
        </div>

    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../data/urls';
import Deworming from '../../common-components/details-page/EditModals/Deworming';
import VaccinationEdit from '../../common-components/details-page/EditModals/VaccinationEdit';
import ScreeningEdit from '../../common-components/details-page/EditModals/ScreeningEdit';
import { mapGetters } from 'vuex';
import CowDeworming from '../../common-components/Deworming/CowDeworming.vue';
import CowVaccination from '../../common-components/Vaccination/CowVaccination.vue';
import DetailsTabs from '../../../components/details-page/details-tabs';
import CowScreening from '../../common-components/Screening/CowScreening.vue';

export default {
    name: 'cow-medical-info',
    components: { CowScreening, DetailsTabs, CowVaccination, CowDeworming, ScreeningEdit, VaccinationEdit, Deworming },
    computed: { ...mapGetters(['currentUser']) },
    data () {
        return {
            animal: 'cow',
            id: '',
            editingDeworming: [],
            editingVaccination: [],
            editingScreening: [],

            deworming: {
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
                        dataClass: 'text-2 bg-6 b-unset w-25r fs-lg-0 text-break'
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
                        dataClass: 'text-2 bg-6 b-unset w-25r fs-lg-0 text-break'
                    }
                ],
                tableData: []
            },
            vaccination: {
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
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
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
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0 text-brak'
                    }

                ],
                tableData: []
            },
            screening: {
                fields: [
                    {
                        name: 'screening_date',
                        title: 'Screening Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'test',
                        title: 'Test/Retest',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'test_name',
                        title: 'Test Name',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'disease_obj.label',
                        title: 'Disease',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'screening_duration',
                        title: 'Screening Duration',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'result_date',
                        title: 'Result Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    }

                ],
                tableData: []
            },
            loading: false

        };
    },
    mounted () {
        this.loadBasicDetails();
        if (this.currentUser.admin) {
            this.deworming.fields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0 text-right',
                    dataClass: 'text-2 bg-6 my-3 w-10r b-unset text-right'
                }
            );
            this.vaccination.fields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0 text-right',
                    dataClass: 'text-2 bg-6 my-3 b-unset text-right w-15r'
                }
            );
            this.screening.fields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0 text-right',
                    dataClass: 'text-2 bg-6 my-3 b-unset w-10r text-right'
                }
            );
        }
    },

    methods: {
        formSuccess (modal) {
            if (modal === 'deworming') {
                this.$refs.dewormingEdit.close();
            }
            if (modal === 'vaccination') {
                this.$refs.vaccEdit.close();
            }
            if (modal === 'screening') {
                this.$refs.screenEdit.close();
            }
            this.loadBasicDetails();
        },
        editDeworming (item) {
            console.log('editItem:editDeworming: ', item);
            this.editingDeworming = [];
            this.editingDeworming = item;
            // this.loadBasicDetails();
            this.$refs.dewormingEdit.show();
        },
        editVaccination (item) {
            console.log('editItem:editVaccination: ', item);
            this.editingVaccination = [];
            this.editingVaccination = item;
            // this.loadBasicDetails();
            this.$refs.vaccEdit.show();
        },
        editScreening (item) {
            console.log('editItem:editScreening: ', item);
            this.editingScreening = [];
            this.editingScreening = item;
            // this.loadBasicDetails();
            this.$refs.screenEdit.show();
        },
        async loadBasicDetails () {
            try {
                this.$refs.table1.showLoadingAnimation();
                this.$refs.table2.showLoadingAnimation();
                this.$refs.table3.showLoadingAnimation();
                const cowID = this.$route.params.id;
                this.id = cowID;
                const response = await axios.form(urls.cowDetails.medicalDetail, { id: cowID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                this.deworming.tableData = response.data.data.deworm_list;
                this.vaccination.tableData = response.data.data.vac_list;
                this.screening.tableData = response.data.data.screen_list;

                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
            }
        }
    }
};
</script>

<style scoped>

</style>

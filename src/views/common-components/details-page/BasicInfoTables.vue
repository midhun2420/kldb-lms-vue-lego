<template>
    <div>
        <row>
            <col-12 lg="9">
                    <vue-table ref="table1" :fields="weightMeasurementFields" :url="weightListURL" :per-page="10" title="Weight & Measurements" search-placeholder="Weight">
                        <template slot="actions" slot-scope="props" v-if="currentUser.admin">
                        <div class="btn-group" v-if="currentUser.admin && props.rowData.is_latest">
                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                                 @click="editWeight(props.rowData)"/>
                        </div>

                    </template>
                    </vue-table>
<!--                <details-table table-heading="Weight & Measurements" class=""-->
<!--                               ref="table1"-->
<!--                               :fields="weightMeasurementFields" :data="weightMeasurementData">-->
<!--                    <template #heading>-->
<!--                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Weight & Measurements</h5>-->
<!--                    </template>-->
<!--&lt;!&ndash;                    <template #buttons>-->
<!--                        <btn color="fifth">Graph</btn>-->
<!--                    </template>&ndash;&gt;-->
<!--                    <template slot="actions" slot-scope="props" v-if="currentUser.admin">-->
<!--                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">-->
<!--                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"-->
<!--                                 @click="editWeight(props.rowData)"/>-->
<!--                        </div>-->

<!--                    </template>-->
<!--                </details-table>-->
            </col-12>
            <col-12 lg="3">
                <details-table table-heading="Nose Punching" ref="table2"
                               class="" :fields="nosePunching.fields" :data="nosePunching.tableData">
                    <template #heading>
                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Nose Punching</h5>
                    </template>
                    <template slot="actions" slot-scope="props" v-if="currentUser.admin">
                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">
                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                                 @click="editNosePunching(props.rowData)"/>
                        </div>

                    </template>
                </details-table>
                <details-table table-heading="Dehorning/Disbudding" ref="table3"
                               class="mt-4" :fields="dehorning.fields" :data="dehorning.tableData">
                    <template #heading>
                        <h5 class="text-5 font-poppins-semibold fs-lg-2">Dehorning/Disbudding</h5>
                    </template>
                    <template slot="actions" slot-scope="props" v-if="currentUser.admin">
                        <div class="btn-group" v-if="currentUser.admin && props.rowIndex === 0">
                            <btn text="Edit" size="xs" icon="fa fa-pencil" color="primary"
                                 @click="editDehorning(props.rowData)"/>
                        </div>
                    </template>
                </details-table>
            </col-12>
        </row>

        <div>
            <modal title="Edit Details" ref="weightRecordingEdit" :no-close-on-backdrop="true" width="40r" header-color="primary">
                <Weightrecording ref="weightedit" :data=editingweight :bullid="id" :animal="animal" @success="formSuccess"></Weightrecording>
            </modal>
        </div>

        <div>
            <modal title="Edit Details" ref="nosepunchingEdit" :no-close-on-backdrop="true" width="30r" header-color="primary">
                <Nosepunchingedit ref="nosePunchingedit" :data={...editingnosepunching} :bullid="id" @success="formSuccess"></Nosepunchingedit>
            </modal>
        </div>

        <div>
            <modal title="Edit Details" ref="dehorningEdit" :no-close-on-backdrop="true" width="30r" header-color="primary">
                <DehorningEdit ref="dehornEdit" :data="{...editingdehorning}" :bullid="id" @success="formSuccess"></DehorningEdit>
            </modal>
        </div>

    </div>
</template>

<script>
import DetailsTable from '../../../components/details-page/details-table';
import axios from 'secure-axios';
import urls from '../../../data/urls';
import Weightrecording from './EditModals/Weightrecording';
import Nosepunchingedit from './EditModals/nosepunchingedit';
import DehorningEdit from './EditModals/DehorningEdit';
import { mapGetters } from 'vuex';

export default {
    name: 'BasicInfoTables',
    components: { DehorningEdit, Nosepunchingedit, Weightrecording, DetailsTable },
    computed: {
        ...mapGetters(['currentUser']),
        weightListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.weightInfo + '?id=' + bullID;
        }
    },
    data () {
        return {
            id: '',
            animal: 'bull',
            editingnosepunching: [],
            editingweight: [],
            editingdehorning: [],
            weightMeasurementFields: [
                {
                    name: 'measurementdate',
                    title: 'Measurement Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 b-unset mb-3 w-10r fs-lg-0 h-80p'
                },
                {
                    name: 'length',
                    title: 'Length',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 w-10r b-unset fs-lg-0 h-80p'
                },
                {
                    name: 'witherheight',
                    title: 'Wither Height',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold w-15r b-unset',
                    dataClass: 'text-2 bg-6 my-3 b-unset  fs-lg-0'
                },
                {
                    name: 'bodyweight',
                    title: 'Weight',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 w-10r b-unset fs-lg-0'
                },
                {
                    name: 'heartgirth',
                    title: 'Heart Grith',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 my-3 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'scrotalcircumference',
                    title: 'Scrotal circumference',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold w-20r b-unset',
                    dataClass: 'text-2 bg-6 my-3 b-unset fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 w-15r b-unset fs-lg-0 text-break'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 my-3 w-15r b-unset fs-lg-0 text-break'
                }
            ],

            weightMeasurementData: [],
            nosePunching: {
                fields: [
                    {
                        name: 'nosepunchingdate',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 my-3 b-unset mb-3 w-10r fs-lg-0 h-80p'
                    }

                ],
                tableData: []
            },
            dehorning: {
                fields: [
                    {
                        name: 'dehorningdate',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 my-3 b-unset mb-3 w-10r fs-lg-0 h-80p'
                    },
                    {
                        name: 'dehorning_type',
                        title: 'Dehorning Type',
                        titleClass: 'text-6 fs-lg--1 b-unset',
                        dataClass: 'text-2 bg-6 my-3 b-unset mb-3 w-10r fs-lg-0 h-80p'
                    }

                ],
                tableData: [],
                bullsData: []

            }
        };
    },
    mounted () {
        this.loadBasicDetails();
        if (this.currentUser.admin) {
            this.weightMeasurementFields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0',
                    dataClass: 'text-2 bg-6 my-3 b-unset'
                }
            );
            this.nosePunching.fields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0 text-right',
                    dataClass: 'text-2 bg-6 my-3 b-unset text-right'
                }
            );
            this.dehorning.fields.push(
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-6 font-poppins-bold b-unset fs-lg-0 text-right',
                    dataClass: 'text-2 bg-6 my-3 b-unset text-right'
                }
            );
        }
    },

    methods: {
        editWeight (item) {
            console.log('editItem:editWeight: ', item);
            this.editingweight = [];
            this.editingweight = item;
            this.id = item.bull_id;
            // this.loadBasicDetails();
            this.$refs.weightRecordingEdit.show();
        },
        editNosePunching (item) {
            console.log('editItem:editNosePunching: ', item);
            this.editingnosepunching = [];
            this.editingnosepunching = item;
            // this.loadBasicDetails();
            this.$refs.nosepunchingEdit.show();
        },
        editDehorning (item) {
            console.log('editItem:editDehorning: ', item);
            this.editingdehorning = [];
            this.editingdehorning = item;
            // this.loadBasicDetails();
            this.$refs.dehorningEdit.show();
        },
        formSuccess (model) {
            console.log('inform sucess', model);
            if (model === 'weightrecording') {
                this.$refs.weightRecordingEdit.close();
            }
            if (model === 'dehorning') {
                this.$refs.dehorningEdit.close();
            }
            if (model === 'nosepunching') {
                this.$refs.nosepunchingEdit.close();
            }

            this.loadBasicDetails();
            /* this.editingItem = ''; */
            /* this.bullDetails = data; */
        },
        async loadBasicDetails () {
            try {
                this.$refs.table1.showLoadingAnimation();
                this.$refs.table2.showLoadingAnimation();
                this.$refs.table3.showLoadingAnimation();
                const bullID = this.$route.params.id;
                console.log('id : ', bullID);
                this.id = bullID;
                const response = await axios.form(urls.bullDetails.bullBasicInfoDetail, { id: bullID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                this.weightMeasurementData = response.data.data.wt_list;
                this.nosePunching.tableData = response.data.data.nosep_list;
                this.dehorning.tableData = response.data.data.dehorn_list;

                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
                this.$emit('refresh');
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

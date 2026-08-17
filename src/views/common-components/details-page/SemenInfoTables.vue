<template>
    <row>
        <col-12>
            <details-tabs class="mt-n3">
                <tab title="Semen Collection">
                    <semen-collection class="ml-2"></semen-collection>
                </tab>
                <tab title="Semen Storage">
                    <semen-storage class="ml-2"></semen-storage>
                </tab>
                <tab title="Semen Issue">
                    <semen-issue class="ml-2"></semen-issue>
                </tab>
                <tab title="Semen Disposal">
                    <semen-disposal class="ml-2"></semen-disposal>
                </tab>
            </details-tabs>
<!--            <details-table ref="table1"-->
<!--                :fields="semenCollection.fields" :data="semenCollection.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Semen Collection</h5>-->
<!--                </template>-->
<!--                <template #ejaculations>-->
<!--                    <div class="py-2 px-3 bg-7">-->
<!--                        <div class="py-1 px-3 b-1 b-fourth round-1 text-fourth text-center">First</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 px-3 bg-7">-->
<!--                        <div class="py-1 px-3 b-1 b-fourth round-1 text-fourth text-center">Second</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #v="{rowData}">-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.v.first}}</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.v.second}}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #im="{rowData}">-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.im.first}}</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.im.second}}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #t_perc="{rowData}">-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.t_perc.first}}</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.t_perc.second}}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #conic="{rowData}">-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.conic.first}}</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.conic.second}}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #remarks="{rowData}">-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.remarks.first}}</div>-->
<!--                    </div>-->
<!--                    <div class="py-2 bg-7">-->
<!--                        <div class="py-1 text-6">{{rowData.ejaculations.remarks.second}}</div>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </details-table>-->
        </col-12>
<!--        <col-12 lg="6" class="mt-4">-->
<!--            <details-table ref="table2"-->
<!--                :fields="semenStorage.fields" :data="semenStorage.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Semen Storage</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
<!--        <col-12 lg="6" class="mt-4">-->
<!--            <details-table ref="table3"-->
<!--                :fields="semenDisposal.fields" :data="semenDisposal.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Semen Disposal</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
<!--        <col-12 class="mt-4">-->
<!--            <details-table ref="table4"-->
<!--                :fields="semenIssue.fields" :data="semenIssue.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Semen Issue</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
    </row>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../data/urls';
import DetailsTabs from '../../../components/details-page/details-tabs';
import SemenCollection from '../../common-components/SemenInfo/SemenCollection.vue';
import SemenStorage from '../../common-components/SemenInfo/SemenStorage.vue';
import SemenIssue from '../../common-components/SemenInfo/SemenIssue.vue';
import SemenDisposal from '../../common-components/SemenInfo/SemenDisposal.vue';

export default {
    name: 'SemenInfoTables',
    components: { SemenCollection, SemenStorage, SemenIssue, SemenDisposal, DetailsTabs },
    data () {
        return {
            semenCollection: {
                fields: [
                    {
                        name: 'collection_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'batch',
                        title: 'Batch/Day',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset fs-lg-0'
                    }, {
                        name: 'ejaculation_no',
                        title: 'Ejaculations',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-7 b-unset td-line-c fs-lg-0'
                    }, {
                        name: 'volume',
                        title: 'V',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                    }, {
                        name: 'motility',
                        title: 'IM',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                    }, {
                        name: 'tev',
                        title: 'T%',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                    }, {
                        name: 'concentration',
                        title: 'CONC',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-7 b-unset td-line-c fs-lg-0'
                    }, {
                        name: 'remarks1',
                        title: 'Evaluation Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-7 b-unset td-line-c w-20r fs-lg-0'
                    },
                    {
                        name: 'ptm',
                        title: 'PTM after TF',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'used_dose',
                        title: 'No. of Straws',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'dose',
                        title: 'No. Of Doses',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks2',
                        title: 'Test Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    }
                ],
                tableData: []
            },
            semenStorage: {
                fields: [
                    {
                        name: 'dose_type.name',
                        title: 'Dose Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'location',
                        title: 'Location',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'goblet_type',
                        title: 'Goblet Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'no_of_dose',
                        title: 'No. Of Doses',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'semen_type',
                        title: 'Semen Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    }
                ],
                tableData: []
            },
            semenDisposal: {
                fields: [
                    {
                        name: 'issued_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }, {
                        name: 'dose_type',
                        title: 'Dose Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'location',
                        title: 'Location',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'reason',
                        title: 'Reason',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'no_of_dose',
                        title: 'No. Of Doses',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'approval_no',
                        title: 'Approval No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }
                ],
                tableData: []
            },
            semenIssue: {
                fields: [
                    {
                        name: 'issue_date',
                        title: 'Issued Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'location',
                        title: 'Location',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }, {
                        name: 'dose_type.name',
                        title: 'Dose Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'stock',
                        title: 'Stock',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'issued_to',
                        title: 'To Whom Issued',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'no_of_dose',
                        title: 'No. Of Doses Issued',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'despatch_location',
                        title: 'Despatch Location',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'ptm',
                        title: 'PTM',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    }
                ],
                tableData: []
            }
        };
    },
    mounted () {
        this.loadSemenInfoDetails();
    },

    methods: {
        async loadSemenInfoDetails () {
            try {
                this.$refs.table1.showLoadingAnimation();
                this.$refs.table2.showLoadingAnimation();
                this.$refs.table3.showLoadingAnimation();
                this.$refs.table4.showLoadingAnimation();
                const bullID = this.$route.params.id;
                const response = await axios.form(urls.bullDetails.bullSemenInfoDetail, { id: bullID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                this.semenCollection.tableData = response.data.data.collection;
                this.semenIssue.tableData = response.data.data.issue;
                this.semenDisposal.tableData = response.data.data.disposal;
                this.semenStorage.tableData = response.data.data.storage;

                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
                this.$refs.table4.hideLoadingAnimation();
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
                this.$refs.table4.hideLoadingAnimation();
            }
        }
    }
};
</script>

<style scoped>

</style>

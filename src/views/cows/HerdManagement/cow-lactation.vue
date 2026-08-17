<template>

    <row>
        <col-12>
            <details-tabs class="mt-n3">
                    <tab title="Lactation Details">
                        <lactation-details class="ml-2"></lactation-details>
                    </tab>
                    <tab title="Daily Milk Recording">
                        <daily-milk-recording class="ml-2"></daily-milk-recording>
                    </tab>
                </details-tabs>
<!--            <details-table ref="table"-->
<!--                           :fields="cowLactationStatus.fields" :data="cowLactationStatus.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Lactation Details</h5>-->
<!--                </template>-->
<!--            </details-table>-->
        </col-12>
<!--                  <col-12 lg="6">-->
<!--                        <details-table  :fields="cowMilkDisposal.fields" :data="cowMilkDisposal.tableData">-->
<!--                            <template #heading>-->
<!--                                <h5 class="text-5 font-poppins-semibold fs-lg-2">Milk Disposal</h5>-->
<!--                            </template>-->
<!--                        </details-table>-->
<!--                    </col-12>-->
<!--               <col-12 lg="6">-->
<!--                        <details-table :fields="daily_milk_recording.fields" :data="daily_milk_recording.tableData">-->
<!--                            <template #heading>-->
<!--                                <h5 class="text-5 font-poppins-semibold fs-lg-2">Daily Milk Recording</h5>-->
<!--                            </template>-->
<!--                        </details-table>-->
<!--                    </col-12>-->
    </row>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../data/urls';
import DetailsTabs from '../../../components/details-page/details-tabs';
import DailyMilkRecording from './Lactation/DailyMilkRecording.vue';
import LactationDetails from './Lactation/LactationDetails.vue';

export default {
    name: 'cow-lactation',
    components: { DailyMilkRecording, DetailsTabs, LactationDetails },
    data () {
        return {
            cowLactationStatus: {
                fields: [
                    {
                        name: 'status_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'status',
                        title: 'Status',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }
                    // {
                    //     name: 'morning_qty',
                    //     title: 'Morning Quantity',
                    //     titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    //     dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    // },
                    // {
                    //     name: 'evening_qty',
                    //     title: 'Evening Quantity',
                    //     titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    //     dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    // },
                    // {
                    //     name: 'total_quantity',
                    //     title: 'Total Quantity',
                    //     titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    //     dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    // }
                ],
                tableData: []
            },
            //
            //
            //
            //
            cowMilkDisposal: {
                fields: [
                    {
                        name: 'milk_disposal_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'type',
                        title: 'Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'disposal',
                        title: 'Name',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'batch_no',
                        title: 'Batch No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    }
                ],
                tableData: []
            },
            daily_milk_recording: {
                fields: [
                    {
                        name: 'milk_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'morning_qty',
                        title: 'Morning Quantity',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'evening_qty',
                        title: 'Evening Quantity',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'total_quantity',
                        title: 'Total',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }
                    // {
                    //     name: 'remarks',
                    //     title: 'Remarks',
                    //     titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    //     dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    // }
                ],
                tableData: []
            },
            artificial_insemination: {
                fields: [
                    {
                        name: 'date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'medicine',
                        title: 'Medicine Name',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'batch',
                        title: 'Batch No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'medicineqty',
                        title: 'Quantity',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    }
                ],
                tableData: []
            },
            calving_details: {
                fields: [
                    {
                        name: 'checkup_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'type',
                        title: 'Type',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'calving_dtl',
                        title: 'Name',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'batch',
                        title: 'Batch No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
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
    },

    methods: {
        async loadBasicDetails () {
            try {
                this.$refs.table.showLoadingAnimation();
                const cowID = this.$route.params.id;
                const response = await axios.form(urls.cowDetails.lactationDetail, { id: cowID });
                const data = response.data.data;
                this.cowLactationStatus.tableData = response.data.data.lact_list;
                this.daily_milk_recording.tableData = (data.milk_rec_list || []).map(item => {
                    const morning = Number(item.morning_qty) || 0;
                    const evening = Number(item.evening_qty) || 0;

                    return {
                        milk_date: item.milk_date,
                        morning_qty: morning,
                        evening_qty: evening,
                        total_quantity: Number((morning + evening).toFixed(2))
                    };
                });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                /* this.deworming.tableData = response.data.data.deworm_list;
                this.vaccination.tableData = response.data.data.vac_list;
                this.screening.tableData = response.data.data.screen_list; */

                this.$refs.table.hideLoadingAnimation();
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.table.hideLoadingAnimation();
            }
        }
    }
};
</script>

<style scoped>

</style>

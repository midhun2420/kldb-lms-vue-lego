<template>

    <row>
        <col-12>
            <details-tabs class="mt-n3">
                    <tab title="Mating Program">
                        <mating-program class="ml-2"></mating-program>
                    </tab>
                    <tab title="Artificial Insemination">
                        <artificial-insemination class="ml-2"></artificial-insemination>
                    </tab>
                    <tab title="Pregnancy Checkup">
                        <pregnancy-checkup class="ml-2"></pregnancy-checkup>
                    </tab>
                    <tab title="Abortion Details">
                        <abortion-event class="ml-2"></abortion-event>
                    </tab>
                    <tab title="Calving Details">
                        <calving-details class="ml-2"></calving-details>
                    </tab>
                </details-tabs>
<!--            <details-table ref="table1"-->
<!--                           :fields="mating_program.fields" :data="mating_program.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Mating Program</h5>-->
<!--                </template>-->
<!--            </details-table>-->
        </col-12>
<!--        <col-12 lg="6">-->
<!--            <details-table ref="table2"-->
<!--                           :fields="pregnancy_checkup.fields" :data="pregnancy_checkup.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Pregnancy Checkup</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
<!--        <col-12 class="mt-4" lg="6">-->
<!--            <details-table ref="table3"-->
<!--                           :fields="abortion_event.fields" :data="abortion_event.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Abortion Details</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
<!--        <col-12 lg="6" class="mt-4">-->
<!--            <details-table ref="table4"-->
<!--                           :fields="artificial_insemination.fields" :data="artificial_insemination.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Artifical Insemination</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
<!--        <col-12 lg="6" class="mt-4">-->
<!--            <details-table ref="table5"-->
<!--                           :fields="calving_details.fields" :data="calving_details.tableData">-->
<!--                <template #heading>-->
<!--                    <h5 class="text-5 font-poppins-semibold fs-lg-2">Calving Details</h5>-->
<!--                </template>-->
<!--            </details-table>-->
<!--        </col-12>-->
    </row>

</template>

<script>
import DetailsTabs from '../../../components/details-page/details-tabs';
import axios from 'secure-axios';
import urls from '../../../data/urls';
import MatingProgram from '../HerdManagement/Pregnancy/MatingProgram.vue';
import PregnancyCheckup from '../HerdManagement/Pregnancy/PregnancyCheckup.vue';
import AbortionEvent from '../HerdManagement/Pregnancy/AbortionEvent.vue';
import ArtificialInsemination from '../HerdManagement/Pregnancy/ArtificialInsemination.vue';
import CalvingDetails from '../HerdManagement/Pregnancy/CalvingDetails.vue';

export default {
    name: 'cow-pregnancy',
    components: { CalvingDetails, ArtificialInsemination, AbortionEvent, PregnancyCheckup, MatingProgram, DetailsTabs },
    data () {
        return {
            mating_program: {
                fields: [
                    {
                        name: 'bull_allotted',
                        title: 'Bull Allotted',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'bull_breed',
                        title: 'Bull Breed',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'valid_from',
                        title: 'Valid From',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'valid_to',
                        title: 'Valid To',
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
            pregnancy_checkup: {
                fields: [
                    {
                        name: 'checkup_date',
                        title: 'Checkup Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'cow_no',
                        title: 'Cow No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'ai_date',
                        title: 'Date of AI',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'cow_breed',
                        title: 'Breed',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'result',
                        title: 'Result',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    }
                ],
                tableData: []
            },
            abortion_event: {
                fields: [
                    {
                        name: 'abortion_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    /* {
                        name: 'attempt_no',
                        title: 'Pregnancy No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'calving_date',
                        title: 'Calving Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }, */
                    /* {
                        name: 'abortion_status',
                        title: 'Abortion Status',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }, */
                    {
                        name: 'ai_date',
                        title: 'AI Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'male_calves_no',
                        title: 'No.of Male Calves',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'female_calves_no',
                        title: 'No.of Female Calves',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'remarks',
                        title: 'Remarks',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    },
                    {
                        name: 'result',
                        title: 'Result',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    }
                ],
                tableData: []
            },
            artificial_insemination: {
                fields: [
                    {
                        name: 'ai_date',
                        title: 'AI Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'bull_allotted',
                        title: 'Bull Allotted',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'bull_breed',
                        title: 'Bull Breed',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'attempt_no',
                        title: 'Attempt No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }

                    /* {
                        name: 'result',
                        title: 'Result',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
                    } */
                ],
                tableData: []
            },
            calving_details: {
                fields: [
                    {
                        name: 'calving_date',
                        title: 'Date',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    /* {
                        name: 'pregnancy_no',
                        title: 'Pregnancy No.',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    }, */
                    {
                        name: 'abort_status',
                        title: 'Abortion Status',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                    },
                    {
                        name: 'male_calves_no',
                        title: 'No.of Male Calves',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                    },
                    {
                        name: 'female_calves_no',
                        title: 'No.of Female Calves',
                        titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                        dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
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
                this.$refs.table1.showLoadingAnimation();
                this.$refs.table2.showLoadingAnimation();
                this.$refs.table3.showLoadingAnimation();
                this.$refs.table4.showLoadingAnimation();
                this.$refs.table5.showLoadingAnimation();
                const cowID = this.$route.params.id;
                const response = await axios.form(urls.cowDetails.pregnancyDetail, { id: cowID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                this.mating_program.tableData = response.data.data.mating_list;
                this.abortion_event.tableData = response.data.data.abort_list;
                this.artificial_insemination.tableData = response.data.data.ai_list;
                this.calving_details.tableData = response.data.data.calving_list;
                this.pregnancy_checkup.tableData = response.data.data.pregnancy_list;
                this.$refs.table1.hideLoadingAnimation();
                this.$refs.table2.hideLoadingAnimation();
                this.$refs.table3.hideLoadingAnimation();
                this.$refs.table4.hideLoadingAnimation();
                this.$refs.table5.hideLoadingAnimation();
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
                this.$refs.table5.hideLoadingAnimation();
            }
        }
    }
};
</script>

<style scoped>

</style>

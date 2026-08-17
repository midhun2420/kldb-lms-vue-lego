<template>
    <div>
    <div class="mt-5" v-if="data">
        <h6 class="font-poppins-semibold text-dark mb-3">Per-Bull Production</h6>
        <div class="bb-1"></div>
        <div class="row">
            <div class="col-lg-12 fl-x mt-4 pl-0">
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Last 7 days</h6>
                    <bull-produced-table class="mt-4" :data-list="data.last_7_days"></bull-produced-table>
                </div>
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Top 10 Bulls of last Month</h6>
                    <bull-table-one class="mt-4" :data-list="data.top_10_last_month"></bull-table-one>
                </div>
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Last Month Despatch</h6>
                    <bull-table-two class="mt-4" :data-list="data.last_month_despatch"></bull-table-two>
                </div>
            </div>
             <div class="col-lg-12 fl-x mt-4">
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Yearly Despatch Details</h6>
                    <bull-table-three class="mt-4" :data-list="data.yearly_despatch"></bull-table-three>
                </div>
                <div class="col-lg-4">
                    <h6 class="font-poppins-semibold text-dark mb-3">Breed Wise Details</h6>
                    <bull-table-four class="mt-4" :data-list="data.breedwise_despatch"></bull-table-four>
                </div>
            </div>
        </div>
    </div>
                <template v-else>
                <div class="fl-x-cc">
                    <loading-animation/>
                    <b class="ml-3">Please Wait...</b>
                </div>
        </template>

    </div>
</template>

<script>
import BullProducedTable from '../../../components/BullProducedTable';
import BullTableOne from '../../../components/BullTableOne';
import BullTableTwo from '../../../components/BullTableTwo';
import BullTableThree from '../../../components/BullTableThree';
import BullTableFour from '../../../components/BullTableFour';
import axios from 'secure-axios';
import urls from '../../../data/urls';
export default {
    name: 'BullProduced',
    components: { BullTableFour, BullTableThree, BullTableTwo, BullTableOne, BullProducedTable },
    data () {
        return {
            data: ''
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        async loadData () {
            try {
                const response = await axios.get(urls.dashboard.bullProduced);
                const data = response.data;
                this.data = data.data;
                console.log('response: ', data);
                if (data.success) {
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
            }
        }
    }
};
</script>

<style scoped>

</style>

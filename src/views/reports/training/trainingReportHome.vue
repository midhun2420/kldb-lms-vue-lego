<template>
    <div class="full-height color-txt">
        <s-form class="row">
            <div class="col-12 fl-x fl-j-sb">
                <h3 class="text-primary fs-lg-4 font-poppins-semibold">Reports</h3>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
            <div class="col-lg-6 mt-lg-5">
                <validated-select class="c-input-select input-border-primary" label="Other Reports" placeholder="Choose Report"
                                  v-model="reportType"
                                  :options="reportOptions"></validated-select>
            </div>
        </s-form>
        <div class="row">
            <div class="col-12" v-if="reportType==='Monthly Training Progress'">
                <monthly-training/>
            </div>

        </div>
    </div>

</template>

<script>

import MonthlyTraining from './reportComponents/monthlyTraining';

export default {
    name: 'trainingReportHome',
    components: {
        MonthlyTraining
    },
    data () {
        return {
            reportType: '',
            reportOptions: [
                { value: 'Monthly Training Progress', label: 'Monthly Training Progress' }
            ]
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        }
    }
};
</script>

<style scoped>
</style>

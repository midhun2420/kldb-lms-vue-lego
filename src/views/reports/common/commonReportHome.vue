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
            <div class="col-12" v-if="reportType==='Abstract of observation done to a particular Bull/Cow date wise'">
                <abstract-of-observation/>
            </div>
            <div class="col-12" v-if="reportType==='Culling Pattern'">
                <culling-pattern/>
            </div>

            <div class="col-12" v-if="reportType==='Milk Feeding'">
                <milk-feeding-report/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Requirement'">
                <milk-feeding-requirement/>
            </div>
            <div class="col-12" v-if="reportType==='Culling Pattern Between Two Dates'">
                <culling-pattern-between-two-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Post Mortem Details'">
                <post-mortem-details/>
            </div>
            <div class="col-12" v-if="reportType==='Post Mortem Between Two Dates'">
                <post-mortem-between-two-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Shed Details'">
                <shed-details/>
            </div>
            <div class="col-12" v-if="reportType==='Animal Strength'">
                <animal-strength/>
            </div>
            <div class="col-12" v-if="reportType==='Addition and Deletion of Stock'">
                <addition-and-deletion-of-stock/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain'">
                <weight-gain/>
            </div>
            <div class="col-12" v-if="reportType==='Stock Balance Of Semen'">
                <stock-balance-of-semen/>
            </div>
            <div class="col-12" v-if="reportType==='REPRODUCTIVE MEASURES'">
                <reproductive-measure/>
            </div>
<!--            <div class="col-12" v-if="reportType==='Monthly Training Progress'">-->
<!--                <monthly-training/>-->
<!--            </div>-->

        </div>
    </div>

</template>

<script>

import AbstractOfObservation from './reportComponents/AbstractOfObservation';
import CullingPattern from './reportComponents/cullingPattern';
// import DueForCulling from './reportComponents/dueForCulling';
// import AllProductionBTDays from './reportComponents/allProductionBTDays';
import MilkFeedingReport from './reportComponents/MilkFeedingReport';
import MilkFeedingRequirement from './reportComponents/MilkFeedingRequirement';
import CullingPatternBetweenTwoDates from './reportComponents/cullingPatternBetweenTwoDates';
import PostMortemBetweenTwoDates from './reportComponents/postMortemBetweenTwoDates';
import ShedDetails from './reportComponents/shedDetails';
import AnimalStrength from './reportComponents/animalStrength';
import AdditionAndDeletionOfStock from './reportComponents/additionAndDeletionOfStock';
import StockBalanceOfSemen from './reportComponents/stockBalanceOfSemen';
import PostMortemDetails from './reportComponents/postMortemDetails';
import WeightGain from './reportComponents/weightGain';
import ReproductiveMeasure from './reportComponents/reproductiveMeasure';
// import MonthlyTraining from './reportComponents/monthlyTraining';

export default {
    name: 'commonReportHome',
    components: {
        // MonthlyTraining,
        ReproductiveMeasure,
        WeightGain,
        PostMortemDetails,
        StockBalanceOfSemen,
        AdditionAndDeletionOfStock,
        AnimalStrength,
        ShedDetails,
        PostMortemBetweenTwoDates,
        CullingPatternBetweenTwoDates,
        MilkFeedingRequirement,
        MilkFeedingReport,
        // AllProductionBTDays,
        // DueForCulling,
        CullingPattern,
        AbstractOfObservation

    },
    data () {
        return {
            reportType: '',
            reportOptions: [
                { value: 'Abstract of observation done to a particular Bull/Cow date wise', label: 'Abstract of observation done to a particular Bull/Cow date wise' },
                { value: 'Culling Pattern', label: 'Culling Pattern' },

                { value: 'Milk Feeding', label: 'Milk Feeding' },
                { value: 'Milk Requirement', label: 'Milk Requirement' },
                { value: 'Culling Pattern Between Two Dates', label: 'Culling Pattern Between Two Dates' },
                { value: 'Post Mortem Details', label: 'Post-mortem Details' },
                // { value: 'Post Mortem Between Two Dates', label: 'Post-mortem Between Two Dates' },
                { value: 'Shed Details', label: 'Shed Details' },
                { value: 'Animal Strength', label: 'Animal Strength' },
                { value: 'Addition and Deletion of Stock', label: 'Addition and Deletion of Stock' },
                { value: 'Weight Gain', label: 'Weight Gain' },
                { value: 'Stock Balance Of Semen', label: 'Stock Balance Of Semen' },
                { value: 'REPRODUCTIVE MEASURES', label: 'Reproductive Measures' }
                // { value: 'Monthly Training Progress', label: 'Monthly Training Progress' }

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

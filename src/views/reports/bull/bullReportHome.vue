<template>
    <div class="full-height color-txt">
        <s-form class="row">
            <div class="col-12 fl-x fl-j-sb">
                <h3 class="text-primary fs-lg-4 font-poppins-semibold">Reports</h3>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
            <div class="col-lg-4 mt-lg-5">

                <validated-select class="c-input-select input-border-primary" label="Bulls Reports" placeholder="Choose Report"
                                  v-model="reportType"
                                  :options="reportOptions"></validated-select>
            </div>
        </s-form>
        <div class="row">

            <div class="col-12" v-if="reportType==='Individual Bull Report'">
                <individual-bull-report/>
            </div>
            <div class="col-12" v-if="reportType==='Search based on Breed/Dams yield/Breeding value'">
                <breed-dams-yield-breeding-value/>
            </div>

            <div class="col-12" v-if="reportType==='Bulls Above 18 Months'">
                <bulls-above18-months/>
            </div>
            <div class="col-12" v-if="reportType==='Bulls Below 18 Months'">
                <bulls-below18-months/>
            </div>

            <div class="col-12" v-if="reportType==='Livestock - Addition to unit'">
                <livestock-addition-to-unit/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Born between two dates'">
                <livestock-born-between-two-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary'">
                <livestock-summary/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary (Young Bull)'">
                <livestock-summary-young-bull/>
            </div>
            <div class="col-12" v-if="reportType==='Dehorned - Between two dates'">
                <dehorning-between-two-days/>

            </div>
            <div class="col-12" v-if="reportType==='Dehorned - Which have crossed the time limit'">
                <dehorning-bull/>
            </div>
            <div class="col-12" v-if="reportType==='Due for Dehorning'">
                <due-for-dehorning/>
            </div>
            <div class="col-12" v-if="reportType==='Nose Punched - Between two dates'">
                <nose-punching-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Due for Nose Punching'">
                <due-for-nose-punching/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Recording - Between two dates'">
                <weight-recording-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain - Between two dates'">
                <weight-gain-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Average Weight Gain - From two dates'">
                <average-weight-gain-from-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Details of weight recorded'">
                <details-of-weight-recorded/>
            </div>
            <div class="col-12" v-if="reportType==='Weight gain of different breed in the month'">
                <weight-gain-of-different-breed/>
            </div>
            <div class="col-12" v-if="reportType==='Weight gain of different group in the month'">
                <weight-gain-of-different-group/>
            </div>
            <div class="col-12" v-if="reportType==='Weight gain of different source in the month'">
                <weight-gain-of-different-source/>
            </div>
            <div class="col-12" v-if="reportType==='Observation - Bull'">
                <bull-observation/>
            </div>

            <div class="col-12" v-if="reportType==='Average Age at First Collection'">
                <bull-avg-age-first-collection/>
            </div>
            <div class="col-12" v-if="reportType==='Semen Production Summary'">
                <bull-semen-production-summary/>
            </div>
            <div class="col-12" v-if="reportType==='Breed Wise Semen Collection'">
                <bull-breed-semen-collection/>
            </div>
            <div class="col-12" v-if="reportType==='Group Wise Semen Collection'">
                <bull-group-semen-collection/>
            </div>
            <div class="col-12" v-if="reportType==='Individual Bull Semen Collection'">
                <bull-individual-semen-collection/>
            </div>
            <div class="col-12" v-if="reportType==='Daily Production Report'">
                <bull-daily-production/>
            </div>
            <div class="col-12" v-if="reportType==='All Production between two days - breed wise include'">
                <all-production-b-t-days/>
            </div>
            <div class="col-12" v-if="reportType==='Individual Bull Semen Storage'">
                <bull-semen-storage/>
            </div>
            <div class="col-12" v-if="reportType==='Location Wise Semen Storage'">
                <bull-location-semen-storage/>
            </div>
            <div class="col-12" v-if="reportType==='Dams Yield Wise Semen Storage'">
                <bull-dams-yield-semen-storage/>
            </div>
            <div class="col-12" v-if="reportType==='Location Semen Storage Display'">
                <bull-location-semen-storage-display/>
            </div>
            <div class="col-12" v-if="reportType==='Production Date Wise Semen Storage'">
                <bull-production-date-semen-storage/>
            </div>
            <div class="col-12" v-if="reportType==='Semen Despatch Note'">
                <bull-semen-despatch-note/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Wise Semen Despatch Note'">
                <bull-wise-semen-despatch-note/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Semen Issue'">
                <bull-semen-issue/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Semen Disposal'">
                <bull-semen-disposal/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Semen Proposal'">
                <bull-semen-proposal/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Wise Semen Stock'">
                <bull-wise-semen-stock/>
            </div>
            <div class="col-12" v-if="reportType==='Breed Wise Semen Stock'">
                <bull-breed-wise-semen-stock/>
            </div>
            <div class="col-12" v-if="reportType==='Group Wise Semen Stock'">
                <bull-group-wise-semen-stock/>
            </div>
            <div class="col-12" v-if="reportType==='Bull Deletion'">
                <bull-deletion/>
            </div>
            <div class="col-12" v-if="reportType==='Semen Rejection'">
                <bull-semen-rejection/>
            </div>
            <div class="col-12" v-if="reportType==='Monthly Semen Stock'">
                <bull-monthly-semen-stock/>
            </div>
            <div class="col-12" v-if="reportType==='Month wise Semen Stock for a Period'">
                <bull-monthly-semen-stock-for-period/>
            </div>
            <div class="col-12" v-if="reportType==='Semen Transaction'">
                <bull-semen-transaction/>
            </div>
            <div class="col-12" v-if="reportType==='Deworming'">
                <deworming/>
            </div>
            <div class="col-12" v-if="reportType==='Shed Wise Deworming'">
                <shed-wise-deworminng/>
            </div>
            <div class="col-12" v-if="reportType==='Vaccination list based on type of vaccine'">
                <vaccination-based-on-type/>
            </div>
            <div class="col-12" v-if="reportType==='Vaccination Due list'">
                <vaccination-due-list/>
            </div>
            <div class="col-12" v-if="reportType==='Vaccination Individual'">
                <vaccination-individual/>
            </div>
            <div class="col-12" v-if="reportType==='Disposal Proposal'">
                <disposal-proposal/>
            </div>
            <div class="col-12" v-if="reportType==='Disposal'">
                <disposal/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Individual'">
                <scrotal-individual/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Shed Wise'">
                <scrotal-shed-wise/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Due List'">
                <scrotal-due-list/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Summary'">
                <scrotal-summary/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Monthly'">
                <bull-scrotal-circumference-monthly/>
            </div>
            <div class="col-12" v-if="reportType==='Scrotal Circumference Mean Measurement'">
                <bull-scrotal-circumference-mean-measurement/>
            </div>
            <div class="col-12" v-if="reportType==='Bull calf selection due for selection'">
                <calf-selection/>
            </div>
            <div class="col-12" v-if="reportType==='Bull calf selected for breeding b/w two dates'">
                <calf-selection-selected/>
            </div>
            <div class="col-12" v-if="reportType==='Bull calf in waiting list for breeding b/w two dates'">
                <calf-selection-waiting/>
            </div>
            <div class="col-12" v-if="reportType==='Bull calf proposed for culling'">
                <bull-calf-proposed-for-culling/>
            </div>
            <div class="col-12" v-if="reportType==='DUE FOR REGULARIZATION'">
                <due-forregularization/>
            </div>
            <div class="col-12" v-if="reportType==='BATCH DETAILS  - Display the list of regular or training bull'">
                <batch-list-of-regular/>
            </div>
            <div class="col-12" v-if="reportType==='BATCH DETAILS  -   Display the list of bull shed wise or batch wise'">
                <batch-list-of-regular-batch-or-shed/>
            </div>
            <div class="col-12" v-if="reportType==='Details of training bull with good collection out of total collection'">
                <details-of-training-bull/>
            </div>
            <div class="col-12" v-if="reportType==='Due for Culling'">
                <bull-due-for-culling/>
            </div>
            <div class="col-12" v-if="reportType==='SEMEN PRODUCTION'">
                <semen-production/>
            </div><div class="col-12" v-if="reportType==='SEMEN DESPATCH'">
                <semen-despatch/>
            </div>
        </div>
    </div>

</template>

<script>
import BreedDamsYieldBreedingValue from './reportComponents/breedDamsYieldBreedingValue';
import BullsAbove18Months from './reportComponents/bullsAbove18Months';
import BullsBelow18Months from './reportComponents/bullsBelow18Months';
import IndividualBullReport from './reportComponents/individualBullReport';
import LivestockAdditionToUnit from './reportComponents/livestockAdditionToUnit';
import LivestockBornBetweenTwoDates from './reportComponents/livestockBornBetweenTwoDates';
import LivestockSummary from './reportComponents/livestockSummary';
import LivestockSummaryYoungBull from './reportComponents/livestockSummaryYoungBull';
import DehorningBetweenTwoDays from './reportComponents/dehorningBetweenTwoDays';
import DehorningBull from './reportComponents/dehorningBull';
import DueForDehorning from './reportComponents/dueForDehorning';
import NosePunchingBetweenTwoDays from './reportComponents/nosePunchingBetweenTwoDays';
import DueForNosePunching from './reportComponents/dueForNosePunching';
import WeightRecordingBetweenTwoDays from './reportComponents/weightRecordingBetweenTwoDays';
import WeightGainBetweenTwoDays from './reportComponents/weightGainBetweenTwoDays';
import AverageWeightGainFromTwoDays from './reportComponents/averageWeightGainFromTwoDays';
import DetailsOfWeightRecorded from './reportComponents/detailsOfWeightRecorded';
import WeightGainOfDifferentBreed from './reportComponents/WeightGainOfDifferentBreed';
import WeightGainOfDifferentGroup from './reportComponents/WeightGainOfDifferentGroup';
import WeightGainOfDifferentSource from './reportComponents/WeightGainOfDifferentSource';
import BullObservation from './reportComponents/bullObservation';
import BullSemenProductionSummary from './reportComponents/bullsSemenProductionSummary';
import BullBreedSemenCollection from './reportComponents/bullsBreedwiseSemenCollection';
import BullSemenStorage from './reportComponents/bullWiseSemenStorage';
import BullLocationSemenStorage from './reportComponents/bullLocationWiseSemenStorage';
import BullDamsYieldSemenStorage from './reportComponents/bullDamsYieldWiseSemenStorage';
import BullLocationSemenStorageDisplay from './reportComponents/bullLocationSemenStorageDisplay';
import BullSemenDespatchNote from './reportComponents/bullSemenDespatchNote';
import BullWiseSemenDespatchNote from './reportComponents/bullWiseSemenDespatchNote';
import BullSemenIssue from './reportComponents/bullSemenIssue';
import BullSemenDisposal from './reportComponents/bullSemenDisposal';
import BullSemenProposal from './reportComponents/bullSemenProposal';
import BullWiseSemenStock from './reportComponents/bullWiseSemenStock';
import BullBreedWiseSemenStock from './reportComponents/bullBreedWiseSemenStock';
import BullGroupWiseSemenStock from './reportComponents/bullGroupWiseSemenStock';
import BullDeletion from './reportComponents/bullDeletion';
import BullGroupSemenCollection from './reportComponents/bullGroupSemenCollection';
import BullIndividualSemenCollection from './reportComponents/bullIndividualSemenCollection';
import BullDailyProduction from './reportComponents/bullDailyProduction';
import BullProductionDateSemenStorage from './reportComponents/bullProductionDateSemenStorage';
import BullAvgAgeFirstCollection from './reportComponents/bullAvgAgeFirstCollection';
import BullSemenRejection from './reportComponents/bullSemenRejection';
import BullMonthlySemenStock from './reportComponents/bullMonthlySemenStock';
import BullMonthlySemenStockForPeriod from './reportComponents/bullMonthlySemenStockForPeriod';
import BullSemenTransaction from './reportComponents/bullSemenTransaction';
import Deworming from './reportComponents/deworming';
import VaccinationBasedOnType from './reportComponents/VaccinationBasedOnType';
import VaccinationDueList from './reportComponents/vaccinationDueList';
import VaccinationIndividual from './reportComponents/vaccinationIndividual';
import DisposalProposal from './reportComponents/disposalProposal';
import Disposal from './reportComponents/disposal';
import ScrotalIndividual from './reportComponents/scrotalIndividual';
import ScrotalShedWise from './reportComponents/scrotalShedWise';
import ScrotalSummary from './reportComponents/scrotalSummary';
import ScrotalDueList from './reportComponents/scrotalDueList';
import CalfSelection from './reportComponents/calfSelection';
import CalfSelectionSelected from './reportComponents/calfSelectionSelected';
import CalfSelectionWaiting from './reportComponents/calfSelectionWaiting';
import DueForregularization from './reportComponents/dueForregularization';
import BatchListOfRegular from './reportComponents/batchListOfRegular.vue';
import BatchListOfRegularBatchOrShed from './reportComponents/batchListOfRegularBatchOrShed';
import DetailsOfTrainingBull from './reportComponents/detailsOfTrainingBull';
import AllProductionBTDays from './reportComponents/allProductionBTDays';
import ShedWiseDeworminng from './reportComponents/shedWiseDeworming';
import BullCalfProposedForCulling from './reportComponents/bullCalfProposedForCulling';
import BullDueForCulling from './reportComponents/bullDueForCulling';
import BullScrotalCircumferenceMonthly from './reportComponents/bullScrotalCircumferenceMonthly';
import BullScrotalCircumferenceMeanMeasurement from './reportComponents/bullScrotalCircumferenceMeanMeasurement';
import SemenProduction from './reportComponents/semenProduction';
import SemenDespatch from './reportComponents/semenDespatch';
// import Disposal from './reportComponents/disposal';

export default {
    name: 'bullReportHome',
    components: {
        SemenDespatch,
        SemenProduction,
        BullScrotalCircumferenceMeanMeasurement,
        BullScrotalCircumferenceMonthly,
        BullDueForCulling,
        BullCalfProposedForCulling,
        ShedWiseDeworminng,
        AllProductionBTDays,
        DetailsOfTrainingBull,
        BatchListOfRegularBatchOrShed,
        BatchListOfRegular,
        DueForregularization,
        CalfSelectionWaiting,
        CalfSelectionSelected,
        CalfSelection,
        ScrotalDueList,
        ScrotalSummary,
        ScrotalShedWise,
        ScrotalIndividual,
        DisposalProposal,
        Disposal,
        VaccinationIndividual,
        VaccinationDueList,
        VaccinationBasedOnType,
        Deworming,
        BullObservation,
        WeightGainOfDifferentSource,
        WeightGainOfDifferentGroup,
        WeightGainOfDifferentBreed,
        DetailsOfWeightRecorded,
        AverageWeightGainFromTwoDays,
        WeightGainBetweenTwoDays,
        WeightRecordingBetweenTwoDays,
        DueForNosePunching,
        NosePunchingBetweenTwoDays,
        DueForDehorning,
        DehorningBull,
        DehorningBetweenTwoDays,
        LivestockSummaryYoungBull,
        LivestockSummary,
        LivestockBornBetweenTwoDates,
        LivestockAdditionToUnit,
        IndividualBullReport,
        BullsBelow18Months,
        BullsAbove18Months,
        BreedDamsYieldBreedingValue,
        BullDeletion,
        BullSemenProductionSummary,
        BullBreedSemenCollection,
        BullSemenStorage,
        BullLocationSemenStorage,
        BullDamsYieldSemenStorage,
        BullLocationSemenStorageDisplay,
        BullSemenDespatchNote,
        BullWiseSemenDespatchNote,
        BullSemenIssue,
        BullSemenDisposal,
        BullSemenProposal,
        BullWiseSemenStock,
        BullBreedWiseSemenStock,
        BullGroupWiseSemenStock,
        BullGroupSemenCollection,
        BullIndividualSemenCollection,
        BullDailyProduction,
        BullProductionDateSemenStorage,
        BullAvgAgeFirstCollection,
        BullSemenRejection,
        BullMonthlySemenStock,
        BullMonthlySemenStockForPeriod,
        BullSemenTransaction
    },
    data () {
        return {
            reportType: '',
            reportOptions: [
                { value: 'Individual Bull Report', label: 'Individual Bull Report' },
                {
                    value: 'Search based on Breed/Dams yield/Breeding value',
                    label: 'Search based on Breed/Dams yield/Breeding value'
                },
                { value: 'Bulls Above 18 Months', label: 'Bulls Above 18 Months' },
                { value: 'Bulls Below 18 Months', label: 'Bulls Below 18 Months' },
                { value: 'Livestock - Addition to unit', label: 'Livestock - Addition to unit' },
                { value: 'Livestock - Born between two dates', label: 'Livestock - Born between two dates' },
                { value: 'Livestock - Summary', label: 'Livestock - Summary' },
                { value: 'Livestock - Summary (Young Bull)', label: 'Livestock - Summary (Young Bull)' },
                { value: 'Dehorned - Between two dates', label: 'Dehorned - Between two dates' },
                { value: 'Dehorned - Which have crossed the time limit', label: 'Dehorned - Which have crossed the time limit' },
                { value: 'Due for Dehorning', label: 'Due for Dehorning' },
                { value: 'Nose Punched - Between two dates', label: 'Nose Punched - Between two dates' },
                { value: 'Due for Nose Punching', label: 'Due for Nose Punching' },
                { value: 'Weight Recording - Between two dates', label: 'Weight Recording - Between two dates' },
                { value: 'Weight Gain - Between two dates', label: 'Individual Weight Recording - Between two dates' },
                { value: 'Average Weight Gain - From two dates', label: 'Average Weight Gain - From two dates' },
                { value: 'Details of weight recorded', label: 'Weight gain - Shed wise in the month' },
                { value: 'Weight gain of different breed in the month', label: 'Weight gain of different breed in the month' },
                { value: 'Weight gain of different group in the month', label: 'Weight gain of different group in the month' },
                { value: 'Weight gain of different source in the month', label: 'Weight gain of different source in the month' },
                { value: 'Observation - Bull', label: 'Observation - Bull' },
                { value: 'Bull Deletion', label: 'Bull Deletion' },
                { value: 'Average Age at First Collection', label: 'Average Age at First Collection' },
                { value: 'Semen Production Summary', label: 'Semen Production Summary' },
                { value: 'Breed Wise Semen Collection', label: 'Breed Wise Semen Collection' },
                { value: 'Group Wise Semen Collection', label: 'Group Wise Semen Collection' },
                { value: 'Individual Bull Semen Collection', label: 'Individual Bull Semen Collection' },
                { value: 'Daily Production Report', label: 'Daily Production Report' },
                { value: 'All Production between two days - breed wise include', label: 'All Production between two days - breed wise include' },

                { value: 'Individual Bull Semen Storage', label: 'Individual Bull Semen Storage' },
                { value: 'Location Wise Semen Storage', label: 'Location Wise Semen Storage' },
                { value: 'Dams Yield Wise Semen Storage', label: 'Dams Yield Wise Semen Storage' },
                { value: 'Production Date Wise Semen Storage', label: 'Production Date Wise Semen Storage' },
                { value: 'Location Semen Storage Display', label: 'Location Semen Storage Display' },
                { value: 'Semen Despatch Note', label: 'Semen Despatch Note' },
                { value: 'Bull Wise Semen Despatch Note', label: 'Bull Wise Semen Despatch Note' },
                { value: 'Bull Semen Issue', label: 'Bull Semen Issue' },
                { value: 'Bull Semen Disposal', label: 'Bull Semen Disposal' },
                { value: 'Bull Semen Proposal', label: 'Bull Semen Proposal' },
                { value: 'Bull Wise Semen Stock', label: 'Bull Wise Semen Stock' },
                { value: 'Breed Wise Semen Stock', label: 'Breed Wise Semen Stock' },
                { value: 'Group Wise Semen Stock', label: 'Group Wise Semen Stock' },
                { value: 'Semen Rejection', label: 'Semen Rejection' },
                { value: 'Monthly Semen Stock', label: 'Monthly Semen Stock' },
                { value: 'Month wise Semen Stock for a Period', label: 'Month wise Semen Stock for a Period' },
                { value: 'Semen Transaction', label: 'Semen Transaction' },
                { value: 'Deworming', label: 'Deworming' },
                { value: 'Shed Wise Deworming', label: 'Shed Wise Deworming' },
                { value: 'Vaccination list based on type of vaccine', label: 'Vaccination list based on type of vaccine' },
                { value: 'Vaccination Due list', label: 'Vaccination Due list' },
                { value: 'Vaccination Individual', label: 'Vaccination Individual' },
                { value: 'Disposal Proposal', label: 'Disposal Proposal' },
                { value: 'Disposal', label: 'Disposal' },
                { value: 'Scrotal Circumference Individual', label: 'Scrotal Circumference Individual' },
                // { value: 'Scrotal Circumference Shed Wise', label: 'Scrotal Circumference Shed Wise' },
                { value: 'Scrotal Circumference Due List', label: 'Scrotal Circumference Due List' },
                { value: 'Scrotal Circumference Summary', label: 'Scrotal Circumference Summary' },
                { value: 'Scrotal Circumference Monthly', label: 'Scrotal Circumference Monthly' },
                { value: 'Scrotal Circumference Mean Measurement', label: 'Scrotal Circumference Mean Measurement' },
                { value: 'Bull calf selection due for selection', label: 'Bull calf selection due for selection' },
                { value: 'Bull calf selected for breeding b/w two dates', label: 'Bull calf selected for breeding b/w two dates' },
                { value: 'Bull calf in waiting list for breeding b/w two dates', label: 'Bull calf in waiting list for breeding b/w two dates' },
                { value: 'Bull calf proposed for culling', label: 'Bull calf proposed for culling' },
                { value: 'DUE FOR REGULARIZATION', label: 'DUE FOR REGULARIZATION' },
                { value: 'Due for Culling', label: 'Due for Culling' },
                // { value: 'BATCH DETAILS  - Display the list of regular or training bull', label: 'BATCH DETAILS  - Display the list of regular or training bull' },
                { value: 'BATCH DETAILS  -   Display the list of bull shed wise or batch wise', label: 'BATCH DETAILS  -   Display the list of bull shed wise or batch wise' },
                { value: 'Details of training bull with good collection out of total collection', label: 'Details of training bull with good collection out of total collection' },
                { value: 'SEMEN PRODUCTION', label: 'SEMEN PRODUCTION' },
                { value: 'SEMEN DESPATCH', label: ' SEMEN DESPATCH' }
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

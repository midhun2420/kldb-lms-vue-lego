<template>
    <div class="full-height color-txt">
        <s-form class="row">
            <div class="col-12 fl-x fl-j-sb">
                <h3 class="text-primary fs-lg-4 font-poppins-semibold">Reports</h3>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
            <div class="col-lg-4 mt-lg-5">

                <validated-select class="c-input-select input-border-primary" label="Cows Reports" placeholder="Choose Report"
                                  v-model="reportType"
                                  :options="reportOptions"></validated-select>
            </div>
        </s-form>
        <div class="row">
            <div class="col-12" v-if="reportType==='Cows Above 18 Months'">
                <cows-above18-months/>
            </div>
            <div class="col-12" v-if="reportType==='Cows Below 18 Months'">
                <cows-below18-months/>
            </div>

            <div class="col-12" v-if="reportType==='Livestock - Addition to unit'">
                <livestock-addition-to-unit/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Born between two dates'">
                <livestock-born-between-two-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary (Format 1)'">
                <livestock-summary-format1/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary (Format 2)'">
                <livestock-summary-format2/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary (Heifers)'">
                <livestock-summary-heifers/>
            </div>
            <div class="col-12" v-if="reportType==='Livestock - Summary (Young Cow)'">
                <livestock-summary-young-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Dehorned - Between two dates'">
                <dehorning-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Dehorned - Which have crossed the time limit'">
                <dehorning-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Due for Dehorning'">
                <due-for-dehorning/>
            </div>
            <div class="col-12" v-if="reportType==='Cow Deletion'">
                <cow-deletion/>
            </div>
            <div class="col-12" v-if="reportType==='Cow Deworming'">
                <cow-Deworming/>
            </div>

            <div class="col-12" v-if="reportType==='Weight Gain - Between two months'">
                <cow-weight-gain-between-months/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain - Individual cow'">
                <cow-weight-gain-individual-between-months/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain - Breed, Source, Group in the month'">
                <cow-weight-gain-breed-group-source/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain - Age Group in the month'">
                <cow-weight-gain-age-group-month/>
            </div>
            <div class="col-12" v-if="reportType==='Weight Gain - Shed Wise'">
                <cow-weight-gain-shed-wise/>
            </div>
            <div class="col-12" v-if="reportType==='Average Weight Gain - Breed, Group, Source Between two months'">
                <cow-weight-gain-breed-source-group-between-months/>

            </div>
            <div class="col-12" v-if="reportType==='Vaccination List - Between two dates'">
                <cow-vaccination-list/>
            </div>
            <div class="col-12" v-if="reportType==='Vaccination Due - Between two dates'">
                <cow-vaccination-due/>
            </div>
            <div class="col-12" v-if="reportType==='Individual Cow Vaccination'">
                <cow-individual-vaccination/>
            </div>
            <div class="col-12" v-if="reportType==='Mating Programme'">
                <cow-mating-programme/>
            </div>
            <div class="col-12" v-if="reportType==='Insemination Due between two days'">
                <cow-insemination-due-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Inseminated between two days'">
                <cow-inseminated-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Insemination List - Between two dates'">
                <cow-insemination-list-between-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Individual Cow Insemination List'">
                <cow-individual-insemination-list/>
            </div>
            <div class="col-12" v-if="reportType==='Reproductive Status - Cows'">
                <cow-reproductive-status/>
            </div>
            <div class="col-12" v-if="reportType==='Reproductive Status - Heifers'">
                <heifer-reproductive-status/>
            </div>
            <div class="col-12" v-if="reportType==='Individual Caving or Abortion Details'">
                <cow-individual-calving-abortion/>
            </div>
            <div class="col-12" v-if="reportType==='Pregnancy Checkup - Between two dates'">
                <pregnancy-checkup-between-two-days/>
            </div>
            <div class="col-12" v-if="reportType==='Due for Pregnancy Checkup'">
                <due-for-pregnancy-checkup/>
            </div>
            <div class="col-12" v-if="reportType==='Cows not Confirmed Pregnant'">
                <cows-not-confirmed-pregnant/>
            </div>
            <div class="col-12" v-if="reportType==='Due For Drying'">
                <due-for-drying/>
            </div>
            <div class="col-12" v-if="reportType==='Crossed the limit for drying'">
                <crossed-limit-for-drying/>
            </div>
            <div class="col-12" v-if="reportType==='Calved/Aborted List'">
                <calved-abortedlist/>
            </div>
            <div class="col-12" v-if="reportType==='Due For Calving'">
                <due-for-calving/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Days Wise Search'">
                <lactation-days-wise-search/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Yield of Cows on a Date'">
                <milk-yield-of-cows-on-date/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Yield of Individual Cow'">
                <milk-yield-of-individual-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Recording - Between Dates'">
                <milk-recording-between-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Production - Between Dates'">
                <milk-production-between-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Yield List'">
                <cow-lactation-yield/>
            </div>
            <div class="col-12" v-if="reportType==='Lactating Cows'">
                <lactating-cows/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Yield Of Individual Cow'">
                <lactation-yield-of-individual-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Report - Between Dates'">
                <lactation-report-between-dates/>
            </div>

            <div class="col-12" v-if="reportType==='Lactation Report Above 150 - Between Dates'">
                <lactation-report-above150-between-dates/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Yield of Alive Cows'">
                <lactation-yield-of-alive-cows/>
            </div>
            <div class="col-12" v-if="reportType==='Lactation Summary'">
                <lactation-summary/>
            </div>
            <div class="col-12" v-if="reportType==='Disposal'">
                <disposal-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Disposal Proposal'">
                <disposal-proposal-cow/>
            </div>
            <div class="col-12" v-if="reportType==='Milk Production Report of the Month'">
                <monthly-milk-production-report/>
            </div>
            <div class="col-12" v-if="reportType==='Monthly Milk Production Day Total'">
                <monthly-milk-production-day-total/>
            </div>
            <div class="col-12" v-if="reportType==='Moving Pregnancy'">
                <moving-pregnancy/>
            </div>
            <div class="col-12" v-if="reportType==='Wet Average Day Wise'">
                <wet-average-day-wise/>
            </div>
            <div class="col-12" v-if="reportType==='Wet Average Period Wise'">
                <wet-average-period-wise/>
            </div>
            <div class="col-12" v-if="reportType==='MILK PRODUCTION PERFORMANCE OF THE COW'">
                <milk-production-perfomance-of-the-cow/>
            </div>

        </div>
    </div>

</template>

<script>
import cowsAbove18Months from './reportComponents/cowsAbove18Months';
import cowsBelow18Months from './reportComponents/cowsBelow18Months';
import LivestockAdditionToUnit from '../cow/reportComponents/livestockAdditionToUnit';
import LivestockBornBetweenTwoDates from '../cow/reportComponents/livestockBornBetweenTwoDates';
import LivestockSummaryFormat1 from './reportComponents/livestockSummaryFormat1';
import LivestockSummaryFormat2 from './reportComponents/livestockSummaryFormat2';
import LivestockSummaryHeifers from './reportComponents/livestockSummaryHeifers';
import DehorningBetweenTwoDays from './reportComponents/dehorningBetweenTwoDays';
import DehorningCow from './reportComponents/dehorningCow';
import DueForDehorning from './reportComponents/dueForDehorning';
import CowDeletion from './reportComponents/cowDeletion';
import CowDeworming from './reportComponents/cowDeworming';
import CowWeightGainBetweenMonths from './reportComponents/cowWeightGainBetweenMonths';
import CowWeightGainIndividualBetweenMonths from './reportComponents/cowWeightGainIndividualBetweenMonths';
import CowWeightGainBreedSourceGroupBetweenMonths from './reportComponents/cowWeightGainBreedSourceGroupBetweenMonths';
import CowWeightGainShedWise from './reportComponents/cowWeightGainShedWise';
import CowWeightGainBreedGroupSource from './reportComponents/cowWeightGainBreedGroupSource';
import CowVaccinationList from './reportComponents/cowVaccinationList';
import CowVaccinationDue from './reportComponents/cowVaccinationDue';
import CowMatingProgramme from './reportComponents/cowMatingProgramme';
import cowIndividualVaccination from './reportComponents/cowIndividualVaccination';
import CowInseminationDueBetweenTwoDays from './reportComponents/cowInseminationDueBetweenTwoDays';
import CowInseminatedBetweenTwoDays from './reportComponents/cowInseminatedBetweenTwoDays';
import CowInseminationListBetweenDates from './reportComponents/cowInseminationListBetweenDates';
import CowIndividualInseminationList from './reportComponents/cowIndividualInseminationList';
import CowReproductiveStatus from './reportComponents/cowReproductiveStatus';
import HeiferReproductiveStatus from './reportComponents/heiferReproductiveStatus';
import LivestockSummaryYoungCow from './reportComponents/livestockSummaryYoungCow';
import CowIndividualCalvingAbortion from './reportComponents/cowIndividualCalvingAbortion';
import PregnancyCheckupBetweenTwoDays from './reportComponents/pregnancyCheckupBetweenTwoDays';
import DueForPregnancyCheckup from './reportComponents/dueForPregnancyCheckup';
import CowsNotConfirmedPregnant from './reportComponents/cowsNotConfirmedPregnant';
import DueForDrying from './reportComponents/dueForDrying';
import CrossedLimitForDrying from './reportComponents/crossedLimitForDrying';
// import Disposal from './reportComponents/disposalCow';
import DueForCalving from './reportComponents/dueForCalving';
import LactationDaysWiseSearch from './reportComponents/lactationDaysWiseSearch';
import MilkYieldOfCowsOnDate from './reportComponents/milkYieldOfCowsOnDate';
import MilkYieldOfIndividualCow from './reportComponents/milkYieldOfIndividualCow';
import MilkRecordingBetweenDates from './reportComponents/milkRecordingBetweenDates';
import MilkProductionBetweenDates from './reportComponents/milkProductionBetweenDates';
import CowLactationYield from './reportComponents/cowLactationYield';
import LactatingCows from './reportComponents/lactatingCows';
import LactationYieldOfIndividualCow from './reportComponents/lactationYieldOfIndividualCow';
import LactationReportBetweenDates from './reportComponents/lactationReportBetweenDates';
import LactationReportAbove150BetweenDates from './reportComponents/lactationReportAbove150BetweenDates';
import LactationYieldOfAliveCows from './reportComponents/lactationYieldOfAliveCows';
import LactationSummary from './reportComponents/lactationSummary';
import CalvedAbortedlist from './reportComponents/calvedAbortedList';
import MonthlyMilkProductionReport from './reportComponents/monthlyMilkProductionReport';
import MonthlyMilkProductionDayTotal from './reportComponents/monthlyMilkProductionDayTotal';
import DisposalCow from './reportComponents/disposalCow';
import DisposalProposalCow from './reportComponents/disposalProposalCow';
import CowWeightGainAgeGroupMonth from './reportComponents/cowWeightGainAgeGroupMonth';
import MovingPregnancy from './reportComponents/MovingPregnancy';
import WetAverageDayWise from './reportComponents/wetAverageDayWise';
import WetAveragePeriodWise from './reportComponents/wetAveragePeriodWise';
import MilkProductionPerfomanceOfTheCow from './reportComponents/milkProductionPerfomanceOfTheCow';

export default {
    name: 'cowReportHome',
    components: {
        MilkProductionPerfomanceOfTheCow,
        WetAveragePeriodWise,
        WetAverageDayWise,
        MovingPregnancy,
        CowWeightGainAgeGroupMonth,
        DisposalProposalCow,
        DisposalCow,
        MonthlyMilkProductionDayTotal,
        MonthlyMilkProductionReport,
        CalvedAbortedlist,
        LactationSummary,
        LactationYieldOfAliveCows,
        LactationReportAbove150BetweenDates,
        LactationReportBetweenDates,
        LactationYieldOfIndividualCow,
        LactatingCows,
        CowLactationYield,
        MilkProductionBetweenDates,
        MilkRecordingBetweenDates,
        MilkYieldOfIndividualCow,
        MilkYieldOfCowsOnDate,
        LactationDaysWiseSearch,
        DueForCalving,
        // Disposal,
        CrossedLimitForDrying,
        DueForDrying,
        CowsNotConfirmedPregnant,
        DueForPregnancyCheckup,
        PregnancyCheckupBetweenTwoDays,
        CowIndividualCalvingAbortion,
        LivestockSummaryYoungCow,
        DueForDehorning,
        DehorningCow,
        DehorningBetweenTwoDays,
        LivestockSummaryHeifers,
        LivestockSummaryFormat2,
        LivestockSummaryFormat1,
        LivestockBornBetweenTwoDates,
        LivestockAdditionToUnit,
        cowsAbove18Months,
        cowsBelow18Months,
        CowDeletion,
        CowDeworming,
        CowWeightGainBetweenMonths,
        CowWeightGainIndividualBetweenMonths,
        CowWeightGainBreedSourceGroupBetweenMonths,
        CowWeightGainShedWise,
        CowWeightGainBreedGroupSource,
        CowVaccinationList,
        CowVaccinationDue,
        cowIndividualVaccination,
        CowMatingProgramme,
        CowInseminationDueBetweenTwoDays,
        CowInseminatedBetweenTwoDays,
        CowInseminationListBetweenDates,
        CowIndividualInseminationList,
        CowReproductiveStatus,
        HeiferReproductiveStatus
    },
    data () {
        return {
            reportType: '',
            reportOptions: [
                { value: 'Cows Above 18 Months', label: 'Cows Above 18 Months' },
                { value: 'Cows Below 18 Months', label: 'Cows Below 18 Months' },
                { value: 'Livestock - Addition to unit', label: 'Livestock - Addition to unit' },
                { value: 'Livestock - Born between two dates', label: 'Livestock - Born between two dates' },
                { value: 'Livestock - Summary (Format 1)', label: 'Livestock - Summary (Format 1)' },
                { value: 'Livestock - Summary (Format 2)', label: 'Livestock - Summary (Format 2)' },
                { value: 'Livestock - Summary (Heifers)', label: 'Livestock - Summary (Heifers)' },
                { value: 'Livestock - Summary (Young Cow)', label: 'Livestock - Summary (Young Cow)' },
                { value: 'Dehorned - Between two dates', label: 'Dehorned - Between two dates' },
                { value: 'Dehorned - Which have crossed the time limit', label: 'Dehorned - Which have crossed the time limit' },
                { value: 'Due for Dehorning', label: 'Due for Dehorning' },
                { value: 'Cow Deletion', label: 'Cow Deletion' },
                { value: 'Cow Deworming', label: 'Cow Deworming' },
                { value: 'Weight Gain - Between two months', label: 'Weight Gain - Between two months' },
                { value: 'Weight Gain - Individual cow', label: 'Weight Gain - Individual cow' },
                { value: 'Weight Gain - Breed, Source, Group in the month', label: 'Weight Gain - Breed, Source in the month' },
                { value: 'Weight Gain - Age Group in the month', label: 'Weight Gain - Age Group in the month' },
                { value: 'Weight Gain - Shed Wise', label: 'Weight Gain - Shed Wise' },
                { value: 'Average Weight Gain - Breed, Group, Source Between two months', label: 'Average Weight Gain - Breed, Group, Source Between two months' },
                { value: 'Vaccination List - Between two dates', label: 'Vaccination List - Between two dates' },
                { value: 'Vaccination Due - Between two dates', label: 'Vaccination Due - Between two dates' },
                { value: 'Individual Cow Vaccination', label: 'Individual Cow Vaccination' },
                { value: 'Mating Programme', label: 'Mating Programme' },
                { value: 'Insemination Due between two days', label: 'Insemination Due between two days' },
                { value: 'Inseminated between two days', label: 'Inseminated between two days' },
                { value: 'Insemination List - Between two dates', label: 'Insemination List - Between two dates' },
                { value: 'Individual Cow Insemination List', label: 'Individual Cow Insemination List' },
                { value: 'Reproductive Status - Cows', label: 'Reproductive Status - Cows' },
                { value: 'Reproductive Status - Heifers', label: 'Reproductive Status - Heifers' },
                { value: 'Pregnancy Checkup - Between two dates', label: 'Pregnancy Checkup - Between two dates' },
                { value: 'Due for Pregnancy Checkup', label: 'Due for Pregnancy Checkup' },
                { value: 'Cows not Confirmed Pregnant', label: 'Cows not Confirmed Pregnant' },
                { value: 'Due For Drying', label: 'Due For Drying' },
                // { value: 'Crossed the limit for drying', label: 'Crossed the limit for drying' },
                { value: 'Individual Caving or Abortion Details', label: 'Individual Calving or Abortion Details' },
                { value: 'Calved/Aborted List', label: 'Calved/Aborted List' },
                { value: 'Due For Calving', label: 'Due For Calving' },
                { value: 'Lactation Days Wise Search', label: 'Lactation Days Wise Search' },
                // { value: 'Milk Yield of Cows on a Date', label: 'Milk Yield of Cows on a Date' },
                { value: 'Milk Yield of Individual Cow', label: 'Milk Yield of Individual Cow' },
                { value: 'Milk Recording - Between Dates', label: 'Milk Recording - Between Dates' },
                { value: 'Milk Production - Between Dates', label: 'Milk Production - Between Dates' },
                { value: 'Lactation Yield List', label: 'Lactation Yield List' },
                { value: 'Lactating Cows', label: 'Lactating Cows' },
                { value: 'Lactation Yield Of Individual Cow', label: 'Lactation Yield Of Individual Cow' },
                { value: 'Lactation Report - Between Dates', label: 'Lactation Report - Between Dates' },
                { value: 'Lactation Report Above 150 - Between Dates', label: 'Lactation Report Above 150 - Between Dates' },
                { value: 'Lactation Yield of Alive Cows', label: 'Lactation Yield of Alive Cows' },
                { value: 'Lactation Summary', label: 'Lactation Summary' },
                { value: 'Disposal', label: 'Disposal' },
                { value: 'Disposal Proposal', label: 'Disposal Proposal' },
                { value: 'Milk Production Report of the Month', label: 'Monthly Milk Production Report' },
                { value: 'Monthly Milk Production Day Total', label: 'Monthly Milk Production - Day Total' },
                { value: 'Moving Pregnancy', label: 'Moving Pregnancy' },
                { value: 'Wet Average Day Wise', label: 'Wet Average Day Wise' },
                { value: 'Wet Average Period Wise', label: 'Wet Average Period Wise' },
                { value: 'MILK PRODUCTION PERFORMANCE OF THE COW', label: 'MILK PRODUCTION PERFORMANCE OF THE COW' }
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

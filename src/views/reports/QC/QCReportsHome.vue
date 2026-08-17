<template>
    <div class="full-height color-txt">
        <s-form class="row">
            <div class="col-12 fl-x fl-j-sb">
                <h3 class="text-primary fs-lg-4 font-poppins-semibold">Reports</h3>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
            <div class="col-lg-4 mt-lg-5">

                <validated-select class="c-input-select input-border-primary field-required" label="Quality Control Reports" placeholder="Choose Report"
                                  v-model="reportType"
                                  :options="reportOptions" :rules="{required:true}"></validated-select>
            </div>
        </s-form>
        <div class="row">
            <div class="col-12" v-if="reportType==='SPERM MORPHOLOGY OF REGULAR BULLS'">
                <sperms-morphology-of-regular-bulls/>
            </div>
            <div class="col-12" v-if="reportType==='SPERM MORPHOLOGY OF TRAINING BULLS'">
                <sperms-morphology-of-training-bulls/>
            </div>
            <div class="col-12" v-if="reportType==='INCUBATION TEST'">
                <incubation-test/>
            </div>
            <div class="col-12" v-if="reportType==='PIA TEST'">
                <p-i-a-test/>
            </div>
            <div class="col-12" v-if="reportType==='HOST TEST'">
                <host-test/>
            </div>
            <div class="col-12" v-if="reportType==='MICROBIAL LOAD OF NEAT SEMEN'">
                <microbial-load-of-neat-semen/>
            </div>
            <div class="col-12" v-if="reportType==='MICROBIAL LOAD OF AV'">
                <microbial-load-of-a-v/>
            </div>
            <div class="col-12" v-if="reportType==='MICROBIAL LOAD TESTING OF LAFU'">
                <microbial-load-testing-of-l-a-f-u/>
            </div>
            <div class="col-12" v-if="reportType==='MICROBIAL LOAD TESTING OF GLASSWARE'">
                <microbial-load-testing-of-glassware/>
            </div>
            <div class="col-12" v-if="reportType==='AIR CULTURE REPORT'">
                <air-culture-report/>
            </div>
            <div class="col-12" v-if="reportType==='MICROBIAL LOAD IN SEMEN SAMPLES'">
                <microbial-load-in-semen-sample/>
            </div>
<!--            <div class="col-12" v-if="reportType==='MICROBIAL LOAD IN FROZEN SEMEN SAMPLES'">-->
<!--                <microbial-load-in-semen-sample/>-->
<!--            </div>-->
            <div class="col-12" v-if="reportType==='LONG STORAGE INCUBATION TEST'">
                <long-storage-incubation-test/>
            </div>
            <div class="col-12" v-if="reportType==='LONG STORAGE PTM'">
                <long-storage-p-t-m/>
            </div>
            <div class="col-12" v-if="reportType==='Year abstract of microbial load of frozen semen'">
                <year-abstract-of-microbial-load-of-frozen-semen/>
            </div>
            <div class="col-12" v-if="reportType==='ENVIRONMENTAL MICROBIAL LOAD TESTING'">
                <environmental-microbial-load-testing/>
            </div>
        </div>
    </div>
</template>

<script>
import SpermsMorphologyOfRegularBulls from './reportComponents/spermsMorphologyOfRegularBulls';
import SpermsMorphologyOfTrainingBulls from './reportComponents/spermsMorphologyOfTraningBulls';
import IncubationTest from './reportComponents/incubationTest';
import PIATest from './reportComponents/PIATest';
import HostTest from './reportComponents/hostTest';
import MicrobialLoadOfNeatSemen from './reportComponents/MicrobialLoadOfNeatSemen';
import MicrobialLoadOfAV from './reportComponents/microbialLoadOfAV';
import MicrobialLoadTestingOfLAFU from './reportComponents/microbialLoadTestingOfLAFU';
import MicrobialLoadTestingOfGlassware from './reportComponents/microbialLoadTestingOfGlassware';
import AirCultureReport from './reportComponents/airCultureReport';
import MicrobialLoadInSemenSample from './reportComponents/microbialLoadInSemenSample';
import LongStorageIncubationTest from './reportComponents/longStorageIncubationTest';
import LongStoragePTM from './reportComponents/longStoragePTM';
import YearAbstractOfMicrobialLoadOfFrozenSemen from './reportComponents/yearAbstractOfMicrobialLoadOfFrozenSemen';
import EnvironmentalMicrobialLoadTesting from './reportComponents/environmentalMicrobialLoadTesting';

export default {
    name: 'QCReportsHome',
    components: {
        EnvironmentalMicrobialLoadTesting,
        YearAbstractOfMicrobialLoadOfFrozenSemen,
        LongStoragePTM,
        LongStorageIncubationTest,
        MicrobialLoadInSemenSample,
        AirCultureReport,
        MicrobialLoadTestingOfGlassware,
        MicrobialLoadTestingOfLAFU,
        MicrobialLoadOfAV,
        MicrobialLoadOfNeatSemen,
        HostTest,
        PIATest,
        IncubationTest,
        SpermsMorphologyOfRegularBulls,
        SpermsMorphologyOfTrainingBulls
    },
    data () {
        return {
            reportType: '',
            reportOptions: [
                { value: 'SPERM MORPHOLOGY OF REGULAR BULLS', label: 'SPERM MORPHOLOGY OF REGULAR BULLS' },
                { value: 'SPERM MORPHOLOGY OF TRAINING BULLS', label: 'SPERM MORPHOLOGY OF TRAINING BULLS' },
                { value: 'INCUBATION TEST', label: 'INCUBATION TEST' },
                { value: 'PIA TEST', label: 'PIA TEST' },
                { value: 'HOST TEST', label: 'HOST TEST' },
                // { value: 'MICROBIAL LOAD OF NEAT SEMEN', label: 'MICROBIAL LOAD OF NEAT SEMEN' },
                // { value: 'Year abstract of microbial load of neat semen', label: 'Year abstract of microbial load of neat semen' },
                { value: 'MICROBIAL LOAD OF AV', label: 'MICROBIAL LOAD OF AV' },
                { value: 'MICROBIAL LOAD TESTING OF LAFU', label: 'MICROBIAL LOAD TESTING OF LAFU' },
                { value: 'MICROBIAL LOAD TESTING OF GLASSWARE', label: 'MICROBIAL LOAD TESTING OF GLASSWARE' },
                { value: 'AIR CULTURE REPORT', label: 'AIR CULTURE REPORT' },
                { value: 'MICROBIAL LOAD IN SEMEN SAMPLES', label: 'MICROBIAL LOAD IN SEMEN SAMPLES' },
                { value: 'LONG STORAGE INCUBATION TEST', label: 'LONG STORAGE INCUBATION TEST' },
                { value: 'LONG STORAGE PTM', label: 'LONG STORAGE PTM' },
                // { value: 'MICROBIAL LOAD IN FROZEN SEMEN SAMPLES', label: 'MICROBIAL LOAD IN FROZEN SEMEN SAMPLES' },
                // { value: 'Year abstract of microbial load of frozen semen', label: 'Year abstract of microbial load of frozen semen' },
                { value: 'ENVIRONMENTAL MICROBIAL LOAD TESTING', label: 'ENVIRONMENTAL MICROBIAL LOAD TESTING' }
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

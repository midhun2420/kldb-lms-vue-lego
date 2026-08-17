<template>
    <div>
        <top-general-info-items ref="basicDetails" animal="cow" class="ml-5"></top-general-info-items>
        <details-tabs class="mt-n3">
            <tab title="Basic Info" class="ml-5">
                <cow-basic-info class="ml-2" @refresh="refreshBasicDetails"></cow-basic-info>
            </tab>
            <tab title="Medical Info" class="ml-5">
                <cow-medical-info class="ml-2" ></cow-medical-info>
            </tab>
            <tab title="Pregnancy" class="ml-5">
                <cow-pregnancy class="ml-2"></cow-pregnancy>
            </tab>
            <tab title="Lactation" class="ml-5">
                <cow-lactation class="ml-2"></cow-lactation>
            </tab>
        </details-tabs>
<!--        <details-table></details-table>-->
    </div>
</template>

<script>

// import DetailsTable from '../../../components/details-page/details-table';
import DetailsTabs from '../../../components/details-page/details-tabs';
import TopGeneralInfoItems from '../../../views/common-components/details-page/TopGeneralInfoItems';
import CowBasicInfo from '../../../views/cows/HerdManagement/cow-basic-info';
import CowMedicalInfo from '../../../views/cows/HerdManagement/cow-medical-info';
import CowPregnancy from '../../../views/cows/HerdManagement/cow-pregnancy';
import CowLactation from '../../../views/cows/HerdManagement/cow-lactation';

export default {
    name: 'Cow-Details',
    components: { CowLactation, CowPregnancy, CowMedicalInfo, CowBasicInfo, TopGeneralInfoItems, DetailsTabs },
    methods: {
        refreshBasicDetails () {
            this.$refs.basicDetails.refreshData();
        }
    }
};
</script>

<style scoped lang="scss">
.btn-3 {
    background-color: #0397D5;
    border: 1px solid white;
    color: white;

    &:hover {
        background-color: #0397D5;
    }
}

</style>

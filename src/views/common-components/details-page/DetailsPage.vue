<template>
    <div class="">
        <top-general-info-items ref="basicDeatils" animal="bull" class="ml-5"></top-general-info-items>
        <details-tabs class="mt-n3">
            <tab title="Basic Info" class="ml-5">
                <basic-info-tables @refresh="refreshBasicDetails" class="ml-2"></basic-info-tables>
            </tab>
            <tab title="Medical Info" class="ml-5">
                <medical-info-tables  class="ml-2"></medical-info-tables>
            </tab>
            <tab title="Semen Info" class="ml-5">
                <semen-info-tables class="ml-2"></semen-info-tables>
            </tab>
        </details-tabs>
    </div>
</template>

<script>
import TopGeneralInfoItems from './TopGeneralInfoItems';
import DetailsTabs from '../../../components/details-page/details-tabs';
import BasicInfoTables from './BasicInfoTables';
import MedicalInfoTables from './MedicalInfoTables';
import SemenInfoTables from './SemenInfoTables';

export default {
    name: 'BullDetailsPage',
    components: { SemenInfoTables, MedicalInfoTables, BasicInfoTables, DetailsTabs, TopGeneralInfoItems },
    methods: {
        refreshBasicDetails () {
            this.$refs.basicDeatils.refreshData();
        }
    }
};
</script>

<style scoped>

</style>

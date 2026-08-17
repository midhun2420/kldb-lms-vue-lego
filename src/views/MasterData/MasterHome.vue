<template>
    <div class="home py-5 of-h full-height">
        <h4 class="text-primary text-center mb-5 font-poppins-semibold">MASTER DATA</h4>
        <div class="row px-8">
            <!--            <div class="col-lg-3" @click="redirect('RegistrationType')">-->
            <!--                <dashboard-card-item text="Registration Type"></dashboard-card-item>-->
            <!--            </div>-->
            <!--  <div class="col-lg-3" @click="redirect('AnimalType')">
                  <dashboard-card-item text="Animal Type"></dashboard-card-item>
              </div>-->
            <div class="col-lg-3" @click="redirect('StorageType')">
                <dashboard-card-item text="Storage Type"></dashboard-card-item>
            </div>
            <div class="col-lg-3" @click="redirect('Source')">
                <dashboard-card-item text="Source"></dashboard-card-item>
            </div>
            <div class="col-lg-3" @click="redirect('Breed')">
                <dashboard-card-item text="Breed"></dashboard-card-item>
            </div>
            <div class="col-lg-3" @click="redirect('Shed')">
                <dashboard-card-item text="Shed"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Batch')">
                <dashboard-card-item text="Batch"></dashboard-card-item>
            </div>

            <div class="col-lg-3 mt-lg-3" @click="redirect('Location')">
                <dashboard-card-item text="Location"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Dehorning')">
                <dashboard-card-item text="Dehorning"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Group')">
                <dashboard-card-item text="Group"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('DoseType')">
                <dashboard-card-item text="Dose Type"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Collection')">
                <dashboard-card-item text="Collection"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('QuarantineLocation')">
                <dashboard-card-item text="Quarantine Location"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('QuarantinePosition')">
                <dashboard-card-item text="Quarantine Position"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('DiseaseType')">
                <dashboard-card-item text="Disease Type"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Agency')">
                <dashboard-card-item text="Agency"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Frequency')">
                <dashboard-card-item text="Frequency"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Course')">
                <dashboard-card-item text="Course"></dashboard-card-item>
            </div>
<!--            <div class="col-lg-3 mt-lg-3" @click="redirect('Abnormality')">-->
<!--                <dashboard-card-item text="Abnormality"></dashboard-card-item>-->
<!--            </div>-->
            <div class="col-lg-3 mt-lg-3" @click="redirect('GlasswareSample')">
                <dashboard-card-item text="Glassware Sample"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('GlasswareVolume')">
                <dashboard-card-item text="Glassware Volume"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Equipment')">
                <dashboard-card-item text="Equipment"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('VaccinationType')">
                <dashboard-card-item text="Vaccination Type"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Rsb')">
                <dashboard-card-item text="Rsb"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('CSBRooms')">
                <dashboard-card-item text="CSB Rooms"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('reasonForCulling')">
                <dashboard-card-item text="Reason For Culling"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('reasonForDisposal')">
                <dashboard-card-item text="Reason For Disposal"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('modeOfDisposal')">
                <dashboard-card-item text="Mode Of Disposal"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Unit')">
                <dashboard-card-item text="Unit"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('Crop')">
                <dashboard-card-item text="Crop"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('BookValue')">
                <dashboard-card-item text="Book Value"></dashboard-card-item>
            </div>
            <div class="col-lg-3 mt-lg-3" @click="redirect('RejectedReason')">
                <dashboard-card-item text="Rejected Reason"></dashboard-card-item>
            </div>
            <div v-if="currentUser.admin === true" class="col-lg-3 mt-lg-3" @click="redirect('UserManagement')">
                <dashboard-card-item text="User Management"></dashboard-card-item>
            </div>
            <div v-if="currentUser.admin === true" class="col-lg-3 mt-lg-3" @click="redirect('UserActivity')">
                <dashboard-card-item text="User Activity"></dashboard-card-item>
            </div>
            <div v-if="currentUser.admin === true" class="col-lg-3 mt-lg-3" @click="redirect('UserActivityBackup')">
                <dashboard-card-item text="Activity Backup"></dashboard-card-item>
            </div>
        </div>
    </div>

</template>

<script>
import DashboardCardItem from '../../components/ui/DashboardCardItem';
import { mapGetters } from 'vuex';

export default {
    name: 'MasterHome',
    components: { DashboardCardItem },
    computed: {
        ...mapGetters(['currentUser'])
    },
    data () {
        return {
            urls: {
                // RegistrationType: '/master-data/registration-type/',
                AnimalType: '/master-data/animal-type/',
                StorageType: '/master-data/storage-type/',
                Source: '/master-data/source/',
                Breed: '/master-data/breed/',
                Shed: '/master-data/shed/',
                Batch: '/master-data/batch/',
                VaccinationType: '/master-data/vaccination-type/',
                Rsb: '/master-data/rsb/',
                CSBRooms: '/master-data/csb-rooms/',
                Location: '/master-data/location/',
                DehorningType: '/master-data/dehorning-type/',
                Group: '/master-data/group/',
                DoseType: '/master-data/dose-type/',
                Collection: '/master-data/collection/',
                QuarantineLocation: '/master-data/quarantine-location/',
                QuarantinePosition: '/master-data/quarantine-position/',
                DiseaseType: '/master-data/disease-type/',
                Agency: '/master-data/agency/',
                Frequency: '/master-data/frequency/',
                Course: '/master-data/course/',
                Abnormality: '/master-data/abnormality/',
                GlasswareSample: '/master-data/glassware-sample/',
                GlasswareVolume: '/master-data/glassware-volume/',
                Equipment: '/master-data/equipment/',
                UserManagement: '/master-data/user-list/',
                UserActivity: '/master-data/user-activity/',
                UserActivityBackup: '/master-data/user-activity/backup/',
                reasonForCulling: '/master-data/reason-for-culling/',
                reasonForDisposal: '/master-data/reason-for-disposal/',
                modeOfDisposal: '/master-data/mode-of-disposal/',
                Unit: '/master-data/unit/',
                Crop: '/master-data/crop/',
                BookValue: '/master-data/book-value/',
                RejectedReason: '/master-data/rejected-reason/'

            }
        };
    },
    methods: {
        redirect (URLName) {
            if (URLName === 'RegistrationType') {
                this.$router.push({ path: this.urls.RegistrationType });
            }
            if (URLName === 'AnimalType') {
                this.$router.push({ path: this.urls.AnimalType });
            }
            if (URLName === 'StorageType') {
                this.$router.push({ path: this.urls.StorageType });
            }
            if (URLName === 'Source') {
                this.$router.push({ path: this.urls.Source });
            }
            if (URLName === 'Breed') {
                this.$router.push({ path: this.urls.Breed });
            }
            if (URLName === 'Shed') {
                this.$router.push({ path: this.urls.Shed });
            }
            if (URLName === 'Batch') {
                this.$router.push({ path: this.urls.Batch });
            }
            if (URLName === 'Location') {
                this.$router.push({ path: this.urls.Location });
            }
            if (URLName === 'Dehorning') {
                this.$router.push({ path: this.urls.DehorningType });
            }
            if (URLName === 'Group') {
                this.$router.push({ path: this.urls.Group });
            }
            if (URLName === 'DoseType') {
                this.$router.push({ path: this.urls.DoseType });
            }
            if (URLName === 'Collection') {
                this.$router.push({ path: this.urls.Collection });
            }
            if (URLName === 'QuarantineLocation') {
                this.$router.push({ path: this.urls.QuarantineLocation });
            }
            if (URLName === 'QuarantinePosition') {
                this.$router.push({ path: this.urls.QuarantinePosition });
            }
            if (URLName === 'DiseaseType') {
                this.$router.push({ path: this.urls.DiseaseType });
            }
            if (URLName === 'Agency') {
                this.$router.push({ path: this.urls.Agency });
            }
            if (URLName === 'Frequency') {
                this.$router.push({ path: this.urls.Frequency });
            }
            if (URLName === 'Course') {
                this.$router.push({ path: this.urls.Course });
            }
            if (URLName === 'Abnormality') {
                this.$router.push({ path: this.urls.Abnormality });
            }
            if (URLName === 'GlasswareSample') {
                this.$router.push({ path: this.urls.GlasswareSample });
            }
            if (URLName === 'GlasswareVolume') {
                this.$router.push({ path: this.urls.GlasswareVolume });
            }
            if (URLName === 'Equipment') {
                this.$router.push({ path: this.urls.Equipment });
            }
            if (URLName === 'VaccinationType') {
                this.$router.push({ path: this.urls.VaccinationType });
            }
            if (URLName === 'Rsb') {
                this.$router.push({ path: this.urls.Rsb });
            }
            if (URLName === 'CSBRooms') {
                this.$router.push({ path: this.urls.CSBRooms });
            }
            if (URLName === 'reasonForCulling') {
                this.$router.push({ path: this.urls.reasonForCulling });
            }
            if (URLName === 'modeOfDisposal') {
                this.$router.push({ path: this.urls.modeOfDisposal });
            }
            if (URLName === 'reasonForDisposal') {
                this.$router.push({ path: this.urls.reasonForDisposal });
            }
            if (URLName === 'Unit') {
                this.$router.push({ path: this.urls.Unit });
            }
            if (URLName === 'Crop') {
                this.$router.push({ path: this.urls.Crop });
            }
            if (URLName === 'BookValue') {
                this.$router.push({ path: this.urls.BookValue });
            }
            if (URLName === 'RejectedReason') {
                this.$router.push({ path: this.urls.RejectedReason });
            }
            if (URLName === 'UserManagement') {
                this.$router.push({ path: this.urls.UserManagement });
            }
            if (URLName === 'UserActivity') {
                this.$router.push({ path: this.urls.UserActivity });
            }
            if (URLName === 'UserActivityBackup') {
                this.$router.push({ path: this.urls.UserActivityBackup });
            }
        }
    }
};

</script>
<style scoped>

</style>

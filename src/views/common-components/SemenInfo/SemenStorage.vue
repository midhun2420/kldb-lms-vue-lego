<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="storageListURL" :per-page="10" search-placeholder="Search" :show-search-box="false">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'SemenStorage',
    computed: {
        ...mapGetters(['currentUser']),
        storageListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.storageInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            fields: [
                {
                    name: 'dose_type.name',
                    title: 'Dose Type',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'location',
                    title: 'Location',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'goblet_type',
                    title: 'Goblet Type',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'no_of_dose',
                    title: 'No. Of Doses',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'semen_type',
                    title: 'Semen Type',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                }
            ],
            loading: false
        };
    },

    mounted () {
        this.id = this.$route.params.id;
    }
};
</script>

<style scoped>
</style>

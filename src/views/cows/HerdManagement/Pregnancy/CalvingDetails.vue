<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="calvingListURL" :per-page="10" search-placeholder="Search">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'CalvingDetails',
    computed: {
        ...mapGetters(['currentUser']),
        calvingListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.calvingInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            fields: [
                {
                    name: 'calving_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'abort_status',
                    title: 'Abortion Status',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'male_calves_no',
                    title: 'No.of Male Calves',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'female_calves_no',
                    title: 'No.of Female Calves',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-20r fs-lg-0'
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

<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="disposalListURL" :per-page="10" search-placeholder="Search" :show-search-box="false">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'SemenIssue',
    computed: {
        ...mapGetters(['currentUser']),
        disposalListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.disposalInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            fields: [
                {
                    name: 'issued_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                }, {
                    name: 'dose_type',
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
                    name: 'reason',
                    title: 'Reason',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'no_of_dose',
                    title: 'No. Of Doses',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'approval_no',
                    title: 'Approval No.',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
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

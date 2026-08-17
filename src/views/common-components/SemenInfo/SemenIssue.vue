<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="issueListURL" :per-page="10" search-placeholder="Search" :show-search-box="false">
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
        issueListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.issueInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            fields: [
                {
                    name: 'issue_date',
                    title: 'Issued Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'location',
                    title: 'Location',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                }, {
                    name: 'dose_type.name',
                    title: 'Dose Type',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'stock',
                    title: 'Stock',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'issued_to',
                    title: 'To Whom Issued',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'no_of_dose',
                    title: 'No. Of Doses Issued',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'despatch_location',
                    title: 'Despatch Location',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'ptm',
                    title: 'PTM',
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

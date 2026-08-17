<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="collectionListURL" :per-page="10" search-placeholder="Date" :show-search-box="false">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'SemenCollection',
    computed: {
        ...mapGetters(['currentUser']),
        collectionListURL () {
            const bullID = this.$route.params.id;

            return urls.bullDetailEdit.collectionInfo + '?id=' + bullID;
        }
    },

    data () {
        return {
            animal: 'bull',
            id: '',
            fields: [
                {
                    name: 'collection_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'batch',
                    title: 'Batch/Day',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset fs-lg-0'
                }, {
                    name: 'ejaculation_no',
                    title: 'Ejaculations',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-7 b-unset td-line-c fs-lg-0'
                }, {
                    name: 'volume',
                    title: 'V',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                }, {
                    name: 'motility',
                    title: 'IM',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                }, {
                    name: 'tev',
                    title: 'T%',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2  bg-7 td-line-c b-unset fs-lg-0'
                }, {
                    name: 'concentration',
                    title: 'CONC',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-7 b-unset td-line-c fs-lg-0'
                }, {
                    name: 'remarks1',
                    title: 'Evaluation Remarks',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-7 b-unset td-line-c w-20r fs-lg-0'
                },
                {
                    name: 'ptm',
                    title: 'PTM after TF',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'used_dose',
                    title: 'No. of Straws',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'dose',
                    title: 'No. Of Doses',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'remarks2',
                    title: 'Test Remarks',
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

<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="abortionListURL" :per-page="10" search-placeholder="Search">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'CowAbortionEvent',
    computed: {
        ...mapGetters(['currentUser']),
        abortionListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.abortionInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            fields: [
                {
                    name: 'abortion_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'ai_date',
                    title: 'AI Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'continue_with_lactation',
                    title: 'Continue with lactation',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
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
    },
    methods: {
        formSuccess (modal) {
            if (modal === 'deworming') {
                this.$refs.dewormingEdit.close();
                this.$refs.table1.refreshTable();
            }
        },
        editDeworming (item) {
            console.log('editItem:editDeworming: ', item);
            this.editingDeworming = [];
            this.editingDeworming = item;
            this.id = item.cow_id || this.$route.params.id;
            this.$refs.dewormingEdit.show();
        }
    }
};
</script>

<style scoped>
</style>

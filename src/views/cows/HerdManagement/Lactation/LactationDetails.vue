<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="lactationListURL" :per-page="10" search-placeholder="Date">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'LactationDetails',
    computed: {
        ...mapGetters(['currentUser']),
        lactationListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.lactationInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            fields: [
                {
                    name: 'status_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'status',
                    title: 'Status',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
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

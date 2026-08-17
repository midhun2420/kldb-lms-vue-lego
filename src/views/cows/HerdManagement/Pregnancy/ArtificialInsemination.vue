<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="aiListURL" :per-page="10" search-placeholder="Bull Allotted">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'ArtificialInsemination',
    computed: {
        ...mapGetters(['currentUser']),
        aiListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.aiInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            fields: [
                {
                    name: 'ai_date',
                    title: 'AI Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'bull_allotted',
                    title: 'Bull Allotted',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-15r fs-lg-0'
                },
                {
                    name: 'bull_breed',
                    title: 'Bull Breed',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'attempt_no',
                    title: 'Attempt No.',
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

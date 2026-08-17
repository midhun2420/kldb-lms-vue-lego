<template>
    <div>
        <vue-table ref="table1" :fields="fields" :url="dailyMilkingListURL" :per-page="10" search-placeholder="Date">
        </vue-table>
    </div>
</template>

<script>
import urls from '../../../../data/urls';
import { mapGetters } from 'vuex';

export default {
    name: 'DailyMilkRecording',
    computed: {
        ...mapGetters(['currentUser']),
        dailyMilkingListURL () {
            const cowID = this.$route.params.id;

            return urls.cowDetailEdit.dailyMilkingInfo + '?id=' + cowID;
        }
    },

    data () {
        return {
            animal: 'cow',
            id: '',
            fields: [
                {
                    name: 'milk_date',
                    title: 'Date',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'morning_qty',
                    title: 'Morning Quantity',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'evening_qty',
                    title: 'Evening Quantity',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold  b-unset',
                    dataClass: 'text-2 bg-6 b-unset w-10r fs-lg-0'
                },
                {
                    name: 'total_quantity',
                    title: 'Total',
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

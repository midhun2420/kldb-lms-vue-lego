<template>
    <div class="container-fluid pl-0 pr-5">
        <div class="ml-10 mb-2 fl-te-c card w-100r">
            <h4 class="text-primary text-center mb-0 font-poppins-semibold">LOCATION</h4>
                <btn size="sm" text="BACK" icon="fa fa-arrow-left"
                     @click="BackToHome"></btn>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <country @success="loadCountry" @refresh="RefreshData"></country>
            </div>
            <div class="col-lg-4">
                <state ref="state" @success="loadState" @refresh="RefreshData"></state>
            </div>
            <div class="col-lg-4">
                <district ref="district"></district>
            </div>

        </div>

    </div>

</template>

<script>

import Country from './country';
import State from './state';
import District from './district';

export default {
    name: 'Location',
    components: { District, State, Country },
    data () {
        return {};
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/master-data/' });
        },
        loadCountry () {
            this.$refs.state.loadCountry();
        },
        loadState () {
            this.$refs.district.loadState();
        },
        RefreshData () {
            this.$refs.state.refreshData();
            this.$refs.district.refreshData();
        }
    }

};
</script>

<style scoped>

</style>

<template>
    <div>
        <div v-if="data">
            <div class="bb-1 mt-4"></div>
            <h5 class="text-primary mb-5 font-poppins-semibold mt-4">BULL</h5>
            <div class="row">
                <div class="col-lg-3 mb-5">
                    <dashboard-card text="Total Males" :value="data.total_males || '0'"></dashboard-card>
                </div>
                <div class="col-lg-3 mb-5" v-for="(item,index) in data.breed_data" :key="index">
                    <dashboard-card :text="item.breed || 'nill'" :value="item.count || '0'"></dashboard-card>
                </div>
                <!--            <div class="col-lg-3 mb-5">
                                <dashboard-card text="JV"></dashboard-card>
                            </div>
                            <div class="col-lg-3 mb-5">
                                <dashboard-card text="CH"></dashboard-card>
                            </div>
                            <div class="col-lg-3 mb-5">
                                <dashboard-card text="CJ"></dashboard-card>
                            </div>
                            <div class="col-lg-3 mb-5">
                                <dashboard-card text="SN"></dashboard-card>
                            </div>
                            <div class="col-lg-3 mb-5">
                                <dashboard-card text="VR"></dashboard-card>
                            </div>-->
            </div>
            <div class="row">
                <div class="col-lg-9">
                    <h6 class="font-poppins-semibold text-dark mb-3">Semen Details</h6>
                    <div class="bb-1"></div>
                    <div class="row mt-4">
                        <div class="col-4">
                            <dashboard-card text="Total Semen Produced" :value="data.semen_detail.total_semen || '0'"></dashboard-card>
                        </div>
                        <div class="col-4">
                            <dashboard-card text="Total in Stock" :value="data.semen_detail.total_in_stock || '0'"></dashboard-card>
                        </div>
                        <div class="col-4">
                            <dashboard-card text="Total in Quarantine" :value="data.semen_detail.total_in_quarantine || '0'"></dashboard-card>
                        </div>
                        <div class="col-lg-12 mt-4">
                            <h6 class="font-poppins-semibold text-dark mb-3">Breed Wise Semen Stock</h6>
                            <div class="bb-1 mb-4"></div>
                        </div>
                        <div class="col-4" v-for="(item,index) in data.semen_detail.breed_wise_semen_stock" :key="index">
                            <dashboard-card-one :text="item.breed || 'nill'" :value="item.count || '0'"></dashboard-card-one>
                        </div>
                        <!--                 <div class="col-4">
                                            <dashboard-card-one text="JY"></dashboard-card-one>
                                        </div>
                                         <div class="col-4">
                                            <dashboard-card-one text="CH"></dashboard-card-one>
                                        </div>
                                         <div class="col-4 mt-4">
                                            <dashboard-card-one text="CJ"></dashboard-card-one>
                                        </div>
                                        <div class="col-4 mt-4">
                                            <dashboard-card-one text="SN"></dashboard-card-one>
                                        </div>
                                        <div class="col-4 mt-4">
                                            <dashboard-card-one text="VR"></dashboard-card-one>
                                        </div>-->
                    </div>
                </div>
                <div class="col-lg-3">
                    <dashboard-card text="Animals for Other Purpose" :value="data.other_purpose || '0'"></dashboard-card>
                    <dashboard-card text="Bulls in Regular Collection" class="mt-4" :value="data.regular_collection || '0'"></dashboard-card>
                    <dashboard-card text="Bulls in Training" class="mt-4" :value="data.training || '0'"></dashboard-card>
                    <dashboard-card text="Males less than 18 months" class="mt-4" :value="data.males_18_month || '0'"></dashboard-card>
                </div>
            </div>
            <!--        <div class="row mt-6 ml-0">-->
            <!--            <div class="col-lg-9">-->
            <!--                <h6 class="font-poppins-semibold text-dark mb-3">Semen Details</h6>-->
            <!--                <div class="bb-1"></div>-->
            <!--                <div class="row">-->
            <!--                    <div class=" pl-0">-->
            <!--                        <div class="mt-3 w-20r">-->
            <!--                            <dashboard-card text="Total Semen Produced" :value="data.semen_detail.total_semen"></dashboard-card>-->
            <!--                        </div>-->
            <!--                       <h6 class="mt-5 font-poppins-semibold text-dark mb-3">Breed Wise Semen Stock</h6>-->
            <!--                        <div class="bb-1"></div>-->
            <!--                        <div class="mt-4 w-20r" v-for="(item,index) in data.semen_detail.breed_wise_semen_stock" :key="index">-->
            <!--                            <dashboard-card-one :text=item.breed :value="item.count"></dashboard-card-one>-->
            <!--                        </div>-->
            <!--&lt;!&ndash;                        <div class="mt-4 w-20r">&ndash;&gt;-->
            <!--&lt;!&ndash;                            <dashboard-card-two text="CJ"></dashboard-card-two>&ndash;&gt;-->
            <!--&lt;!&ndash;                        </div>&ndash;&gt;-->
            <!--                    </div>-->
            <!--                    <div class="col-lg-3">-->
            <!--                        <div class="mt-3 w-20r">-->
            <!--                            <dashboard-card text="Total in Stock" :value="data.semen_detail.total_in_stock"></dashboard-card>-->
            <!--                        </div>-->
            <!--                        <div class="mt-7 w-20r">-->
            <!--                            <dashboard-card-two text="JY"></dashboard-card-two>-->
            <!--                        </div>-->
            <!--                        <div class="mt-4 w-20r">-->
            <!--                            <dashboard-card-two text="SN"></dashboard-card-two>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                     <div class="col-lg-3 pl-6">-->
            <!--                        <div class="mt-3 w-20r">-->
            <!--                            <dashboard-card text="Total in Quarantine" :value="data.semen_detail.total_in_quaranitne"></dashboard-card>-->
            <!--                        </div>-->
            <!--                        <div class="mt-7 w-20r">-->
            <!--                            <dashboard-card-two text="CH"></dashboard-card-two>-->
            <!--                        </div>-->
            <!--                        <div class="mt-4 w-20r">-->
            <!--                            <dashboard-card-two text="VR"></dashboard-card-two>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="col-lg-3">-->
            <!--               <dashboard-card text="Animals for Other Purpose" :value="data.other_purpose"></dashboard-card>-->
            <!--                <dashboard-card class="mt-4" text="Bulls in Regular Collection" :value="data.regular_collection"></dashboard-card>-->
            <!--                <dashboard-card class="mt-4" text="Bulls in Training" :value="data.training"></dashboard-card>-->
            <!--                <dashboard-card class="mt-4" text="Males less than 18 months" :value="data.males_18_month"></dashboard-card>-->
            <!--            </div>-->
            <!--        </div>-->
        </div>
        <template v-else>
                <div class="fl-x-cc">
                    <loading-animation/>
                    <b class="ml-3">Please Wait...</b>
                </div>
        </template>

    </div>
</template>

<script>

import DashboardCard from './DashboardCard';
import DashboardCardOne from './DashboardCardOne';
import axios from 'secure-axios';
import urls from '../../../data/urls';
// import DashboardCardOne from './DashboardCardOne';
export default {
    name: 'BullDashboard',
    components: { DashboardCardOne, DashboardCard },
    data () {
        return {
            data: ''
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        async loadData () {
            try {
                const response = await axios.get(urls.dashboard.bullDashboard);
                const data = response.data;
                this.data = data.data;
                console.log('response: ', data);
                if (data.success) {
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
            }
        }
    }
};
</script>

<style scoped>

</style>

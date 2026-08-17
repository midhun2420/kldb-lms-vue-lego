<template>
    <div class="home py-2 of-h">
        <h4 class="text-primary text-center mb-5 font-poppins-semibold">SEMEN STATION</h4>
        <div class="row px-7 px-lg-3">
            <div class="col-lg-3" v-for="(item,i) in items" :key="i"
                :class="{'mt-lg-3': i > 3}">
                <dashboard-card-item :text="item.text" :to="item.link"></dashboard-card-item>
            </div>
        </div>
    </div>

</template>

<script>
import DashboardCardItem from '../../components/ui/DashboardCardItem';

export default {
    name: 'SemenStation',
    components: { DashboardCardItem },
    data () {
        return {
            content: '',
            items: [
                {
                    text: 'Bull List',
                    link: '/bulls-list/'
                },
                {
                    text: 'Registration',
                    link: '/register/'
                },
                {
                    text: 'Dehorning / Disbudding',
                    link: '/dehorning-1/'
                },
                {
                    text: 'Nose Punching',
                    link: '/nose-punching/'
                },
                {
                    text: 'Weight Recording',
                    link: '/weight-recording/'
                },
                {
                    text: 'Deworming',
                    link: '/deworming-1/'
                },
                {
                    text: 'Bull Calf Selection',
                    link: '/bull-calf-selection/'
                },
                {
                    text: 'Vaccination',
                    link: '/vaccination/'
                },
                {
                    text: 'Bull Quarantine',
                    link: '/bull-quarantine/'
                },
                {
                    text: 'Bull Regularization',
                    link: '/bull-regularization-list/'
                },
                {
                    text: 'Collection Schedule',
                    link: '/collection-schedule/'
                },
                {
                    text: 'Semen Collection',
                    link: '/semen-collection/'
                },
                {
                    text: 'Semen Quarantine',
                    link: '/semen-quarantine/'
                },
                {
                    text: 'Semen Clubbing',
                    link: '/clubbing-of-Semen-Dose/'
                },
                {
                    text: 'Semen Storage',
                    link: '/semen-storage-diagram/'
                    // link: ''
                },
                {
                    text: 'Semen Issue',
                    link: '/semen-issue/'
                    // link: ''
                },
                {
                    text: 'Virtual Despatch',
                    link: '/virtual-dispatching/'
                },
                {
                    text: 'Semen Storage - <br/> Position Change',
                    link: '/semen-quarantine-position-change/'
                },
                {
                    text: 'Semen Destruction - <br/> Proposal </span>',
                    link: '/semen-destruction-proposal/'
                },
                {
                    text: 'Semen Destruction - <br/> Disposal',
                    link: '/semen-destruction-disposal/'
                },
                {
                    text: 'Bull Disease Screening',
                    link: '/bull-disease-screening/'
                }
            ]
        };
    }
};

</script>
<style scoped>

</style>

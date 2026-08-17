<template>
    <div class="home py-2 of-h min-h-70v">
        <h4 class="text-primary text-center mb-5 font-poppins-semibold">AH SECTION</h4>
                <div class="row px-4">
            <div class="col-lg-3" v-for="(item,i) in items" :key="i"
                :class="{'mt-lg-3': i > 3}">
                <dashboard-card-item :text="item.text" :to="item.link"></dashboard-card-item>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Home',
    components: {},
    data () {
        return {
            content: '',
            items: [
                {
                    text: 'Cow List',
                    link: '/cows-list/'
                },
                {
                    text: 'Registration',
                    link: '/cows-registration/'
                },
                {
                    text: 'Dehorning / Disbudding',
                    link: '/cows-dehorning-1/'
                },
                {
                    text: 'Nose Punching',
                    link: '/cows-nose-punching/'
                },
                {
                    text: 'Weight Recording',
                    link: '/cows-weight-recording/'
                },
                {
                    text: 'Deworming',
                    link: '/cows-deworming-1/'
                },
                {
                    text: 'Vaccination',
                    link: '/cow-vaccination/'
                },
                {
                    text: 'Cow Screening',
                    link: '/cow-screening/'
                },
                {
                    text: 'Mating Program',
                    link: '/cows-mating-program/'
                },
                {
                    text: 'Artificial Insemination',
                    link: '/cows-artificial-insemination/'
                },
                {
                    text: 'Pregnancy Checkup',
                    link: '/cows-pregnancy-checkup/'
                },
                {
                    text: 'Calving Details',
                    link: '/cows-calving-details/'
                },
                {
                    text: 'Abortion Event',
                    link: '/cows-abortion-event/'
                },
                {
                    text: 'Daily Milk Recording',
                    link: '/cows-daily-milk-recording-list/'
                },
                {
                    text: 'Drying Status',
                    link: '/cow-lactation-status/'
                },
                {
                    text: 'Milk Disposal',
                    link: '/cows-milk-disposal/'
                }
            ]
        };
    }
};

</script>
<style scoped>

</style>

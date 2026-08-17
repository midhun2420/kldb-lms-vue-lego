<template>
     <div>
        <div class="card">
            <h6 class="text-dark font-poppins-semibold"  v-html="text"></h6>
            <h6 class="text-primary font-poppins-semibold pt-3">{{value}}</h6>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardCardTwo',
    props: {
        value: {
            type: String,
            default: '30'
        },
        text: {
            type: String,
            default: ''
        },
        to: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>

</style>

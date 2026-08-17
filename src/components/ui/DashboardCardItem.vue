<template>
    <router-link :to="to" class="text-decoration-none">
        <div class="card border-r-01 bs-5 card-container text-center fl-x-cc mu-p">
            <p class="m-0 font-poppins-medium text-black c-text text-left" v-html="text"></p>
        </div>
    </router-link>

</template>

<script>
export default {
    name: 'DashboardCardItem',
    props: {
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
    .card-container {
        height: 5.5rem;
    }

    .c-text {
        font-size: 0.95rem;
    }

    .c-py-41 {
        padding-top: 2rem !important;
        padding-bottom: 2rem !important;
    }
</style>

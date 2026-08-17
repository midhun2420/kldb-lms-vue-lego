<template>
    <div>
        <div class="card w-20r">
            <p class="text-dark font-weight-bold fs-lg--1" v-html="text"></p>
            <h4 class="text-primary font-poppins-semibold">{{value}}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard-Card',
    props: {
        value: {
            type: String,
            default: '2240'
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

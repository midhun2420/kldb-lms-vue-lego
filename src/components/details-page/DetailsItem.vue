<template>
    <div>
        <p class="font-poppins-light fs-lg-0 text-white mb-1">{{label}}</p>
        <p class="font-poppins-semibold text-white mb-3" :class="{'fs-lg-2': valueFontSize ==='lg'}">{{value}}</p>
    </div>
</template>

<script>
export default {
    name: 'DetailsItem',
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        valueFontSize: {
            type: String,
            default: 'lg'
        }
    }
};
</script>

<style scoped>

</style>

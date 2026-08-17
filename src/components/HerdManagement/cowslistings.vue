<template>
    <div class="col-lg-3">
        <p class="font-poppins-regular text-white">{{ model.name }}</p>
        <p class="font-poppins-semibold text-white">{{ model.lastname }}</p>
    </div>
</template>

<script>
export default {
    name: 'cowlistings',
    props: {
        model: {
            type: Object

        }
    }
};
</script>

<style scoped>

</style>

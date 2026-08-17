<template>
    <div class="square-block font-poppins-medium" :style="{ backgroundColor: bgColor, color: textColor }">
        <slot></slot>
    </div>

</template>

<script>
export default {
    name: 'B-Chamber',
    props: {
        bgColor: {
            type: String,
            default: 'yellow'
        },
        textColor: {
            type: String,
            default: 'white'
        }
    }
};

</script>

<style scoped>
.square-block {
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
}
</style>

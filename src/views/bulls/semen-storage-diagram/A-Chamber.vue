<template>
    <div class="square-block font-poppins-medium" :style="{ backgroundColor: bgColor, color: textColor }"
         style="cursor: pointer" @click="$emit('item', alphabet)">
        {{ alphabet }}
    </div>
</template>

<script>
export default {
    name: 'A-Chamber',
    props: {
        bgColor: {
            type: String,
            default: '#F1CF3B'
        },
        textColor: {
            type: String,
            default: 'white'
        },
        alphabet: {
            type: String,
            default: 'A1'
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
    border: 1px white;
}
</style>

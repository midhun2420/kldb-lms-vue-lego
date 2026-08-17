<template>
    <div align="center" class="fl-x fl-a-c">
        <span style="width:0.9rem;height: 0.9rem; display: inline-block;" :class="boxClasses"></span>
        <span class="text-2 font-poppins-medium ml-2">{{text}}</span>
    </div>
</template>

<script>
export default {
    name: 'ChartLabels',
    props: {
        text: {
            type: String,
            default: ''
        },
        boxBgColor: {
            type: String,
            default: ''
        }
    },
    computed: {
        boxClasses () {
            const classNames = [];
            classNames.push('bg-' + this.boxBgColor);
            return classNames;
        }
    }
};
</script>

<style scoped>

</style>

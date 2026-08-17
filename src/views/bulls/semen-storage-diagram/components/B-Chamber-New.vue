<template>
    <div class="square-block text-center font-poppins-medium" :class="containerClassNames"
    style="cursor: pointer" @click="clickItem">
        <span class="p-2 fs-lg-2" :class="textClassNames">{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'b-chamber-new',
    props: {
        color: {
            type: String,
            default: 'yellow'
        },
        text: {
            type: String,
            default: ''
        },
        itemSelected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        containerClassNames () {
            const classNames = [];
            classNames.push('b-1 b-' + this.color);
            if (this.itemSelected) {
                classNames.push('bg-' + this.color);
            }
            return classNames;
        },
        textClassNames () {
            const classNames = [];
            if (!this.itemSelected) {
                classNames.push('text-' + this.color);
            }
            return classNames;
        }
    },
    methods: {
        clickItem () {
            // this.itemSelected = true;
            this.$emit('item', this.text);
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

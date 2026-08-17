<template>
    <div class="fl-x fl-a-c">
        <btn design="" shadow="0" v-if="design === 'basic'">
            <transition name="fade" mode="out-in">
                <img v-if="enabled" src="../../../assets/web/icons/_Toggle-base.svg" class="icon-sm-2" alt="" @click="changeStatus">
                <img v-else src="../../../assets/web/icons/Toggle_base_disabled.png" class="icon-sm-2" alt="" @click="changeStatus">
            </transition>
        </btn>
        <btn design="" shadow="0" v-if="design === 'basic-a'">
            <transition name="fade" mode="out-in">
                <img v-if="enabled" src="../../../assets/web/icons/Toggle_base_enabled_gray.svg" class="icon-sm-2" alt="" @click="changeStatus">
                <img v-else src="../../../assets/web/icons/Toggle_base_disabled.png" class="icon-sm-2" alt="" @click="changeStatus">
            </transition>
        </btn>
        <div :class="{'w-8r': setStatusSlotWidth}" v-if="$slots.status">
            <transition name="fade" mode="out-in">
                <slot name="status"></slot>
            </transition>
        </div>
    </div>

</template>

<script>
export default {
    name  : 'ToggleButton',
    props : {
        enabled : {
            type    : Boolean,
            default : true
        },
        setStatusSlotWidth : {
            type    : Boolean,
            default : true
        },
        design : {
            type    : String,
            default : 'basic'
        }
    },
    methods : {
        changeStatus () {
            this.$emit('changeStatus');
        }
    }
};
</script>

<style scoped>
    .w-8r {
        width: 10rem !important;
    }
</style>

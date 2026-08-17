<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" appear ref="transition" duration="200">
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name: 'TransitionFade'
};
</script>

<style scoped>

</style>

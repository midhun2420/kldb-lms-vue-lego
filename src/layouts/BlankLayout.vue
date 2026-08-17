<template>
    <div>
        <div class="page-content section-bg">
            <notifications/>
            <transition name="fade" mode="out-in">
                <router-view>

                </router-view>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data () {
    },
    metaInfo: {
        titleTemplate: '%s - Medico Pharm',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    name: 'MainLayout'
};

</script>
<style scoped>
    .section-bg {
        max-height: 100vh;
        background: url("../assets/web/bg/section-bg.svg");
        background-position: bottom;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>

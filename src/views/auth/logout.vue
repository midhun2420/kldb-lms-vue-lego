<template>
    <div class=" row text-primary">
        <div class="col-12 text-center">
            <loading-round dot-background="rgb( 57,84,164 )"/>
            <div class="mt-3">Please wait . . .</div>
        </div>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'logout',
    beforeMount () {
        this.logout();
    },
    methods: {
        async logout () {
            await axios.post(urls.auth.logout);
            sessionStorage.clear();
            await this.$router.push({ path: '/login/' }).then(() => {
                window.location.reload(true);
            });
        }
    }
};
</script>

<style scoped>

</style>

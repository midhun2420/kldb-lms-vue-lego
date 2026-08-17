<template>

    <login-page-design-1
        :logo-img="require('../../assets/img/logo/logo.svg')"
        :url="url" @login-success="onSuccess"
    />

</template>

<script>
import { mapActions } from 'vuex';
import urls from '@/data/urls';
import LoginPageDesign1 from 'lego-modules/src/pages/login/design-1';

export default {
    name: 'Login',
    components: { 'login-page-design-1': LoginPageDesign1 },
    methods: {
        ...mapActions(['setUser']),
        onSuccess (json) {
            const username = json.user;
            console.log('username:', json, username);
            this.setUser(username);
        }
    },
    data () {
        return {
            url: urls.auth.login
        };
    }
};
</script>

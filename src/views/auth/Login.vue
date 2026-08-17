<template>
    <div class="">
        <div class="container full-height p-4 fl-y-cc text-black-50">
            <div class="card py-4 p-3">
                <transition name="fade" mode="out-in">
                    <s-form key="'login" role="form" @submit="loginClicked" class="contact-form">
                        <div class="fl-x fl-j-c">
                            <img src="../../assets/web/logo/logo.svg" class="auth-logo img-fluid mb-4 my-1 px-5" alt="">
                        </div>
                        <div class="text-center mt-lg-3">
                            <h3 class="text-center text-secondary fs-lg-2 font-poppins-semibold">Login</h3>
                        </div>
                        <validated-input v-model="model.username" type="email" class="mx-4 mt-lg-4 b-primary" placeholder="Email"/>
                        <validated-input v-model="model.password" type="password" placeholder="Password" class="mx-4 mb-3 b-primary"/>
                        <div class="bg-danger p-3 mx-4 round-1" style="text-align: center;" v-if="errorMessage"
                             v-html="errorMessage"></div>
                        <p class="text-secondary text-center font-poppins-regular cursor-pointer" @click="$router.push('/reset-password/')">Forgot Password?</p>

                        <div class="mt-4 text-center fl-x fl-j-c px-4">
                            <btn color="secondary" type="submit" size="md" :loading="loading" class="px-4 font-poppins-regular"
                                 loading-text="Validating Credential.."
                                 text="Login"/>
                        </div>
                    </s-form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    props: {
        info_message: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            loading: false,
            loginUrl: urls.auth.login,
            errorMessage: '',
            model: {
                username: '',
                password: ''
            },
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                }
            }
        };
    },
    methods: {
        ...mapActions(['setUser']),
        async loginClicked () {
            const that = this;
            that.loading = true;
            const response = await axios.form(urls.auth.login, that.model);
            const json = response.data;
            console.log('data', json);
            if (json.user) {
                const redirectUrl = sessionStorage.getItem('redirectPath');
                that.setUser(json.user);
                if (json.user.password_flag === false && !json.user.admin) {
                    await that.$router.push(redirectUrl || { path: '/set-new-password/' });
                } else {
                    await that.$router.push(redirectUrl || { path: '/' }).then(() => {
                        window.location.reload(true);
                    });
                }
                that.loading = false;
            } else {
                if (json.errors && json.errors.__all__) {
                    that.errorMessage = json.errors.__all__;
                } else {
                    that.errorMessage = 'Invalid Credentials';
                }
                that.loading = false;
            }
            that.loading = false;
            localStorage.clear();
        }
    }
};
</script>

<style scoped>
.auth-logo {
    height: 6rem;
}

.logo-img {
    width: 16.75rem;
}
</style>

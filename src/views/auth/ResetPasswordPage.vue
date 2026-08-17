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
                            <h3 class="text-center text-secondary fs-lg-2 font-poppins-semibold">Reset your password</h3>
                            <p class="fs-lg-0 mt-4">
                                Enter your email address and we will send you instructions to reset your password.
                            </p>
                        </div>
                        <validated-input v-model="model.email" type="email" class="mx-4 mt-lg-4 b-primary" placeholder="Email"/>
                        <div class="bg-danger p-3 mx-4 round-1" style="text-align: center;" v-if="errorMessage"
                             v-html="errorMessage"></div>

                        <div class="text-center fl-x fl-j-c px-4 mt-4">
                            <btn color="secondary" type="submit" size="md" @click="setPassword" :loading="loading" class="px-4 font-poppins-regular"
                                 loading-text="Validating Credential.."
                                 text="Continue"/>
                        </div>
                        <p class="text-secondary text-center font-poppins-regular mt-lg-4 fl-x-cc cursor-pointer" @click="$router.push('/login/')">
                            <img src="../../assets/web/icons/arrow-left.svg" alt="" class="mr-2 icon-sm">
                            <span>Back to Login</span></p>
                    </s-form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'secure-axios';
import urls from '../../data/urls';
import axios from 'secure-axios';
// import { mapActions } from 'vuex';

export default {
    name: 'ResetPasswordPage',
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
                email: '',
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
        async setPassword () {
            console.log('-------------------inside-------------');
            try {
                this.loading = true;
                const response = await axios.form(urls.auth.ForgotPasswordMailSend, this.model);
                const result = response.data;
                if (result.success) {
                    const redirectUrl = sessionStorage.getItem('redirectPath');
                    console.log('---------inside success-------');
                    this.$notify('Please check your inbox for the new password', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/login/' });
                    setTimeout(() => {
                        this.$router.push(redirectUrl || { path: '/login/' }).then(() => {
                            window.location.reload(true);
                        });
                    }, 5000);
                } else {
                    if (result.message) {
                        this.$notify(result.message, 'Warning', { type: 'warning' });
                    } else {
                        const errors = response.data.errors;

                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                let errorMessage = '';
                                if (key === '__all__') {
                                    errorMessage = `${errors[key]}`;
                                } else {
                                    errorMessage = `${key}:  ${errors[key]}`;
                                }
                                this.$notify(errorMessage, 'Warning', { type: 'warning' });
                            }
                        }
                    }
                    this.loading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.loading = false;
            }
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

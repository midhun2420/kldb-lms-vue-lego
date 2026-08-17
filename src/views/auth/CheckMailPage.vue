<template>
    <div class="">
        <div class="container full-height p-4 fl-y-cc text-black-50">
            <div class="card py-3 p-3 fl-x-cc">
                <transition name="fade" mode="out-in">
                    <s-form key="'login" role="form" @submit="loginClicked" class="contact-form">
                        <div class="fl-x fl-j-c">
                            <img src="../../assets/web/logo/logo.svg" class="auth-logo img-fluid mb-4 my-1 px-5" alt="">
                        </div>
                        <div class="text-center mt-2">
                            <h3 class="text-center text-secondary fs-lg-2 font-poppins-semibold">Check your Email</h3>
                            <div class="fl-x-cc mt-lg-3">
                                <div class="mail-icon-contain icon-md fl-x-cc">
                                    <img src="../../assets/web/icons/icon-mail.svg" class="h-2re" alt="">
                                </div>
                            </div>
                            <p class="fs-lg-0 mt-3 px-5">
                                Please check the email address youremail@email.com for instructions to reset your password.
                            </p>
                        </div>

                        <div class="text-center fl-x fl-j-c px-4 mt-lg-4">
                            <btn color="secondary" type="submit" size="md" :loading="loading" class="px-4 font-poppins-regular"
                                 loading-text="Validating Credential.."
                                 text="Resend Email"/>
                        </div>
                        <p class="text-secondary text-center font-poppins-regular mt-lg-4 fl-x-cc cursor-pointer" @click="$router.push('/reset-password/')">
                            <img src="../../assets/web/icons/arrow-left.svg" alt="" class="mr-2 icon-sm">
                            <span>Back</span></p>
                    </s-form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'secure-axios';
import urls from '../../data/urls';
// import { mapActions } from 'vuex';

export default {
    name: 'CheckMailPage',
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
    methods: {}
};
</script>

<style scoped>
    .auth-logo {
        height: 6rem;
    }

    .logo-img {
        width: 16.75rem;
    }

    .mail-icon-contain {
        background: url("../../assets/web/icons/icon-ellipse.svg");
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>

<template>
    <div class="">
        <div class="container p-4 fl-y-cc text-black-50">
            <div class="card py-4 p-3">
                <transition name="fade" mode="out-in">
                    <s-form key="'login" role="form" @submit="setPassword" class="contact-form">
<!--                        <div class="fl-x fl-j-c">-->
<!--                            <img src="../../assets/web/logo/logo.svg" class="auth-logo img-fluid mb-3 my-1 px-5" alt="">-->
<!--                        </div>-->
                        <div class="text-center mt-lg-3">
                            <h3 class="text-center text-secondary fs-lg-2 font-poppins-semibold">Reset your password</h3>
                            <p class="fs-lg-0 mt-3">
                                Enter a new password
                            </p>
                        </div>
                        <validated-input :rules="{required:true}" v-model="model.old_password" type="password" class="mx-4 mt-lg-4 b-primary" placeholder="Old Password"/>
                        <validated-input :rules="{required:true}" v-model="model.new_password" type="password" class="mx-4 mt-lg-4 b-primary" placeholder="New Password"/>
                        <validated-input :rules="{required:true}" v-model="model.confirm_password" type="password" placeholder="Re-enter New Password" class="mx-4 mb-3 b-primary"/>
                        <div class="bg-danger p-3 mx-4 round-1" style="text-align: center;" v-if="errorMessage"
                             v-html="errorMessage"></div>
                        <div class="mt-4 text-center fl-x fl-j-c px-4">
                            <btn color="secondary" type="submit" size="md" :loading="loading" class="px-4 font-poppins-regular"
                                 loading-text="Validating Credential.."
                                 text="Reset Password"/>
                            <btn  color="danger" type="reset" size="md" class="px-4 ml-1 font-poppins-regular"
                                  @click="$emit('cancel')"
                                 text="Cancel"/>
                        </div>
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
    name: 'changePasswordPage',
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
                old_password: '',
                new_password: '',
                confirm_password: ''
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
            try {
                this.loading = true;
                const response = await axios.form(urls.auth.passwordChange, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Password Changed Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    setTimeout(() => {
                        this.$router.push({ path: '/login/' }).then(() => {
                            window.location.reload(true);
                        });
                    }, 2000);
                    // await this.$router.push({ path: '/login/' });
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

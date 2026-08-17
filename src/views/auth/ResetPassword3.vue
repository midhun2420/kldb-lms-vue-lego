<template>
    <div>
        <s-form @submit="addItem">
        <div class="card w-30r">
            <div class="logo text-center">
                <img src="../../assets/web/logo/logo.svg" alt="" class="logo-img">
            </div>
            <!--            <h6 class="text-center">(A Govt of Kerala Undertaking)</h6>-->
            <h6 class="text-primary text-center font-poppins-semibold fs-lg-2 mt-4">Reset Your Password</h6>
            <p class="text-center mt-3">Enter a new password.</p>
            <div class="mt-4">
                <validated-input placeholder="New Password" class="ml-4 w-25r" type="password" v-model="model.new_password"></validated-input>
                <validated-input placeholder="Re-enter New Password" type="password" class="ml-4 w-25r" v-model="model.confirm_password"></validated-input>
            </div>
            <div class="text-center">
                <btn text="Reset Password" :loading="loading" loading-text="Reseting..." class="mt-4 px-4"></btn>
            </div>
        </div>
            </s-form>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'ResetPassword3',
    data () {
        return {
            loading: false,
            URL: urls.auth.passwordChange,
            model: {
                new_password: '',
                confirm_password: ''
            }
        };
    },
    methods: {
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$router.push({ path: '/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                    this.loading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    /* error.response.status + ' ' + error.response.statusText, */
                    { type: 'danger' }
                );
                this.loading = false;
            }
        }
    }

};
</script>

<style scoped>

</style>

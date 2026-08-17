<template>
    <div>
        <div class="card w-30r">
            <div class="logo text-center">
                <img src="../../assets/web/logo/logo.svg" alt="" class="logo-img">
            </div>
            <!--            <h6 class="text-center">(A Govt of Kerala Undertaking)</h6>-->
            <h6 class="text-primary text-center font-poppins-semibold fs-lg-2 mt-4">Reset Your Password</h6>
            <p class="text-center mt-4">Enter your email address and we will send you instructions to rest your password.</p>
            <div class="mt-4">
                <validated-input placeholder="Email" class="ml-4 w-25r b-primary"></validated-input>
            </div>
            <div class="text-center">
                <btn text="Continue" class="mt-4 px-4"></btn>
            </div>
            <div class="text-center fs-lg-0 mt-4">
                <img src="../../assets/web/icons/arrow-left.svg">
                <a href="../Login.vue" class="text-primary ml-1">Back to Login</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResetPassword1'
};
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>

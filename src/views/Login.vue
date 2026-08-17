<template>
    <div>
        <div class="card w-30r">
            <div class="logo text-center">
                <img src="../assets/web/logo/logo.svg" alt="" class="logo-img">
            </div>
<!--            <h6 class="text-center">(A Govt of Kerala Undertaking)</h6>-->
            <h6 class="text-primary text-center font-poppins-semibold fs-lg-2 mt-4">Login</h6>
            <div class="mt-4">
                <validated-input placeholder="Email" class="ml-4 w-25r"></validated-input>
            </div>
            <div class="mt-4">
                <validated-input placeholder="Password" class="ml-4 w-25r"></validated-input>
            </div>
            <div class="text-center">
                <a href="Login.vue" class="text-primary font-poppins-medium fs-lg-0">Forgot Password?</a>
            </div>
            <div class="text-center">
            <btn text="Login" class="mt-4 px-4"></btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login'
};
</script>

<style scoped>
    card {
        height: 30rem;
    }
    a{
        text-decoration: none;
    }
</style>

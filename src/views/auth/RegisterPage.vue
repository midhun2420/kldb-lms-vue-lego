<template>
    <div>
        <div class="card w-50r">
            <div class="logo text-center">
                <img src="../../assets/web/logo/logo.svg" alt="" class="logo-img">
            </div>
            <h6 class="text-primary text-center font-poppins-semibold fs-lg-2 mt-4">Create Account</h6>
            <div class="col-12 fl-x mt-5">
                <validated-input class="ml-4 w-15r" placeholder="First Name"></validated-input>
                <validated-input class="pl-4 w-15r" placeholder="Last Name"></validated-input>
                <validated-vue-select class="pl-4 w-15r c-input-select" placeholder="Gender"></validated-vue-select>
            </div>
            <div class="col-12 fl-x">
                <validated-input class="ml-4 w-15r" placeholder="Age"></validated-input>
                <validated-input class="pl-4 w-15r" placeholder="Mobile Number"></validated-input>
                <validated-input class="pl-4 w-15r" placeholder="Email"></validated-input>
            </div>
            <div class="col-12 fl-x mt-4">
                <validated-vue-select class="pl-4 w-35p c-input-select" placeholder="Designation"></validated-vue-select>
                <validated-vue-select class="pl-4 w-15r c-input-select" placeholder="Section"></validated-vue-select>
                <validated-vue-select class="pl-4 w-15r c-input-select" placeholder="Office"></validated-vue-select>
            </div>
            <div class="col-10 fl-x">
                <validated-input class="ml-4 w-15r" placeholder="Password"></validated-input>
                <validated-input class="pl-4 w-15r" placeholder="Confirm Password"></validated-input>
            </div>
            <div class="text-center">
                <btn text="Register" class="mt-4 px-4"></btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage'
};
</script>

<style scoped>
    card {
        height: 30rem;
    }

    a {
        text-decoration: none;
    }
</style>

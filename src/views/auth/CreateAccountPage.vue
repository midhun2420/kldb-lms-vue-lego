<template>
    <div>
        <div class="container py-5 px-lg-9 fl-x-cc">
            <s-form class="row card py-4 px-lg-4 input-border-primary">
                <div class="col-12">
                    <div class="fl-y-cc">
                        <img src="../../assets/web/logo/logo.svg" class="h-7re" alt="">
                        <h4 class="text-secondary font-poppins-semibold fs-lg-2 mt-5">Create Account</h4>
                    </div>
                </div>
                <div class="col-lg-4 mt-lg-5">
                    <validated-input input-classes="py-3" color="primary" placeholder="First Name" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-5">
                    <validated-input input-classes="py-3" placeholder="Last Name" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-5">
                    <validated-select input-classes="py-3" class="c-input-select size-lg b-primary form-min-h" placeholder="Gender"></validated-select>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-input input-classes="py-3" placeholder="Age" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-input input-classes="py-3" placeholder="Mobile Number" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-input input-classes="py-3" type="email" placeholder="Email" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-select input-classes="py-3" class="c-input-select size-lg b-primary form-min-h" placeholder="Designation"></validated-select>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-select input-classes="py-3" class="c-input-select size-lg b-primary form-min-h" placeholder="Section"></validated-select>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-select input-classes="py-3" class="c-input-select size-lg b-primary form-min-h" placeholder="Office"></validated-select>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-input input-classes="py-3" placeholder="Password" type="password" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-4 mt-lg-2">
                    <validated-input input-classes="py-3" placeholder="Confirm Password" type="password" class="b-primary form-min-h"></validated-input>
                </div>
                <div class="col-lg-12 text-center mt-lg-2">
                    <btn color="secondary" text="Register" class="px-5"></btn>
                </div>
            </s-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateAccountPage'
};
</script>

<style scoped>

</style>

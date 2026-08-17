<template>
    <div class="main">
        <div class="card w-30r">
            <div class="logo text-center">
                <img src="../../assets/web/logo/logo.svg" alt="" class="logo-img">
            </div>
            <h6 class="text-primary text-center font-poppins-semibold fs-lg-2 mt-4">Check Your Email</h6>
            <div class="fl-x">
                <div class="ellipse1 mt-1">
                    <img src="../../assets/web/icons/icon-ellipse.svg" alt="">
                </div>
                <div class="mt-4 ml-7">
                    <img src="../../assets/web/icons/icon-mail.svg" alt="">
                </div>
            </div>
            <p class="text-center">Please check the email address <br>youremail@email.com for instructions to <br>reset your password.</p>
            <div class="mt-4">
                <validated-input placeholder="Email" class="ml-4 w-25r"></validated-input>
            </div>
            <div class="text-center">
                <btn text="Resend Email" class="mt-4 px-4"></btn>
            </div>
            <div class="text-center fs-lg-0 mt-4">
                <img src="../../assets/web/icons/arrow-left.svg">
                <a href="../Login.vue" class="text-primary">Back to Login</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResetPassword2'
};
</script>

<style scoped>
    card {
        height: 30rem;
    }

    a {
        text-decoration: none;
    }

    .fl-x .ellipse1 {
        position: relative;
        left: 175px;
    }
</style>

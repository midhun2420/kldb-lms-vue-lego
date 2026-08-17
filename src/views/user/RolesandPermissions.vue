<template>
    <div>
        <h2 class="text-primary mb-4 font-poppins-semibold">ROLES & PERMISSIONS</h2>
        <div class="col-lg-2">
            <validated-vue-select class="c-input-select text-black" placeholder="select" label="Role"></validated-vue-select>
        </div>
        <div class="fl-x ml-9">
            <p class="text-primary font-poppins-semibold">View</p>
            <p class="ml-5 text-primary font-poppins-semibold">Create</p>
            <p class="ml-5 text-primary font-poppins-semibold">Update</p>
            <p class="ml-5 text-primary font-poppins-semibold">Delete</p>
        </div>
        <div class="row col-lg-12">
            <div class="col-lg-1 ml-4">
                <p class="text-primary font-poppins-semibold mt-4">Bulls</p>
                <p class="text-primary font-poppins-semibold mt-4">Cow</p>
                <p class="text-primary font-poppins-semibold mt-4">QC</p>
                <p class="text-primary font-poppins-semibold mt-5">ET</p>
                <p class="text-primary font-poppins-semibold mt-4">Fodder</p>
                <p class="text-primary font-poppins-semibold mt-4">Users</p>
                <p class="text-primary font-poppins-semibold mt-4">Station</p>
            </div>
            <div class="col-lg-1 ml-5 mt-3">
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
            </div>
            <div class="col-lg-1 mt-3">
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
            </div>
            <div class="col-lg-1 mt-3">
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
            </div>
            <div class="col-lg-1 mt-3">
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
                <validated-checkbox></validated-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RolesandPermissions'
};
</script>

<style scoped>

</style>

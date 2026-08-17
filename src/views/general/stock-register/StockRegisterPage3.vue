<template>
 <div>
        <div class="color-txt">

            <div class="col-lg-12">
                            <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Stock Register</h3>

                <div class="row">
                    <div class="col-lg-2">
                        <validated-date-picker class="c-input-datepicker " label="Date"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2">
                        <validated-select class="c-input-select " label="File No"></validated-select>
                    </div>
                </div>
                <div class="row">
                    <div class=" col-lg-2">
                        <validated-select class="c-input-select " label="Submitted To"></validated-select>
                    </div>

                </div>
                <div class="row">

                    <div class=" col-lg-2">
                        <validated-input class=" " label="Item Name"></validated-input>
                    </div>
                    <div class=" col-lg-2">
                        <validated-input class=" " label="Quantity"></validated-input>
                    </div>
                    <div class=" col-lg-2">
                        <validated-input class=" " label="Rate / Item"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-input class=" " label="Amount"></validated-input>
                    </div>
                    <div class="mt-4">
                        <btn text="add" class="px-4 "></btn>
                    </div>
                    <div class="col-lg-6  fl-x-br  ">
                    </div>
                    <div class="col-lg-2">
                        <validated-input label="Total Amount"></validated-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-2">
                        <validated-input class="" label="Purchase Form"></validated-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2 ">
                        <validated-input class=" " label="Invoice No"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-date-picker class="c-input-datepicker " label="Date"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2">
                        <validated-select class="c-input-select  mb-0" label="Register Type"></validated-select>
                    </div>
                </div>
                <div class="row">
                    <div class="mt-2 col-lg-2">
                        <validated-input class=" " label="Page No"></validated-input>
                    </div>
                </div>
                <div class="row  mt-4">
                    <validated-file-input label-text="Upload Photo" class="w-10r"></validated-file-input>
                    <div class="ml-3"><btn text="Create Certified Bill" class=" py-3"></btn>
</div>
                </div>
            </div>
            <div class="fl-x-br mt-6">
                <btn text="Save" class="mr-2 px-4"></btn>
                <btn text="Cancel" design="basic-b" class="ml-3"></btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StockRegisterPage3'
};
</script>

<style scoped>

</style>

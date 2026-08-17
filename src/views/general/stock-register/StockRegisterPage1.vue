<template>
    <div>
        <s-form>
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
                <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                   </div>
            </div>
        </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'StockRegisterPage1',
    data () {
        return {
            loading: false,
            URL: urls.stock_register.addEdit,
            model: {
                observation_date: '',
                section: '',
                type: '',
                animal_no: '',
                shed_no: '',
                detailed_info: ''
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$router.push({ path: '/general/' });
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

</style>

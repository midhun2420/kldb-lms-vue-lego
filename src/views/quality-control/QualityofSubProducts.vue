<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb ml-1">
                <h3 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Quality of Sub Products</h3>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>
        <div class="row col-lg-2 mt-4">
            <validated-date-picker format="DD-MM-YYYY" label="Date" :disabled-date="disabledAfterToday" class="c-input-datepicker text-black  field-required" v-model="model.date" :rules="rules.common"></validated-date-picker>
        </div>
          <p class="text-primary font-poppins-medium mt-2">Diluter</p>
        <div class="col-lg-5 fl-x pl-0">
            <validated-input label="Microbial Load" name="Diluter Microbial Load" class="text-black  field-required" v-model="model.diluter_microbial_load" :rules="{required:true}"></validated-input>
             <validated-input label="Remarks" name="Diluter Remarks" class="text-black ml-3" v-model="model.diluter_remarks"></validated-input>
        </div>
            <p class="text-primary font-poppins-medium mt-2">Buffer</p>
             <div class="col-lg-5 fl-x pl-0">
            <validated-input label="Microbial Load" name="Buffer Microbial Load" class="text-black   field-required" v-model="model.buffer_microbial_load" :rules="{required:true}"></validated-input>
             <validated-input label="Remarks" name="Buffer Remarks" class="text-black ml-3 " v-model="model.buffer_remarks"></validated-input>
        </div>
        <div class="column fl-x-br pt-7">
            <div class="btn-group">
            <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
            </div>
        </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
export default {
    name: 'QualityofSubProducts',
    data () {
        return {
            loading: false,
            URL: urls.subproducts_quality.addEdit,
            formKey: 0,
            model: {
                date: '',
                diluter_microbial_load: '',
                diluter_remarks: '',
                buffer_microbial_load: '',
                buffer_remarks: ''
            },
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                }
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/quality-control/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        validationDate () {
            const checkDate = this.model.date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Test Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (checkDateObj > currentDate) {
                return 'Future Date not allowed.';
            }
            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        date: '',
                        diluter_microbial_load: '',
                        diluter_remarks: '',
                        buffer_microbial_load: '',
                        buffer_remarks: ''
                    };
                    this.formKey++;
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

</style>

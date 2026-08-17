<template>
    <div>
         <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Microbial Load Testing of AV Wash</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="row mt-4">
                    <div class="col-lg-2">
                        <validated-date-picker format="DD-MM-YYYY" label="Date of the test" :disabled-date="disabledAfterToday"
                                               class="c-input-datepicker text-black  field-required" v-model="model.test_date" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-2">
                        <validated-vue-select :options="avTypeOptions" label="AV Type"
                                              class="c-input-select text-black  field-required" v-model="model.av_type" :rules="{required:true}"></validated-vue-select>
                    </div>
                </div>
                <div class="row mt-2">
<!--                    <div class="col-lg-2">-->
<!--                        <p class="bb-dashed text-black mt-4">AV 8-inch</p>-->
<!--                    </div>-->
                   <div class="col-lg-2">
                        <validated-input label="No of CFU" class=" text-black field-required" v-model="model.cfu_no" :rules="rules.positiveOnly" type="number"></validated-input>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-lg-2">
                        <validated-input label="Remarks" class=" text-black" v-model="model.remarks"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
            </div>
        </div>
        <div class="row mt-lg-5">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                    <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                    <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
         </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
export default {
    name: 'MicrobialTestingofAvWash',
    data () {
        return {
            loading: false,
            URL: urls.wash_test.addEdit,
            formKey: 0,
            model: {
                test_date: '',
                av_type: '',
                cfu_no: '',
                remarks: ''
            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                }
            },
            avTypeOptions: [
                {
                    value: 'Small',
                    label: 'Small'
                },
                {
                    value: 'Medium',
                    label: 'Medium'
                },
                {
                    value: 'Large',
                    label: 'Large'
                }
            ]
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
            const checkDate = this.model.test_date;

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
        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
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
                        test_date: '',
                        av_type: '',
                        cfu_no: '',
                        remarks: ''
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
.bb-dashed{
  width:42%;
  /*height:300px;*/
  /*background-color:#FFFFFF;*/
  border-bottom:2px solid darkgray;
  border-bottom-style: dashed;
}
</style>

<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Mating Program</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Mating Program</h2>-->
        <div class="row">
            <div class="col-lg-6">
                <div class="row mt-4">
                    <div class="col-lg-4">
                        <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" label="Allocation Date" v-model="model.mating_date" class="c-input-datepicker text-black field-required"></validated-date-picker>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-lg-4">
<!--                        <validated-vue-select label="Shed No." class="c-input-select text-black"></validated-vue-select>-->
                        <validated-ajax-vue-select class="c-input-select input-border-primary field-required" placeholder="Shed"
                                               v-model="shed_number" @input="loadCowOptions" label="Shed"
                                               :url="shedOptions" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-4">
                    <validated-vue-select :options="cowOptions" class="c-input-select field-required"
                                          label="Reg No" v-model="model.cow" :rules="{required:true}"></validated-vue-select>
                </div>

<!--                    <div class="col-lg-3">-->
<!--                        <validated-vue-select label="Reg No." class="c-input-select text-black"></validated-vue-select>-->
<!--                    </div>-->
                </div>
                <div class="row mt-2">
                    <div class="col-lg-4">
                        <validated-ajax-vue-select :url="bullOptions" @input="loadDetails"  label="Bull Allotted" v-model="model.bull_allotted" class="c-input-select text-black field-required" :rules="{ required: !model.outside_bull }" :disabled="!!model.outside_bull|| !!model.outside_bull_breed"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-4">
                        <validated-input label="Bull Breed" v-model="model.breed" class=" text-black" disabled></validated-input>
                    </div>
                </div>
                <div class="row mt-2">
                     <div class="col-lg-4">
                        <validated-input label="Outside Bull Allotted" v-model="model.outside_bull" class="text-black field-required" :disabled="!!model.bull_allotted" :rules="{ required: !model.bull_allotted }"></validated-input>
                    </div>
                    <div class="col-lg-4">
                        <validated-ajax-vue-select :url="breedOptionsURL" label="Outside Bull Breed" v-model="model.outside_bull_breed" class="c-input-select text-black" :disabled="!!model.bull_allotted" :rules="{ required: !model.bull_allotted }"></validated-ajax-vue-select>
                    </div>
                </div>
                 <div class="row mt-2">
                    <div class="col-lg-4">
                        <validated-date-picker format="DD-MM-YYYY" label="Valid From" v-model="model.valid_from" class="c-input-datepicker text-black field-required" :rules="rules.ValidationDateFrom"></validated-date-picker>
                    </div>
                    <div class="col-lg-4">
                        <validated-date-picker format="DD-MM-YYYY" label="Valid To" v-model="model.valid_to" class="c-input-datepicker text-black field-required" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-lg-4">
                        <validated-input label="Remarks" v-model="model.remarks" class=""></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
    <custom-four-column-table heading1="Cow" heading2="Bull Allotted" heading3="Valid From" heading4="Valid To">
        <template #column1>
            <ul class="list-unstyled list-items">
                <li v-for="(item, i) in model.details" :key="i">{{ item.value }}</li>
            </ul>
        </template>
        <template #column2>
            <ul class="list-unstyled list-items">
                <li v-for="(item, i) in model.details" :key="i">{{ item.label }}</li>
            </ul>
        </template>
        <template #column3>
            <ul class="list-unstyled list-items">
                <li v-for="(item, i) in model.details" :key="i">{{ item.valid_from }}</li>
            </ul>
        </template>
        <template #column4>
            <ul class="list-unstyled list-items">
                <li v-for="(item, i) in model.details" :key="i">{{ item.valid_to }}</li>
            </ul>
        </template>
    </custom-four-column-table>
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
// import CustomTwoColumnTable from '../../../components/ui/CustomTwoColumnTable';
import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';
import CustomFourColumnTable from '../../../components/ui/CustomFourColumTable';

export default {
    name: 'MatingProgram',
    components: { CustomFourColumnTable },
    data () {
        return {
            shed_number: '',
            loading: false,
            URL: urls.mating_program.addEdit,
            model: {
                cow: '',
                bull_allotted: '',
                breed: '',
                valid_from: '',
                valid_to: '',
                remarks: '',
                mating_date: '',
                outside_bull: '',
                outside_bull_breed: '',
                details: []
            },
            rules: {
                ValidationDateFrom: {
                    required: true,
                    customValidator: (value) => {
                        return this.FromValidation(value);
                    }
                },
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }
            },

            shedOptions: masterURLs.master.shed.vueSelect + '?animal=cow',
            bullOptions: urls.mating_program.bullVueSelect,
            breedOptionsURL: masterURLs.master.breed.vueSelect,
            cowOptions: []
        };
    },
    watch: {
        'model.valid_from' () {
            // reset & revalidate valid_to
            this.model.valid_to = '';
        },
        'model.mating_date' () {
            this.shed_number = '';
            this.model.cow = '';
            this.model.bull_allotted = '';
            this.model.outside_bull = '';
            this.model.breed = '';
            this.model.outside_bull_breed = '';
            this.model.valid_from = '';
            this.model.valid_to = '';
            this.model.remarks = '';
            this.model.details = [];
            this.cowOptions = [];
        }
    },
    methods: {
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        parseDate (dateStr) {
            if (!dateStr) return null;
            const [day, month, year] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day);
        },
        Validation (date) {
            if (!date) {
                return 'Please enter Valid To date.';
            }

            if (!this.model.valid_from) {
                return 'Please select Valid From date first.';
            }

            if (!this.model.mating_date) {
                return 'Please select Allocation Date first.';
            }

            const toDate = this.parseDate(date);
            const fromDate = this.parseDate(this.model.valid_from);
            const matingDate = this.parseDate(this.model.mating_date);

            if (toDate < matingDate) {
                return 'Valid To date should after Allocation Date.';
            }

            if (toDate <= fromDate) {
                return 'Valid To date should be after Valid From date.';
            }

            return true;
        },
        // Validation (date) {
        //     const fromDate = this.model.valid_from;
        //     if (!date) {
        //         return 'Please enter a Valid To date.';
        //     }
        //     const dateParts = date.split('-');
        //     if (dateParts.length !== 3) {
        //         return 'Please enter a valid AI date in the format DD-MM-YYYY.';
        //     }
        //     const aiDay = parseInt(dateParts[0], 10);
        //     const aiMonth = parseInt(dateParts[1], 10);
        //     const aiYear = parseInt(dateParts[2], 10);
        //
        //     const fromDateParts = fromDate.split('-');
        //     // if (fromDateParts.length !== 3) {
        //     //     return 'Please enter a valid Date.';
        //     // }
        //     const fromDateDay = parseInt(fromDateParts[0], 10);
        //     const fromDateMonth = parseInt(fromDateParts[1], 10);
        //     const fromDateYear = parseInt(fromDateParts[2], 10);
        //
        //     // if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(fromDateDay) || isNaN(fromDateMonth) || isNaN(fromDateYear)) {
        //     //     return 'Please enter valid dates in the format DD-MM-YYYY.';
        //     // }
        //
        //     const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
        //     const dobDateObj = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);
        //
        //     if (dateObj <= dobDateObj) {
        //         return 'Date should be after the From Date';
        //     }
        //
        //     return true;
        // },
        FromValidation (date) {
            if (!date) {
                return 'Please enter Valid From date.';
            }

            if (!this.model.mating_date) {
                return 'Please select Allocation Date first.';
            }

            const fromParts = date.split('-');
            const matingParts = this.model.mating_date.split('-');

            if (fromParts.length !== 3 || matingParts.length !== 3) {
                return 'Please enter date in DD-MM-YYYY format.';
            }

            const fromDate = new Date(
                parseInt(fromParts[2]),
                parseInt(fromParts[1]) - 1,
                parseInt(fromParts[0])
            );

            const matingDate = new Date(
                parseInt(matingParts[2]),
                parseInt(matingParts[1]) - 1,
                parseInt(matingParts[0])
            );

            if (fromDate < matingDate) {
                return 'Valid From date cannot be before Allocation Date.';
            }

            return true;
        },
        // FromValidation (date) {
        //     /*  const dob = this.model.dob; */
        //     const dateParts = date.split('-');
        //     if (dateParts.length !== 3) {
        //         return 'Please enter a valid AI date in the format DD-MM-YYYY.';
        //     }
        // const aiDay = parseInt(dateParts[0], 10);
        // const aiMonth = parseInt(dateParts[1], 10);
        // const aiYear = parseInt(dateParts[2], 10);

        /* const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);
*/
        /* if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            } */

        // const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
        /* const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay); */

        /* if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            } */
        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        // if (dateObj < currentDate) {
        //     return 'Choose Date from today onwords.';
        // }

        //     return true;
        // },

        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        async loadCowOptions () {
            this.model.cow = '';
            this.model.bull_allotted = '';
            this.model.outside_bull = '';
            this.model.breed = '';
            this.model.outside_bull_breed = '';
            this.model.valid_from = '';
            this.model.valid_to = '';
            this.model.remarks = '';
            const params = {
                shed_number: this.shed_number,
                allocation_date: this.model.mating_date
            };
            const response = await axios.get(urls.mating_program.allOptions, { params });
            this.cowOptions = response.data.cow.data;
            this.model.details = response.data.details;
        },
        async loadDetails () {
            const response = await axios.get(urls.bulls.details + '?id=' + this.model.bull_allotted);
            const data = response.data.data;
            this.model.breed = data.breed.breed_name;
            // this.model.age = data.age;
            // this.details.renumber = data.renumber;
            // this.details.breed = data.breed.breed_name;
            // this.details.dob = data.dob;
            // this.details.shed_number = data.shed_number.name;
            // this.details.animalno_or_name = data.animalno_or_name;
        },
        watch: {
            'model.bull_allotted' (newVal) {
                if (newVal) {
                    this.model.outside_bull = '';
                    this.model.outside_bull_breed = '';
                }
            },
            'model.outside_bull' (newVal) {
                if (newVal) {
                    this.model.bull_allotted = '';
                    this.model.breed = '';
                }
            }
        },
        ClearAllData () {
            this.model.cow = '';
            this.model.bull_allotted = '';
            this.model.breed = '';
            this.model.valid_from = '';
            this.model.valid_to = '';
            this.model.remarks = '';
            this.model.mating_date = '';
            this.model.outside_bull = '';
            this.model.outside_bull_breed = '';
            this.shed_number = '';
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.ClearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/ah-section/' });
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

</style>;

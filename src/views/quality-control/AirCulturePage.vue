<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
        <div>
            <div class="row fl-x fl-j-sb ml-1">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Air Culture</h2>
                <div>
                    <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="row mt-3">
                    <div class="col-lg-2">
                        <validated-date-picker label="Date of the test" :disabled-date="disabledAfterToday"
                                               class="c-input-datepicker text-black field-required" v-model="model.test_date" format="DD-MM-YYYY" :rules="rules.common"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3"  v-for="(locations, index) in model.locations" :key="index">
                    <div class="col-lg-2">
                        <validated-ajax-vue-select label="Location " :url="locationUrl"
                                              class="c-input-select text-black field-required" v-model="locations.location" :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                    <div class="col-lg-2">
                        <validated-input label="Before Fumigation"
                                              class=" text-black" v-model="locations.before_fumigation"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <validated-input label="After Fumigation"
                                              class=" text-black" v-model="locations.after_fumigation"></validated-input>
                    </div>
                    <div class="col-lg-2">
                        <btn text="add" v-if="index === model.locations.length - 1"
                         @click="addLocationItem(index, locations.location, locations.before_fumigation, locations.after_fumigation)" class="px-4 mt-4 ml-4" type="button"></btn>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-2">
                        <validated-input label="Remarks" class="text-black" v-model="model.remarks"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
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
// import masterURLs from '../../data/masterURLs';

export default {
    name: 'AirCulturePage',
    data () {
        return {
            loading: false,
            locationUrl: urls.air_culture.locations,
            URL: urls.air_culture.addEdit,
            formKey: 0,
            model: {

                test_date: '',

                remarks: '',
                locations: [
                    {
                        location: '',
                        before_fumigation: '',
                        after_fumigation: ''
                    }
                ]

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
        addLocationItem (index, location, beforefumigation, afterfumigation) {
            const existingItems = this.model.locations.filter(obj => obj.location === location);
            console.log('existingItems.length', existingItems.length);
            if (existingItems.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.model.locations.push({ location: '', before_fumigation: '', after_fumigation: '' });
                this.model.locations[index].location = location;
                this.model.locations[index].before_fumigation = beforefumigation;
                this.model.locations[index].after_fumigation = afterfumigation;
                console.log('Locations', this.model.locations);
            }
        },
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
        async addItem () {
            try {
                this.loading = true;
                const locations = JSON.stringify(this.model.locations);
                const response = await axios.form(this.URL, {
                    test_date: this.model.test_date,
                    remarks: this.model.remarks,
                    locations: locations
                });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/quality-control/' });
                    this.model = {
                        test_date: '',
                        remarks: '',
                        locations: [
                            {
                                location: '',
                                before_fumigation: '',
                                after_fumigation: ''
                            }
                        ]
                    };
                    this.formKey++;
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

<template>
    <div class="">
        <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3  text-primary">Fodder Production</h2>
        <div>
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
        </div>
            <div class="row">
                <div class="col-lg-2 mt-4 ">
                    <!--            col-lg-2 pt-4 column w-15p pr-0-->
                    <!--            <div class="form-group ">-->

                    <validated-date-picker format="DD-MM-YYYY" class="c-input-datepicker text-black field-required"
                                           v-model="model.production_date" label="Date" :disabled-date="disabledAfterToday"
                                           :rules="rules.common"></validated-date-picker>
                    <!--            </div>-->
                </div>
            </div>

            <div class="col-lg-12 pt-4 pl-0">
                <div class="row">
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.rainfall"
                                         label="Rainfall in mm" :rules="rules.positiveOnly"
                                         type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.mean_min_temp"
                                         label="Mean Min.Temp" :rules="rules.positiveOnly"
                                         type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.mean_max_temp"
                                         label="Mean Max.Temp" :rules="rules.positiveOnly"
                                         type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.humidity" label="Humidity in %"
                                         :rules="rules.positiveOnly" type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.sunshine"
                                         label="Sunshine Recorded" :rules="rules.positiveOnly"
                                         type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="model.remarks"
                                     label="Remarks"></validated-input>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <h5 class="text-primary">Crop details</h5>
            </div>
            <div class="col-lg-12 pt-4  pl-0 mt-2">
                <div class="row mt-3" v-for="(crops, index) in model.crops" :key="index">
<!--                    <div class="form-group col-lg-2">-->
<!--                        <validated-vue-select label="Crop" :options="cropOptions" v-model="model.crop_variety"-->
<!--                                              class="c-input-select text-black field-required"-->
<!--                                              :rules="{required:true}"></validated-vue-select>-->
<!--                    </div>-->
                    <div class="form-group col-lg-2">
                        <validated-ajax-vue-select label="Crop" :url="cropOptionsURL" v-model="crops.crop_variety"
                                              class="c-input-select text-black field-required"
                                              :rules="{required:true}"></validated-ajax-vue-select>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input label="Source" v-model="crops.source" class="text-black"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input label="Number" v-model="crops.number" class=" text-black"
                                         :rules="rules.positiveOnly" type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black field-required" v-model="crops.total_area"
                                         :rules="rules.area" label="Total Area" type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black field-required" v-model="crops.area_harvested"
                                         :rules="rules.areaHarvestedarea" label="Area Harvested"
                                         type="number"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                        <validated-input class="pb-0 mb-xl-n4 text-black" v-model="crops.green"
                                         label="Green"></validated-input>
                    </div>
                    <div class="form-group form-group col-lg-2">
                    <validated-input class="pb-0 mb-xl-n4 text-black" v-model="crops.dm" label="DM"></validated-input>
                    </div>
                    <div class="form-group col-lg-2">
                            <btn text="add" v-if="index === model.crops.length - 1"
                             @click="addCropItem(index, crops.crop_variety, crops.source, crops.number, crops.total_area, crops.area_harvested, crops.green, crops.dm)" class="px-4 mt-4 ml-4" type="button"></btn>
                    </div>
                </div>
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
import masterURLs from '@/data/masterURLs';

export default {
    name: 'FodderProduction',
    data () {
        return {
            loading: false,
            URL: urls.fodder_production.addEdit,
            cropOptionsURL: masterURLs.master.crop.vueSelect,
            formKey: 0,
            model: {
                production_date: '',
                rainfall: '',
                mean_min_temp: '',
                mean_max_temp: '',
                humidity: '',
                sunshine: '',
                crops: [
                    {
                        crop_variety: '',
                        source: '',
                        number: '',
                        total_area: '',
                        area_harvested: '',
                        green: '',
                        dm: ''
                    }
                ],
                remarks: ''
            },
            cropOptions: [
                { label: 'Crop', value: 'Crop' },
                { label: 'Variety', value: 'Variety' },
                { label: 'Type', value: 'Type' }
            ],
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationDate(value);
                    }
                },
                positiveOnly: {
                    required: false,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                },
                area: {
                    required: true,
                    customValidator: (crops) => {
                        return this.areaValidation(crops);
                    }
                },
                areaHarvestedarea: {
                    required: true,
                    customValidator: (crops) => {
                        return this.areaValidation(crops);
                    }
                }
            }

        };
    },
    methods: {
        addCropItem (index, cropVariety, source, number, totalArea, areaHarvested, green, dm) {
            const existingItems = this.model.crops.filter(obj => obj.crop_variety === cropVariety);
            console.log('existingItems.length', existingItems.length);
            if (existingItems.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.model.crops.push({ crop_variety: '', source: '', number: '', total_area: '', area_harvested: '', green: '', dm: '' });
                this.model.crops[index].crop_variety = cropVariety;
                this.model.crops[index].source = source;
                this.model.crops[index].number = number;
                this.model.crops[index].total_area = totalArea;
                this.model.crops[index].area_harvested = areaHarvested;
                this.model.crops[index].green = green;
                this.model.crops[index].dm = dm;
                console.log('Crop Variety', this.model.crops);
            }
        },
        BackToHome () {
            this.$router.push({ path: '/fodder/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },

        avoidNegetive (no) {
            const num = no;
            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },
        areaValidation (crop) {
            /* const num = no; */
            // const totalArea = parseInt(this.model.total_area);
            // const harvested = parseInt(this.model.area_harvested);
            const totalArea = Number(crop.total_area);
            const harvested = Number(crop.area_harvested);
            // if (crop.total_area === '' || isNaN(totalArea)) {
            //     return 'Please enter Total area';
            // }
            // if (crop.area_harvested === '' || isNaN(harvested)) {
            //     return 'Please enter Area harvested';
            // }

            if (totalArea < 0 || harvested < 0) {
                return 'Please enter a valid number';
            }
            if (harvested < totalArea) {
                return 'Area harvested  must be less than Total area';
            }

            return true;
        },
        validationDate () {
            const checkDate = this.model.production_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Date in the format DD-MM-YYYY.';
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
                const crops = JSON.stringify(this.model.crops);
                const response = await axios.form(urls.fodder_production.addEdit, {
                    production_date: this.model.production_date,
                    rainfall: this.model.rainfall,
                    mean_min_temp: this.model.mean_min_temp,
                    mean_max_temp: this.model.mean_max_temp,
                    humidity: this.model.humidity,
                    sunshine: this.model.sunshine,
                    crops: crops,
                    remarks: this.model.remarks
                });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/fodder/' });
                    this.model = {
                        production_date: '',
                        rainfall: '',
                        mean_min_temp: '',
                        mean_max_temp: '',
                        humidity: '',
                        sunshine: '',
                        crops: [
                            {
                                crop_variety: '',
                                source: '',
                                number: '',
                                total_area: '',
                                area_harvested: '',
                                green: '',
                                dm: ''
                            }
                        ],
                        remarks: ''
                    };
                    this.formKey++;
                } else {
                    if (response.data.message) {
                        this.$notify(
                            response.data.message,
                            'Warning',
                            { type: 'warning' }
                        );
                    }
                    this.loading = false;
                }
                //
                // else {
                //     const errors = response.data.message;
                //
                //     for (const key in errors) {
                //         if (Object.prototype.hasOwnProperty.call(errors, key)) {
                //             let errorMessage = '';
                //             if (key === '__all__') {
                //                 errorMessage = `${errors[key]}`;
                //             } else {
                //                 errorMessage = `${key}:  ${errors[key]}`;
                //             }
                //             this.$notify(errorMessage, 'Warning', { type: 'warning' });
                //         }
                //     }
                //     this.loading = false;
                // }
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

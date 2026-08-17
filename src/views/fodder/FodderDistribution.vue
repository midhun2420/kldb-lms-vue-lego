<template>
    <div>
        <div class="row fl-x fl-j-sb">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Fodder Distribution</h2>
        <div>
            <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
        </div>
        </div>

       <s-form @submit="addItem" :key="formKey">
        <div class="col-lg-2 mt-4">
            <validated-date-picker format="DD-MM-YYYY" :disabled-date="disabledAfterToday" class="text-black c-input-datepicker field-required" v-model="model.distribution_date" label="Date" :rules="rules.common"></validated-date-picker>
        </div>
        <div class="col-lg-12 ">
            <div class="row" v-for="(crops, index) in model.crops" :key="index">
<!--            <div class="col-lg-2">-->
<!--                <validated-vue-select class="text-black c-input-select " :options="cropOptions" v-model="model.crop_variety" label="Crop" :rules="{required:true}"></validated-vue-select>-->
<!--            </div>-->
             <div class="form-group col-lg-2" >
                        <validated-ajax-vue-select label="Crop" :url="cropOptionsURL" v-model="crops.crop_variety"
                                              class="c-input-select text-black field-required"
                                              :rules="{required:true}"></validated-ajax-vue-select>
             </div>
            <div class="col-lg-2">
                 <validated-ajax-vue-select label="Shed"
                                                   :url="shedOptionsURL" class="c-input-select text-black field-required" :rules="{required:true}"  v-model="crops.shed_no"></validated-ajax-vue-select>

            </div>
            <div class="col-lg-2">
                <validated-input class="text-black " v-model="crops.quantity_supplied" label="Quantity Supplied" :rules="rules.positiveOnly" type="number" ></validated-input>
            </div>
             <div class="col-lg-2">
                <validated-input class="text-black field-required" v-model="crops.dm" label="DM" :rules="{required:true}"></validated-input>
            </div>
            <div class="form-group col-lg-2">
                        <btn text="add" v-if="index === model.crops.length - 1"
                         @click="addCropItem(index, crops.crop_variety, crops.shed_no, crops.quantity_supplied, crops.dm)" class="px-4 mt-4 ml-4" type="button"></btn>
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
import masterURLs from '../../data/masterURLs';

export default {
    name: 'FodderDistribution',
    data () {
        return {
            loading: false,
            URL: urls.fodder_distribution.addEdit,
            formKey: 0,
            model: {
                distribution_date: '',
                crops: [
                    {
                        crop_variety: '',
                        shed_no: '',
                        quantity_supplied: '',
                        dm: ''
                    }
                ]
            },
            cropOptions: [
                { label: 'Crop', value: 'Crop' },
                { label: 'Variety', value: 'Variety' },
                { label: 'Type', value: 'Type' }
            ],
            shedOptionsURL: masterURLs.master.shed.vueSelect,
            cropOptionsURL: masterURLs.master.crop.vueSelect,
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
                }
            }

        };
    },
    methods: {
        addCropItem (index, cropVariety, shedNo, quantitySupplied, dm) {
            const selectedDate = this.model.distribution_date;

            const existingItems = this.model.crops.filter(obj =>
                obj.crop_variety === cropVariety &&
        obj.shed_no === shedNo &&
        selectedDate === this.model.distribution_date
            );

            console.log('existingItems.length', existingItems.length);

            if (existingItems.length > 1) {
                this.$notify(
                    'Duplicate Found: Same crop, shed and date not allowed',
                    'Warning',
                    { type: 'warning' }
                );
            } else {
                this.model.crops.push({
                    crop_variety: '',
                    shed_no: '',
                    quantity_supplied: '',
                    dm: ''
                });

                this.model.crops[index].crop_variety = cropVariety;
                this.model.crops[index].shed_no = shedNo;
                this.model.crops[index].quantity_supplied = quantitySupplied;
                this.model.crops[index].dm = dm;

                console.log('Crop Items', this.model.crops);
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
        validationDate () {
            const checkDate = this.model.distribution_date;

            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
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
                const response = await axios.form(urls.fodder_distribution.addEdit, {
                    distribution_date: this.model.distribution_date,
                    crops: crops
                });
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/fodder/' });
                    this.model = {
                        distribution_date: '',
                        crops: [
                            {
                                crop_variety: '',
                                shed_no: '',
                                quantity_supplied: '',
                                dm: ''
                            }
                        ]
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
                // } else {
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

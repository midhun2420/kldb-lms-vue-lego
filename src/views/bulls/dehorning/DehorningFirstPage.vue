<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Dehorning / Disbudding</h2>
             <div><btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn></div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
                <div class="col-lg-2 mt-lg-5">
                    <validated-ajax-vue-select
                        class="c-input-select input-border-primary field-required"
                        placeholder="Shed"
                        v-model="shed_number"
                        @input="loadBullOptions"
                        label="Shed"
                        :rules="{ required: true }"
                        :url="shedOptions"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <h4 class="text-primary fs-lg-1 font-poppins-medium mb-3">
                        Enter Individually
                    </h4>
                </div>
                <div class="row mt-2 ml-0" v-for="(row, index) in details" :key="index">
                <div class="col-lg-2">
                    <validated-vue-select
                        :options="bullOptions"
                        v-model="row.animal"
                        @input="loadDetails(index)"
                        class="field-required c-input-select"
                        label="Animal No / Name"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input disabled label="Renumber" v-model="row.renumber" />
                </div>

                <div class="col-lg-2">
                    <validated-input disabled label="Shed No" v-model="row.shed_number" />
                </div>

                <div class="col-lg-2">
                    <validated-input disabled label="Breed" v-model="row.breed" />
                </div>

                <div class="col-lg-2">
                    <validated-date-picker
                        disabled
                        format="DD-MM-YYYY"
                        class="c-input-datepicker"
                        label="Date of Birth"
                        v-model="row.dob"
                    />
                </div>

                <div class="col-lg-1">
                    <validated-input disabled label="Age" v-model="row.age" />
                </div>
                <div class="form-group mt-3 col-lg-1">
                    <btn text="Add" v-if="index === details.length - 1"
                         @click="addAnimalRow" class="px-4 mt-2 ml-1" type="button"></btn>
                </div>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="dehorningOptions"
                        :rules="{ required: true }"
                        class="c-input-select field-required"
                        v-model="model.dehorning_type"
                        label="Dehorning Type"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-date-picker
                        format="DD-MM-YYYY"
                        :disabled-date="disabledAfterToday"
                        v-model="model.dehorningdate"
                        class="c-input-datepicker field-required"
                        :rules="rules.DehornDate"
                        label="Dehorning Date"
                    />
                </div>
            </div>

            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                            <btn
                                text="Save"
                                :loading="loading"
                                loading-text="Saving..."
                                class="px-4"
                            />
                            <btn
                                text="Cancel"
                                design="basic-b"
                                type="reset"
                                class="px-4"
                                @click="BackToHome"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import masterURLs from '../../../data/masterURLs';
import urls from '../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'DehorningFirstPage',

    data () {
        return {
            shed_number: '',
            loading: false,
            formKey: 0,
            URL: urls.dehorning.addEdit,
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=bull',
            dehorningOptions: masterURLs.master.dehorningType.vueSelect,
            bullOptions: [],

            details: [{
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                animal: null,
                age: ''
            }],

            model: {
                bulls: [],
                dehorning_type: '',
                dehorningdate: ''
            },

            rules: {
                DehornDate: {
                    required: true,
                    customValidator: (value) => this.DhorningValidation(value)
                }
            }
        };
    },

    watch: {
        shed_number () {
            this.clearAllData();
        }
    },

    methods: {
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        async loadBullOptions () {
            this.dataclear();
            const response = await axios.get(
                urls.dehorning.bullVueSelect + '?shed_number=' + this.shed_number
            );
            this.bullOptions = response.data.data;
        },

        // async loadDetails () {
        //     const selected = this.details.animalno_or_name;
        //
        //     if (!selected.length) {
        //         this.dataclear();
        //         return;
        //     }
        //
        //     // map selected bulls for backend
        //     this.model.bulls = selected.map(b => b.id ?? b);
        //
        //     // preview first bull only
        //     const bullId = this.model.bulls[0];
        //     const response = await axios.form(urls.bulls.details, { id: bullId });
        //     const data = response.data.data;
        //
        //     this.details.age = data.age;
        //     this.details.renumber = data.renumber;
        //     this.details.breed = data.breed.breed_name;
        //     this.details.dob = data.dob;
        //     this.details.shed_number = data.shed_number;
        // },
        async loadDetails (index) {
            const row = this.details[index];
            if (!row.animal) return;

            const bullId = row.animal.id ?? row.animal;
            const response = await axios.form(urls.bulls.details, { id: bullId });
            const data = response.data.data;

            row.renumber = data.renumber;
            row.breed = data.breed.breed_name;
            row.dob = data.dob;
            row.age = data.age;
            row.shed_number = data.shed_number;
        },
        addAnimalRow () {
            this.details.push({
                animal: null,
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                age: ''
            });
        },
        dataclear () {
            this.details = [{
                animal: null,
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                age: ''
            }];

            this.model.bulls = [];
            this.model.dehorning_type = '';
            this.shed_number = '';
            this.model.dehorningdate = '';
            this.bullOptions = [];
        },

        clearAllData () {
            this.dataclear();
            this.$refs.form.reset();
        },
        async addItem () {
            if (this.loading) return;
            try {
                // collect selected bulls
                this.model.bulls = this.details
                    .filter(r => r.animal)
                    .map(r => r.animal.id ?? r.animal);

                if (!this.model.bulls.length) {
                    this.$notify('Please select at least one animal', 'Warning', { type: 'warning' });
                    return;
                }

                this.loading = true;

                const formData = new FormData();

                this.model.bulls.forEach(id => {
                    formData.append('bulls', id); // ✅ KEY FIX
                });

                formData.append('dehorning_type', this.model.dehorning_type);
                formData.append('dehorningdate', this.model.dehorningdate);

                const response = await axios.post(this.URL, formData);
                const result = response.data;

                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });

                    // Clear model and input rows
                    this.dataclear();

                    // Reset form validation/state if form exposes reset()
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }

                    this.formKey++;
                } else {
                    Object.entries(result.errors || {}).forEach(([k, v]) => {
                        this.$notify(`${k}: ${v}`, 'Warning', { type: 'warning' });
                    });
                }
            } catch (e) {
                this.$notify('Something went wrong', 'Error', { type: 'danger' });
            } finally {
                this.loading = false;
            }
        },
        // async addItem () {
        //     try {
        //         // if (!this.model.bulls.length) {
        //         //     this.$notify(
        //         //         'Please select at least one animal',
        //         //         'Warning',
        //         //         { type: 'warning' }
        //         //     );
        //         //     return;
        //         // }
        //
        //         this.loading = true;
        //         const response = await axios.form(this.URL, this.model);
        //         const result = response.data;
        //
        //         if (result.success) {
        //             this.$notify('Added Successfully', 'Success', { type: 'success' });
        //             await this.$router.push({ path: '/semen-station/' });
        //         } else {
        //             const errors = result.errors || {};
        //             Object.keys(errors).forEach(key => {
        //                 this.$notify(
        //                     `${key}: ${errors[key]}`,
        //                     'Warning',
        //                     { type: 'warning' }
        //                 );
        //             });
        //         }
        //     } catch (error) {
        //         this.$notify(
        //             'Something Went Wrong..!!',
        //             error.response?.status + ' ' + error.response?.statusText,
        //             { type: 'danger' }
        //         );
        //     } finally {
        //         this.loading = false;
        //     }
        // },

        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        DhorningValidation (date) {
            // const dob = this.details.dob;
            if (!date) return true;

            const [d, m, y] = date.split('-').map(Number);
            // const [bd, bm, by] = dob.split('-').map(Number);

            const dehornDate = new Date(y, m - 1, d);
            // const birthDate = new Date(by, bm - 1, bd);
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            for (const row of this.details) {
                if (!row.dob) continue;

                const [bd, bm, by] = row.dob.split('-').map(Number);
                const birthDate = new Date(by, bm - 1, bd);

                if (dehornDate <= birthDate) {
                    return `Nose Punching Date must be after DOB (${row.dob})`;
                }
            }

            if (dehornDate > today) {
                return 'Future Date not allowed.';
            }
            return true;
        }
    }
};
</script>

<style scoped>
</style>

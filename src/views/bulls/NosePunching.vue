<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Nose Punching</h2>
             <div><btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn></div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
<!--                <div class="col-12">-->
<!--                    <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">-->
<!--                        Nose Punching-->
<!--                    </h2>-->
<!--                </div>-->

                <div class="col-lg-2 mt-lg-3">
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
                    <h6 class="text-primary font-poppins-medium fs-lg-2 mb-3">
                        Enter Individually
                    </h6>
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
                    <validated-input
                        disabled
                        label="Renumber"
                        class="text-black"
                        v-model="row.renumber"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        disabled
                        label="Shed No"
                        class="text-black"
                        v-model="row.shed_number"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        disabled
                        label="Breed"
                        class="text-black"
                        v-model="row.breed"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-date-picker
                        disabled
                        format="DD-MM-YYYY"
                        label="Date Of Birth"
                        class="text-black c-input-datepicker"
                        v-model="row.dob"
                    />
                </div>

                <div class="col-lg-1">
                    <validated-input
                        disabled
                        label="Age"
                        class="text-black"
                        v-model="row.age"
                    />
                </div>
                 <div class="form-group mt-3 col-lg-1">
                    <btn text="Add" v-if="index === details.length - 1"
                         @click="addAnimalRow" class="px-4 mt-2 ml-1" type="button"></btn>
                </div>
                </div>
                <div class="form-group col-lg-2">
                    <validated-date-picker
                        label="Nose Punching Date"
                        class="c-input-datepicker text-black field-required"
                        v-model="model.nosepunchingdate"
                        :rules="rules.common"
                        format="DD-MM-YYYY"
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
                                type="reset"
                                design="basic-b"
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
import urls from '../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';

export default {
    name: 'NosePunching',

    data () {
        return {
            shed_number: '',
            loading: false,
            formKey: 0,
            URL: urls.nosePunching.addEdit,
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=bull',
            bullOptions: [],

            details: [{
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                animal: null, // ✅ MUST be array
                age: ''
            }],

            model: {
                bulls: [], // ✅ bulk payload
                nosepunchingdate: ''
            },

            rules: {
                common: {
                    required: true,
                    customValidator: (value) => this.Validation(value)
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
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        async loadBullOptions () {
            this.dataclear();
            const response = await axios.get(
                urls.nosePunching.animalVueSelect + '?shed_number=' + this.shed_number
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
        //     this.details.renumber = data.renumber;
        //     this.details.breed = data.breed.breed_name;
        //     this.details.dob = data.dob;
        //     this.details.age = data.age;
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
            row.shed_number = data.shed_number || '';
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
                // shed_number: '',
                age: ''
            }];

            this.model.bulls = [];
            this.model.nosepunchingdate = '';
            this.bullOptions = [];
            // this.shed_number = '';
        },

        clearAllData () {
            this.dataclear();
            this.$refs.form.reset();
        },
        async addItem () {
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

                formData.append('nosepunchingdate', this.model.nosepunchingdate);

                const response = await axios.post(this.URL, formData);
                const result = response.data;

                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.dataclear();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.shed_number = '';
                    this.formKey++;
                    // this.$router.push({ path: '/semen-station/' });
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
        //         if (!this.model.bulls.length) {
        //             this.$notify(
        //                 'Please select at least one animal',
        //                 'Warning',
        //                 { type: 'warning' }
        //             );
        //             return;
        //         }
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

        Validation (date) {
            // const dob = this.details.dob;
            if (!date) return true;

            const [d, m, y] = date.split('-').map(Number);
            // const [bd, bm, by] = dob.split('-').map(Number);

            const punchDate = new Date(y, m - 1, d);
            // const birthDate = new Date(by, bm - 1, bd);
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            for (const row of this.details) {
                if (!row.dob) continue;

                const [bd, bm, by] = row.dob.split('-').map(Number);
                const birthDate = new Date(by, bm - 1, bd);

                if (punchDate <= birthDate) {
                    return `Nose Punching Date must be after DOB (${row.dob})`;
                }
            }

            if (punchDate > today) {
                return 'Future Date not allowed.';
            }
            return true;
        }
    }
};
</script>

<style scoped>
</style>

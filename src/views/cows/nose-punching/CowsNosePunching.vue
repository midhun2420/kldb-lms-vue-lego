<template>
    <div class="full-height">
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
                        @input="loadCowOptions"
                        label="Shed"
                        :url="shedOptions"
                        :rules="{ required: true }"
                    />
                </div>
            </div>

            <p class="font-poppins-semibold fs-lg-2 text-primary mt-3">
                Enter Individually
            </p>

            <div class="row mt-2" v-for="(row, index) in details" :key="index">
                <div class="col-lg-2">
                    <validated-vue-select
                        :options="cowOptions"
                        v-model="row.animal"
                        @input="loadDetails(index)"
                        class="c-input-select field-required"
                        label="Animal No / Name"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        label="Renumber"
                        class="text-black"
                        v-model="row.renumber"
                        disabled
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        label="Shed No"
                        class="text-black"
                        v-model="row.shed_number"
                        disabled
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        label="Breed"
                        class="text-black"
                        v-model="row.breed"
                        disabled
                    />
                </div>

                <div class="col-lg-2">
                    <validated-input
                        label="Date Of Birth"
                        class="text-black"
                        v-model="row.dob"
                        disabled
                    />
                </div>

                <div class="col-lg-1">
                    <validated-input
                        label="Age"
                        class="text-black"
                        v-model="row.age"
                        disabled
                    />
                </div>
                <div class="form-group mt-3 col-lg-1">
                    <btn text="add" v-if="index === details.length - 1"
                         @click="addAnimalRow" class="px-4 mt-2 ml-1" type="button"></btn>
                </div>
            </div>

            <div class="pt-3 row">
                <div class="col-lg-2">
                    <validated-date-picker
                        format="DD-MM-YYYY"
                        label="Nose Punching Date"
                        class="c-input-datepicker text-black field-required"
                        v-model="model.nosepunchingdate"
                        :rules="rules.common"
                    />
                </div>
            </div>

            <div class="row mt-lg-7">
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
import urls from '../../../data/urls';
import masterURLs from '../../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'CowsNosePunching',

    data () {
        return {
            shed_number: '',
            loading: false,

            URL: urls.cowNosePunching.addEdit,
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=cow',
            cowOptions: [],

            details: [{
                renumber: '',
                breed: '',
                dob: '',
                shed_number: '',
                animal: null, // ✅ MUST be array
                age: ''
            }],

            model: {
                cows: [], // ✅ bulk payload
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

    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },

        async loadCowOptions () {
            this.dataclear();
            const response = await axios.get(
                urls.cowNosePunching.animalVueSelect + '?shed_number=' + this.shed_number
            );
            this.cowOptions = response.data.data;
        },

        // async loadDetails () {
        //     const selected = this.details.animalno_or_name;
        //
        //     if (!selected.length) {
        //         this.dataclear();
        //         return;
        //     }
        //
        //     // map selected cows for backend
        //     this.model.cows = selected.map(c => c.id ?? c);
        //
        //     // preview first cow only
        //     const cowId = this.model.cows[0];
        //     const response = await axios.form(urls.cows.details, { id: cowId });
        //     const data = response.data.data;
        //
        //     this.details.renumber = data.renumber;
        //     this.details.breed = data.breed.breed_name;
        //     this.details.dob = data.dob;
        //     this.details.age = data.age;
        //     this.details.shed_number = data.shedno.name;
        // },
        async loadDetails (index) {
            const row = this.details[index];
            if (!row.animal) return;

            const cowId = row.animal.id ?? row.animal;
            const response = await axios.form(urls.cows.details, { id: cowId });
            const data = response.data.data;

            row.renumber = data.renumber;
            row.breed = data.breed.breed_name;
            row.dob = data.dob;
            row.age = data.age;
            row.shed_number = data.shedno.shed_no;
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

            this.model.cows = [];
            this.model.nosepunchingdate = '';
            // this.shed_number = '';
            this.cowOptions = [];
        },
        async addItem () {
            try {
                // collect selected bulls
                this.model.cows = this.details
                    .filter(r => r.animal)
                    .map(r => r.animal.id ?? r.animal);

                if (!this.model.cows.length) {
                    this.$notify('Please select at least one animal', 'Warning', { type: 'warning' });
                    return;
                }

                this.loading = true;

                const formData = new FormData();

                this.model.cows.forEach(id => {
                    formData.append('cows', id); // ✅ KEY FIX
                });

                formData.append('nosepunchingdate', this.model.nosepunchingdate);

                const response = await axios.post(this.URL, formData);
                const result = response.data;

                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.dataclear();
                    this.shed_number = '';

                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }

                    this.formKey++;
                    // this.$router.push({ path: '/cows-list/' });
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
        //         if (!this.model.cows.length) {
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
        //             await this.$router.push({ path: '/cows-list/' });
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

            // if (punchDate <= birthDate) {
            //     return 'Date should be after the date of birth (DOB).';
            // }
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

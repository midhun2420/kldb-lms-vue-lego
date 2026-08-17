<template>
    <div class="full-height color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Dehorning / Disbudding</h2>
             <div><btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn></div>
        </div>
        <s-form @submit="addItem" ref="form" :key="formKey">
            <div class="row">
<!--                <div class="col-12">-->
<!--                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">-->
<!--                        Dehorning / Disbudding-->
<!--                    </h3>-->
<!--                </div>-->

                <div class="col-lg-2 mt-lg-5">
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
            <div class="row">
                <div class="col-12">
                    <p class="fs-lg-2 font-poppins-semibold text-primary">
                        Enter Individually
                    </p>
                </div>
            <div class="row mt-2 ml-0" v-for="(row, index) in details" :key="index">
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
                    <validated-input label="Renumber" v-model="row.renumber" disabled />
                </div>

                <div class="col-lg-2">
                    <validated-input label="Shed No" v-model="row.shed_number" disabled />
                </div>

                <div class="col-lg-2">
                    <validated-input label="Breed" v-model="row.breed" disabled />
                </div>

                <div class="col-lg-2">
                    <validated-date-picker
                        format="DD-MM-YYYY"
                        class="c-input-datepicker"
                        label="Date of Birth"
                        v-model="row.dob"
                        disabled
                    />
                </div>

                <div class="col-lg-1">
                    <validated-input label="Age" v-model="row.age" disabled />
                </div>
                <div class="form-group mt-3 col-lg-1">
                    <btn text="add" v-if="index === details.length - 1"
                         @click="addAnimalRow" class="px-4 mt-2 ml-1" type="button"></btn>
                </div>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select
                        :url="dehorningOptions"
                        class="c-input-select field-required"
                        label="Dehorning Type"
                        v-model="model.dehorning_type"
                        :rules="{ required: true }"
                    />
                </div>

                <div class="col-lg-2">
                    <validated-date-picker
                        format="DD-MM-YYYY"
                        :disabled-date="disabledAfterToday"
                        class="c-input-datepicker field-required"
                        label="Dehorning Date"
                        v-model="model.dehorningdate"
                        :rules="rules.DehornDate"
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
import urls from '../../../data/urls';
import masterURLs from '../../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'CowsDehorningFirstPage',

    data () {
        return {
            shed_number: '',
            loading: false,
            formKey: 0,
            URL: urls.cowDehorning.addEdit,
            shedOptions: masterURLs.master.shed.vueSelect + '?animal=cow',
            dehorningOptions: masterURLs.master.dehorningType.vueSelect,
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

    methods: {
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },

        async loadCowOptions () {
            this.dataclear();
            const response = await axios.get(
                urls.cowDehorning.cowVueSelect + '?shed_number=' + this.shed_number
            );
            this.cowOptions = response.data.data;
        },
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
        //     this.details.age = data.age;
        //     this.details.renumber = data.renumber;
        //     this.details.breed = data.breed.breed_name;
        //     this.details.dob = data.dob;
        //     this.details.shed_number = data.shedno.name;
        // },

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
            this.model.dehorning_type = '';
            this.model.dehorningdate = '';
            this.cowOptions = [];
            this.shed_number = '';
        },
        async addItem () {
            if (this.loading) return;
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

                formData.append('dehorning_type', this.model.dehorning_type);
                formData.append('dehorningdate', this.model.dehorningdate);

                const response = await axios.post(this.URL, formData);
                const result = response.data;

                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.dataclear();

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

<style scoped lang="scss">
.list-items {
    li {
        margin-top: var(--spacer-4);
        font-size: 0.9rem;
        font-family: poppins-medium;
    }
}
</style>

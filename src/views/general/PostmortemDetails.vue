<template>
    <s-form @submit="addItem" :key="formKey">
        <div class="row fl-x fl-j-sb ml-1">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Post-Mortem Details</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-ajax-vue-select
                                        :url="animalOptionURL"
                                        label="Reg No." v-model="model.reg_no" @input="loadDetails" class="c-input-select field-required" :rules="{required:true}"></validated-ajax-vue-select>
                            </div>
            <div class="col-lg-2">
                <validated-input label="Renumber" v-model="model.renumber" class="text-black" disabled></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" label="Date of Death" :disabled-date="disabledAfterToday" v-model="model.death_date" class="c-input-datepicker text-black"></validated-date-picker>
            </div>
            <div class="col-lg-2">
                <validated-input label="Time" v-model="model.death_time" class="text-black" placeholder="HH:MM" :rules="rules.Time"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Breed" v-model="model.breed" class="text-black" disabled></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Colour" v-model="model.colour" class="text-black"></validated-input>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" label="Date of Post-Mortem" :disabled-date="disabledAfterToday" v-model="model.post_mortem_date" class="c-input-datepicker text-black field-required" :rules="rules.compare"></validated-date-picker>
            </div>
            <div class="col-lg-2">
                <validated-input label="Time" v-model="model.post_mortem_time" class="text-black" placeholder="HH:MM" :rules="rules.Time"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Animal" v-model="model.sex" class="text-black" disabled></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Species" v-model="model.species" class="text-black"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Name of Doctor" v-model="model.doctor_name" class="text-black"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-date-picker format="DD-MM-YYYY" v-model="model.dob" label="Date of birth" class="c-input-datepicker text-black" disabled></validated-date-picker>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Blood</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5"  v-model="model.blood"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">General Findings</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5"  v-model="model.general_findings"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Skin, Subcutis, Muscle</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5"  v-model="model.skin_subcutis_muscle"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Peritoneum & Thorax</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5"  v-model="model.peritoneum_thorax"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Pericardium & Heart</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5"  v-model="model.pericardium_heart"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Respiratory System</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.respiratory_system"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Thyroid & Parathyroid</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.thyroid_parathyroid"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Liver</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.liver"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Spleen</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.spleen"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Kidney, Ureter, Urinary Bladder</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.kidney_ureter_urinary_bladder"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Adrenals</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.adrenals"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Mouth, Tongue, Pharynx, Oesophagus</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.mouth_tongue_phaynx_oesophagus"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Thymus</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.thymus"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Stomach</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.stomach"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Intestine & Pancreas</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.intestine_pancreas"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Reproductive System & Mammary Gland</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.reproductive_system_mammary_gland"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Brain & Cord</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.brain_cord"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Report of examination of Heart, Blood, <br> Brain & other impression smear</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.examination_report"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Summary of Report</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.summary_report"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Histopathological finding</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.histopathological_finding"></validated-text-area>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="c-label font-poppins-medium mt-2">Post-Mortem Diagnosis</div>
            </div>
            <div class="col-lg-6">
                <validated-text-area class="mr-5" v-model="model.postmortem_diagnosis"></validated-text-area>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-6">
                <validated-text-area label="Remarks" v-model="model.remarks" class="text-black"></validated-text-area>
            </div>
        </div>
        <div class="row mt-lg-6">
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
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'PostmortemDetails',
    data () {
        return {
            loading: false,
            URL: urls.post_mortem.addEdit,
            animalOptionURL: urls.post_mortem.loadAnimal,
            formKey: 0,
            model: {
                reg_no: '',
                post_mortem_date: '',
                post_mortem_time: '',
                death_date: '',
                death_time: '',
                colour: '',
                sex: '',
                dob: '',
                species: '',
                doctor_name: '',
                blood: '',
                general_findings: '',
                skin_subcutis_muscle: '',
                peritoneum_thorax: '',
                pericardium_heart: '',
                respiratory_system: '',
                thyroid_parathyroid: '',
                liver: '',
                spleen: '',
                kidney_ureter_urinary_bladder: '',
                adrenals: '',
                mouth_tongue_phaynx_oesophagus: '',
                thymus: '',
                stomach: '',
                intestine_pancreas: '',
                reproductive_system_mammary_gland: '',
                brain_cord: '',
                examination_report: '',
                summary_report: '',
                histopathological_finding: '',
                postmortem_diagnosis: '',
                remarks: ''
            },
            rules: {
                Time: {
                    required: false,
                    customValidator: (value) => {
                        return this.TimeValidation(value);
                    }
                },
                compare: {
                    required: true,
                    customValidator: (value) => {
                        return this.CompareDate(value);
                    }
                }
            }
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        TimeValidation (value) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use HH:MM format.';
            }
            return true;
        },
        CompareDate () {
            const checkDate = this.model.death_date;
            const prodDate = this.model.post_mortem_date;
            const checkDateParts = checkDate.split('-');
            if (checkDateParts.length !== 3) {
                return 'Please enter a valid Death Date in the format DD-MM-YYYY.';
            }
            const checkDateDay = parseInt(checkDateParts[0], 10);
            const checkDateMonth = parseInt(checkDateParts[1], 10);
            const checkDateYear = parseInt(checkDateParts[2], 10);

            const checkDateObj = new Date(checkDateYear, checkDateMonth - 1, checkDateDay);

            const prodDateParts = prodDate.split('-');
            if (prodDateParts.length !== 3) {
                return 'Please enter a valid Postmortem date in the format DD-MM-YYYY.';
            }
            const prodDateDay = parseInt(prodDateParts[0], 10);
            const prodDateMonth = parseInt(prodDateParts[1], 10);
            const prodDateYear = parseInt(prodDateParts[2], 10);

            const prodDateObj = new Date(prodDateYear, prodDateMonth - 1, prodDateDay);
            if (checkDateObj > prodDateObj) {
                return 'Postmortem date should be greater than or equal to death date';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (prodDateObj > currentDate) {
                return 'Future Date is not allowed';
            }
            return true;
        },
        async loadDetails () {
            const response = await axios.form(urls.post_mortem.animalDetail, this.model);
            const data = response.data.data;
            this.model.renumber = data.renumber;
            this.model.dob = data.dob;
            this.model.death_date = data.date_of_disposal;
            this.model.breed = data.breed;
            this.model.sex = data.sex;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
                    this.model = {
                        reg_no: '',
                        post_mortem_date: '',
                        post_mortem_time: '',
                        death_date: '',
                        death_time: '',
                        colour: '',
                        sex: '',
                        dob: '',
                        species: '',
                        doctor_name: '',
                        blood: '',
                        general_findings: '',
                        skin_subcutis_muscle: '',
                        peritoneum_thorax: '',
                        pericardium_heart: '',
                        respiratory_system: '',
                        thyroid_parathyroid: '',
                        liver: '',
                        spleen: '',
                        kidney_ureter_urinary_bladder: '',
                        adrenals: '',
                        mouth_tongue_phaynx_oesophagus: '',
                        thymus: '',
                        stomach: '',
                        intestine_pancreas: '',
                        reproductive_system_mammary_gland: '',
                        brain_cord: '',
                        examination_report: '',
                        summary_report: '',
                        histopathological_finding: '',
                        postmortem_diagnosis: '',
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

</style>

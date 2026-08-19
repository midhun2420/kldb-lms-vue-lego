<template>
    <div class="col-lg-12">
        <div class="row mt-2">
            <div class="col-lg-5 mt-5">
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p>1. TB&JD</p>
                    </div>
                    <div class="col-lg-2">
                        <validated-file-input class="w-10r" v-model="model.tb_jd_report" :key="'tb_jd_report' + fileInputKey"
                                              label-text="Upload File">
                            <!--                            <template #clear-button>-->
                            <!--                                <icon-remove class="mt-1 mu-p"></icon-remove>-->
                            <!--                            </template>-->
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.tb_jd_report)"
                                            :file-name="getFileNameWithExtension(model.tb_jd_report)"
                                            class="uploaded-file-contain-1 ml-3"></uploaded-file-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p>2. Brucella</p>
                    </div>
                    <div class="col-lg-2">
                        <validated-file-input class="w-10r" v-model="model.brucella_report" :key="'brucella_report' + fileInputKey"
                                              label-text="Upload File">
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.brucella_report)"
                            :file-name="getFileNameWithExtension(model.brucella_report)" class="ml-3"></uploaded-file-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p>3. IBR</p>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-file-input class="w-10r" v-model="model.ibr_report" :key="'ibr_report' + fileInputKey"
                                              label-text="Upload File">
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.ibr_report)"
                            :file-name="getFileNameWithExtension(model.ibr_report)" class="ml-3"></uploaded-file-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p>4. BVD 1</p>
                    </div>
                    <div class="col-lg-2 ">
                        <validated-file-input class="w-10r" v-model="model.bvd1_report" :key="'bvd1_report' + fileInputKey"
                                              label-text="Upload File">
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.bvd1_report)"
                            :file-name="getFileNameWithExtension(model.bvd1_report)" class="ml-3"></uploaded-file-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p>5. BVD 2</p>
                    </div>
                    <div class="col-lg-2">
                        <validated-file-input class="w-10r" v-model="model.bvd2_report" :key="'bvd2_report' + fileInputKey"
                                              label-text="Upload File">
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.bvd2_report)"
                            :file-name="getFileNameWithExtension(model.bvd2_report)" class="ml-3"></uploaded-file-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 fl-x fl-a-c">
                        <p> Others</p>
                    </div>
                    <div class="col-lg-2">
                        <validated-file-input class="w-10r pos-r" v-model="model.others_report" :key="'others_report' + fileInputKey"
                                              label-text="Upload File">
                        </validated-file-input>
                    </div>
                    <div class="col-lg-3">
                        <uploaded-file-item v-if="isURLFormat(model.others_report)"
                            :file-name="getFileNameWithExtension(model.others_report)" class="ml-3"></uploaded-file-item>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 mt-3 ml-8">
                <h6 class="fl-x-cc text-primary ml-6 font-poppins-semibold">Results</h6>
                <div class="row ml-5 mt-3">
                    <div class="col-lg-6">
                        <validated-select :options="yesOrNo" placeholder="TB"
                                          class="c-input-select-2" v-model="model.tb"></validated-select>
                    </div>
                    <div class="col-lg-6">
                        <validated-select :options="yesOrNo" placeholder="JD"
                                          class="c-input-select-2" v-model="model.jd"></validated-select>
                    </div>
                </div>
                <div class="fl-x-cc">
                    <div class="col-lg-5 ">
                        <validated-select :options="yesOrNo"
                                          class="c-input-select-2" v-model="model.brucella"></validated-select>
                    </div>
                </div>
                <div class="fl-x-cc">
                    <div class="col-lg-5 ">
                        <validated-select :options="yesOrNo"
                                          class="c-input-select-2" v-model="model.ibr"></validated-select>
                    </div>
                </div>
                <div class="fl-x-cc">
                    <div class="col-lg-5 ">
                        <validated-select :options="yesOrNo"
                                          class="c-input-select-2" v-model="model.bvd1"></validated-select>
                    </div>
                </div>
                <div class="fl-x-cc">
                    <div class="col-lg-5 ">
                        <validated-select :options="yesOrNo"
                                          class="c-input-select-2" v-model="model.bvd2"></validated-select>
                    </div>
                </div>
                <div class="fl-x-cc">
                    <div class="col-lg-5 ">
                        <validated-input class="" v-model="model.others"></validated-input>
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-5">
            <div class="row">
                <div class="col-lg-3 mt-2">

                    <p class=" pt-1 text-primary font-poppins-medium">
                        Karyotyping
                    </p>
                </div>
                <div class="col-lg-2">
                    <validated-file-input class="w-10r pos-r" v-model="model.karyotyping_report" :key="'karyotyping_report' + fileInputKey"
                                          label-text="Upload File">
                    </validated-file-input>
                    <uploaded-file-item v-if="isURLFormat(model.karyotyping_report)"
                        :file-name="getFileNameWithExtension(model.karyotyping_report)" class="ml-7"></uploaded-file-item>
                </div>
                <div class="col-lg-5 fl-x-cc ml-8 ">
                    <div class="col-lg-5 pr-0">
                        <validated-select class="c-input-select-2 " :options="yesOrNo"
                                          v-model="model.karyotyping"
                        ></validated-select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 mt-3">
                    <p class=" pt-4 text-primary font-poppins-medium">Genetic Disease Screening</p>
                </div>
                <div class="col-lg-4 mt-4">
                    <validated-file-input class="w-10r" v-model="model.genetic_disease_screening_report" :key="'genetic_disease_screening_report' + fileInputKey"
                                          label-text="Upload File">
                    </validated-file-input>
                    <uploaded-file-item v-if="isURLFormat(model.genetic_disease_screening_report)"
                        :file-name="getFileNameWithExtension(model.genetic_disease_screening_report)" class="ml-7"></uploaded-file-item>
                </div>
                <div class="col-lg-5 pt-4">
                    <div class="row">
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="DUMPS" :options="geneticDisease"
                                                  v-model="model.dumps"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="CITRULLINEMIA" :options="geneticDisease"
                                                  v-model="model.citrullinemia"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="FACTOR XI" :options="geneticDisease"
                                                  v-model="model.factor_x1"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="BLAD" :options="geneticDisease"
                                                  v-model="model.blad"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="BRACHYSPINA" :options="geneticDisease"
                                                  v-model="model.brachyspina"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="CVM" :options="geneticDisease"
                                                  v-model="model.cvm"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="HH1" :options="geneticDisease"
                                                  v-model="model.hh1"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="HH3" :options="geneticDisease"
                                                  v-model="model.hh3"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <validated-vue-select placeholder="JH1" :options="geneticDisease"
                                                  v-model="model.jh1"
                                                  class="c-input-select"></validated-vue-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="row">
                <div class="col-lg-3">

                    <p class="mb-4 mt-3 text-primary font-poppins-medium">
                        Breeding Soundness Report
                    </p>
                    <p class="mb-4 mt-2 pt-5  text-primary font-poppins-medium">
                        Parentage Verification Report
                    </p>
                    <p class="mb-4 pt-5  text-primary font-poppins-medium">
                        Pedigree of Sire & Dam
                    </p>
                </div>
                <div class="col-lg-2">
                    <div class="pos-r">
                        <validated-file-input v-model="model.breeding_soundness_report" :key="'breeding_soundness_report' + fileInputKey"
                                              label-text="Upload File" class="w-10r pos-r pt-0 mt-0">
                        </validated-file-input>
                        <uploaded-file-item v-if="isURLFormat(model.breeding_soundness_report)"
                            :file-name="getFileNameWithExtension(model.breeding_soundness_report)" class="ml-7"></uploaded-file-item>
                    </div>
                    <div class="pos-r">
                        <validated-file-input v-model="model.parentage_verification_report" :key="'parentage_verification_report' + fileInputKey"
                                              class="w-10r mt-5 pos-r" label-text="Upload File">
                        </validated-file-input>
                        <uploaded-file-item v-if="isURLFormat(model.parentage_verification_report)"
                            :file-name="getFileNameWithExtension(model.parentage_verification_report)" class="ml-7"></uploaded-file-item>
                    </div>
                    <div class="pos-r">
                        <validated-file-input v-model="model.sire_dam_pedigree" :key="'sire_dam_pedigree' + fileInputKey"
                                              class="w-10r mt-5 pos-r" label-text="Upload File">
                        </validated-file-input>
                        <uploaded-file-item v-if="isURLFormat(model.sire_dam_pedigree)"
                            :file-name="getFileNameWithExtension(model.sire_dam_pedigree)" class="ml-7"></uploaded-file-item>
                    </div>

                </div>
            </div>
        </div>
        <div class="pt-5">
            <div class="row">
                <div class="col-lg-3 mt-2">
                    <p class="text-primary font-poppins-medium">Remarks</p>
                </div>
                <div class="col-lg-3">
                    <validated-input v-model="model.remarks"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-file-input class="w-10r" v-model="model.remarks_report" :key="'remarks_report' + fileInputKey"
                                          label-text="Upload File">
                        <!--                        <template #clear-button>-->
                        <!--                            <icon-remove class="mt-1 mu-p"></icon-remove>-->
                        <!--                        </template>-->
                    </validated-file-input>
                    <uploaded-file-item v-if="isURLFormat(model.remarks_report)"
                        :file-name="getFileNameWithExtension(model.remarks_report)" class="ml-7"></uploaded-file-item>
                </div>
            </div>
        </div>
        <div class="bb-1 pt-3"></div>
        <div class="mt-4">
            <div class="row">
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="UID Number" v-model="model.uid_no"></validated-input>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-date-picker label="Addition Date Semen Station" class="c-input-select" format="DD-MM-YYYY"
                                   v-model="model.addition_date" :disabled-date="disableAdditionDate"></validated-date-picker>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-date-picker format="DD-MM-YYYY"-->
<!--                                           label="Training Date" class="mt-4 label-font-xs" v-model="model.training_date"></validated-date-picker>-->
<!--                </div>-->
            </div>
        </div>
        <div class="col-lg-12 mt-5 fl-x-br">
            <btn text="save" :loading="loading" loading-text="Saving..." class="mr-3 px-4"></btn>
            <btn design="basic-b" type="reset" @click="backToHome">Cancel</btn>
        </div>
    </div>
</template>

<script>
// import IconRemove from '../ui/icons/icon-remove';

export default {
    name: 'FileSection',
    props: {
        model: {
            type: Object
        },
        fileInputKey: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            loading: false,
            yesOrNo: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }

            ],
            geneticDisease: [
                {
                    label: 'Chromosomal Abnormalities Found',
                    value: 'Chromosomal Abnormalities Found'
                },
                {
                    label: 'No Chromosomal Abnormalities Found',
                    value: 'No Chromosomal Abnormalities Found'
                }
            ]
        };
    },
    // watch: {
    //     'model.end_date' () {
    //         this.model.addition_date = '';
    //     }
    // },
    methods: {
        // disableAdditionDate (date) {
        //     if (!this.model.end_date) {
        //         return true;
        //     }
        //
        //     const endDateParts = this.model.end_date.split('-');
        //
        //     if (endDateParts.length !== 3) {
        //         return true;
        //     }
        //
        //     const endDay = parseInt(endDateParts[0], 10);
        //     const endMonth = parseInt(endDateParts[1], 10);
        //     const endYear = parseInt(endDateParts[2], 10);
        //
        //     const endDateObj = new Date(endYear, endMonth - 1, endDay);
        //     endDateObj.setHours(0, 0, 0, 0);
        //
        //     return date <= endDateObj;
        // },
        backToHome () {
            this.$emit('back');
        },
        ls () {
            this.loading = true;
        },
        le () {
            this.loading = false;
        },
        getFileNameWithExtension (filePath) {
            const pathSegments = filePath.split('/');
            const fileNameWithExtension = pathSegments[pathSegments.length - 1];

            return fileNameWithExtension;
        },
        isURLFormat (inputString) {
            return inputString !== '' && inputString.includes('/');
        }
    }
};
</script>

<style scoped>
.plr {
    padding-right: 190px;
}

</style>

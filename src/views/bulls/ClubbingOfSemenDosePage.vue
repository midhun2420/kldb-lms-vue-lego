<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Clubbing of Semen Dose</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form :key="formKey">
<!--            <div class="row">-->
<!--                <div class="col-lg-12">-->
<!--                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Clubbing of Semen Dose</h3>-->
<!--                </div>-->
<!--            </div>-->
            <div class="row">
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required" @input="loadData"
                                               :url="dosetypeOptionURL"
                                               label="Dose Type" v-model="model.dose_type"
                                               :rules="{required:true}"></validated-ajax-vue-select>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-ajax-vue-select class="c-input-select field-required"-->
<!--                                               :ajax-method="'get'"-->
<!--                                               :url="batchOptionURL" :rules="{required:true}" @input="loadData"-->
<!--                                               label="Batch" v-model="model.batch"></validated-ajax-vue-select>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-ajax-vue-select class="c-input-select field-required" @input="loadData"
                                               :ajax-method="'get'"
                                               :url="computedBullURL " :rules="{required:true}"
                                               label="Bull" v-model="model.bull_no"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-12 mt-4">
                    <clubbing-card ref="list" :model="model" @data="saveData" @selected="selectedArray"></clubbing-card>
                </div>
                <div class="col-lg-12 mt-4">
                    <clubbing-of-semen-dose-input-section ref="component"
                                                          @clear="clearSemenData"
                                                          :semen-data="selectedSemen"
                                                          :details="savedData" @data="addItem"/>
                </div>

            </div>
        </s-form>
        <modal ref="dialogBox" title=" " class="c-modal"
               :show-additional-buttons="true"
               :no-close-on-backdrop="true">

            <div class="row">
                <div class="col-12 text-center ">
                    <div class=" bg-c card  bs-25 ">

                        <h5 class="text-danger pt-5 pl-5 pr-5"> {{ message }}</h5>
                        <div class="col-12  text-right  fl-x-cc mt-4 pb-4">
                            <btn text="Ok" class="px-5  " design="basic-a" @click="warningModalResponse"></btn>
                        </div>
                    </div>

                </div>

            </div>

        </modal>
    </div>
</template>

<script>
import ClubbingOfSemenDoseInputSection from '../../components/ClubbingOfSemenDose/ClubbingOfSemenDoseInputSection';
import ClubbingCard from '../../components/ClubbingOfSemenDose/ClubbingCard';
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'ClubbingOfSemenDosePage',
    components: { ClubbingCard, ClubbingOfSemenDoseInputSection },
    data () {
        return {
            message: '',
            formKey: 0,
            warning: false,
            URL: urls.clubbingofSemenDose.addEdit,
            dosetypeOptionURL: masterURLs.master.doseType.vueSelect,
            // batchOptionURL: masterURLs.master.batch.vueSelect + '?animal=bull',
            // bullOptionURL: urls.clubbingofSemenDose.vueSelect + '?dose_type=' + this.model.dose_type,
            model: {
                dose_type: '',
                bull_no: ''
            },
            savedData: '',
            selectedSemen: [],
            selectedSemenID: [],
            bullOptionURL: ''
        };
    },
    computed: {
        computedBullURL  () {
            return (
                urls.clubbingofSemenDose.vueSelect +
            '?dose_type=' + (this.model.dose_type || '')
            );
        }
    },
    methods: {
        warningModalResponse () {
            this.message = '';
            this.warning = false;
            this.$refs.dialogBox.close();
        },
        openWarningModal () {
            this.$refs.dialogBox.show();
        },
        clearSemenData () {
            this.selectedSemen = [];
            this.selectedSemenID = [];
        },
        selectedArray (data) {
            const dataId = data.id;
            const regNo = data.bull.reg_no;

            if (this.selectedSemen.length === 0) {
                this.selectedSemen.push(data);
                this.selectedSemenID.push(data.id);
            } else if (this.selectedSemen.length >= 20) {
                this.warning = true;
                this.message = 'already selected 20 items';
                console.log('already selected 4 items');
                this.$refs.dialogBox.show();
            } else if (this.selectedSemen.some(item => item.bull.reg_no === regNo)) {
                if (!this.selectedSemen.some(item => item.id === dataId)) {
                    this.selectedSemen.push(data);
                    this.selectedSemenID.push(data.id);
                } else {
                    this.warning = true;
                    this.message = 'Bull already selected';
                    console.log('Bull already selected');
                    this.$refs.dialogBox.show();
                }
            } else {
                this.warning = true;
                this.message = 'You can only select items with the same Bull';
                console.log('You can only select items with the same Bull');
                this.$refs.dialogBox.show();
            }
        },
        loadData () {
            this.$refs.list.loadData();
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        clearForm () {
            this.model = {
                dose_type: '',
                bull_no: ''
            };

            this.selectedSemen = [];
            this.selectedSemenID = [];
            this.savedData = '';

            if (this.$refs.component) {
                this.$refs.component.clearData();
            }

            if (this.$refs.list) {
                this.$refs.list.detailsData = [];
                this.$refs.list.message = '';
                this.$refs.list.error = false;
            }
        },
        saveData (data) {
            console.log('inside----save ----');
            this.savedData = data;
        },
        async addItem (data) {
            const semenID = JSON.stringify(this.selectedSemenID);
            const Arr = [
                {
                    clubbing_date: data.clubbing_date,
                    storage_type: data.storage_type,
                    storage_name: data.storage_name,
                    storage_location: data.storage_location,
                    storage_position: data.storage_position,
                    data: semenID,
                    dose_type: this.model.dose_type
                    // batch: this.model.batch
                }
            ];
            const sendData = JSON.stringify(Arr);
            console.log('semenID', semenID);
            console.log('sendData', sendData);
            try {
                console.log('inside try------------------------');
                // this.$refs.component.loadingTrue();
                console.log('----------url----------', this.URL);
                const response = await axios.form(this.URL, {
                    data: sendData
                });
                const result = response.data;
                console.log('result----------------', result);
                if (result.success) {
                    console.log('inside success--------------------');
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.clearForm();
                    this.formKey++;
                    // await this.$router.push({ path: '/semen-station/' });
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
                    if (response.data.message) {
                        const message = response.data.message;
                        this.$notify(message, 'Warning', { type: 'warning' });
                    }
                    this.$refs.component.loadingFalse();
                }
            } catch (error) {
                console.log('inside catch...................', error);
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.component.loadingFalse();
            }
        }
    }
};
</script>

<style scoped>
.bg-c {
    background-color: #f7f7f7 !important;
}
</style>

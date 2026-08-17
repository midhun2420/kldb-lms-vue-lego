<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Storage Position Change</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form  @submit="addItem" ref="form" :key="formKey">
            <div class="">
<!--                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ml-3">Semen Storage Position Change-->
<!--                </h3>-->
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY" v-model="model.position_change_date" :rules="{required:true}" :disabled-date="disabledAfterToday"
                                           class="c-input-datepicker field-required" label="Position Change Date"></validated-date-picker>
                </div>
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col-lg-3">
                                    <validated-ajax-vue-select
                                        :url="bullOptionURL" @input="loadAll"
                                        label="Bull No" v-model="model.bull_no" class="c-input-select field-required" :rules="{required:true}"></validated-ajax-vue-select>
                                </div>
                                <div class="col-lg-3">
                                    <validated-input disabled
                                                     class="c-input-select" label="Bull Name" v-model="model.bullname"></validated-input>
                                </div>
                                <div class="col-lg-3">
                                    <validated-input disabled
                                                     class="" label="Renumber" v-model="model.renumber"></validated-input>
                                </div>
                                <div class="col-lg-3">
                                    <validated-ajax-vue-select class="c-input-select field-required"
                                                               @input="loadAll"
                                                               :url="DoseTypeOptionURL" :rules="{required:true}"
                                                               label="Dose Type" v-model="model.dose_type"></validated-ajax-vue-select>
                                </div>

                                <div class="col-lg-6">
                                    <validated-input class="" label="Selected Dose" v-model="model.selected_dose" disabled></validated-input>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <validated-input label="Actual FSD" disabled
                                                     v-model="model.dose" :rules="{required:true}" class="field-required"></validated-input>
                                </div>
                                <div class="col-lg-3">
                                    <validated-vue-select @input="FSDStorageOptions" :rules="{required:true}"
                                                          :options=" storageTypeOptions
                                    " label="Storage Type" v-model="model.storage_type" class="c-input-select field-required"></validated-vue-select>
                                </div>
                                <div class="col-lg-3">
                                    <validated-vue-select :rules="{required:true}"
                                        :options=" FSDStorageNameOptions
                                    " label="Storage Name" v-model="model.storage_name" class="c-input-select field-required"></validated-vue-select>
                                </div>
                                <div class="col-lg-3">
                                    <validated-input :rules="{required:true}"
                                        label="Location" v-model="storage_location" class="c-input-select field-required"></validated-input>
                                </div>
                                <div class="col-lg-3">
                                    <validated-ajax-vue-select :rules="{required:true}"
                                        :url="positionOptions" label="Goblet Type" v-model="model.storage_position"
                                                               class="c-input-select field-required"></validated-ajax-vue-select>
                                </div>
                                <div class="col-lg-6">
                                    <validated-input label="Remarks" v-model="model.remarks" class="field-required" :rules="{required:true}"></validated-input>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="fl-x fl-j-e">
                        <div class="btn-group">

                        <btn text="View Storage Position" type="button" @click="viewStorage"></btn>

                    <btn text="Save"
                                 :loading="loading" loading-text="Saving..." class="px-4"></btn>
                            <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
                        </div>

                        <div class="col-lg-4">

                            <div class="card pl-0 pr-0 pt-0 pb-0 " v-if="model.bull_no && model.dose_type ">

                                <table style="width:100% ">
                                    <tr>
                                        <th class="text-primary">Location</th>
                                        <th class="text-primary">Dose</th>

                                    </tr>
                                    <tr v-for="(item, i) in detailsList" :key="i" style="cursor: pointer" @click="loadDoes(item)">
                                        <td>{{ item.location }}</td>
                                        <td>{{ item.dose }}</td>

                                    </tr>
                                    <tr v-if="!errorData && !loadData && detailsList.length ===0" class="text-center">
                                        <td colspan="2">No Data Found</td>

                                    </tr>
                                    <tr v-if="loadData" class="text-center">
                                        <td colspan="2">
                                            <loading-horizontal dot-background="rgb( 57,84,164 )"/>
                                        </td>

                                    </tr>
                                    <tr v-if="errorData" class="text-center">
                                        <td colspan="2" class="text-danger">
                                            Bull No. and Does Type Required to load data.
                                        </td>

                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <modal title="View Storage Position" ref="viewStoragePosition" :no-close-on-backdrop="true" width="70vw" header-color="primary">
                <SemenStorageDiagramPage :is-modal="true"></SemenStorageDiagramPage>
            </modal>
        </s-form>

    </div>
</template>

<script>
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';
import SemenStorageDiagramPage from '../../views/bulls/semen-storage-diagram/SemenStorageDiagramPage';
export default {
    name: 'SemenIssue',
    components: { SemenStorageDiagramPage },
    data () {
        return {
            loading: false,
            formKey: 0,
            URL: urls.semenQuarantine.positionChange,
            DoseTypeOptionURL: masterURLs.master.doseType.vueSelect,
            bullOptionURL: urls.bulls.issueVueselect,
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            locationOptions: masterURLs.master.quarantineLocation.vueSelect,
            positionOptions: masterURLs.master.quarantinePosition.vueSelect,
            model: {
                position_change_date: '',
                old_semen_quarantine: '',
                selected_dose: '',
                bull: '',
                bullname: '',
                bull_no: '',
                renumber: '',
                dose: '',
                storage_type: '',
                storage_name: '',
                storage_location: '',
                storage_position: '',
                remarks: ''
            },

            details: {
                bull_name: '',
                breed: '',
                quarantine: '',
                storage: ''

            },
            detailsList: [],
            FSDStorageNameOptions: [],
            storageTypeOptions: [
                { label: 'JUMBO', value: 'JUMBO' },
                { label: 'OMR', value: 'OMR' }
            ],
            loadData: false,
            errorData: false

        };
    },
    computed: {
        storage_location: {
            get () {
                return this.model.storage_location.toUpperCase();
            },
            set (value) {
                this.model.storage_location = value.toUpperCase();
            }
        }
    },
    methods: {
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        viewStorage () {
            this.$refs.viewStoragePosition.show();
        },
        async loadListDetails () {
            this.loadData = true;
            this.errorData = false;
            if (this.model.bull_no && this.model.dose_type) {
                const response = await axios.form(urls.semenIssue.BullDetails, {
                    bull: this.model.bull_no,
                    dose_type: this.model.dose_type,
                    type: 'change'
                });
                this.detailsList = response.data.data;
                this.details = response.data.details;
                // this.model.stock = this.details.stock;

                this.loadData = false;
            } else {
                this.errorData = true;
                this.loadData = false;
            }
        },
        async FSDStorageOptions () {
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + this.model.storage_type);
            this.FSDStorageNameOptions = response.data.data;
        },
        async loadAll () {
            if (this.model.bull_no && this.model.dose_type) {
                await this.loadListDetails();
            }
            if (this.model.bull_no) {
                this.model.bullname = '';
                this.model.renumber = '';
                await this.loadDetails();
            }
            if (this.model.dose_type) {
                this.model.selected_dose = '';
                this.model.dose = '';
                await this.loadListDetails();
            }
        },
        async loadDetails () {
            const response = await axios.form(urls.semenIssue.BullDetails, { bull: this.model.bull_no });
            const data = response.data.details;
            console.log('Data: ', data);
            this.details = response.data.details;
            this.model.bullname = data.bull_name;
            this.model.renumber = data.re_number;
        },
        loadDoes (data) {
            console.log('item:', data);
            this.model.selected_dose = data.location + ' : ' + data.dose;
            this.model.old_semen_quarantine = data.id;
            this.model.dose = data.dose;
        },
        dataclear () {
            this.model.position_change_date = '';
            this.model.old_semen_quarantine = '';
            this.model.selected_dose = '';
            this.model.bull = '';
            this.model.bullname = '';
            this.model.bull_no = '';
            this.model.renumber = '';
            this.model.dose = '';
            this.model.dose_type = '';
            this.model.storage_type = '';
            this.model.storage_name = '';
            this.model.storage_location = '';
            this.model.storage_position = '';
            this.model.remarks = '';
        },

        async addItem () {
            try {
                this.loading = true;
                console.log(this.URL);
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.dataclear();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/semen-station/' });
                    // await this.clearData();
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            let errorMessage = '';
                            if (key === '__all__') {
                                errorMessage = errors[key];
                            } else {
                                errorMessage = `${key}: ${errors[key]}`;
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
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        }
    }
};

</script>

<style scoped>
table {
    background-color: #f3f3f3;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    color: black;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 4px;

}

.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f3f3f3 !important;
}
</style>

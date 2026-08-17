<template>
    <div class="" :key="formKey">
        <div class="mt-5">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input disabled label="Bull No" class="field-required" v-model="details.bull_no"
                                     :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input v-model="details.bull_name" disabled label="Bull Name"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input v-model="details.ejaculation_no" disabled label="Ejaculate No"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input v-model="details.breed" disabled label="Breed"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled label="FSD Dose" v-model="details.fsd_dose"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select disabled
                                               :url="doseTypeOptionURL"
                                               class="c-input-select" label="Dose Type" v-model="details.dose_type"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input class="label-font-xs--1" @input="calculations"
                                     label="No of Dose Taken for IBR Screening" v-model="model.no_of_dose_ibr_screening"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input disabled
                                     label="Actual FSD Dose" v-model="model.actual_fsd_dose"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input type="number" class="field-required"
                                     label="Number of Days" v-model="model.quarantine_duration" :rules="{required:true}"></validated-input>
                </div>
            </div>
            <h4 class="text-primary mt-4 font-poppins-medium fs-lg-2">Quaratine Add</h4>

        </div>
        <div class="mt-4">
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="Actual FSD"
                                     v-model="model.actual_fsd" :rules="{required:true}" class="field-required"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select @input="FSDStorageOptions" :rules="{required:true}"
                                          :options=" storageTypeOptions
                    " label="Storage Type" v-model="model.fsd_storage_type" class="c-input-select field-required"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :rules="{required:true}"
                        :options=" FSDStorageNameOptions
                    " label="Storage Name" v-model="model.fsd_storage_name" class="c-input-select field-required"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input :rules="{required:true}"
                        label="Location" v-model="FSDLocation" class="c-input-select field-required"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :rules="{required:true}"
                        :url="positionOptions" label="Goblet Type" v-model="model.fsd_position"
                                               class="c-input-select field-required"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.fsd_remarks"></validated-input>
                </div>
            </div>
            <div class="form-group col-lg-12">
                    <btn v-if="show_add" text="Add" @click="show_add=false" type="button"/>
                </div>
            <div v-if="!show_add" >
            <div v-for="(storage, index) in model.storage" :key="index">

                <div class="row">
                    <div class="col-lg-2">
                         <validated-input  class="text-black field-required" type="number" label="Dose" v-model="storage.dose">

                        </validated-input>
                </div>
                <div class="col-lg-2" >
                     <validated-vue-select @input="FSDStorageOptions(storage.storage_type)" :rules="{required:true}"
                                              :options="storageTypeOptions"
                                              label="Storage Type" class="c-input-select text-black field-required" v-model="storage.storage_type">

                        </validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select :rules="{required:true}" class="c-input-select text-black field-required"
                                          :options="FSDStorageNameOptions" label="Storage Name"
                                          v-model="storage.storage_name"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                         <validated-input :rules="{required:true}"  class="text-black field-required"
                                         label="Location" v-model="storage.storage_location">

                        </validated-input>
                </div>
                <div class="col-lg-2">
                     <validated-ajax-vue-select :rules="{required:true}" class="c-input-select text-black field-required"
                                                :url="positionOptions" label="Goblet Type" v-model="storage.storage_position"></validated-ajax-vue-select>

                </div>
                    <div class="col-lg-2">
                         <validated-input class="text-black"
                                         label="Remarks" v-model="storage.remarks">

                        </validated-input>
                </div>

                </div>
                 <div class="form-group col-lg-12">
                    <btn text="Add" v-if="index === model.storage.length - 1"
                     @click="addStorage(index, storage.location, storage.goblet_type, storage.storage_type, storage.storage_name, storage.storage_location, storage.storage_position, storage.dose, storage.remarks)" class="px-4 mt-4 ml-4" type="button"></btn>
                </div>
            </div>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <validated-input label="IBR Screening" disabled
                                     v-model="model.ibr_screening" class=""></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-vue-select @input="IBRStorageOptions"
                                          :options="storageTypeOptions" label="Storage Type" v-model="model.ibr_storage_type" class="c-input-select"
                                          ></validated-vue-select>
                </div>

                <div class="col-lg-2">
                    <validated-vue-select
                        :options="IBRStorageNameOptions" label="Storage Name" v-model="model.ibr_storage_name" class="c-input-select"></validated-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input
                        label="Location" v-model="IBRLocation" class="c-input-select"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="positionOptions" label="Goblet Type" v-model="model.ibr_position" class="c-input-select"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Remarks" v-model="model.ibr_remarks"></validated-input>
                </div>

            </div>
            <div class="row" v-if="errorMessage">
                <div class="col-12 text-left text-danger">
                    The <b>Actual FSD</b> and <b>IBR Screening</b> Locations Are Same
                </div>

            </div>
            <div class="row">
                <div class="col-12 text-right">
                    <div class="btn-group">
                        <btn text="View Storage Position" type="button" @click="viewStorage"></btn>
                    </div>

                </div>

            </div>

        </div>
        <div class="fl-x-br mt-5">
            <btn text="save" @click="dataEmit"
                 :loading="loading" loading-text="Saving..." class="mr-4 px-4"></btn>
            <btn text="cancel" type="reset" @click="BackToHome" design="basic-b"></btn>
        </div>
        <modal title="View Storage Position" ref="viewStoragePosition" :no-close-on-backdrop="true" width="70vw" header-color="primary">
                <SemenStorageDiagramPage :is-modal="true"></SemenStorageDiagramPage>
            </modal>
    </div>

</template>

<script>
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';
import SemenStorageDiagramPage from '../../views/bulls/semen-storage-diagram/SemenStorageDiagramPage';

export default {
    name: 'SemenQuaratinetwoFields',
    components: { SemenStorageDiagramPage },
    props: {
        data: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: false
        },
        prod: {
            type: String,
            required: false
        }
    },
    watch: {
        index (newValue, oldValue) {
            if (newValue !== undefined) {
                this.loadBullDetails();
            } else {
                this.index = 0;
            }
        }
    },
    data () {
        return {
            errorMessage: false,
            loading: false,
            show_add: true,
            formKey: 0,
            doseTypeOptionURL: masterURLs.master.doseType.vueSelect,
            details: {
                bull_no: '',
                bull_name: '',
                ejaculation_no: '',
                breed: '',
                dose_type: '',
                fsd_dose: ''
            },
            FSDStorageNameOptions: [],
            IBRStorageNameOptions: [],
            storageTypeOptions: [
                { label: 'JUMBO', value: 'JUMBO' },
                { label: 'OMR', value: 'OMR' }
            ],
            model: {
                quarantine_duration: '',
                production_date: '',
                semen_collection_animal: '',

                no_of_dose_ibr_screening: '',

                actual_fsd_dose: '',
                actual_fsd: '',
                fsd_storage_type: '',
                fsd_storage_name: '',
                fsd_location: '',
                fsd_position: '',
                fsd_remarks: '',
                ibr_screening: '',
                ibr_storage_type: '',
                ibr_storage_name: '',
                ibr_location: '',
                ibr_position: '',
                ibr_remarks: '',
                storage: [
                    {
                        location: '',
                        goblet_type: '',
                        // no_of_doses: '',
                        storage_type: '',
                        storage_name: '',
                        storage_location: '',
                        storage_position: '',
                        dose: '',
                        remarks: ''
                    }

                ]
            },
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            locationOptions: masterURLs.master.quarantineLocation.vueSelect,
            positionOptions: masterURLs.master.quarantinePosition.vueSelect
        };
    },
    computed: {
        FSDLocation: {
            get () {
                return this.model.fsd_location.toUpperCase();
            },
            set (value) {
                this.model.fsd_location = value.toUpperCase();
            }
        },
        IBRLocation: {
            get () {
                return this.model.ibr_location.toUpperCase();
            },
            set (value) {
                this.model.ibr_location = value.toUpperCase();
            }
        }
    },
    created () {
        this.loadBullDetails();
    },
    methods: {
        resetFields () {
            this.model = {
                quarantine_duration: '',
                production_date: this.prod,
                semen_collection_animal: '',
                no_of_dose_ibr_screening: '',
                actual_fsd_dose: '',
                actual_fsd: '',
                fsd_storage_type: '',
                fsd_storage_name: '',
                fsd_location: '',
                fsd_position: '',
                fsd_remarks: '',
                ibr_screening: '',
                ibr_storage_type: '',
                ibr_storage_name: '',
                ibr_location: '',
                ibr_position: '',
                ibr_remarks: '',
                storage: [
                    {
                        location: '',
                        goblet_type: '',
                        storage_type: '',
                        storage_name: '',
                        storage_location: '',
                        storage_position: '',
                        dose: '',
                        remarks: ''
                    }
                ]
            };

            this.show_add = true;
            this.errorMessage = false;

            // reload bull details
            this.loadBullDetails();

            // force rerender
            this.formKey++;
        },
        viewStorage () {
            this.$refs.viewStoragePosition.show();
        },
        async FSDStorageOptions () {
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + this.model.fsd_storage_type);
            this.FSDStorageNameOptions = response.data.data;
        },
        async IBRStorageOptions () {
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + this.model.ibr_storage_type);
            this.IBRStorageNameOptions = response.data.data;
        },
        addStorage (index, location, gobleType, storageType, storageName, storageLocation, storagePosition, dose) {
            const isDuplicate = this.model.storage.filter(item =>
                item.location === location &&
                item.goblet_type === gobleType &&
                item.storage_type === storageType &&
                item.storage_name === storageName &&
                item.storage_location === storageLocation &&
                item.storage_position === storagePosition
            );

            if (isDuplicate.length > 1) {
                this.$notify('Duplicate Found', 'Warning', { type: 'warning' });
            } else {
                this.model.storage.push({ location: '', goblet_type: '', storage_type: '', storage_name: '', storage_location: '', storage_position: '', dose: '' });
                this.model.storage[index].location = location;
                // eslint-disable-next-line camelcase
                this.model.storage[index].storage_position = storagePosition;
                // eslint-disable-next-line camelcase
                this.model.storage[index].goblet_type = gobleType;
                this.model.storage[index].storage_type = storageType;
                this.model.storage[index].storage_name = storageName;
                this.model.storage[index].storage_location = storageLocation;
                this.model.storage[index].dose = dose;
                console.log('Quarantine', this.model.storage);
            }
        },
        calculations () {
            console.log('abcdefg');
            const total = this.details.fsd_dose;
            console.log('abcdefg');
            const IBRCount = this.model.no_of_dose_ibr_screening;
            console.log('abcdefg');

            const actualFSD = total - IBRCount;
            console.log('abcdefg');

            this.model.actual_fsd_dose = actualFSD;
            this.model.actual_fsd = actualFSD;
            this.model.ibr_screening = IBRCount;
        },
        loadingTure () {
            this.loading = true;
        },
        loadingFalse () {
            this.loading = false;
        },
        // dataEmit () {
        //     this.$emit('data', this.model);
        //     this.formKey++;
        // },
        dataEmit () {
            const payload = {
                ...this.model,
                storage: JSON.stringify(this.model.storage) // convert array → JSON string
            };
            this.$emit('data', payload);
            console.log('Payload:', payload);
            this.formKey++;
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        loadBullDetails () {
            console.log('this.index:********************:', this.index);

            this.model.production_date = this.prod;
            this.model.semen_collection_animal = '';
            this.model.no_of_dose_ibr_screening = '';
            this.model.actual_fsd_dose = '';
            this.model.actual_fsd = '';
            this.model.fsd_storage_type = '';
            this.model.fsd_storage_name = '';
            this.model.fsd_location = '';
            this.model.fsd_position = '';
            this.model.fsd_remarks = '';
            this.model.ibr_screening = '';
            this.model.ibr_storage_type = '';
            this.model.ibr_storage_name = '';
            this.model.ibr_location = '';
            this.model.ibr_position = '';
            this.model.ibr_remarks = '';
            this.details.bull_no = '';
            this.details.bull_name = '';
            this.details.ejaculation_no = '';
            this.details.breed = '';
            this.model.semen_collection_animal = '';
            this.details.dose_type = '';
            this.details.fsd_dose = '';
            this.model.quarantine_duration = '';

            const indexToFetch = this.index;

            if (indexToFetch >= 0 && indexToFetch < this.data.length) {
                const dataItem = this.data[indexToFetch];

                this.details.bull_no = dataItem.bull.reg_no;
                this.details.bull_name = dataItem.bull.bull_name;
                this.details.ejaculation_no = dataItem.ejaculation_no;
                this.details.breed = dataItem.bull.breed;
                this.model.semen_collection_animal = dataItem.id;

                this.details.dose_type = dataItem.dose_type.id;
                this.details.fsd_dose = dataItem.dose;
            }
        }
    }
};
</script>

<style scoped>
.bn {
    position: relative;
    top: 41px;
}

</style>

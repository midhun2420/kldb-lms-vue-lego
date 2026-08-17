<template>
    <div>
        <s-form @submit="addItem" :key="formKey">
            <div class="row fl-x fl-j-sb">
                <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Semen Receipt Storage Add</h2>
            <div>
                <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="regNoOptions" label="Reg No." v-model="model.receipt"  @input="loadDetails" class="c-input-select text-black field-required" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="breedOptions" label="Breed" v-model="model.breed" class="c-input-select text-black" disabled></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-ajax-vue-select :url="doseTypeOptions" label="Dose Type" v-model="model.dose_type" class="c-input-select text-black" disabled></validated-ajax-vue-select>
                </div>
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Location" v-model="model.location" class="text-black field-required" :rules="{required:true}"></validated-input>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Goblet Type" v-model="model.goblet_type" class="text-black"></validated-input>-->
<!--                </div>-->
                <div class="col-lg-2">
                    <validated-input label="No. of Doses" v-model="model.no_of_doses" class="text-black" disabled></validated-input>
                </div>
                <div class="col-lg-2 mt-4">
                     <btn text="View Storage Position" type="button" @click="viewStorage"></btn>
                </div>
            </div>
            <div class="mt-5">
                <h5 class="text-primary">Storage Details</h5>
            </div>
            <div class="row mt-4"  v-for="(storage, index) in model.storage" :key="index">
                <div class="col-lg-2">
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
                                         label="Location" :value="storage.storage_location" @input="onLocationInput(storage, $event)">

                        </validated-input>
                </div>
                <div class="col-lg-2">
                     <validated-ajax-vue-select :rules="{required:true}" class="c-input-select text-black field-required"
                                                :url="positionOptions" label="Goblet Type" v-model="storage.storage_position"></validated-ajax-vue-select>

                </div>
                <div class="col-lg-2">
                         <validated-input  class="text-black field-required" type="number"
                                         :rules="rules.positiveOnly" label="Dose" v-model="storage.dose">

                        </validated-input>
                </div>
                <div class="form-group col-lg-2">
                    <btn text="add" v-if="index === model.storage.length - 1"
                     @click="addCropItem(index, storage.location, storage.goblet_type, storage.storage_type, storage.storage_name, storage.storage_location, storage.storage_position, storage.dose)" class="px-4 mt-4 ml-4" type="button"></btn>
                </div>

            </div>
            <div class="row mt-lg-9">
                <div class="col-12">
                    <div class="fl-x fl-j-e">
                        <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel" type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                        </div>
                    </div>
                </div>
            </div>
            <modal title="View Storage Position" ref="viewStoragePosition" :no-close-on-backdrop="true" width="70vw" header-color="primary">
                <SemenStorageDiagramPage></SemenStorageDiagramPage>
            </modal>
        </s-form>
    </div>
</template>

<script>
// import CustomSingleColumnTable from '../../../components/ui/CustomSingleColumTable';
import urls from '../../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../../data/masterURLs';
import SemenStorageDiagramPage from '../../../views/bulls/semen-storage-diagram/SemenStorageDiagramPage';

export default {
    name: 'SemenReceiptStorageAdd',
    components: { SemenStorageDiagramPage },
    data () {
        return {
            loading: false,
            URL: urls.semen_storage.addEdit,
            formKey: 0,
            model: {
                receipt: '',
                breed: '',
                dose_type: '',
                no_of_doses: '',
                storage: [
                    {
                        location: '',
                        goblet_type: '',
                        // no_of_doses: '',
                        storage_type: '',
                        storage_name: '',
                        storage_location: '',
                        storage_position: '',
                        dose: ''
                    }

                ]

            },
            rules: {
                positiveOnly: {
                    required: true,
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            },
            storageTypeOptions: [
                { label: 'JUMBO', value: 'JUMBO' },
                { label: 'OMR', value: 'OMR' }
            ],
            regNoOptions: urls.semen_receipt.vueSelect,
            breedOptions: masterURLs.master.breed.vueSelect,
            doseTypeOptions: masterURLs.master.doseType.vueSelect,
            positionOptions: masterURLs.master.quarantinePosition.vueSelect,
            FSDStorageNameOptions: [],
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            locationOptions: masterURLs.master.quarantineLocation.vueSelect
        };
    },
    // commented the computed fn by midhun on 24-12-2025 for testing
    // computed: {
    //     FSDLocation: {
    //         get () {
    //             return this.model.storage.storage_location.toUpperCase();
    //         },
    //         set (value) {
    //             this.model.storage.storage_location = value.toUpperCase();
    //         }
    //     }
    // },
    methods: {
        avoidNegetive (no) {
            // const num = no;
            const num = parseInt(no, 10);

            if (isNaN(num) || num < 0 || num !== parseFloat(no) || num % 1 !== 0) {
                return 'Please enter a valid positive whole number';
            }
            return true;
        },
        viewStorage () {
            this.$refs.viewStoragePosition.show();
        },
        onLocationInput (storage, value) {
            storage.storage_location = (value || '').toUpperCase();
        },

        // eslint-disable-next-line camelcase
        addCropItem (index, location, gobleType, storageType, storageName, storageLocation, storagePosition, dose) {
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
                console.log('Crop Variety', this.model.storage);
            }
        },
        BackToHome () {
            this.$router.push({ path: '/general/' });
        },
        async FSDStorageOptions (storageType) {
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + storageType);
            this.FSDStorageNameOptions = response.data.data;
        },
        async loadDetails () {
            this.model.breed = '';
            this.model.no_of_doses = '';
            this.model.dose_type = '';
            const response = await axios.form(urls.semen_receipt.details, this.model);
            const data = response.data.data;
            this.model.breed = data.breed.id;
            this.model.no_of_doses = data.no_of_doses;
            this.model.dose_type = data.dose_type.id;
        },
        async addItem () {
            try {
                this.loading = true;
                const storage = JSON.stringify(this.model.storage);
                const receipt = this.model.receipt;
                console.log('-----receipt type---', typeof (receipt));
                const response = await axios.form(this.URL,
                    {
                        storage: storage,
                        receipt: this.model.receipt,
                        breed: this.model.breed,
                        dose_type: this.model.dose_type,
                        no_of_doses: this.model.no_of_doses
                    });
                const result = response.data;
                console.log('result-------------', result);
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.model = {
                        receipt: '',
                        breed: '',
                        dose_type: '',
                        no_of_doses: '',
                        storage: [
                            {
                                location: '',
                                goblet_type: '',
                                storage_type: '',
                                storage_name: '',
                                storage_location: '',
                                storage_position: '',
                                dose: ''
                            }
                        ]
                    };
                    this.formKey++;
                    // await this.$router.push({ path: '/general/' });
                } else {
                    if (result.message) {
                        this.$notify(result.message, 'Warning', { type: 'warning' });
                    } else if (result.errors) {
                        for (const key in result.errors) {
                            if (Object.prototype.hasOwnProperty.call(result.errors, key)) {
                                this.$notify(
                                    `${key}: ${result.errors[key]}`,
                                    'Warning',
                                    { type: 'warning' }
                                );
                            }
                        }
                    } else {
                        this.$notify(
                            'Something went wrong',
                            'Warning',
                            { type: 'warning' }
                        );
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

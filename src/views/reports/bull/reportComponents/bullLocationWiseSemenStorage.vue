<template>
    <div class="row">
        <div class="col-12 mt-3">
            <h3 class="text-primary fs-lg-4 font-poppins-semibold">
                LOCATION WISE SEMEN STORAGE
            </h3>
        </div>
        <div class="col-12 mt-3">
            <s-form @submit="downloadReport" class="row">
                <div class="col-lg-2">
                    <validated-select v-model="model.storage_type" :options="typeOptions" class="c-input-select field-required"
                                      label="Storage Type" @input="StorageOptions" :rules="{required: true}"
                    ></validated-select>
                </div>
                <div class="col-lg-2">
                    <validated-select v-model="model.storage_name" class="c-input-select field-required" label="Storage Number"
                                      :options="storageNameOptions"  @input="ChamberOptions" :rules="{required: true}"></validated-select>
                </div>

                <div class="col-lg-2">
                    <validated-select label="Chamber" :options="chamberOptions"
                                               placeholder="Chamber"
                                               class="c-input-select" v-model="model.chamber" @input="CanisterOptions"
                                               />
                </div>
                <div class="col-lg-2">
                    <validated-select label="Canister" :options="canisterOptions"
                                               placeholder="Canister"
                                               class="c-input-select" v-model="model.canister" @input="GobletOptions"
                                               />
                </div>
                <div class="col-lg-2">
                    <validated-select  label="Goblet" :options="gobletOptions"
                                               placeholder="Goblet"
                                               class="c-input-select" v-model="model.goblet"
                                               />
                </div>

                <div class="col-lg-2">
                    <validated-select :options="reportTypeOptions"
                                      class="field-required c-input-select "
                                      label="Download Format"
                                      :rules="{required:true}"
                                      v-model="model.format_type"/>
                </div>

                <div class="row mt-lg-9">
                    <div class="col-12">
                        <div class="fl-x fl-j-e">
                            <div class="btn-group">
                                <btn class="text-right"
                                     text="Download"
                                     loading-text="Please Wait..."
                                     :loading="loading"
                                />
                                <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </s-form>

        </div>

    </div>

</template>

<script>
import urls from '../../../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../../../data/masterURLs';

export default {
    name: 'bullLocationSemenStorage',
    data () {
        return {
            model: {
                storage_type: '',
                storage_name: '',
                chamber: '',
                canister: '',
                goblet: '',
                format_type: ''
            },
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            chamberOptionsURL: urls.quarantine.chamberSelect,
            canisterOptionsURL: urls.quarantine.canisterSelect,
            gobletOptionsURL: urls.quarantine.gobletSelect,
            chamberOptions: [],
            canisterOptions: [],
            gobletOptions: [],
            storageNameOptions: [],
            typeOptions: [
                {
                    label: 'OMR',
                    value: 'OMR'
                },
                {
                    label: 'JUMBO',
                    value: 'JUMBO'
                }
            ],
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        async StorageOptions () {
            this.model.storage_name = '';
            const response = await axios.get(this.storageNameOptionsURL + '?storage_type=' + this.model.storage_type);
            this.storageNameOptions = response.data.data;
        },
        async ChamberOptions () {
            this.model.chamber = '';
            const response = await axios.get(this.chamberOptionsURL + '?storage_type=' + this.model.storage_type + '&storage_name=' + this.model.storage_name);
            this.chamberOptions = response.data.data;
        },
        async CanisterOptions () {
            this.model.canister = '';
            const response = await axios.get(this.canisterOptionsURL + '?storage_type=' + this.model.storage_type + '&storage_name=' + this.model.storage_name + '&chamber=' + this.model.chamber);
            this.canisterOptions = response.data.data;
        },
        async GobletOptions () {
            this.model.goblet = '';
            const response = await axios.get(this.gobletOptionsURL + '?storage_type=' + this.model.storage_type + '&storage_name=' + this.model.storage_name + '&chamber=' + this.model.chamber + '&canister=' + this.model.canister);
            this.gobletOptions = response.data.data;
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.bullLocationWiseSemenStorage, this.model);
                const json = response.data;
                if (json.error === false) {
                    this.loading = false;
                    window.open(json.url);
                } else {
                    this.loading = false;
                    this.$notify(json.message, 'Oops!', { type: 'warning' });
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

<template>
    <div>
        <s-form @submit="dataEmit">
            <div class="pl-0">

                <!-- DATE -->
                <div class="row mb-4">
                    <div class="col-lg-2">
                        <validated-date-picker
                            :rules="{required:true}"
                            format="DD-MM-YYYY"
                            class="c-input-select field-required"
                            label="Date of Clubbing"
                            v-model="model.clubbing_date"/>
                    </div>
                </div>

                <!-- DYNAMIC SECTIONS -->
                <div class="row">

                    <!-- LABEL COLUMN -->
                    <div class="col-lg-3">
                        <p v-for="(s, i) in selections"
                           :key="'label-' + i"
                           class="text-primary"
                           :class="{ 'pt-4': i !== 0 }">
                            Selection {{ i + 1 }}
                        </p>

                        <p class="text-primary font-poppins-semibold pt-4">TOTAL</p>
                        <p class="text-primary pt-4">Position Dose in Long Storage</p>
                    </div>

                    <!-- POS 1 -->
                    <div class="col-lg-2 mr-4">
                        <validated-input
                            v-for="(s, i) in selections"
                            :key="'pos1-' + i"
                            disabled
                            v-model="s.pos1"/>

                        <validated-input style="visibility:hidden"/>

                        <validated-vue-select
                            :rules="{required:true}"
                            :options="storageTypeOptions"
                            label="Storage Type"
                            v-model="model.storage_type"
                            @input="FSDStorageOptions"/>
                    </div>

                    <!-- POS 2 -->
                    <div class="col-lg-2 mr-4">
                        <validated-input
                            v-for="(s, i) in selections"
                            :key="'pos2-' + i"
                            disabled
                            v-model="s.pos2"/>

                        <validated-input style="visibility:hidden"/>

                        <validated-vue-select
                            :rules="{required:true}"
                            :options="FSDStorageNameOptions"
                            label="Storage Name"
                            v-model="model.storage_name"/>
                    </div>

                    <!-- POS 3 -->
                    <div class="col-lg-2">
                        <validated-input
                            v-for="(s, i) in selections"
                            :key="'pos3-' + i"
                            disabled
                            v-model="s.pos3"/>

                        <validated-input disabled v-model="total"/>

                        <validated-input
                            :rules="{required:true}"
                            label="Location"
                            v-model="FSDLocation"/>
                    </div>

                    <!-- ADD BUTTON (SECTIONS ONLY) + POSITION -->
                    <div class="col-lg-2">

                        <!-- ADD BUTTON PER SELECTION -->
                        <div v-for="(s, i) in selections" :key="'add-' + i">
                            <btn
                                v-if="i === selections.length - 1 && canAddMore"
                                size="sm"
                                class="mt-1"
                                text="Add"
                                @click="addSection"/>
                            <validated-input
                                v-else
                                style="visibility:hidden"/>
                        </div>

                        <!-- TOTAL ROW SPACER -->
                        <validated-input style="visibility:hidden"/>
<!--                        <validated-input style="visibility:hidden"/>-->

                        <!-- POSITION DOSE IN LONG STORAGE (UNTOUCHED) -->
<!--                        <div class="col-lg-2">-->
                        <div style="margin-top:32px">
                            <validated-ajax-vue-select
                                :rules="{required:true}"
                                :url="positionOptions"
                                label="Goblet Type"
                                v-model="model.storage_position"/>
                        </div>
                    </div>

                </div>

                <!-- ACTION BUTTONS -->
                <div class="fl-te-c mt-6">
                    <div class="btn-group">
                        <btn text="Clear" type="button" @click="clearData"/>
                        <btn text="View Storage Position" type="button" @click="viewStorage"/>
                    </div>
                    <div class="btn-group">
                        <btn class="mr-3 px-4" text="Save" :loading="loading" loading-text="Saving..."/>
                        <btn design="basic-b" type="reset" @click="BackToHome">Cancel</btn>
                    </div>
                </div>

            </div>
        </s-form>

        <modal title="View Storage Position"
               ref="viewStoragePosition"
               :no-close-on-backdrop="true"
               width="70vw"
               header-color="primary">
            <SemenStorageDiagramPage :is-modal="true"/>
        </modal>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import SemenStorageDiagramPage from '../../views/bulls/semen-storage-diagram/SemenStorageDiagramPage';

export default {
    name: 'ClubbingOfSemenDoseInputSection',
    components: { SemenStorageDiagramPage },

    props: {
        details: Array,
        semenData: Array
    },

    data () {
        return {
            URL: urls.clubbingofSemenDose.addEdit,
            loading: false,
            maxSections: 20,

            selections: Array.from({ length: 4 }, () => ({
                pos1: '',
                pos2: '',
                pos3: ''
            })),

            model: {
                clubbing_date: '',
                storage_type: '',
                storage_name: '',
                storage_location: '',
                storage_position: ''
            },

            storageTypeOptions: [
                { label: 'JUMBO', value: 'JUMBO' },
                { label: 'OMR', value: 'OMR' }
            ],

            FSDStorageNameOptions: [],
            storageNameOptionsURL: masterURLs.master.storageType.vueSelect,
            locationOptions: masterURLs.master.quarantineLocation.vueSelect,
            positionOptions: masterURLs.master.quarantinePosition.vueSelect
        };
    },

    computed: {
        FSDLocation: {
            get () {
                return (this.model.storage_location || '').toUpperCase();
            },
            set (val) {
                this.model.storage_location = val.toUpperCase();
            }
        },

        total () {
            return this.selections.reduce(
                (sum, s) => sum + parseInt(s.pos3 || 0),
                0
            );
        },

        canAddMore () {
            return this.selections.length < this.maxSections;
        }
    },

    // watch: {
    //     semenData (val) {
    //         if (val) this.itemAssignment();
    //     }
    // },
    watch: {
        semenData (val) {
            if (val && val.length > 0) {
                this.itemAssignment();
            } else {
                this.selections = this.selections.map(() => ({
                    pos1: '', pos2: '', pos3: ''
                }));
            }
        }
    },

    methods: {
        addSection () {
            if (this.selections.length >= this.maxSections) return;
            this.selections.push({ pos1: '', pos2: '', pos3: '' });
        },

        async FSDStorageOptions () {
            const res = await axios.get(
                this.storageNameOptionsURL + '?storage_type=' + this.model.storage_type
            );
            this.FSDStorageNameOptions = res.data.data;
        },

        viewStorage () {
            this.$refs.viewStoragePosition.show();
        },

        dataEmit () {
            this.$emit('data', this.model);
        },

        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        clearData () {
            this.selections = this.selections.map(() => ({
                pos1: '', pos2: '', pos3: ''
            }));
            this.model.clubbing_date = '';
            this.model.storage_type = '';
            this.model.storage_name = '';
            this.model.storage_location = '';
            this.model.storage_position = '';
            this.$emit('clear');
        },

        itemAssignment () {
            this.selections = this.semenData
                .slice(0, this.maxSections)
                .map(i => ({
                    pos1: i.bull.reg_no,
                    pos2: i.ejaculation_no,
                    pos3: i.fsd_dose
                }));
        }
    }
};
</script>

<style scoped>
</style>

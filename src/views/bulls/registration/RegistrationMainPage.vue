<template>
    <div class="full-height color-txt">
        <s-form class="row">
            <div class="col-12">
                <div class="row fl-x fl-j-sb ml-1">
                    <h3 class="text-primary fs-lg-4 font-poppins-semibold">Registration</h3>
                    <div><btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn></div>
                </div>
            </div>
            <div class="col-lg-2 mt-lg-5">

                <validated-select class="c-input-select input-border-primary" label="Source Type" placeholder="Source Type" v-model="models.regType"
                                  :options="regOptions"></validated-select>
            </div>
            <div class="col-lg-2  mt-lg-5 ">
                <validated-ajax-vue-select
                    v-if="models.regType === 'Import Purchase'"
                    placeholder="" class=" c-input-select input-border-primary" label="Source" v-model="models.ipSourceType"
                    :url="sourceOptions"></validated-ajax-vue-select>
            </div>
        </s-form>
        <div class="row">
            <div class="col-12" v-if="regType === 'Farm Born'">
                <farm-born-registration></farm-born-registration>
            </div>
            <div class="col-12" v-else-if="regType === 'Unit Transfer'">
                <unit-purchase-registration></unit-purchase-registration>
            </div>
            <div class="col-12" v-else-if="regType === 'PT Purchase'">
                <pt-purchase-form></pt-purchase-form>
            </div>
            <div class="col-12" v-else-if="regType === 'Embryo Transfer'">
                <embryo-transfter-form></embryo-transfter-form>
            </div>
            <div class="col-12" v-else-if="regType === 'Import Purchase'">
                <import-purchase-form @clearRegistrationType="clearRegistrationType"></import-purchase-form>
            </div>
        </div>
    </div>
</template>

<script>
import FarmBornRegistration from './FarmBornRegistration';
import UnitPurchaseRegistration from './UnitPurchaseRegistration';
import PtPurchaseForm from './PtPurchaseForm';
import EmbryoTransfterForm from './EmbryoTransfterForm';
import ImportPurchaseForm from './ImportPurchaseForm';
import masterURLs from '../../../data/masterURLs';

export default {
    name: 'RegistrationMainPage',
    components: { ImportPurchaseForm, EmbryoTransfterForm, PtPurchaseForm, UnitPurchaseRegistration, FarmBornRegistration },
    data () {
        return {
            sourceOptions: masterURLs.master.source.vueSelect,
            models: {
                regType: '',
                ipSourceType: ''
            },
            regOptions: [
                {
                    value: 'Farm Born',
                    label: 'Farm Born'
                },
                {
                    value: 'Unit Transfer',
                    label: 'Unit Transfer'
                },
                {
                    value: 'PT Purchase',
                    label: 'PT Purchase'
                },
                {
                    value: 'Embryo Transfer',
                    label: 'Embryo Transfer'
                },
                {
                    value: 'Import Purchase',
                    label: 'Import Purchase'
                }
            ]

        };
    },
    computed: {
        regType () {
            return this.models.regType;
        }
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        clearRegistrationType () {
            // this.models.regType = '';
            this.models.ipSourceType = '';
        }
    }
};
</script>

<style scoped>

</style>

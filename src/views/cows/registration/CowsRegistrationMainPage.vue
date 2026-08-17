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

                <validated-select class="c-input-select input-border-primary" label="Source Type" placeholder="Source type" v-model="models.regType"
                                  :options="regOptions"></validated-select>
            </div>
            <div class="col-lg-2  mt-lg-5">
               <validated-ajax-vue-select
                    v-if="models.regType === 'Import Purchase'"
                    placeholder="" class=" c-input-select input-border-primary" label="Source" v-model="models.ipSourceType"
                    :url="sourceOptions"></validated-ajax-vue-select>
            </div>
        </s-form>
        <div class="row">
            <div class="col-12" v-if="regType === 'Farm Born'">
                <cows-farm-born-registration></cows-farm-born-registration>
            </div>
            <div class="col-12" v-else-if="regType === 'Unit Transfer'">
                <cows-unit-purchase-registration></cows-unit-purchase-registration>
            </div>
            <div class="col-12" v-else-if="regType === 'PT Purchase'">
                <cows-pt-purchase-form></cows-pt-purchase-form>
            </div>
            <div class="col-12" v-else-if="regType === 'Embryo Transfer'">
                <cows-embryo-transfter-form></cows-embryo-transfter-form>
            </div>
            <div class="col-12" v-else-if="regType === 'Import Purchase'">
                <cows-import-purchase-form @clearRegistrationType="clearRegistrationType"></cows-import-purchase-form>
            </div>
        </div>
    </div>
</template>

<script>
import CowsFarmBornRegistration from './CowsFarmBornRegistration';
import CowsUnitPurchaseRegistration from './CowsUnitPurchaseRegistration';
import CowsPtPurchaseForm from './CowsPtPurchaseForm';
import CowsEmbryoTransfterForm from './CowsEmbryoTransfterForm';
import CowsImportPurchaseForm from './CowsImportPurchaseForm';
import masterURLs from '../../../data/masterURLs';

export default {
    name: 'RegistrationMainPage',
    components: { CowsImportPurchaseForm, CowsEmbryoTransfterForm, CowsPtPurchaseForm, CowsUnitPurchaseRegistration, CowsFarmBornRegistration },
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
            /* sourceOptions: [
                {
                    value: 'fb',
                    label: 'FB'
                },
                {
                    value: 'ut',
                    label: 'UT'
                },
                {
                    value: 'pt',
                    label: 'PT'
                },
                {
                    value: 'et',
                    label: 'ET'
                }
            ] */
        };
    },
    computed: {
        regType () {
            return this.models.regType;
        }
        /* sourceLabel () {
            if (this.models.regType === 'ip') {
                return 'Source Type';
            } else {
                return 'Source';
            }
        } */

    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
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

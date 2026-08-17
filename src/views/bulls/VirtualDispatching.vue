<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Virtual Despatching</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>

        <div class="">
            <s-form ref="form">
                <div class="">
<!--                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Virtual Despatching</h3>-->
                    <div class="row">
                        <div class="col-lg-2">
                            <validated-ajax-vue-select class="c-input-select" @input="loadFilter"
                                                       :url="groupOptionURL"
                                                       placeholder="Group" v-model="model.group"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-ajax-vue-select class="c-input-select" @input="loadFilter"
                                                       :url="breedOptionURL"
                                                       placeholder="Breed" v-model="model.breed"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-select @input="loadFilter" :options="damsYieldOptions"
                                              class="c-input-select" placeholder="Dam's Yield" v-model="model.dams_yield"></validated-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-select :options="yearOptions" @input="loadFilter"
                                              class="c-input-select" placeholder="Year of Production" v-model="model.production_year"></validated-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-ajax-vue-select @input="loadFilter"
                                :url="bullOptionUrl"
                                class="c-input-select" placeholder="Specific Bull No" v-model="model.bull_no"></validated-ajax-vue-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-select :options="storageOptions" @input="loadFilter"
                                              class="c-input-select" placeholder="Screening Type" v-model="model.storage_type"></validated-select>
                        </div>
                    </div>
                </div>
                <virtual-despatching-table @clear="clearFilter" ref="ld" :send-model="model"></virtual-despatching-table>
            </s-form>
        </div>
    </div>
</template>

<script>
import VirtualDespatchingTable from '../../components/VirtualDespatchingTable';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'VirtualDispatching',
    data () {
        return {
            groupOptionURL: masterURLs.master.group.vueSelect,
            breedOptionURL: masterURLs.master.breed.vueSelect,
            // bullOptionUrl: urls.bulls.vueSelect + '?status=Regularized',
            bullOptionUrl: urls.bulls.vueSelects,
            model: {
                group: '',
                breed: '',
                production_year: new Date().getFullYear().toString(),
                bull_no: '',
                dams_yield: '',
                storage_type: ''
            },
            yearOptions: '',
            damsYieldOptions: [
                { label: '2000 - 4000', value: '2000 - 4000' },
                { label: '4000 - 6000', value: '4000 - 6000' },
                { label: '6000 - 8000', value: '6000 - 8000' },
                { label: '8000 - 10000', value: '8000 - 10000' },
                { label: '10000 and above', value: '10000 and above' }
            ],
            storageOptions: [
                { label: 'IBR', value: 'IBR' },
                { label: 'FSD', value: 'FSD' }
            ]
        };
    },
    components: { VirtualDespatchingTable },
    mounted () {
        this.yearOptionsData();
        this.loadFilter();
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        clearFilter () {
            this.model.group = '';
            this.model.breed = '';
            this.model.production_year = new Date().getFullYear().toString();
            this.model.bull_no = '';
            this.model.dams_yield = '';
            this.$refs.form.reset();
        },
        yearOptionsData () {
            const startYear = 2000;
            const endYear = new Date().getFullYear();
            this.yearOptions = [];
            for (let year = startYear; year <= endYear; year++) {
                this.yearOptions.push({ label: year.toString(), value: year.toString() });
            }
            return this.yearOptions;
        },
        loadFilter () {
            this.$refs.ld.clearSelected();
            this.$refs.ld.loadData();
        }
    }
};
</script>

<style scoped>

</style>

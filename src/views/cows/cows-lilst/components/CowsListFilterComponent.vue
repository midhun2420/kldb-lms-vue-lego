<template>
    <div class="filter-bg-gradient pt-5 pl-2">
        <div class="row">
            <div class="col-lg-7 line-right">
                <div class="row px-4">
                    <div class="col-lg-3">
<!--                        <validated-ajax-vue-select v-model="filter.breed" :url="breedOptionsURL"-->
<!--                                                   @input="inputOptions"-->
<!--                            class="input-white c-input-select" placeholder="Breed"></validated-ajax-vue-select>-->
                        <validated-vue-select
                            v-model="filter.breed" :options="breedOptions" @input="inputOptions" :disabled="disabled"
                            class="input-white c-input-select" placeholder="Breed"></validated-vue-select
                        >
                    </div>
                    <div class="col-lg-3">
<!--                        <validated-ajax-vue-select v-model="filter.shed_number" :url="shedOptionsURL"-->
<!--                                                   @input="inputOptions"-->
<!--                            class="input-white c-input-select" placeholder="Shed"></validated-ajax-vue-select>-->
                        <validated-vue-select :ajax-method="'get'"
                            class="input-white c-input-select" v-model="filter.shed_number" :options="shedOptions" @input="inputOptions" :disabled="disabled"
                            placeholder="Shed"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-vue-select v-model="filter.cow_type" :options="cowTypeOptions" :disabled="disabled"
                                              @input="inputOptions"
                            class="input-white c-input-select" placeholder="Cow Type"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-select v-model="filter.registration_type" :options="registrationTypeOptions" :disabled="disabled"
                                          @input="inputOptions"
                            class="input-white c-input-select" placeholder="Registration Type"></validated-select>
                    </div>
<!--                    <div class="col-lg-5 p-0 m-0 mr-3">-->
<!--                        <validated-input v-model="filter.search" @input="inputOptions"-->
<!--                            class="input-white search" placeholder="Search individual cow"></validated-input>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="col-lg-5">
                <div class="row pl-3 pr-6">
                    <div class="col-lg-5 p-0 m-0 mr-3">
                        <validated-input v-model="filter.search" @keydown.native="blockSpecialChars" :disabled="disabled"
                            class="input-white" placeholder="Search individual cow">
                            <template #append>
                                <btn title="" class="btn btn-xs mr-2" icon="fa fa-search" @click="inputOptions"></btn>
                            </template>
                        </validated-input>
                    </div>
                    <div class="col-lg-4 mt-05 text-center">
                        <btn text="New Registration" @click="$router.push('/cows-registration/')" class="bs-4 px-4 border-white  bg-transparent" border-radius="0"></btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import masterURLs from '../../../../data/masterURLs';
import urls from '../../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'CowsListFilterComponent',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // breedOptionsURL: masterURLs.master.breed.vueSelect,
            breedOptionsURL: urls.reports.optionURLS.breedSelect,
            // shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            shedOptionsURL: urls.reports.optionURLS.shedSelect + '?animal=cow',
            breedOptions: [],
            shedOptions: [],
            cowTypeOptions: [
                {
                    value: 'All',
                    label: 'All'
                },
                {
                    value: 'Young Female',
                    label: 'Young Female'
                },
                {
                    value: 'Heifer',
                    label: 'Heifer'
                },
                {
                    value: 'Cow',
                    label: 'Cow'
                }

            ],
            registrationTypeOptions: [
                {
                    value: 'All',
                    label: 'All'
                },
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

            ],
            filter: {
                breed: '',
                shed_number: '',
                cow_type: '',
                registration_type: '',
                search: ''
            },
            search: ''
        };
    },
    mounted () {
        this.loadBreedOptions();
        this.loadshedOptions();
    },
    methods: {
        async loadBreedOptions () {
            const respone = await axios.get(this.breedOptionsURL);
            this.breedOptions = respone.data.data || [];
        },
        async loadshedOptions () {
            const respone = await axios.get(this.shedOptionsURL);
            this.shedOptions = respone.data.data || [];
        },
        inputOptions () {
            this.$emit('filter', this.filter);
        },
        blockSpecialChars (e) {
            if (e.key === '#' || e.key === '&') {
                e.preventDefault(); // BLOCK typing the character
            }
        },
        SearchParameter () {
            this.$emit('search', this.search);
        }
    }
};
</script>

<style scoped lang="scss">
    .line-right {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: 2px;
            top: -4rem;
            height: 9.5rem;
            width: 2.5px;
            background: rgba(255,255,255,0.4) !important;
        }
    }
    .filter-bg-gradient{
         background-image: linear-gradient(to right, #417ebd , #0e509c);
    }
</style>

<template>
    <div class="of-h">
        <bull-list-filter-component class="filter-pos-f" :disabled="loading" @filter="filterData" @search="searchData"></bull-list-filter-component>
        <div class="list-item mt-lg-8 p-4">
            <div v-if="loading">
                <div class=" row text-primary">
                    <div class="col-12 text-center">
                        <loading-round dot-background="rgb( 57,84,164 )"/>
                        <div class="mt-3">Please wait while we fetching the data . . .</div>
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <div v-if="bullsData.length === 0">
                    No data Found
                </div>
<!--                <div v-else class="col-lg-6" v-for="(item,i) in bullsData" :key="i"-->
<!--                     :class="{'mt-4': i >1}">-->
<!--                    <div class="px-3">-->
<!--                        <cattle-list-item-card animal="bull" :data="item"></cattle-list-item-card>-->
<!--                    </div>-->
<!--                </div>-->
                <div v-else class="col-lg-6"
                     v-for="(item,i) in paginatedData"
                     :key="i"
                     :class="{'mt-4': i > 1}">
                    <div class="px-3">
                        <cattle-list-item-card animal="bull" :data="item"></cattle-list-item-card>
                    </div>
                </div>
                <div class="col-12 fl-x fl-j-c mt-3">
                    <btn
                        class="btn btn-sm btn-primary mx-1"
                        :disabled="page === 1"
                        @click="page--"
                    >Prev</btn>
                    <span class="px-3">Page {{ page }} of {{ totalPages }}</span>
                    <btn
                        class="btn btn-sm btn-primary mx-1"
                        :disabled="page === totalPages"
                        @click="page++"
                    >Next</btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BullListFilterComponent from './BullsListFilterComponent';
import CattleListItemCard from '../../common-components/CattleListItemCard';
import axios from 'secure-axios';
import urls from '../../../data/urls';

export default {
    name: 'BullsLIstPage',
    components: { CattleListItemCard, BullListFilterComponent },
    data () {
        return {
            bullsData: [],
            loading: false,
            page: 1,
            perPage: 10
        };
    },
    mounted () {
        this.loadDetails();
    },
    computed: {
        paginatedData () {
            const start = (this.page - 1) * this.perPage;
            const end = start + this.perPage;
            return this.bullsData.slice(start, end);
        },
        totalPages () {
            return Math.ceil(this.bullsData.length / this.perPage);
        }
    },
    methods: {
        async loadDetails () {
            try {
                this.loading = true;
                const response = await axios.get(urls.bulls.list);
                console.log('response: ', response.data.data);
                this.bullsData = response.data.data;
                this.page = 1;
                this.loading = false;
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.editLoading = false;
                this.addLoading = false;
                this.loading = false;
            }
        },
        async filterData (data) {
            console.log('filter-data', data);
            this.loading = true;
            try {
                const response = await axios.get(urls.bulls.list +
                    '?breed=' + data.breed +
                    '&shed_number=' + data.shed_number +
                    '&batch=' + data.batch +
                    '&registration_type=' + data.registration_type +
                    '&search=' + data.search
                );
                if (this.loading === true) {
                    console.log('inside loading true');
                    console.log('response: ', response.data.data);
                    this.bullsData = [];
                    this.bullsData = response.data.data;
                }
                this.page = 1;
                this.loading = false;
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.editLoading = false;
                this.addLoading = false;
                this.loading = false;
            }
        },
        async searchData (data) {
            this.loading = true;
            console.log('search-data', data);
            try {
                const response = await axios.get(urls.bulls.list + '?search=' + data);
                console.log('response: ', response.data.data);
                this.bullsData = [];
                this.bullsData = response.data.data;
                this.page = 1;
                this.loading = false;
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.editLoading = false;
                this.addLoading = false;
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.filter-pos-f {
    position: fixed;
    left: 4rem;
    top: 6rem;
    width: 100%;
    z-index: 699;
}
</style>

<template>
    <div class="of-h">
        <cows-list-filter-component class="filter-pos-f" :disabled="loading"
                                    @filter="filterData" @search="searchData"
        ></cows-list-filter-component>
        <div class="list-item mt-lg-8 p-4">

            <div v-if="loading">
                <div class=" row text-primary">
                    <div class="col-12 text-center">
                        <loading-round dot-background="rgb( 57,84,164 )"/>
                        <div class="mt-3">Please wait while we fetching the data . . .</div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div v-if="cowsData.length === 0">
                    No data Found
                </div>
<!--                <div v-else class="col-lg-6" v-for="(item,i) in cowsData" :key="i"-->
<!--                     :class="{'mt-4': i >1}">-->
<!--                    <div class="px-3">-->
<!--                        <cattle-list-item-card animal="cow" :data="item"></cattle-list-item-card>-->
<!--                    </div>-->
<!--                </div>-->
                <div v-else class="col-lg-6"
                     v-for="(item,i) in paginatedData"
                     :key="i"
                     :class="{'mt-4': i > 1}">
                    <div class="px-3">
                        <cattle-list-item-card animal="cow" :data="item"></cattle-list-item-card>
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
import CattleListItemCard from '../../common-components/CattleListItemCard';
// import img1 from '../../../assets/web/bulls/bull-1.png';
// import img2 from '../../../assets/web/bulls/bull-2.png';
// import img3 from '../../../assets/web/bulls/bull-3.png';
// import img4 from '../../../assets/web/bulls/bull-4.png';
// import img5 from '../../../assets/web/bulls/bull-5.png';
// import img6 from '../../../assets/web/bulls/bull-6.png';
import CowsListFilterComponent from './components/CowsListFilterComponent';
import axios from 'secure-axios';
import urls from '../../../data/urls';

export default {
    name: 'CowsLIstPage',
    components: { CowsListFilterComponent, CattleListItemCard },
    data () {
        return {

            cowsData: [],
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
            return this.cowsData.slice(start, end);
        },
        totalPages () {
            return Math.ceil(this.cowsData.length / this.perPage);
        }
    },
    methods: {
        async loadDetails () {
            try {
                this.loading = true;
                const response = await axios.get(urls.cows.list);
                console.log('response1: ', response.data.data);
                this.cowsData = response.data.data;
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
            this.loading = true;
            console.log('filter-data', data);
            try {
                const response = await axios.get(urls.cows.list +
                    '?breed=' + data.breed +
                    '&shed_number=' + data.shed_number +
                    '&cow_type=' + data.cow_type +
                    '&registration_type=' + data.registration_type +
                    '&search=' + data.search
                );
                if (this.loading === true) {
                    console.log('inside loading true.....');
                    console.log('response2: ', response.data.data);
                    this.cowsData = [];
                    this.cowsData = response.data.data;
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
                const response = await axios.get(urls.cows.list + '?search=' + data);
                console.log('response3: ', response.data.data);
                this.cowsData = [];
                this.cowsData = response.data.data;
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

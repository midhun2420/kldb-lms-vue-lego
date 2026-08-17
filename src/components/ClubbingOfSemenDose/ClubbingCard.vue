<template>
    <div class="color-txt">

        <div class="col-lg-12 mb-5" v-if="loading">
            Please wait while fetching the data...
        </div>
        <div class="col-lg-12 mb-5" v-else>
            <div class="row" v-if="error">
                <h6>{{ message }}</h6>
            </div>

            <div v-else class="row">
                <div class="col-lg-6 vertical pl-0 pr-0" v-for="(item, i) in detailsData" :key="i">
                    <div class="card pl-0 pr-0 pt-0 pb-0 ">

                        <table style="width:100% ">

                            <tr>
<!--                                <th colspan="1" scope="colgroup"></th>-->
                                <th colspan="6" class="pl-6"  scope="colgroup">{{ item.production_date }}</th>
<!--                                <th colspan="3" class="pl-7" scope="colgroup">Position</th>-->
                            </tr>
                            <tr>
                                <th class="text-primary">Bull No</th>
                                <th class="text-primary">Bull Name</th>
                                <th class="text-primary">Ejaculate No</th>
                                <th class="text-primary">FSD</th>
                                <th class="pl-5 text-primary">Position</th>
                                <th class="pl-5 text-primary">Jumbo/OMR</th>
                            </tr>

                            <tr v-for="(j,k) in item.data" :key="k" style="cursor: pointer" @click="selectedItem(j)">
                                <td>{{ j.bull.reg_no }}</td>
                                <td>{{ j.bull.bull_name }}</td>
                                <td>{{ j.ejaculation_no }}</td>
                                <td>{{ j.fsd_dose }}</td>
                                <td>{{ j.jumbo_position }}</td>
                                <td>{{ j.size }}</td>

                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'ClubbingCard',
    data () {
        return {
            detailsData: [],
            message: '',
            error: false,
            loading: false
        };
    },
    props: {
        model: {
            type: Object
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            const response = await axios.form(urls.clubbingofSemenDose.pendingList, this.model);
            console.log('response', response);
            if (response.data.error) {
                this.loading = false;
                this.error = true;
                this.message = response.data.message;
            } else {
                this.loading = false;
                this.error = false;
                this.message = '';
                const data = response.data.data;
                this.detailsData = data;
                this.$emit('data', data);
            }
        },
        selectedItem (item) {
            console.log('Selected-Item: ', item);
            this.$emit('selected', item);
        }
    }

};
</script>

<style scoped>
table {
    background-color: #f3f3f3;
    text-align: center;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    color: var(--color-primary);
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 4px;

}

.vertical {
    border-left: 1.3px solid black;
    /*height: 287px;*/
    /*position: absolute;*/
    /*left: 50%;*/
}
</style>

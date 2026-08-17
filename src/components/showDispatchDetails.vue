<template>
    <div>
        <div class="">
            <div class="row">
                <div class="col-12 pl-0 pr-0 fl-gr-1">
                    <btn text=" " @click="backToDespatch" icon="fa fa-arrow-left" class="mb-2"></btn>
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Despatch Details</h3>
                </div>
                 <validated-date-picker class="c-input-datepicker fs-lg--1 field-required" format="DD-MM-YYYY"
                                                   placeholder="Date" @input="loadData" :rules="{required:true}"
                                                   v-model="despatch_date"></validated-date-picker>
                <div class="col-lg-12 vertical pl-0 pr-0">
                    <div class="card p-0 ">

                        <table style="width:100% ">
                            <tr class="mt-3 mb-3">
                                <th class="text-primary">Despatch Date</th>
                                <th class="text-primary">Bull No</th>
                                <th class="text-primary">Location</th>
                                <th class="text-primary">Dose</th>
                                <th class="text-primary">Position</th>
                                <th class="text-primary">Container Number</th>
                                <th class="text-primary">RSB Despatch</th>
                            </tr>
                            <tr class="text-center mt-3 mb-3" v-if="dispatchData.length === 0 && !loadingData">
                                <td colspan="7" class="mt-3"> No data</td>
                            </tr>
                            <tr v-if="loadingData" class="text-center">
                                <td colspan="7" class="mt-3"> Please wait while fetching data...</td>
                            </tr>
                            <tr v-for="(item, i) in dispatchData" :key="i" >
                                <td>{{ item.created_date }}</td>
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.location }}</td>
                                <td>{{ item.dose }}</td>
                                <td>{{ item.position }}</td>
                                <td>{{ item.container_no }}</td>
                                <td>{{ item.rsb_despatch }}</td>

                            </tr>
                        </table>
                    </div>
                </div>
                <btn text="Take Print" @click="downloadReport" :loading="downloading"
                                 loading-text="Please Wait..."
                                 design="basic-b" class="mr-4" type="reset"></btn>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'secure-axios';
import urls from '../data/urls';

export default {
    name: 'showDispatchDetails',
    data () {
        return {
            loadingData: false,
            despatch_date: '',
            dispatchData: []
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        async loadData () {
            this.loadingData = true;
            const response = await axios.get(urls.virtualDespatching.list + '?despatch_date=' + this.despatch_date);
            this.dispatchData = response.data.data;
            this.loadingData = false;
        },
        async downloadReport () {
            if (!this.despatch_date) {
                this.$notify('Date is required', 'Warning', { type: 'warning' });
                return;
            }
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.virtualDespatching.downloadReport + '?despatch_date=' + this.despatch_date);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    that.$notify(json.message, 'Success', { type: 'success' });
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    that.$notify(json.message, 'Warning', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.$notify('Failed to download the report. Please try again.', 'Error', { type: 'warning' });
            }
        },
        backToDespatch () {
            this.$router.push({ path: '/virtual-dispatching/' });
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
    color: black;
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
    border-radius: 1px;

}
</style>

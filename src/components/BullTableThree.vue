<template>
    <div>
        <div class="col-lg-12 mb-5">
            <div class="row">
                <div class="col-lg-10 vertical pl-0 pr-0">
                    <div class="card pl-0 pr-0 pt-0 pb-0 round-2 p-2 card-height of-a thin-scrollbar">

                        <table style="width:100% " class="bg-2 round-2">
                            <tr>
                                <!--                                <th class="text-primary">Animal No</th>-->
                                <!--                                <th class="text-primary">Breed</th>-->
                            </tr>
                            <div v-if="dataList.length===0">
                                <tr>
                                    <td>No data available</td>
                                </tr>
                            </div>
                            <tr style="cursor: pointer" v-for="(item,index) in dataList" :key="index" v-else>
                                <td>{{ item.place }}</td>
                                <td>{{ item.production }}</td>
                            </tr>
                            <!--
                                                        <tr style="cursor: pointer">
                                                            <td>kA 15909</td>
                                                            <td>1000 L</td>

                                                        </tr>
                                                        <tr style="cursor: pointer">
                                                            <td>kA 15909</td>
                                                            <td>1000 L</td>

                                                        </tr>
                                                        <tr style="cursor: pointer">
                                                            <td>kA 15909</td>
                                                            <td>1000 L</td>

                                                        </tr>
                                                        <tr style="cursor: pointer">
                                                            <td>kA 15909</td>
                                                            <td>1000 L</td>

                                                        </tr>
                                                        <tr style="cursor: pointer">
                                                            <td>kA 15909</td>
                                                            <td>1000 L</td>

                                                        </tr>
                            -->

                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'BullTableThree',
    props: {
        dataList: {
            type: Array
        }
    }
};
</script>

<style scoped>
table {
    /*background-color: #f3f3f3;*/
    /*text-align: center;*/
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
    padding-left: var(--spacer-2) !important;
    /*padding-top: 0.8rem;*/
    /*padding-bottom: 0.8rem;*/
    padding: var(--spacer-4) var(--spacer-4);
    color: yellow;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 1px;

}

.card-height {
    min-height: 28rem;
    max-height: 29rem;
}
</style>

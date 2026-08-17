<template>
     <div class="">
        <div class="col-lg-12 mb-5 bs-1 round-3 bg-2">
            <div class="row">
                <div class="col-lg-10 vertical pl-0 pr-0">
                    <div class="card pl-0 pr-0 pt-0 pb-0 bs-3 w-30r">

                        <table style="width:100%">
                            <tr>
                                <th class="">Animal No</th>
                                <th class="">Yield</th>
                            </tr>
                            <tr style="cursor: pointer" v-for="(item,index) in dataList" :key="index">
                                <td>{{item.regno}}</td>
                                <td>{{item.breed}}</td>

                            </tr>
<!--                             <tr style="cursor: pointer">
                                <td>kA 15909</td>
                                <td>1000 L</td>

                            </tr> <tr style="cursor: pointer">
                                <td>kA 15909</td>
                                <td>1000 L</td>

                            </tr>-->

                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'BreedingTable',
    props: {
        dataList: {
            type: Array
        }
    }
};
</script>

<style scoped>
table {
    background-color: #edf2f0;
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
    padding-left: 18px;
    padding-top: 1.5rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: #3954A4;
    font-weight: bold;
}

table, th, tr {
    border-radius: 1px;

}
</style>

<template>
    <div class="color-txt">
        <!--        <h3 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">HOST/ HOS-G Test</h3>-->
        <!--            <div class="form-group w-10vr pl-0">-->
        <!--                <validated-vue-select class="c-input-select text-black" label="Test" placeholder="Host-Test"></validated-vue-select>-->
        <!--            </div>-->
        <div class="col-lg-2 row  pl-0">
            <validated-date-picker class="c-input-datepicker  text-black"
                                   label="Date of the test"></validated-date-picker>
        </div>
        <div class="row">
            <div class="col-lg-2 pl-0">
                <validated-date-picker class="c-input-datepicker text-black "
                                       label="Date of the Production"></validated-date-picker>
            </div>
            <div class="col-lg-2">
                <validated-vue-select class="  c-input-select text-black"
                                      label="Semen Type"></validated-vue-select>
            </div>
        </div>

        <div class="col-lg-12 row fl-x pl-0">
            <div class="row">
                <div class="col-lg-3 w-20r pl-0">
                    <div class="card pl-0 pr-0 pb-0 ml-lg-auto">
                        <table style="width:100%">
                            <th class="">Bull No</th>
                            <th class="">EJ No</th>
                            <th class="">Dose</th>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>KA 10289</td>
                                <td>JY</td>
                                <td>10</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-lg-9 pl-5 ">
                    <div class="row">

                        <div class="col-lg-3">
                            <validated-select label="Bull No"
                                              class="text-black c-input-select "></validated-select>
                        </div>
                        <div class="col-lg-3">
                            <validated-input label="Bull Name" class="text-black "></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-select label="Breed" class="text-black c-input-select "></validated-select>
                        </div>
                        <div class="col-lg-3">
                            <validated-select label="Ejaculate No"
                                              class="text-black c-input-select "></validated-select>
                        </div>

                        <div class="col-lg-3 mt-3 pt-2">
                            <validated-input label="Host +ve sperm counted(test)"
                                             class="text-black label-font-xs "></validated-input>
                        </div>
                        <div class="col-lg-3 mt-3 pt-2">
                            <validated-input label="Total Sperm counted(test)"
                                             class="text-black label-font-sm "></validated-input>
                        </div>
                        <div class="col-lg-3 ">
                            <p class="pt-5 mt-2 fl-x-br pr-2 fs-lg-0">Host +ve % in test</p>
                        </div>
                        <div class="col-lg-3 pt-5 mt-2 fl-x-br pr-4 ">
                            <div class="fl-x-cr">
                                <validated-input class="w-5r ml-4"></validated-input>
                                <p class="mt-2  pl-2">%</p>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <validated-input label="Host +ve sperm counted(control)"
                                             class="text-black  "></validated-input>
                        </div>
                        <div class="col-lg-3 mt-3 pt-2">
                            <validated-input label="Total Sperm counted(control)"
                                             class="text-black label-font-xs"></validated-input>
                        </div>

                        <div class="col-lg-3">
                            <p class="pt-5 mt-2 fl-x-br pr-2 fs-lg-0">Host +ve % in Control</p>
                        </div>
                        <div class="col-lg-3 pt-5 mt-2 fl-x-br pr-4">
                            <div class="fl-x-cr">
                                <validated-input class="w-5r ml-5"></validated-input>
                                <p class="mt-2 pl-2">%</p></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <p class="pt-2 mt-2  pr-2 font-poppins-semibold fs-lg-0">HOST Result</p>
                        </div>
                        <div class="col-lg-3  mt-2 fl-x  pr-4">

                            <validated-input class="w-5r"></validated-input>
                            <p class="mt-2 pl-2">%</p></div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-lg-3">
                            <validated-select label="Results"
                                              class="text-black c-input-select mt-1 "></validated-select>

                        </div>
                        <div class="col-lg-3">
                            <validated-checkbox label="Discard"
                                                class="pb-0 mb-xl-n4 w-10r text-black"></validated-checkbox>
                            <validated-input class="  "></validated-input>
                        </div>
                        <div class="col-lg-3">
                            <validated-input label="Remarks" class="text-black mt-1 "></validated-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeightRecording1'
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
    text-align: center;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
}

table, th, tr {
    border-radius: 4px;

}
</style>

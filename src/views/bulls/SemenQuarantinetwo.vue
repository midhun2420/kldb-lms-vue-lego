<template>
    <div class="color-txt">
        <div class="">
            <div class="col-lg-12">
                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Semen Quarantine</h3>
                <div class="row">
                    <div class="col-lg-2 pr-0">
                        <validated-date-picker class="c-input-datepicker fs-lg--1"
                                               placeholder="Date of Production"
                                               v-model="model.production_date"></validated-date-picker>

                    </div>
                </div>

                <div class="card pl-0 pr-0 pt-0 pb-0 w-60r">

                    <table style="width:100%">
                        <th>Bull No</th>
                        <th>Bull Name</th>
                        <th>Ejaculate No</th>
                        <th>Dose</th>
                        <tr>
                            <td>Emil</td>
                            <td>Tobias</td>
                            <td>Linus</td>
                            <td>Linus</td>

                        </tr>
                        <tr>
                            <td>16</td>
                            <td>14</td>
                            <td>10</td>
                            <td>Linus</td>

                        </tr>
                        <tr>
                            <td>16</td>
                            <td>14</td>
                            <td>10</td>
                            <td>Linus</td>

                        </tr>
                        <tr>
                            <td>16</td>
                            <td>14</td>
                            <td>10</td>
                            <td>Linus</td>

                        </tr>
                    </table>

                </div>
                <semen-quaratinetwo-fields></semen-quaratinetwo-fields>
            </div>
        </div>
    </div>
</template>

<script>
import SemenQuaratinetwoFields from '@components/SemenQuaratineTwo/SemenQuaratinetwoFields';

export default {
    name: 'SemenQuarantinetwo',
    components: { SemenQuaratinetwoFields }
};
</script>

<style scoped>
    table {
        background-color: #f3f3f3;
    }

    th {
        background-color: white;
        border: 0px;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
        padding-left: 18px;
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

<template>
    <div class="color-txt">
        <div class="">
            <div class="col-lg-12">
                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Semen Quarantine</h3>
                <div class="row">
                    <div class="col-lg-3">
                        <validated-input class=""></validated-input>
                    </div>
                </div>

                <div class="card pl-0 pr-0 pt-0 pb-0 w-60r">

                    <table style="width:100%">
                        <th class="text-primary">Bull No</th>
                        <th class="text-primary">Bull Name</th>
                        <th class="text-primary">Ejaculate No</th>
                        <th class="text-primary">Dose</th>
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
            </div>
            <semen-quaratine-three-input></semen-quaratine-three-input>

        </div>
    </div>
</template>

<script>
import SemenQuaratineThreeInput from '../../components/SemenQuarantineThree/SemenQuaratineThreeInput';

export default {
    name: 'SemenQuaratineThreePage',
    components: { SemenQuaratineThreeInput }
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

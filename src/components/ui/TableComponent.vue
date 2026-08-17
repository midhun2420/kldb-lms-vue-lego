<template>
    <div class="card pl-0 pr-0 pt-0 pb-0 w-60r of-h">
        <div class="heading font-poppins-medium w-25r text-primary pt-2  bg-2 fl-x-cc fs-lg-0 mb-3">Due for Selection</div>
        <table style="width:100%">
            <th clas="">Bull No</th>
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
</template>

<script>
export default {
    name: 'TableComponent'
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

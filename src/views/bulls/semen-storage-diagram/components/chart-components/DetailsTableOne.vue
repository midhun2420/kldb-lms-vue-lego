<template>
   <div>
        <s-form>
                    <chart-table :fields="tableFields" :data="tableData">
                        <template #heading>
                            <p class="text-white w-100p m-0 py-1 text-center">Chamber 1</p>
                        </template>
                        <template #chamber="{rowData}">
                            <div class="py-1 text-primary font-poppins-bold">{{rowData.chamber}}</div>
                        </template>
                        <template #data="{rowData}">
                            <div class="">
                                <div class="py-1">
                                    <span>Large: {{rowData.large.title}}</span> <span>{{rowData.large.dose}}</span>
                                </div>
                                <div class="py-1">
                                    <span>Small: {{rowData.small.title}}</span> <span>{{rowData.small.dose}}</span>
                                </div>
                            </div>

                        </template>
                    </chart-table>
        </s-form>
    </div>
</template>

<script>
import ChartTable from '../../../../../components/details-page/chart-table';
export default {
    name: 'DetailsTableOne',
    components: {
        ChartTable
    },
    data () {
        return {
            // bgColor1: '#f7f7f7',
            // textColor1: 'blue',
            // bgColor2: '#f7f7f7',
            // textColor2: 'black',
            tableFields: [
                {
                    name: '__slot:chamber',
                    title: '',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset d-none',
                    dataClass: 'text-2 my-3  mb-3 w-5r fs-lg-0 h-80p mt-n3 bt-1 b-dark'
                },
                {
                    name: '__slot:data',
                    title: '',
                    titleClass: 'text-6 fs-lg-0 font-poppins-bold b-unset d-none',
                    dataClass: 'text-2 my-3 w-20r  fs-lg-0 h-80p mt-n3 bt-1 b-dark'
                }
            ],
            tableData: [
                {
                    chamber: 'B',
                    length: '160 Cm',
                    large: {
                        title: 'Amazon',
                        dose: '500 dose'
                    },
                    small: {
                        title: 'Amazon',
                        dose: '500 dose'
                    }
                },
                {
                    chamber: 'A',
                    length: '158 Cm',
                    large: {
                        title: 'Amazon',
                        dose: '500 dose'
                    },
                    small: {
                        title: 'Amazon',
                        dose: '125 dose'
                    }
                }
            ]
        };
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
        padding-top: 0.2rem;
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
        border-radius: 2px;

    }

    hr {
        height: 1px;
        color: #6c757d;
        background-color: #6c757d;
    }

    card {
        height: 155px;
    }

    heading {
        text-align: center;
        width: 25rem;
        height: 2rem;
    }
</style>

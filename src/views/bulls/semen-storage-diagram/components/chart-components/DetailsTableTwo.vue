<template>
    <div>
       <s-form>
                    <chart-table :fields="tableFields" :data="tableData">
                        <template #heading>
                            <p class="text-white w-100p m-0 py-1 text-center">7AA1</p>
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
    name: 'DetailsTableTwo',
    components: { ChartTable },
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
                    chamber: 'F',
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
                    chamber: 'E',
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
                    chamber: 'D',
                    length: '158 Cm',
                    large: {
                        title: 'Amazon',
                        dose: '500 dose'
                    },
                    small: {
                        title: 'Amazon',
                        dose: '125 dose'
                    }
                },
                {
                    chamber: 'C',
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

</style>

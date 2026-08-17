<template>
<!--    <table class="bs-4 p-2 pb-0 bg-3 bs-4 border-r-1 of-h">-->
<!--        <thead class="m-0">-->
<!--        <th v-for="f in incidentFields" :key="f" class="text-primary px-4 text-center font-poppins-medium fs-lg&#45;&#45;1">{{f.title}}</th>-->
<!--        </thead>-->
<!--        <tbody class="bg-3 pb-4">-->
<!--        <slot name="data"></slot>-->
<!--        <tr v-for="item in data" :key="item">-->
<!--            <td class="px-4">{{item[incidentFields[0].name]}}</td>-->
<!--            <td class="px-4">{{item[incidentFields[1].name]}}</td>-->
<!--            <td class="px-4">{{item[incidentFields[2].name]}}</td>-->
<!--            <td class="px-4">{{item[incidentFields[3].name]}}</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--    </table>-->
    <div class="card pb-0 bs-4 border-r-1 of-h">
        <h6 class=" w-100p bg-2 ml-2 mb-0 text-center font-poppins-medium fs-lg--1 text-primary mb-4">{{mainHeading}}</h6>
        <table class="fl-x text-primary">
            <thead>
                <th></th>
            </thead>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg--1 text-primary">{{heading1}}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">{{heading2}}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">{{heading3}}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">{{heading4}}</h5>
        </table>
        <div class="row mt-3 bg-3 pb-4">
            <div class="col-3">
                <slot name="column1"></slot>
                <ul class="list-unstyled list-items ml-2" v-if="!$slots.column1">
                    <li>KA 10289</li>
                    <li>KA 12829</li>
                    <li>KA 14394</li>
                    <li>KA 15626</li>
                </ul>

            </div>
            <div class="col-3">
                <slot name="column2"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column2">
                    <li>KA 18529</li>
                    <li>KA 18630</li>
                    <li>KA 19620</li>
                    <li>KA 17001</li>
                </ul>
            </div>
            <div class="col-3">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>KA 18529</li>
                    <li>KA 18630</li>
                    <li>KA 19620</li>
                    <li>KA 17001</li>
                </ul>
            </div>
            <div class="col-3">
                <slot name="column4"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column4">
                    <li>KA 18529</li>
                    <li>KA 18630</li>
                    <li>KA 19620</li>
                    <li>KA 17001</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomFourColumnTable',
    props: {
        heading1: {
            type: String,
            default: ''
        },
        heading2: {
            type: String,
            default: ''
        },
        heading3: {
            type: String,
            default: ''
        },
        heading4: {
            type: String,
            default: ''
        },
        mainHeading: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            incidentFields: [
                {
                    name: 'name',
                    title: 'Name'
                },
                {
                    name: 'age',
                    title: 'Age'
                },
                {
                    name: 'place',
                    title: 'Place'
                },
                {
                    name: 'email',
                    title: 'Image'
                }
            ],
            data: [{ name: 'abc', age: 12, place: 'Banglore', email: 'mail@mail.com' }]

        };
    }
};
</script>

<style scoped lang="scss">
    .list-items {
        /*li:not(:nth-child(1)) {*/
        li {
            margin-top: var(--spacer-4);
            font-size: 0.9rem;
            font-family: poppins-medium;
        }
    }
</style>

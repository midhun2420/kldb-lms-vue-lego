<template>
    <div class="card pb-0 bs-4 border-r-1 of-h">
        <div class="row headings">
            <div class="col-1">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Sl No</h5>
            </div>
            <div class="col-2 m-0 ">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Reg No</h5>
            </div>
            <div class="col-2 m-0 p-0">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Morning Quantity</h5>
            </div>
            <div class="col-2 m-0 p-0">
                <h5 class=" w-100p g-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Evening Quantity</h5>
            </div>
            <div class="col-2 m-0 p-0">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Total Quantity</h5>
            </div>
            <div class="col-1 m-0 p-0">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">DIM</h5>
            </div>
            <div class="col-2 m-0 p-0">
                <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 ">Status</h5>
            </div>
        </div>
        <div class="row mt-3 bg-3 pb-6">
            <div class="col-1">
                <slot name="column1"></slot>
                <ul class="list-unstyled list-items ml-2" v-if="!$slots.column1">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>

            </div>
            <div class="col-2">
                <slot name="column2"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column2">
                    <li>KA 18529</li>
                    <li>KA 18630</li>
                    <li>KA 19620</li>
                </ul>
            </div>
            <div class="col-2">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>4.71</li>
                    <li>4.52</li>
                    <li>6.19</li>
                </ul>
            </div>
            <div class="col-2">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>3.79</li>
                    <li>3.3</li>
                    <li>5.01</li>
                </ul>
            </div>
            <div class="col-2">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>8.5</li>
                    <li>7.82</li>
                    <li>11.20</li>
                </ul>
            </div>
            <div class="col-1">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>100</li>
                    <li>105</li>
                    <li>95</li>
                </ul>
            </div>
            <div class="col-2">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>Lactating</li>
                    <li>Lactating</li>
                    <li>Lactating</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DailyMilkRecordingTable',
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
        }
    }
};
</script>

<style scoped lang="scss">
    .headings {
        h5 {
            color: var(--color-primary) !important;
            font-family: poppins-semibold;
        }
    }

    .list-items {
        /*li:not(:nth-child(1)) {*/
        li {
            margin-top: var(--spacer-4);
            padding-top:var(--spacer-2);
            padding-bottom:var(--spacer-2);
            font-size: 0.9rem;
            font-family: poppins-medium;
        }
    }
</style>

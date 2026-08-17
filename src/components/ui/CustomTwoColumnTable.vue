<template>
    <div class="card pb-0 bs-4 border-r-1 of-h">
        <div class="fl-x">
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">{{heading1}}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-primary">{{heading2}}</h5>
        </div>
        <div class="row mt-3 bg-3 pb-4">
            <div class="col-6">
                <slot name="column1"></slot>
                <ul class="list-unstyled list-items ml-2" v-if="!$slots.column1">
                    <li>KA 10289</li>
                    <li>KA 12829</li>
                    <li>KA 14394</li>
                    <li>KA 15626</li>
                </ul>

            </div>
            <div class="col-6">
                <slot name="column2"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column2">
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
    name: 'CustomTwoColumnTable',
    props: {
        heading1: {
            type: String,
            default: ''
        },
        heading2: {
            type: String,
            default: ''
        }
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

<template>
    <div class="card pb-0 bs-4 border-r-1 of-h">
        <div class="fl-x">
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">{{ heading1 }}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">{{ heading2 }}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">{{ heading3 }}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">{{ heading4 }}</h5>
            <h5 class=" w-100p bg-2 ml-2 mb-0 text-left font-poppins-medium fs-lg-0 text-black">{{ heading5 }}</h5>
        </div>
        <div class="row mt-3 bg-3 pb-4">
            <div class="col-3">
                <slot name="column1"></slot>
                <ul class="list-unstyled list-items ml-2" v-if="!$slots.column1">
                    <li>KA 10289</li>
                    <li>KA 12829</li>
                    <li>KA 14394</li>
                    <li>KA 15626</li>
                    <li>KA 15626</li>
                </ul>

            </div>
            <div class="col-2 pl-0">
                <slot name="column2"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column2">
                    <li>caspion</li>
                    <li>caspion</li>
                    <li>caspion</li>
                    <li>caspion</li>
                    <li>caspion</li>

                </ul>
            </div>
            <div class="col-2 ">
                <slot name="column3"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column3">
                    <li>hf</li>
                    <li>hf</li>
                    <li>hf</li>
                </ul>
            </div>
            <div class="col-2  pl-4">
                <slot name="column4"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column4">
                    <li>9</li>
                    <li>30</li>
                    <li>20</li>
                    <li>1</li>
                    <li>01</li>
                </ul>
            </div>
            <div class="col-2  pl-4">
                <slot name="column5"></slot>
                <ul class="list-unstyled list-items" v-if="!$slots.column5">
                    <li>
                        7ABIC
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'CustomFiveCoulumnTable',
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
        heading5: {
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

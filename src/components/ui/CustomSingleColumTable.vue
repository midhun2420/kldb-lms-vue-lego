<template>
    <div class="card pb-0 bs-4 border-r-1 of-h">
        <h5 class="text-center bg-2 font-poppins-medium fs-lg-1 text-primary">Details</h5>
        <div class="row mt-3 bg-3 pb-4">
            <div class="col-12 list-contain">
                <slot></slot>
                <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                    <li><span>Birth Weight :</span></li>
                    <li>Last Recorded Weight :</li>
                    <li><span>Last Recorded Date</span><span>:</span></li>
                    <li><span>Weight gain per day : </span></li><li class="mt--2"> (gm/day)</li>
                    <li><span>Overall weight gain : </span></li> <li class="mt--2">(gm/day)</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomSingleColumnTable'
};
</script>

<style scoped lang="scss">
    .list-items, .list-contain ul {
        /*li:not(:nth-child(1)) {*/
        li {
            margin-top: var(--spacer-4);
            font-size: 0.9rem;
            font-family: poppins-medium;
            color: var(--text-3);
            >span{
                display: inline-block;
                max-width: 15rem;
            }
            display: flex;
            align-items: flex-start;
        }
    }
</style>

<template>
    <div class="color-txt">
        <div class="">
            <div class="mt-2">
                <h1 class="text-primary mb-4 font-poppins-semibold fs-lg-4">Semen Collection</h1>
            </div>
            <SemenCollectionTwo></SemenCollectionTwo>
            <div class="row">
                <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 w-20r two">
                    <div class="bg-white">
                        <p class=" fl-x-cc font-poppins-semibold pt-2">Bull List</p>
                        <p class="fl-x-cc pb-1">(Not found in excel file)</p>
                    </div>
                    <p class="pl-4 pt-2">KA 5669</p>
                    <p class="pl-4 pt-2">KA 6778</p>
                    <p class="pl-4 pt-2">KA 6762</p>
                </div>

                <div class="col-lg-5 ml-5 mt-5 fl-x">
                    <div class="col-lg-5">
                        <p>Bull Name</p>
                        <p class="pt-4">Bull No</p>
                        <p class="pt-4">Ejaculation No</p>
                    </div>
                    <div class="col-lg-5">
                        <validated-input class=""></validated-input>
                        <validated-input class=""></validated-input>
                        <validated-input class=""></validated-input>

                    </div>
                </div>
                <div class="col-lg-2 fl-te-c px-4">
                    <btn class="">Add</btn>
                </div>

            </div>
            <div>
                <semen-input-components></semen-input-components>
            </div>
        </div>
        <div class="fl-x-br ">
            <btn class="mr-3 px-4" :loading="loading" loading-text="Saving...">Save</btn>
            <btn design="basic-b">Cancel</btn>
        </div>
    </div>
</template>

<script>
import SemenCollectionTwo from '../../components/semenCollectionTwo/SemenCollectionTwo';
import SemenInputComponents from '../../components/semenCollectionTwo/SemenInputComponents';

export default {
    name: 'SemenCollectionTwoPage',
    components: { SemenInputComponents, SemenCollectionTwo },
    data () {
        return {
            loading: false

        };
    }
};
</script>

<style scoped lang="scss">
.grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}

/*.item:first-child {*/
/*    grid-column-start: 1;*/
/*    grid-column-end: 6;*/
/*}*/
i:first-child, i.i-inline:first-child {
    margin-left: 1px;
    transform: rotate(225deg);
}

.text-white {
    color: white !important;
}

.bg-white {
    background-color: white;
}

.bg-grey {
    background-color: #f4f4f4;
}

.one {
    position: relative;
    top: 31px;
    z-index: 1;

}

.two {
    position: relative;
    top: -6px;

}
</style>

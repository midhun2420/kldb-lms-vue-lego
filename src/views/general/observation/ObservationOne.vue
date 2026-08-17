<template>
    <div>
        <div class="">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Observation </h3>
                </div>
                <div class="col-2">
                    <validated-date-picker class="c-input-datepicker" label="Date"></validated-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <validated-select class="c-input-select" label="Section"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <validated-select class="c-input-select" v-model="type" :options="typeOptions" label="Type"></validated-select>
                </div>
                <div class="col-2" v-if="type === 'anim'">
                    <validated-select class="c-input-select" label="Animal No"></validated-select>
                </div>
                <div class="col-2" v-else-if="type === 'shed'">
                    <validated-select class="c-input-select" label="Shed No"></validated-select>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <validated-text-area class="c-textarea" label="Detailed Information"></validated-text-area>
                </div>

            </div>

        </div>
        <div class="fl-x-br mt-6">
            <btn text="Save" class="mr-3 px-4"></btn>
            <btn text="Cancel" design="basic-b" class=""></btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ObservationOne',
    data () {
        return {
            typeOptions: [
                { label: 'Animal', value: 'anim' },
                { label: 'Shed', value: 'shed' },
                { label: 'Others', value: 'oth' }
            ],
            type: 'anim'
        };
    }
};
</script>

<style scoped lang="scss">

</style>

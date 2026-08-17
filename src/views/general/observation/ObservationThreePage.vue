<template>
    <div>
        <div class="container">
            <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Observation </h3>

            <div class="col-lg-12">
                <div class="row">
                    <div class="">
                        <validated-date-picker class="c-input-datepicker w-15v" label="Date"></validated-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="">
                        <validated-select class="c-input-select w-15v" label="Section"></validated-select>
                    </div>
                </div>
                <div class="row">
                    <div class="mr-3">
                        <validated-select class="c-input-select w-15v" label="Type"></validated-select>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4 pl-0">
                        <validated-text-area class="c-textarea" label="Detailed Information"></validated-text-area>
                    </div>

                </div>

            </div>
            <div class="fl-x-br mt-6">
                <btn text="Save" class="mr-3 px-4"></btn>
                <btn text="Cancel" design="basic-b" class=""></btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ObservationThreePage'
};
</script>

<style scoped>

</style>

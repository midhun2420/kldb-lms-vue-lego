<template>
    <s-form>
        <div class="col-lg-12 column fl-x pl-0">
            <div class="col-lg-6 pl-0">
                <h2 class="head font-poppins-bold mt-3 text-primary">Pregnancy Check-up</h2>
            </div>
            <div class="col-lg-6 fl-x fl-x-br">
                <div class="fl-x fl-a-c">
                    <img src="../../assets/web/icons/link_icon.svg" class="mr-1">
                    <a href="" class="text-primary font-poppins-medium font-italic fl-eqh-r">Due for Pregnancy Checkup</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-input label="Registration No." class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date"
                                               class="c-input-datepicker text-black"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-select label="Result" class="c-input-select text-black"></validated-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-select label="Method Used" class="c-input-select text-black"></validated-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class=" text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 mt-5">
                <custom-single-column-table class="ml-lg-5">
                    <template #default>
                        <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                            <li><span>Date of Birth :</span></li>
                            <li>Breed :</li>
                            <li><span>Date of AI</span> <span class="ml-1">:</span></li>
                            <li><span>Bull No </span> <span class="ml-1">:</span></li>
                            <li><span>No of Attempts</span> <span class="ml-1">:</span></li>
                            <li><span>Days after Insemination</span> <span class="ml-1">:</span></li>
                        </ul>
                    </template>
                </custom-single-column-table>
            </div>
        </div>
        <div class="row mt-lg-6">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" class="px-4"></btn>
                        <btn text="Cancel" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>

    </s-form>
</template>

<script>
import CustomSingleColumnTable from '../../components/ui/CustomSingleColumTable';

export default {
    name: 'PregnancyCheckup',
    components: { CustomSingleColumnTable }
};
</script>

<style scoped>

</style>

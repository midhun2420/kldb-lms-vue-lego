<template>
    <div class="full-height color-txt">
        <div class="col-lg-12">
            <s-form class="col-lg-12">
                <div class="row pl-0">
                    <h3 class="text-primary pl-0 font-poppins-semibold">Host/ Hos-G Test</h3>

                </div>
                <div class="row">
                    <div class="col-lg-2 pl-0">
                        <div class=" mt-4  ">
                            <validated-select class="c-input-select text-black" label="Test"
                                              v-model="models.regType"
                                              placeholder="Test" :options="regOptions"></validated-select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 pl-0" v-if="regType === 'hhgt'">
                        <host-hos-gtest></host-hos-gtest>
                    </div>
                    <div class="col-lg-12 " v-else-if="regType === 'hhgt2'">
                        <weight-recording1></weight-recording1>
                    </div>

                </div>
                <div class="col-lg-12 fl-x-br pt-7">
                    <btn class="px-4" text="save"></btn>
                    <btn class="ml-2" design="basic-b" text="Cancel"></btn>
                </div>
            </s-form>
        </div>
    </div>
</template>

<script>
import HostHosGtest from '@/views/quality-control/host-hos-g-test/HostHosGtest';
import WeightRecording1 from '@/views/quality-control/host-hos-g-test/HostHosGtest2';

export default {
    name: 'HostHosGtest1',
    components: { HostHosGtest, WeightRecording1 },
    data () {
        return {
            models: {
                regType: ''
            },
            regOptions: [
                {
                    value: 'hhgt',
                    label: 'Host-G Test '
                },
                {
                    value: 'hhgt2',
                    label: 'Host Test'
                }
            ]
        };
    },
    computed: {
        regType () {
            return this.models.regType;
        }
    }
};
</script>

<style scoped>

</style>

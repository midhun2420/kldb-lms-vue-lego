<template>
    <div>
        <div class="col-lg-12">
            <div class="row py-5">
                <div class="col-lg-3 mt-2">
                    <label class="">collection</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-select class="c-input-select no-min-h" v-model="model.collection" :rules="{required:true}"></validated-select>
                </div>
                <div class="col-lg-3 px-6 mt-2">
                    <label>status</label>
                </div>
                <div class="col-lg-3">
                    <validated-select class="c-input-select no-min-h" v-model="model.status" :rules="{required:true}"></validated-select>
                </div>
                <div class="col-lg-3 mt-2">
                    <label>Ejaculation No</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-select class="c-input-select no-min-h" v-model="model.ejaculation_no" :rules="{required:true}"></validated-select>
                </div>
                <div class="col-lg-3 pl-6 mt-2">
                    <label>Rejected Reasons</label>
                </div>
                <div class="col-lg-3">
                    <validated-select class="c-input-select no-min-h" v-model="model.rejected_reason"></validated-select>
                </div>
                <div class="col-lg-3 mt-2">
                    <label>Time</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.time" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-3 mt-2 px-6">
                    <label>Evaluation Remarks</label>
                </div>
                <div class="col-lg-3">
                    <validated-input class="c-input-select no-min-h" v-model="model.eval_remarks" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-3 mt-2">
                    <label>Volume</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.volume" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>%Motility</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.motility" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 ">
                    <label>Concentration</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.concentration" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>TEV</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.tev" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>SCPD</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.scpd" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>Batch</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.batch" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>Calculated Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.calculated_dose" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>Used Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.used_dose" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>Racked Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.racked_dose" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">

                </div>
                <div class="col-lg-3 mt-2">
                    <label>Frozen Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.frozen_dose" :rules="{required:true}"></validated-input>
                </div>
                <div class="col-lg-6">
                </div>
                <div class="col-lg-3 mt-2">
                    <label>Recorded Dose</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select no-min-h" v-model="model.recorded_dose" :rules="{required:true}"></validated-input>
                </div>
                <!--<div class="col-lg-3 ">
                    <label>Freezing Loss</label>
                </div>
                <div class="col-lg-2 ">
                    <validated-input class="c-input-select" v-model="model"></validated-input>
                </div>-->
                <div class="col-lg-6">

                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'SemenInputComponents',
    data () {
        return {
            model: {
                collection: null,
                batch: null,
                dose_type: null,
                remarks: null,
                eval_remarks: null,
                ejaculation_no: null,
                time: null,
                volume: null,
                motility: null,
                concentration: null,
                tev: null,
                scpd: null,
                calculated_dose: null,
                used_dose: null,
                racked_dose: null,
                frozen_dose: null,
                recorded_dose: null,
                status: null,
                rejected_reason: null

            }
        };
    }
};
</script>

<style scoped>

</style>

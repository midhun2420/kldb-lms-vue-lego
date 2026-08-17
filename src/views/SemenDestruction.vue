<template>
    <div>
        <div class="color-txt">
            <div class="container">
                <div class="col-lg-12">
                    <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Semen Destruction Proposal</h3>

                    <div class="row">
                        <div class="col-lg-2">
                            <validated-date-picker label="Date of Proposal"
                                                   class="c-input-datepicker" v-model="model.proposal_date"></validated-date-picker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <validated-input label="Bull Reg No" v-model="model.regno"></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Renumber" v-model="model.renumber"></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Name" v-model="model.name"></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-select class="c-input-select" label="Breed" v-model="model.breed"></validated-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Dose Type" v-model="model.dose_type"></validated-input>
                        </div>
                        <div class="col-lg-2">
                            <validated-select class="c-input-select" label="Reason for Disposal" v-model="model.disposal_reason"></validated-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-date-picker label="Date of Screening"
                                                   class="c-input-datepicker mt-4" v-model="model.screening_date"></validated-date-picker>
                        </div>
                        <div class="col-lg-2">
                            <validated-date-picker label="Date of Result"
                                                   class="c-input-datepicker mt-4" v-model="model.result_date"></validated-date-picker>
                        </div>
                        <div class="col-lg-2">
                            <validated-date-picker label="Date of Last Navigate"
                                                   class="c-input-datepicker mt-4" v-model="model.last_neg_date"></validated-date-picker>
                        </div>
                        <div class="col-lg-2">
                            <validated-select label="Storage Location and Dose"
                                              class="c-input-select" v-model="model.storage_loc_dose"></validated-select>
                        </div>
                        <div class="col-lg-2">
                            <validated-input label="Number of Dose Disposed" v-model="model.dose_disposal_no"></validated-input>
                        </div>
                        <div class="fl-x-br mt-2 mb-3">
                            <btn text="Add" class=" px-4"></btn>
                        </div>
                        <div class="col-lg-2">

                        </div>
                    </div>

                     <div class="col-lg-4   mt-6">
                <div class="heading font-poppins-semibold mb-2 w-25r round-1 fs-lg-0 text-primary pt-3 pl-6 bg-2 mr-xl-n5">Proposal for semen Destruction</div>
                <div class="card pl-0 round-0 pr-0 round-0 mt--4 pb-0 ml-lg-auto w-25r" border-radius="0">
                    <table style="width:100%">
                        <th class="text-primary">Bull No</th>
                        <th class="text-primary">Breed</th>
                        <th class="text-primary">Dose Type</th>
                        <th class="text-primary">Dose Disposed</th>
                        <tr>
                            <td>KA 10289</td>
                            <td>JY</td>
                            <td>1/4</td>
                            <td>4000</td>
                        </tr>
                        <tr>
                            <td>KA 10289</td>
                            <td>SN</td>
                            <td>14</td>
                            <td>6200</td>
                        </tr>
                        <tr>
                            <td>KA 10289</td>
                            <td>HF</td>
                            <td>13</td>
                            <td>10000</td>
                        </tr>
                        <tr>
                            <td>KA 10289</td>
                            <td>JC</td>
                            <td>11</td>
                            <td>4500</td>
                        </tr>
                    </table>
                </div>
            </div>

                    <div class="row mt-7 fl-x-br">
                        <div class="col-lg-6 pl-0">
                            <btn text="Generate Report" class="mr-4 "></btn>
                        </div>
                        <div class="col-lg-6 fl-x-tr">
                            <btn text="Save" :loading="loading" loading-text="Saving..." class="mr-4 font-poppins-regular px-4"></btn>
                            <btn text="Cancel" design="basic-b" class=" "></btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SemenDestruction',
    data () {
        return {
            loading: false,

            model: {

                regno: null,
                renumber: null,
                name: null,
                breed: null,
                dose_type: null,
                disposal_reason: null,
                screening_date: null,
                result_date: null,
                last_neg_date: null,
                storage_loc_dose: null,
                dose_disposal_no: null,
                proposal_date: null

            }

        };
    }
};
</script>

<style scoped>
  table {
        background-color: #f3f3f3;
    }

    th {
        background-color: white;
        border: 0px;
        padding-top: 0.2rem;
        padding-bottom: 0.9rem;
        padding-left: 18px;
    }

    td {
        padding-left: 18px;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
    }

    table, td, tr {
        border: none;
        border-collapse: collapse;
    }

    table, th, tr {
        border-radius: 4px;

    }

    hr {
        height: 1px;
        color: #6c757d;
        background-color: #6c757d;
    }

    card {
        height: 155px;
    }

    /*heading {*/
    /*    text-align: center;*/
    /*    width: 25rem;*/
    /*    height: 2rem;*/
    /*}*/
</style>

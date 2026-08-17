<template>
    <div>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Nose Punching</h2>
        <div class="row">
            <div class="col-lg-2 mt-lg-3">
                    <validated-ajax-vue-select class="c-input-select input-border-primary" placeholder="Shed"
                                               v-model="shed_number"
                                               :url="shedOptions" ></validated-ajax-vue-select>
                </div>
        </div>
        <div class="row">
            <div class="col-5 pr-5">
                <custom-two-column-table></custom-two-column-table>
            </div>
        </div>

        <h6 class="pt-5 text-primary fs-lg-2 font-poppins-medium">Enter Individually</h6>
        <div class="row mt-4">
            <div class="col-lg-2">
                <validated-input label="Animal No/Name" class="text-black" v-model="model.animalno_or_name"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Renumber" class="text-black" v-model="model.renumber"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Shed No" class="text-black" v-model="model.shed_number"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Breed" class="text-black" v-model="model.breed"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Date Of Birth" class="text-black" v-model="model.dob"></validated-input>
            </div>
            <div class="col-lg-2">
                <validated-input label="Age" class="text-black" v-model="model.age"></validated-input>
            </div>
        </div>
        <div class="pt-3 row">
            <div class="col-lg-2">
                <validated-date-picker label="Nose Punching Date" class="c-input-datepicker text-black" v-model="model.nosepunchdate"></validated-date-picker>
            </div>
        </div>
        <div class="row mt-lg-7">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
<!--                        <btn text="Edit" design="basic-b" class="px-4"></btn>-->
                        <btn text="Cancel" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomTwoColumnTable from '../../../components/ui/CustomTwoColumnTable';
import masterURLs from '../../../data/masterURLs';

export default {
    name: 'CowsNosePunching1',
    data () {
        return {
            loading: false,
            shedOptions: masterURLs.master.shed.vueSelect,
            shed_number: '',

            model: {
                renumber: null,
                breed: null,
                dob: null,
                shed_number: null,
                breeding_value: null,
                animalno_or_name: null,
                age: null,
                animal: null,
                nosepunchdate: null

            }
        };
    },
    components: { CustomTwoColumnTable }
};
</script>

<style scoped>
    table {
        background-color: #f3f3f3;
    }

    th {
        background-color: white;
        border: 0px;
        padding-top: 0.9rem;
        padding-bottom: 1.8rem;
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
</style>

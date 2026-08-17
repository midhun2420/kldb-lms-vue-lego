<template>
    <div class="color-txt">
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Nose Punching</h2>
        <div class="col-lg-2 pt-4 pl-0">
            <div class="form-group">
                <validated-vue-select class="c-input-select" placeholder="shed"></validated-vue-select>
            </div>
        </div>
        <div class="column fl-x">
            <div class="col-lg-6">
                <div class="row mt-4">
                    <div class="card pl-0 pr-0 pt-0 pb-0 w-30r">
                    <table style="width:100%">
                        <th class=""></th>
                        <th></th>
                        <tr>
                            <td class="text-black">KA 10289</td>
                            <td class="text-black">KA 18529</td>
                        </tr>
                        <tr>
                            <td class="text-black">KA 10289</td>
                            <td class="text-black">KA 18529</td>
                        </tr>
                        <tr>
                            <td class="text-black">KA 10289</td>
                            <td class="text-black">KA 18529</td>
                        </tr>
                         <tr>
                            <td class="text-black">KA 10289</td>
                            <td class="text-black">KA 18529</td>
                        </tr>
                    </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 pt-5">
                <div class="column fl-x">
                <div class="form-group">
                    <validated-input label="Animal" class="text-black" v-model="model.animal"></validated-input>
                </div>
                <div class="form-group pl-3">
                    <validated-input label="Renumber" class="text-black" v-model="model.renumber"></validated-input>
                </div>
                <div class="form-group pl-3">
                    <validated-vue-select class="c-input-select text-black" label="Breed" v-model="model.breed"></validated-vue-select>
                </div>
            </div>
            <div class="column fl-x">
                <div class="form-group">
                    <validated-input label="Date Of Birth" class="text-black" v-model="model.dob"></validated-input>
                </div>
                <div class="form-group pl-3">
                    <validated-input label="Age" class="text-black" v-model="model.age"></validated-input>
                </div>
                <div class="form-group pl-3">
                    <validated-date-picker label="Nose Punching Date" class="c-input-datepicker text-black" v-model="model.nosepunchdate"></validated-date-picker>
                </div>
            </div>
        </div>
    </div>

    <h6 class="pt-5 text-primary font-poppins-medium fs-lg-2">Enter Individually</h6>
    <div class="column fl-x pt-3">
        <div class="form-group">
            <validated-input label="Animal No/Name " class="text-black" v-model="model.animalno_or_name"></validated-input>
        </div>
        <div class="form-group pl-3">
            <validated-input label="Renumber" class="text-black" v-model="model.renumber"></validated-input>
        </div>
        <div class="form-group pl-3">
            <validated-input label="Shed No" class="text-black" v-model="model.shed_number"></validated-input>
        </div>
        <div class="form-group pl-3">
            <validated-input label="Breed" class="text-black" v-model="model.breed"></validated-input>
        </div>
        <div class="form-group pl-3">
            <validated-input label="Date Of Birth" class="text-black" v-model="model.dob"></validated-input>
        </div>
        <div class="form-group pl-3">
            <validated-input label="Age" class="text-black" v-model="model.age"></validated-input>
        </div>
    </div>
    <div class="col-2 pl-0">
        <div class="form-group">
            <validated-date-picker label="Nose Punching Date"  class="text-black" v-model="model.nosepunchdate"></validated-date-picker>
        </div>
    </div>
    <div class="column fl-x-br pt-7">
        <btn text="save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
        <btn class="ml-2" design="basic-b" text="Cancel"></btn>
    </div>
    </div>
</template>

<script>
export default {
    name: 'NosePunching2',
    data () {
        return {
            loading: false,

            model: {
                renumber: null,
                breed: null,
                dob: null,
                shed_number: null,
                breeding_value: null,
                animalno_or_name: null,
                age: null,
                dehorning_type: null,
                dehorningdate: null,
                animal: null,
                nosepunchdate: null

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
    padding-top: 0.9rem;
    padding-bottom:1.8rem;
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

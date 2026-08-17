<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Regularization</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
        <s-form @submit="addItem">
            <div class="row fl-x fl-j-e">
<!--                <div class="col-lg-6">-->
<!--                    <h2 class="head font-poppins-bold mt-3">Bull Regularization</h2>-->
<!--                </div>-->
                <div class="col-lg-6 fl-x-br pl-9 mt-4">
                    <img src="../../assets/img/logo/linkicon.png" class="mr-2">
                    <a class="text-primary font-poppins-medium" @click="loadDueData">Due for Regularization</a>
                </div>
                <modal title=" " ref="dueModal">
                    <div v-if="loadData">
                        <h6>Please wait while fetching the data...</h6>
                    </div>
                    <div v-else>
                        <h5 class="heading font-poppins-medium text-primary pb-3 bg-2 fl-x-cc mb-3">Due
                            for Regularization
                        </h5>
                        <div class="col-12 mb-3" v-if="selectedBullsList.length !==0">
                            <table style="width:100%">
                                <th class="text-primary">Animal No</th>
                                <th class="text-primary">Breed</th>
                                <th class="text-primary">Age</th>
                                <th class="text-primary">No of Collections</th>
                                <th class="text-primary">No of good collection</th>
<!--                                <th class="text-primary">Dam's Yield</th>-->
                                <tr v-for="(item, i) in selectedBullsList" :key="i">
                                    <td>{{ item.reg_no }}</td>
                                    <td v-if="item.breed">{{ item.breed.breed_name }}</td>
                                    <td v-else> ---</td>
                                    <td>{{ item.age }}</td>
<!--                                    <td>{{ item.damlacyield }}</td>-->
                                    <td>{{ item.no_of_collections }}</td>
                                    <td>{{ item.no_of_good_collections }}</td>
                                </tr>
                            </table>
                        </div>
                        <div v-else>
                            No Data Found
                        </div>
                    </div>

                </modal>
            </div>
            <div class="row mt-4 bb-1 pb-4">
                <div class="col-lg-2">
                    <validated-ajax-vue-select label="Animal No"
                                               :url="BullOptionURL" @input="loadDetails"
                                               class="c-input-select text-black field-required" v-model="model.animal_no" :rules="{required:true}"></validated-ajax-vue-select>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Renumber" disabled class="text-black" v-model="model.renumber"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Breed" disabled class="text-black" v-model="model.breed"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Age(in Months)" disabled class="text-black" v-model="model.age"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Sire no" disabled class="text-black" v-model="model.sire_no"></validated-input>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Dam No" disabled class="text-black" v-model="model.dam_no"></validated-input>
                </div>
            </div>

            <div class="row bb-1 mt-5 pb-4">
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           label="First Collection Date" class="text-black" v-model="model.first_collection_date"
                                           :rules=rules.FirstDate></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-date-picker format="DD-MM-YYYY"
                                           label="Regular Date"  class="text-black field-required" v-model="model.regular_date" :rules=rules.Date></validated-date-picker>
                </div>
                <div class="col-lg-2">
                    <validated-input label="Suggest a name for the bull" class="text-black label-font-sm field-required" v-model="model.bull_name"
                                     :rules="{required:true}"></validated-input>
                </div>
            </div>

<!--            <div class="row mt-5">-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="INAPH Code" class="text-black" v-model="model.inaph_code"></validated-input>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-vue-select label="Group Allotted"-->
<!--                                          :options="groupOption"-->
<!--                                          @input="FilterAndLoadDistrict(model.group)"-->
<!--                                          class="c-input-select text-black field-required"-->
<!--                                          v-model="model.group" :rules="{required:true}"></validated-vue-select>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-vue-select label="Allotted District" field-required multiple disabled-->
<!--                                          :options="distictOption" :rules="{required:true}"-->
<!--                                          class="text-black c-input-select-multiplevalue field-required" v-model="model.district"></validated-vue-select>-->
<!--                </div>-->
<!--                <div class="col-lg-2">-->
<!--                    <validated-input label="Remarks" class="text-black pl-3" v-model="model.remarks"></validated-input>-->
<!--                </div>-->
<!--            </div>-->
            <div class="column fl-x-br pt-7">
                <btn text="save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                <btn class="ml-2" design="basic-b" type="reset" @click="BackToHome" text="Cancel"></btn>
            </div>
        </s-form>
    </div>
</template>

<script>
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';
import urls from '../../data/urls';
// import urls from '../../data/urls';

export default {
    name: 'BullRegularization',

    data () {
        return {
            URL: urls.regularization.addEdit,
            groupOptionURL: masterURLs.master.group.vueSelect,
            distictOptionURL: masterURLs.master.location.district.vueSelect,
            distictOption: [],
            groupOption: [],
            loading: false,
            BullOptionURL: urls.regularization.selectedBulls,
            dob: '',
            model: {
                animal_no: '',
                renumber: '',
                breed: '',
                age: '',
                first_collection_date: '',
                regular_date: '',
                bull_name: '',
                inaph_code: '',
                district: '',
                name: '',
                sire_no: '',
                dam_no: '',
                remarks: '',
                group: ''

            },
            selectedBullsList: [],
            loadData: false,
            rules: {
                Date: {
                    required: true,
                    customValidator: (value) => {
                        return this.ValidationDate(value);
                    }
                },
                FirstDate: {
                    required: false,
                    customValidator: (value) => {
                        return this.ValidationDate(value);
                    }
                }
            }
        };
    },
    mounted () {
        this.loadDist();
        this.loadGroup();
    },
    methods: {
        ValidationDate (date) {
            const dob = this.dob;
            const dateParts = date.split('-');
            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const dobParts = dob.split('-');
            if (dobParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(dobDay) || isNaN(dobMonth) || isNaN(dobYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateObj <= dobDateObj) {
                return 'Date should be after the date of birth (DOB).';
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateObj > currentDate) {
                return 'datee Date not allowed.';
            }

            return true;
        },
        FilterAndLoadDistrict (value) {
            const selectedGroup = this.groupOption.find(group => group.value === value);
            this.model.district = selectedGroup.district_id;
        },
        async loadDetails () {
            const response = await axios.form(urls.bulls.details, { id: this.model.animal_no });
            const data = response.data.data;
            this.model.age = data.age_in_months;
            this.model.bull = data.id;
            this.model.renumber = data.renumber;
            this.model.breed = data.breed.breed_name;
            this.model.sire_no = data.sireno;
            this.model.dam_no = data.damno;
            this.dob = data.dob;
            this.model.first_collection_date = data.first_collection_date;
        },
        async loadDist () {
            const response = await axios.get(this.distictOptionURL);
            this.distictOption = response.data.data;
        },
        async loadGroup () {
            const response = await axios.get(this.groupOptionURL);
            this.groupOption = response.data.data;
        },
        BackToHome () {
            this.$router.push({ path: '/bull-regularization-list/' });
        },
        async loadDueData () {
            this.$refs.dueModal.show();
            this.loadData = true;
            const response = await axios.get(urls.regularization.selectedBullsList);
            console.log('response', response);
            this.selectedBullsList = response.data.data;
            this.loadData = false;
        },

        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$router.push({ path: '/semen-station/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            let errorMessage = '';
                            if (key === '__all__') {
                                errorMessage = `${errors[key]}`;
                            } else {
                                errorMessage = `${key}:  ${errors[key]}`;
                            }
                            this.$notify(errorMessage, 'Warning', { type: 'warning' });
                        }
                    }
                    this.loading = false;
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
h2 {
    color: #3954A4;
}

hr {
    height: 1px;
    /*border-width: 0px;*/
    color: #484848;
    background-color: #484848;
}

table {
    background-color: #f3f3f3;
    text-align: center;
    border: 0px;
}

th {
    background-color: white;
    border: white 0px !important;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    /*padding-left: 18px;*/
    text-align: center;
}

td {
    /*padding-left: 18px;*/
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;

}
</style>

<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Drying Status</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
         <s-form @submit="addItem" ref="form" :key="formKey">
<!--        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Drying Status</h2>-->
        <div class="row">
            <div class="col-lg-8">
<!--                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" label="Date" class="c-input-datepicker text-black field-required" :rules="rules.dateValidation" v-model="model.status_date"></validated-date-picker>
                    </div>
                </div>-->
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-ajax-vue-select label="Shed"
                                                   :url="shedOptionsURL"
                                                   class="c-input-select text-black field-required" :rules="{required:true}"  v-model="model.shed_number"  @input="loadCowOptions"></validated-ajax-vue-select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-vue-select
                            :options="cowOptions"  @input="loadDetailscow"
                            label="Animal" class="c-input-select text-black field-required" v-model="model.cow" :rules="{required:true}"></validated-vue-select>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-3">
                        <validated-date-picker format="DD-MM-YYYY" label="Date" class="c-input-datepicker text-black field-required" :rules="rules.dateValidation" v-model="model.status_date"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-vue-select label="Status"
                                              :options="statusOptionURL" disabled
                                              class="c-input-select text-black field-required" :rules="{required:true}" v-model="model.status"></validated-vue-select>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <table style="width:100%" class="m-height c-table-1 ml-5">
                    <thead>
                        <tr>
                            <th class="text-black">Animal</th>
                            <th class="text-black">DIM</th>
                            <th class="text-black">Status</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr v-for="(item, i) in model.details" :key="i">
                                <td>{{ item.regno }}</td>
                                <td>{{ item.dim }}</td>
                                <td>{{ item.status }}</td>
                            </tr>
                        </tbody>
                </table>

<!--                <custom-three-column-table class="ml-5" heading1="Animal" heading2="DIM" heading3="Status">-->
<!--                    <template #column1>-->
<!--                        <ul class="list-unstyled list-items ml-2">-->
<!--                            <li v-for="(item, i) in model.details" :key="i">{{ item.regno }}</li>-->
<!--                        </ul>-->
<!--                    </template>-->

<!--                    <template #column2>-->
<!--                    <ul class="list-unstyled list-items ml-2">-->
<!--                    <li v-for="(item, i) in model.details" :key="i">{{ item.dim }}</li>-->
<!--                    </ul>-->
<!--                    </template>-->

<!--                    <template #column3>-->
<!--                    <ul class="list-unstyled list-items ml-2">-->
<!--                    <li v-for="(item, i) in model.details" :key="i">{{ item.status }}</li>-->
<!--                    </ul>-->
<!--                    </template>-->

<!--                </custom-three-column-table>-->
            </div>
        </div>
        <div class="row mt-lg-6">
            <div class="col-12">
                <div class="fl-x fl-j-e">
                    <div class="btn-group">
                        <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                        <btn text="Cancel"  type="reset" @click="BackToHome" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>
         </s-form>
    </div>
</template>

<script>
// import CustomThreeColumnTable from '../../components/ui/CustomThreeColumnTable';
import urls from '../../data/urls';
import masterURLs from '../../data/masterURLs';
import axios from 'secure-axios';

export default {
    name: 'LactationStatus',
    data () {
        return {
            loading: false,
            // cowOptionURL: urls.cows.vueSelect,
            URL: urls.cowLactationStatus.addEdit,
            dobData: '',

            statusOptionURL: [
                { label: 'Lactating', value: 'Lactating' },
                { label: 'Drying', value: 'Drying' }
            ],
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=cow',
            model: {
                status_date: '',
                shed_number: '',
                status: 'Drying',
                cow: '',
                details: []
            },
            rules: {
                dateValidation: {
                    required: true,
                    customValidator: (value) => {
                        return this.validationdate(value);
                    }
                }
            },
            cowOptions: []
        };
    },
    methods: {
        validationdate (date) {
            const dob = this.dobData;
            const dobParts = dob.split('-');

            const dateParts = date.split('-');

            if (dateParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dateDay = parseInt(dateParts[0], 10);
            const dateMonth = parseInt(dateParts[1], 10);
            const dateYear = parseInt(dateParts[2], 10);

            const dateDateObj = new Date(dateYear, dateMonth - 1, dateDay);

            if (dobParts.length !== 3) {
                return 'Please enter a valid date in the format DD-MM-YYYY.';
            }
            const dobDay = parseInt(dobParts[0], 10);
            const dobMonth = parseInt(dobParts[1], 10);
            const dobYear = parseInt(dobParts[2], 10);

            const dobDateObj = new Date(dobYear, dobMonth - 1, dobDay);

            if (dateDateObj < dobDateObj) {
                return 'Enter a date after Date Of Birth (DOB).';
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (dateDateObj > currentDate) {
                return 'Future Date not allowed.';
            }

            return true;
        },
        async loadCowOptions () {
            this.model.cow = '';
            this.model.details = [];
            const response = await axios.get(urls.cowLactationStatus.allOptions + '?shed_number=' + this.model.shed_number + '&lac_status=Lactating');
            this.cowOptions = response.data.cow.data;
            this.model.details = response.data.details;
        },
        async loadDetailscow () {
            const response = await axios.form(urls.cowDetails.cowDetails, { id: this.model.cow });
            const data = response.data.data;
            this.dobData = data.dob;
            /* this.model.sire_name = data.bull_name;
            this.model.sirebreed = data.breed.breed_name; */
            console.log('Data', data);
        },
        // async loadDetails () {
        // const response = await axios.get(urls.cows.details + '?id=' + this.model.bull_allotted);
        // const data = response.data.data;
        // this.model.breed = data.breed.breed_name;
        // this.model.age = data.age;
        // this.details.renumber = data.renumber;
        // this.details.breed = data.breed.breed_name;
        // this.details.dob = data.dob;
        // this.details.shed_number = data.shed_number.name;
        // this.details.animalno_or_name = data.animalno_or_name;
        // },
        ClearAllData () {
            this.model.status_date = '';
            this.model.shed_number = '';
            this.model.cow = '';
            this.model.details = [];
            // this.cowOptions = [];
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.ClearAllData();
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    // await this.$router.push({ path: '/cows-list/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
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
        },
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        }
    }
    // components: { CustomThreeColumnTable }
};
</script>

<style scoped>
table {
    background-color: #f3f3f3;
    text-align: center;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    color: var(--color-primary);
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: black;
}

table, td, tr {
    border: none;
    border-collapse: collapse;
    color: black;
}

table, th, tr {
    border-radius: 3px;

}
</style>

<template>
    <div class="main">
        <s-form @submit="addItem">
            <div class="row">
                <div class="col-12">
                    <validated-input label="Employee Id"
                                     v-model="model.employee_id"></validated-input>
                </div>
                <div class="col-6">
                    <validated-input label="First Name"
                                     v-model="model.first_name"></validated-input>
                </div>
                <div class="col-6">
                    <validated-input label="Last Name"
                                     v-model="model.last_name"></validated-input>
                </div>
                <div class="col-12">
                    <validated-input placeholder=""
                                     type="email" label="Email" v-model="model.email"></validated-input>
                </div>
                <div class="col-12">
                    <validated-input placeholder="" label="Mobile" type="number"
                                     v-model="model.mobile_number"></validated-input>
                </div>
                <div class="col-6">
                    <validated-vue-select :options="stationOptions"
                                          placeholder="" label="Station"
                                          v-model="model.office"></validated-vue-select>
                </div>
                <div class="col-6">
                    <validated-vue-select :options="designationOptions" label="Designation" placeholder=""

                                          v-model="model.designation"></validated-vue-select>
                </div>
                <div class="col-12">
                    <div class="text-right">
                        <btn text="Save" :loading="loading" loading-text="Saving..."></btn>
                    </div>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'AddUser',
    props: {
        model: {
            type: Object
        }
    },
    data () {
        return {
            loading: false,
            URL: urls.user.userAddEdit,
            designationOptions: [
                { label: 'Managing Directer', value: 'Managing Directer' },
                { label: 'General Manager', value: 'General Manager' },
                { label: 'Personal Manager', value: 'Personal Manager' },
                { label: 'Deputy General Manager', value: 'Deputy General Manager' },
                { label: 'Assistant Manager', value: 'Assistant Manager' },
                { label: 'Livestock Inspector', value: 'Livestock Inspector' },
                { label: 'Office Assistant', value: 'Office Assistant' },
                { label: 'Agri Assistant', value: 'Agri Assistant' },
                { label: 'Project Coordinator', value: 'Project Coordinator' },
                { label: 'District Coordinator', value: 'District Coordinator' },
                { label: 'Coordinator', value: 'Coordinator' },
                { label: 'Officer', value: 'Officer' }
            ],
            stationOptions: [
                { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
                { label: 'Mattupetty', value: 'Mattupetty' },
                { label: 'Dhoni', value: 'Dhoni' },
                { label: 'Kulathupuzha', value: 'Kulathupuzha' },
                { label: 'Kolahalamedu', value: 'Kolahalamedu' },
                { label: 'Muvattupuzha', value: 'Muvattupuzha' },
                { label: 'Puthur', value: 'Puthur' },
                { label: 'Puthupady', value: 'Puthupady' },
                { label: 'Kannur', value: 'Kannur' },
                { label: ' Mananthavady', value: 'Mananthavady' },
                { label: 'Koothatukulam', value: 'Koothatukulam' },
                { label: 'Chalakudy', value: 'Chalakudy' },
                { label: 'Mavelikara', value: 'Mavelikara' }
            ]

        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/user-list/' });
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Updated Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    this.$emit('success');
                } else {
                    const errors = response.data.errors;
                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}:  ${errors[key]}`;
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

</style>

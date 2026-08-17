<template>
    <div class="color-txt">
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Quarantine</h2>
             <div class="mr-4">
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <div class="">
            <s-form>
                <div class="">
                    <div class="row">
<!--                        <div class="col-lg-12">-->
<!--                            <h3 class="text-primary mb-5 font-poppins-semibold ">Semen Quarantine</h3>-->
<!--                        </div>-->
                        <div class="col-lg-2 pr-0">
                            <validated-date-picker class="c-input-datepicker fs-lg--1 field-required" format="DD-MM-YYYY"
                                                   placeholder="Date of Production" @input="loadBulls" :rules="{required:true}"
                                                   v-model="model.production_date"></validated-date-picker>

                        </div>
                    </div>
                    <div class="row" v-if="model.production_date">
                        <div class="col-lg-12">

                            <div class="card pl-0 pr-0 pt-0 pb-0 w-60r">

                                <table style="width:100%" class="c-table-1">
                                    <th class="text-primary">Bull No</th>
                                    <th class="text-primary">Bull Name</th>
                                    <th class="text-primary">Ejaculate No</th>
                                    <th class="text-primary">Dose</th>
                                    <tr class="mt-3" v-if="loadingData">
                                        <td colspan="4">Please wait while fetching the data...</td>
                                    </tr>
                                    <tr v-for="(item, i) in bullsList" :key="i" @click="clickedBull(i)" style="cursor: pointer">
                                        <td>{{ item.bull.reg_no }}</td>
                                        <td>{{ item.bull.bull_name }}</td>
                                        <td>{{ item.ejaculation_no }}</td>
                                        <td>{{ item.dose }}</td>

                                    </tr>
                                </table>

                            </div>
                        </div>
                        <div class="col-lg-12">
                            <semen-quaratinetwo-fields
                                :index="selectedIndex"
                                :data="bullsList"
                                :prod="model.production_date"
                                ref="component" @data="addItem"></semen-quaratinetwo-fields>
                        </div>
                    </div>
                </div>
            </s-form>
        </div>
    </div>
</template>

<script>
import SemenQuaratinetwoFields from '../../components/SemenQuaratineTwo/SemenQuaratinetwoFields';
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'SemenQuarantine',
    components: { SemenQuaratinetwoFields },

    data () {
        return {
            URL: urls.semenQuarantine.addEdit,
            model: {
                production_date: null
            },
            bullsList: [],
            selectedIndex: '',
            loadingData: false
        };
    },
    methods: {
        async loadBulls () {
            this.loadingData = true;
            const response = await axios.form(urls.semenQuarantine.PendingListView, {
                production_date: this.model.production_date
            });
            this.bullsList = response.data.data;
            this.selectedIndex = '';
            this.loadingData = false;
        },
        clickedBull (index) {
            this.selectedIndex = index;
            console.log('this.selectedIndex:>>>>>>>>>>>:', this.selectedIndex);
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },

        resetFields () {
            this.details = {
                bull_no: '',
                bull_name: '',
                ejaculation_no: '',
                breed: ''
                // Reset other fields accordingly
            };
        },
        async addItem (data) {
            console.log('data', data);
            try {
                this.$refs.component.loadingTure();
                if (data.no_of_dose_ibr_screening > 0) {
                    if (data.ibr_location === '' ||
                    data.ibr_position === '' ||
                        data.ibr_storage_name === '' ||
                        data.ibr_storage_type === '' ||
                        data.ibr_remarks === '') {
                        this.$notify('Selected ibr dose for screening, so all fields related to ibr storage should be given', 'Warning', { type: 'warning' });
                        this.$refs.component.loadingFalse();
                    }
                }
                if (data.fsd_storage_type === data.ibr_storage_type &&
                    data.fsd_storage_name === data.ibr_storage_name &&
                    data.fsd_location === data.ibr_location &&
                    data.fsd_position === data.ibr_position &&
                    data.fsd_storage_type !== '' &&
                    data.fsd_storage_name !== '' &&
                    data.fsd_location !== '' &&
                    data.fsd_position !== '') {
                    this.$refs.component.errorMessage = true;
                    this.$refs.component.loadingFalse();
                    return;
                } else {
                    this.$refs.component.errorMessage = false;
                }

                const response = await axios.form(this.URL, data);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.$refs.component.loadingFalse();
                    await this.loadBulls();
                    // this.model.bull = '';
                    this.$refs.component.resetFields();
                    // data.fsd_storage_type = '';
                    // data.fsd_storage_name = '';
                    // data.fsd_location = '';
                    // data.fsd_position = '';
                    // data.ibr_storage_type = '';
                    // data.ibr_storage_name = '';
                    // data.ibr_location = '';
                    // data.ibr_position = '';
                    // data.ibr_remarks = '';
                    // data.fsd_remarks = '';
                    // data.actual_fsd = '';
                    // data.ibr_screening = '';
                    // data.bull_name = '';
                    // data.ejaculation_no = '';
                    // data.breed = '';
                    // data.fsd_dose = '';
                    // data.dose_type = '';
                    // data.actual_fsd_dose = '';
                    // data.quarantine_duration = '';
                    // data.no_of_dose_ibr_screening = '';
                    // this.$router.push({ path: '/semen-station/' });
                } else {
                    console.log(result.message);
                    if (result.message) {
                        this.$notify(result.message, 'Warning', { type: 'warning' });
                    } else if (result.errors) {
                        for (const key in result.errors) {
                            if (Object.prototype.hasOwnProperty.call(result.errors, key)) {
                                this.$notify(
                                    `${key}: ${result.errors[key]}`,
                                    'Warning',
                                    { type: 'warning' }
                                );
                            }
                        }
                    } else {
                        this.$notify(
                            'Something went wrong',
                            'Warning',
                            { type: 'warning' }
                        );
                    }

                    this.loading = false;
                }
                this.$refs.component.loadingFalse();
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.$refs.component.loadingFalse();
            }
        }
    }

};
</script>

<style scoped>

</style>

<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Destruction - Disposal</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form class="color-txt" @submit="addItem" ref="form">

<!--            <h3 class="text-primary mt-2 mb-4 font-poppins-semibold ">Semen Destruction - Disposal</h3>-->

            <div class="row">
                <div class="col-lg-2">
                    <validated-date-picker label="Date of Proposal" @input="onProposalDateChange" format="DD-MM-YYYY"
                                           class="c-input-datepicker field-required" v-model="model.proposal_date" :rules="{required:true}" :disabled-date="disabledProposalDate">></validated-date-picker>
                </div>
            </div>
            <div class="row" v-if="model.proposal_date">
                <div class="col-4 mt-3">
                    <div class="card pl-0 pr-0 pt-0 pb-0 of-h">
                        <div class="heading font-poppins-medium text-primary pt-3 mb-2 bg-2 fl-x-cc fs-lg--1">Disposal for Semen Destruction</div>
                        <table style="width:100%" class="c-table-1">
                            <thead>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary">Bull No</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary">Breed</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary">Dose Type</h5></th>
                            <th clas=""><h5 class=" w-100p bg-2  mb-0 text-left font-poppins-medium fs-lg-0 text-primary">Dose Disposed</h5></th>
                            </thead>

                                <tr v-for="(item, i) in data"  :key="i" @click="selectBull(i)" style="cursor: pointer">
                                <td>{{ item.bull.reg_no }}</td>
                                <td>{{ item.bull.breed }}</td>
                                <td>{{ item.dose_type }}</td>
                                <td>{{ item.dose_disposed_no }}</td>

                            </tr>

                        </table>

                    </div>

                </div>

            </div>
            <div class="row mt-5">
                <div class="col-lg-2">
                    <validated-date-picker label="Disposal Date" v-model="model.disposal_date"
                                           format="DD-MM-YYYY" :rules="rules.common" :disabled-date="disabledDisposalDate"
                                           class="field-required c-input-datepicker"></validated-date-picker>
                </div>

                <div class="col-lg-2">
                    <validated-input label="Proposal ID"
                                      v-model="detail.proposalId" class="" disabled ></validated-input>
                </div>

                <div class="col-lg-2">
                    <validated-input label="Approval No"
                                      v-model="model.approval_no" :rules="{required:true}" class="field-required"></validated-input>
                </div>
            </div>
            <div class="row mt-lg-6 fl-x-br">
                <div class="col-lg-6 pl-0">
                    <btn type="button" text="Generate Report" class="mr-4 " @click="downloadReport"></btn>
                </div>
                <div class="col-lg-6 fl-x-tr">
                    <btn text="Save" :loading="loading" loading-text="Saving..." class="mr-4 font-poppins-regular px-4"></btn>
                    <btn text="Cancel" design="basic-b" type="reset" @click="BackToHome" class=" "></btn>
                </div>
            </div>
        </s-form>
    </div>
</template>

<script>

import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'SemenDestructionDisposal',
    components: { },
    data () {
        return {
            loading: false,
            URL: urls.semenDestructionDisposal.addEdit,
            table_details: [],
            model: {
                proposal_date: '',
                disposal_date: '',
                approval_no: '',
                proposal: ''

            },
            detail: {
                proposalId: ''
            },
            data: [],
            rules: {
                common: {
                    required: true,
                    customValidator: (value) => {
                        return this.Validation(value);
                    }
                }
            }
        };
    },
    methods: {
        parseDates (dateStr) {
            if (!dateStr) return null;
            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        },
        disabledAfterToday (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        disabledProposalDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const disposal = this.parseDates(this.model.disposal_date);
            if (disposal) {
                disposal.setHours(0, 0, 0, 0);
            }
            return (
                date > today ||
            (disposal && date > disposal)
            );
        },
        disabledDisposalDate (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const proposal = this.parseDates(this.model.proposal_date);
            if (proposal) {
                proposal.setHours(0, 0, 0, 0);
            }
            return (
                date > today ||
            (proposal && date < proposal)
            );
        },
        /* async loadTableDetails () {
            this.model.cow = '';
            this.cow_name = '';
            const response = await axios.form(urls.daily_milk_recording.excelUpload, this.model);
            if (response.data.errors) {
                this.loading = false;
                const errors = response.data.errors;

                for (const key in errors) {
                    if (Object.prototype.hasOwnProperty.call(errors, key)) {
                        const errorMessage = `${key}:  ${errors[key]}`;
                        this.$notify(errorMessage, 'Warning', { type: 'warning' });
                    }
                }
            } else {
                this.table_details = response.data.cows_data;
                // this.cowOptions = response.data.data;
            }
        }, */
        selectBull (data) {
            const indexToFetch = data;
            const datas = this.data;
            if (indexToFetch >= 0 && indexToFetch < datas.length) {
                const dataItem = datas[indexToFetch];
                this.detail.proposalId = dataItem.id;
            }
            this.model.proposal = this.detail.proposalId;
            /*  this.detail.proposalId = data.id;
            this.selectedItem = data; */
        },
        async loadData () {
            const response = await axios.get(urls.semenDestructionDisposal.pendingList + '?proposal_date=' + this.model.proposal_date);
            this.data = response.data.data;
            this.detail.proposalId = this.data.id;
        },
        async onProposalDateChange () {
            await this.loadData();
            // revalidate disposal date
            this.$nextTick(() => {
                this.Validation(this.model.disposal_date);
            });
        },
        async downloadReport () {
            try {
                const that = this;
                that.downloading = true;
                const response = await axios.get(urls.semenDestructionDisposal.downloadReport + '?proposal_date=' + this.model.proposal_date + '&proposal=' + this.model.proposal);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    window.open(json.url);
                    this.$notify(json.message, 'Success', { type: 'success' });
                    this.model.proposal_date = '';
                } else {
                    that.downloading = false;
                    that.$notify(json.message || 'No data found', 'Warning', { type: 'warning' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                // this.$notify('No data found for the selected date range.', 'Warning', { type: 'warning' });
                this.$notify(
                    'Something went wrong. Please try again.',
                    'Error',
                    { type: 'danger' }
                );
            }
        },
        clearData () {
            this.model.proposal_date = '';
            this.model.disposal_date = '';
            this.model.approval_no = '';
            this.model.proposal = '';
            this.detail.proposalId = '';
            this.$refs.form.reset();
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.clearData();
                    // await this.loadProposalData();
                    // await this.$router.push({ path: '/semen-station/' });
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
        },
        BackToHome () {
            this.$router.push({ path: '/semen-station/' });
        },
        Validation (date) {
            const dob = this.model.proposal_date;
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
                return 'Disposal Date should be after the Proposal Date.';
            }

            return true;
        }
    }
};
</script>

<style scoped>

</style>

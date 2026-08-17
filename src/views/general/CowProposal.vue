<template>
    <s-form>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Proposal</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-1">
                        <validated-checkbox label="Bulls" v-model="model.is_bull" class="text-black"></validated-checkbox>
                    </div>
                    <div class="col-lg-1">
                        <validated-checkbox label="Cow" v-model="model.is_cow" class="text-black"></validated-checkbox>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Reg No." v-model="model.reg_no" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date of Proposal" v-model="model.proposal_date" class="text-black c-input-datepicker"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Reason for culling" v-model="model.culling_reason" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Book Value" v-model="model.book_value" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Live Body Weight" v-model="model.live_body_weight" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Meat Value" v-model="model.meat_value" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Mode of Disposal" v-model="model.disposal_mode" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" v-model="model.remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card pb-0 bs-4 border-r-1 of-h">
                    <h5 class="text-center bg-2 font-poppins-medium fs-lg-1 text-black">Details</h5>
                    <div class="row mt-3 bg-3 pb-4">
                        <div class="col-12 list-contain">
                            <slot></slot>
                            <ul class="list-unstyled list-items ml-2" v-if="!$slots.default">
                                <li><span>Date of Birth :</span></li>
                                 <li><span>Breed</span><span>:</span></li>
                                <li><span>No of Calving</span><span>:</span></li>
                                <li><span>Last AI Date</span><span>:</span></li>
                                <li><span>Pregnancy Status</span> <span>:</span></li>
                                <li><span>Location No</span> <span>:</span></li>
                                <li><span>Yield</span> <span>:</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-lg-4">
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
</template>

<script>
import urls from '../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'CowProposal',
    data () {
        return {
            loading: false,
            URL: urls.proposal.addEdit,
            model: {
                is_bull: '',
                is_cow: '',
                reg_no: '',
                proposal_date: '',
                culling_reason: '',
                book_value: '',
                live_body_weight: '',
                meat_value: '',
                disposal_mode: '',
                remarks: ''
            }
        };
    },
    methods: {
        async loadCowDetails () {
            const response = await axios.form(urls.proposal.animalDetail, this.model);
            this.register_no = response.data.reg_no;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.$router.push({ path: '/cows-list/' });
                } else {
                    const errors = response.data.errors;

                    for (const key in errors) {
                        if (Object.prototype.hasOwnProperty.call(errors, key)) {
                            const errorMessage = `${key}: ${errors[key]}`;
                            this.$notify('Warning', errorMessage, { type: 'warning' });
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
            this.$router.push({ path: '/general/' });
        }
    }
};
</script>

<style scoped lang="scss">
    .list-items, .list-contain ul {
        /*li:not(:nth-child(1)) {*/
        li {
            margin-top: var(--spacer-4);
            font-size: 0.9rem;
            font-family: poppins-medium;
            color: var(--text-3);

            > span {
                display: inline-block;
                max-width: 15rem;
            }

            display: flex;
            align-items: flex-start;
        }
    }
</style>

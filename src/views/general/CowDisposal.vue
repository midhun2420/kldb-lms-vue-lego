<template>
    <s-form>
        <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">Disposal</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-1">
                        <validated-checkbox label="Bulls" class="text-black"></validated-checkbox>
                    </div>
                    <div class="col-lg-1">
                        <validated-checkbox label="Cow" class="text-black"></validated-checkbox>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Reg No." class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-date-picker label="Date of Disposal" class="text-black c-input-datepicker"></validated-date-picker>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-vue-select label="Reason for culling" class="text-black c-input-select"></validated-vue-select>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Book Value" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Live Body Weight" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Meat Value" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Mode of Disposal" class="text-black"></validated-input>
                    </div>
                    <div class="col-lg-3">
                        <validated-input label="Approval No" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="To Whom" class="text-black"></validated-input>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-3">
                        <validated-input label="Remarks" class="text-black"></validated-input>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card pb-0 bs-4 border-r-1 of-h">
                    <h5 class="text-center bg-2 font-poppins-medium fs-lg-1 text-black">Details</h5>
                    <div class="row mt-3 bg-3 pb-4">
                        <div class="col-12 list-contain">
                            <slot></slot>
                            <ul class="list-unstyled list-items ml-2">
                                <li><span>Date of Proposal :</span></li>
                                <li><span>Breed</span><span>:</span></li>
                                <li><span>Date of Birth</span><span>:</span></li>
                                <li><span>No of Calving</span><span>:</span></li>
                                <li><span>Last AI Date</span><span>:</span></li>
                                <li><span>Pregnancy Status</span> <span>:</span></li>
                                <li><span>Cow Type</span> <span>:</span></li>
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
                        <btn text="Save" class="px-4"></btn>
                        <btn text="Cancel" design="basic-b" class="px-4"></btn>
                    </div>
                </div>
            </div>
        </div>

    </s-form>
</template>

<script>
export default {
    name: 'CowDisposal'
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

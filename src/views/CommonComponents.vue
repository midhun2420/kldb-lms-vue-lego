<template>
    <div>
        <div class="row">
            <div class="col-4">
                <custom-single-column-table></custom-single-column-table>
            </div>
            <div class="col-4">
                <custom-two-column-table></custom-two-column-table>
            </div>
            <div class="col-4">
                <custom-three-column-table class="ml-5" heading1="Animal" heading2="DIM" heading3="Status">
                    <template #column1>
                        <ul class="list-unstyled list-items ml-2">
                            <li>KA 10289</li>
                            <li>KA 12829</li>
                            <li>KA 14394</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                        </ul>
                    </template>
                    <template #column2>
                        <ul class="list-unstyled list-items ml-2">
                            <li>100</li>
                            <li>105</li>
                            <li>300</li>
                            <li>200</li>
                            <li>95</li>
                            <li>175</li>
                        </ul>
                    </template>
                    <template #column3>
                        <ul class="list-unstyled list-items">
                            <li>Lactating</li>
                            <li>Drying</li>
                            <li>Lactating</li>
                            <li>Lactating</li>
                            <li>Lactating</li>
                            <li>Drying</li>
                        </ul>
                    </template>
                </custom-three-column-table>
            </div>
            <div class="col-12">
                <custom-five-coulumn-table class="ml-5" heading1="Bull No" heading2="Bull Name" heading3="Breed"
                                           heading4="Ej No" heading5="Position">
                    <template #column1>
                        <ul class="list-unstyled list-items ml-2">
                            <li>KA 10289</li>
                            <li>KA 12829</li>
                            <li>KA 14394</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                            <li>KA 15626</li>
                        </ul>
                    </template>
                    <template #column2>
                        <ul class="list-unstyled list-items ml-2">
                            <li>100</li>
                            <li>105</li>
                            <li>300</li>
                            <li>200</li>
                            <li>95</li>
                            <li>175</li>
                        </ul>
                    </template>
                    <template #column3>
                        <ul class="list-unstyled list-items">
                            <li>Lactating</li>
                            <li>Drying</li>
                            <li>Lactating</li>
                            <li>Lactating</li>
                            <li>Lactating</li>
                            <li>Drying</li>
                        </ul>
                    </template>
                    <!--                    <template #column4>-->
                    <!--                        <ul class="list-unstyled list-items">-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Drying</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Drying</li>-->
                    <!--                        </ul>-->
                    <!--                    </template>-->
                    <!--                    <template #column5>-->
                    <!--                        <ul class="list-unstyled list-items">-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Drying</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Lactating</li>-->
                    <!--                            <li>Drying</li>-->
                    <!--                        </ul>-->
                    <!--                    </template>-->
                </custom-five-coulumn-table>

            </div>
            <div class="col-4">
                <validated-file-input label-text="Upload Pdf"></validated-file-input>
                <validated-file-input label-text="Upload Excel File"></validated-file-input>
                <validated-file-input file-types-info="Supported file Types : pdf, jpg"
                                      label-text="Upload Pdf"></validated-file-input>
            </div>

        </div>
        <conponent :model="data"></conponent>

        <h5>Details Page Components</h5>
        <div class="row">
            <div class="col-12">
                <tabs align="center" tabs-container-classes="b-unset" tab-title-classes="text-2 font-poppins-semibold">
                    <tab title="Basic Info"></tab>
                    <tab title="Basic Info"></tab>
                    <tab title="Basic Info"></tab>
                </tabs>
            </div>
            <div class="col-12">
                <details-tabs>
                    <tab container-classes="py-4" title="Basic Info"></tab>
                    <tab title="Medical Info"></tab>
                    <tab title="Semen Info"></tab>
                </details-tabs>
            </div>
            <div class="col-8">
                <details-table table-heading="Deworming" class="" :fields="fields" :data="dataItems">
                    <template #heading>
                        <h5 class="text-primary font-poppins-semibold fs-lg-2">Deworming</h5>
                    </template>
                    <template #buttons>
                        <btn>Add</btn>
                    </template>
                </details-table>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 fl-x-cc">
                <upload-image></upload-image>
            </div>
            <div class="col-lg-8">
                <cows-listing></cows-listing>
            </div>
        </div>
        <div class="details-item-top-banner bg bg-cover py-4">
            <row>
                <col-12 lg="3" class="fl-a-c">
                    <upload-image class="m-2"></upload-image>
                </col-12>
                <col-12 lg="9">
                    <row>
                        <col-12 lg="3">
                            <details-item label="Name" value="Amazon"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="AI Date" value="Germany"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam Breeding Value" value="*****"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Vaccination Date" value="*****"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Registration Number" value="KA12032"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Purchase Value" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam’s Milk Fat %" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Source Type " value="Unit Purchase"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Re Number" value="17054"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dehorning Date" value="15/01/2021"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam’s Protein %" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Source" value="12457"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Date of Birth" value="15/01/2021"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Nose Punching Date" value="15/01/2021"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Sire Number" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Unit" value="*******"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Shed Number" value="04"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam's Name" value="*******"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Sire Name" value="*******"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Transfer Date" value="45 L"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Breeding Value" value="XYZ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam's Number" value="12457"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Sire Breed" value="45 L"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Old Number" value="12457"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Breed" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam’s Breed" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Sire Dam Yield" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Country/State/Region" value="12457"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Birth Weight" value="200 kg"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam’s Best Lactation Yield" value="*****"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Sire Daughter’s Yield" value="*****"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Remarks"
                                          value="Lorem ipsum dolor sit amet, consectetur adipiscindo eiusmod tempor incididunt ut labore et dolor."></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="F1 calf or not" value="200 kg"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Dam’s Lactation No" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Projected Yield of Daughter" value="45 L"></details-item>
                        </col-12>
                        <col-12 lg="3">&nbsp;</col-12>
                        <col-12 lg="3">
                            <details-item label="Addition Date" value="15/01/2021"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Grand Dam Yield" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <details-item label="Vaccination Type" value="CJ"></details-item>
                        </col-12>
                        <col-12 lg="3">
                            <btn class="px-4 btn-2 b-1 b-light" color="secondary">Update</btn>
                        </col-12>

                    </row>
                </col-12>
            </row>
        </div>
        <div>
            <a-chamber></a-chamber>
        </div>
        <div class="fl-x">
            <b-chamber :bgColor="bgColor1" :textColor="textColor1" class="b-1 b-seventh">
                <div class="fs-lg-2 text-7  ">B1</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-eighth">
                <div class="fs-2 text-8">B2</div>

            </b-chamber>
        </div>

        <div class="fl-x">
            <b-chamber :bgColor="bgColor1" :textColor="textColor1" class="b-1 b-nineth">
                <div class="fs-lg-2 text-9  ">C1</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-danger">
                <div class="fs-lg-2 text-danger">C2</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-success">
                <div class="fs-lg-2 text-success">C3</div>

            </b-chamber>
        </div>
        <div class="fl-x">
            <b-chamber :bgColor="bgColor1" :textColor="textColor1" class="b-1 b-eighth">
                <div class="fs-2 text-8  ">D1</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-tenth">
                <div class="fs-lg-2 text-10">D2</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-nineth">
                <div class="fs-lg-2 text-9">D3</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-success">
                <div class="fs-lg-2 text-success">D4</div>

            </b-chamber>
        </div>
        <div class="fl-x">
            <b-chamber :bgColor="bgColor1" :textColor="textColor1" class="b-1 b-seventh">
                <div class="fs-2 text-7  ">E1</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2"  class="b-1 b-eighth">
                <div class="fs-2 text-8">E2</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-danger">
                <div class="fs-2 text-danger">E3</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-tenth">
                <div class="fs-2 text-10">E4</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-seventh">
                <div class="fs-2 text-7">E5</div>

            </b-chamber>
        </div>
        <div class="fl-x">
            <b-chamber :bgColor="bgColor1" :textColor="textColor1" class="b-1 b-nineth">
                <div class="fs-2 text-9  ">F1</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-success">
                <div class="fs-2 text-success">F2</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-danger">
                <div class="fs-2 text-danger">F3</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-eighth">
                <div class="fs-2 text-8" >F4</div>

            </b-chamber>
             <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-danger">
                <div class="fs-2 text-danger">F5</div>

            </b-chamber>
            <b-chamber :bgColor="bgColor2" :textColor="textColor2" class="b-1 b-tenth">
                <div class="fs-2 text-10">F6</div>

            </b-chamber>

        </div>
<div class="row">
        <chart-labels text="A-filled" box-bg-color="9" class="mr-5"></chart-labels>
        <chart-labels text="Upto B-filled" box-bg-color="5" class="mr-5"></chart-labels>
        <chart-labels text="Vaccant" box-bg-color="11" class="mr-5"></chart-labels>
        <chart-labels text="Vaccant" box-bg-color="12" class="mr-5"></chart-labels>
        <chart-labels text="Vaccant" box-bg-color="9" class="mr-5"></chart-labels>

    <chart-labels text="Upto E-Filled" box-bg-color="10" class="mr-5"></chart-labels>
</div>
    </div>
</template>

<script>
import CustomSingleColumnTable from '../components/ui/CustomSingleColumTable';
import CustomTwoColumnTable from '../components/ui/CustomTwoColumnTable';
import CustomThreeColumnTable from './cows/daily-milk-recording/DailyMilkRecordingTable';
import CustomFiveCoulumnTable from '@components/ui/CustomFiveCoulumnTable';
import CowsListing from '@components/HerdManagement/cows-listing';
import DetailsTabs from '../components/details-page/details-tabs';
import DetailsTable from '../components/details-page/details-table';
import UploadImage from '@components/HerdManagement/upload-image';
import Conponent from '@components/HerdManagement/cowslistings';
import DetailsItem from '../components/details-page/DetailsItem';
import AChamber from '@/views/bulls/semen-storage-diagram/A-Chamber';
import BChamber from '@/views/bulls/semen-storage-diagram/B-Chamber';
import ChartLabels from '@/views/bulls/semen-storage-diagram/components/chart-components/ChartLabels';

export default {
    name: 'CommonComponents',
    components: {
        ChartLabels,
        BChamber,
        AChamber,
        DetailsItem,
        Conponent,
        UploadImage,
        CowsListing,
        DetailsTable,
        DetailsTabs,
        CustomFiveCoulumnTable,
        CustomThreeColumnTable,
        CustomTwoColumnTable,
        CustomSingleColumnTable
    },
    data () {
        return {
            bgColor1: '#f7f7f7',
            textColor1: 'blue',
            bgColor2: '#f7f7f7',
            textColor2: 'black',

            fields: [
                {
                    name: 'date',
                    title: 'Date',
                    titleClass: 'text-2 fs-lg--1 b-unset',
                    dataClass: 'text-2 bg-1 my-3 b-unset mb-3 fs-lg-0 h-80p'
                },
                {
                    name: 'medicine_name',
                    title: 'Medicine Name',
                    titleClass: 'text-2 fs-lg--1 b-unset',
                    dataClass: 'text-2 bg-1 my-3 b-unset fs-lg-0 h-80p'
                },
                {
                    name: 'batch_no',
                    title: 'Batch No.',
                    titleClass: 'text-2 fs-lg--1 w-10r b-unset',
                    dataClass: 'text-2 bg-1 my-3 b-unset fs-lg-0'
                },
                {
                    name: 'quantity',
                    title: 'Quantity',
                    titleClass: 'text-2 fs-lg--1 b-unset',
                    dataClass: 'text-2 bg-1 my-3 b-unset fs-lg-0'
                },
                {
                    name: 'remarks',
                    title: 'Remarks',
                    titleClass: 'text-2 fs-lg--1 w-15r b-unset',
                    dataClass: 'text-2 bg-1 my-3 b-unset fs-lg-0'
                }
            ],
            dataItems: [
                {
                    date: '05-02-2021',
                    medicine_name: '160 Cm',
                    batch_no: '975.56 Kg',
                    quantity: '975.56 Kg',
                    remarks: 'Lorem ipsum dolor sit amet'
                }, {
                    date: '06-03-2021',
                    medicine_name: '158 Cm',
                    batch_no: '898.36 Kg',
                    quantity: '898.36 Kg',
                    remarks: 'Sed ut perspiciatis unde omniserror sit voluptatem accusanti'
                }
            ],
            bannerDataItems: [
                {
                    label: 'Name',
                    value: 'Amazon'
                },
                {
                    label: 'AI Date',
                    value: 'Germany'
                },
                {
                    label: 'Registration Number',
                    value: 'KA12032'
                }
            ]
        };
    }
};
</script>

<style scoped lang="scss">
.details-item-top-banner {
    background-image: url('../assets/web/details-page/details-bg.png');
}

//#app {
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  height: 100vh;
//}
</style>

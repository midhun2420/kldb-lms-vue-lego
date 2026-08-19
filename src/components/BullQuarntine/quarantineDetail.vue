<template>
  <div>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Quarantine Details</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
      <div class="col-lg-12">
<!--        <h3 class="text-primary mt-2 mb-4 font-poppins-semibold">Bull Quarantine Details</h3>-->

        <div class=" mt-3">
          <!-- Bull Basic Info -->
          <h4 class="text-primary mb-3 font-poppins-semibold bb-2 mt-5">Bull Details</h4>
            <div class="row">
              <div class="col-lg-3">
                  <validated-input label="Bull" v-model="detailItem.bull.reg_no" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Breed" v-model="detailItem.bull.breed" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Shed" v-model="detailItem.bull.shed" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Status" v-model="detailItem.bull.status" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>

            </div>
          <hr />

          <!-- Quarantine Information -->
            <h4 class="text-primary mb-3 font-poppins-semibold bb-2">Quarantine Details</h4>
            <div class="row">
              <div class="col-lg-3">
                  <validated-input label="Start Date" v-model="detailItem.start_date" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="End Date" v-model="detailItem.end_date" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
<!--              <div class="col-lg-3">-->
<!--                  <validated-input label="Training Date" v-model="detailItem.training_date" class="mr-4 text-black" :disabled="true"></validated-input>-->
<!--              </div>-->
              <div class="col-lg-3">
                  <validated-input label="Addition date" v-model="detailItem.addition_date" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>

            </div>

          <hr />

         <!-- Disease Results -->
            <h4 class="text-primary mb-3 font-poppins-semibold bb-2">Disease Test Results</h4>

            <div class="row">
              <div class="col-lg-3">
                  <validated-input label="TB" v-model="detailItem.tb" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Brucella" v-model="detailItem.brucella" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="IBR" v-model="detailItem.ibr" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="BVD1" v-model="detailItem.bvd1" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="BVD2" v-model="detailItem.bvd2" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Karyotyping" v-model="detailItem.karyotyping" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Dumps" v-model="detailItem.dumps" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Citrullinemia" v-model="detailItem.citrullinemia" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="FactorXI" v-model="detailItem.factor_x1" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="Brachyspina" v-model="detailItem.brachyspina" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="CVM" v-model="detailItem.cvm" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="HH3" v-model="detailItem.hh3" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="HH1" v-model="detailItem.hh1" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>
              <div class="col-lg-3">
                  <validated-input label="JH1" v-model="detailItem.jh1" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>

              <div class="col-lg-3">
<!--                <label class="mr-2 font-poppins-semibold" style="min-width:120px;">BLAD:</label>-->
                  <validated-input label="BLAD" v-model="detailItem.blad" class="mr-4 text-black" :disabled="true"></validated-input>
              </div>

            </div>

            <hr />
            <h4 class="text-primary mb-3 font-poppins-semibold bb-2">Reports</h4>
            <div class="row">
                <div class="report-table mt-3">
                  <table class="table table-bordereless">
                    <tbody>
                      <tr v-for="i in Math.ceil(reportTests.length / 2)" :key="i">

                        <!-- First Column Label -->
                        <td class="font-weight-bold col-label">
                          {{ reportTests[(i - 1) * 2].label }}
                        </td>

                        <!-- First Column Value -->
                        <td class="col-value">
<!--                          <span v-if="detailItem[reportTests[(i - 1) * 2].key]">-->
<!--                            <a :href="detailItem[reportTests[(i - 1) * 2].key]" target="_blank">-->
<!--                              {{ detailItem[reportTests[(i - 1) * 2].key].split('/').pop() }}-->
<!--                            </a>-->
<!--                          </span>-->
                            <div v-if="detailItem[reportTests[(i - 1) * 2].key] &&
                                    detailItem[reportTests[(i - 1) * 2].key].length">
                            <div v-for="(file, index) in detailItem[reportTests[(i - 1) * 2].key]" :key="index">
                                <a :href="file" target="_blank" class="file-link" :title="file.split('/').pop()">{{ file.split('/').pop() }}</a>
                            </div>
                        </div>
                          <span v-else>-</span>
                        </td>

                        <!-- Second Column Label (check exists) -->
                        <td v-if="reportTests[(i - 1) * 2 + 1]" class="font-weight-bold">
                          {{ reportTests[(i - 1) * 2 + 1].label }}
                        </td>

                        <!-- Second Column Value -->
                        <td v-if="reportTests[(i - 1) * 2 + 1]">
<!--                          <span v-if="detailItem[reportTests[(i - 1) * 2 + 1].key]">-->
<!--                            <a :href="detailItem[reportTests[(i - 1) * 2 + 1].key]" target="_blank">-->
<!--                              {{ detailItem[reportTests[(i - 1) * 2 + 1].key].split('/').pop() }}-->
<!--                            </a>-->
<!--                          </span>-->
                            <div v-if="detailItem[reportTests[(i - 1) * 2 + 1].key] && detailItem[reportTests[(i - 1) * 2 + 1].key].length">
                                <div v-for="(file, index) in detailItem[reportTests[(i - 1) * 2 + 1].key]" :key="index">
                                    <a :href="file" target="_blank" class="file-link" :title="file.split('/').pop()"> {{ file.split('/').pop() }} </a>
                                </div>
                            </div>
                          <span v-else>-</span>
                        </td>

                      </tr>
                    </tbody>
                  </table>
            </div>

            </div>

        </div>
      </div>
    </div>

    <div class="color-txt" v-if="selectedType !== ''">
      <bull-quarantine :clear-data="clearData" :type="selectedType"></bull-quarantine>
    </div>
  </div>
</template>

<script>
import BullQuarantine from '../../components/BullQuarntine/BullQuarantine';
import urls from '../../data/urls';
import axios from 'secure-axios';
import detailsItem from '../details-page/DetailsItem.vue';

export default {
    name: 'BullQuaratineTwo',
    computed: {
        detailsItem () {
            return detailsItem;
        }
    },
    components: { BullQuarantine },
    data () {
        return {
            selectedType: '',
            quarantineId: this.$route.params.id,
            clearData: false,
            detailItem: [],
            diseaseTests: [
                { label: 'TB', key: 'tb' },
                { label: 'Brucella', key: 'brucella' },
                { label: 'IBR', key: 'ibr' },
                { label: 'BVD1', key: 'bvd1' },
                { label: 'BVD2', key: 'bvd2' },
                { label: 'Karyotyping', key: 'karyotyping' },
                { label: 'Dumps', key: 'dumps' },
                { label: 'Citrullinemia', key: 'citrullinemia' },
                { label: 'Factor XI', key: 'factor_x1' },
                { label: 'BLAD', key: 'blad' }
            ],
            reportTests: [
                { label: 'TB', key: 'tb_jd_report' },
                { label: 'Brucella', key: 'brucella_report' },
                { label: 'IBR', key: 'ibr_report' },
                { label: 'BVD1', key: 'bvd1_report' },
                { label: 'BVD2', key: 'bvd2_report' },
                { label: 'Karyotyping', key: 'karyotyping_report' },
                { label: 'Breeding Soundness', key: 'breeding_soundness_report' },
                { label: 'Genetic Disease Report', key: 'genetic_disease_screening_report' },
                { label: 'Parentage Verification Report', key: 'parentage_verification_report' },
                { label: 'Pedigree of Sire & Dam', key: 'sire_dam_pedigree' },
                { label: 'Remarks', key: 'remarks_report' }
            ]

        };
    },
    mounted () {
        console.log('---inside mounted---');
        this.quarantineDetails();
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/bull-quarantine/' });
        },
        async quarantineDetails () {
            console.log('---inside quarantineDetails---');

            try {
                const response = await axios.form(urls.quarantine.details, { id: this.quarantineId });
                this.detailItem = response.data.data || []; // adjust as per API response
                console.log('API Success --------', this.detailItem);
            } catch (error) {
                console.error('API Error --------', error);
                this.detailItem = [];
            }
        }

    }
};
</script>

<style scoped>
.fa-eye {
    color: green; /* or any hex: #28a745 for Bootstrap green */
    cursor: pointer; /* optional: shows pointer on hover */
}

.fa-eye:hover {
    opacity: 0.8; /* optional: slight hover effect */
}

.report-table table {
  width: 100%;
  border-collapse: separate !important;
  border-spacing: 0 !important;
}

.report-table td {
  padding: 8px 10px;
  border: none !important;
}

.report-table tr {
  border: none !important;
}

.report-table table * {
  border: none !important;
}

/* Add space after first column pair */
.col-value {
  padding-right: 120px !important; /* increase gap here */
}

/* Optionally widen label col for neat alignment */
.col-label {
  width: 180px; /* adjust as needed */
  display: inline-block;
}
.file-link {
    display: inline-block;
    max-width: 250px; /* adjust width */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
}
</style>

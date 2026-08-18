<template>
    <div>
        <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Bull Disease Screening</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>
        </div>
        <s-form class="color-txt" @submit="addItem" ref="form">
            <div class="col-lg-12">
<!--                <h3 class="text-primary mt-2 mb-4 font-poppins-semibold fs-lg-4">-->
<!--                    Bull Disease Screening-->
<!--                </h3>-->

                <div class="row">
                    <div class="col-lg-2">
                        <validated-ajax-vue-select class="c-input-select field-required"
                            :url="diseaseTypeOptionURL"
                            label="Disease Type"
                            v-model="model.disease_type"
                            :rules="{required:true}">
                        </validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-2">
                        <validated-date-picker label="Screening Date" format="DD-MM-YYYY"
                            class="c-input-datepicker field-required"
                            v-model="model.screening_date"
                            :rules="{required:true}">
                        </validated-date-picker>
                    </div>

                    <div class="col-lg-2">
                        <validated-ajax-vue-select
                            :url="frequencyOptionURL"
                            class="c-input-select field-required"
                            label="Screening Frequency"
                            v-model="model.screening_frequency"
                            :rules="{required:true}">
                        </validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-2">
                        <validated-ajax-vue-select class="c-input-select"
                            :url="agencyOptionURl"
                            label="Agency"
                            v-model="model.agency">
                        </validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-2">
                        <validated-date-picker label="Result Date" format="DD-MM-YYYY"
                            class="c-input-datepicker field-required"
                            v-model="model.result_date"
                            :rules="rules.common">
                        </validated-date-picker>
                    </div>

                    <div class="col-lg-2">
                        <validated-ajax-vue-select multiple class="c-input-select-multiplevalue field-required"
                            @input="loadBullOptions"
                            :url="shedOptionsURL"
                            label="Shed No"
                            v-model="model.shed_number"
                            :rules="{required:true}">
                        </validated-ajax-vue-select>
                    </div>

                    <div class="col-lg-2">
                        <validated-vue-select multiple @input="calculateBulls"
                            :options="bullOptions" :show-loading-prepend="dataLoading"
                            class="c-input-select-multiplevalue field-required"
                            label="Animals"
                            v-model="model.bull"
                            :rules="{required:true}">
                        </validated-vue-select>
                    </div>

<!--                    <div class="col-lg-2">-->
<!--                        <validated-select-->
<!--                            :options="statusOptionURL" @input="calculateBulls"-->
<!--                            class="c-input-select"-->
<!--                            label="Status"-->
<!--                            v-model="model.status">-->
<!--                        </validated-select>-->
<!--                    </div>-->

<!--                    <div class="col-lg-2">-->
<!--                        <validated-input label="Total Animals(in Shed)"-->
<!--                            :show-loading-prepend="dataLoading"-->
<!--                            disabled-->
<!--                            v-model="model.total_animals">-->
<!--                        </validated-input>-->
<!--                    </div>-->

<!--                    <div class="col-lg-2">-->
<!--                        <validated-input label="No of animals positive"-->
<!--                            :show-loading-prepend="dataLoading"-->
<!--                            disabled-->
<!--                            v-model="model.no_of_animals_positive">-->
<!--                        </validated-input>-->
<!--                    </div>-->

<!--                    <div class="col-lg-2">-->
<!--                        <validated-input label="No of animals negative"-->
<!--                            :show-loading-prepend="dataLoading"-->
<!--                            disabled-->
<!--                            v-model="model.no_of_animals_negative">-->
<!--                        </validated-input>-->
<!--                    </div>-->

                    <div class="col-lg-2">
                        <validated-input label="Remarks" v-model="model.remarks">
                        </validated-input>
                    </div>

                    <div class="col-lg-2 mt-4">
                        <validated-file-input label-text="Upload pdf"
                            v-model="model.screening_file" :key="fileInputKey"
                            class="w-10r">
                        </validated-file-input>
                    </div>
                </div> <!-- row -->

                <div class="row mt-lg-1">
                    <div class="col-12">
                        <div class="fl-x fl-j-e">
                            <div class="btn-group">
                                <btn text="Save" :loading="loading" loading-text="Saving..." class="px-4"></btn>
                                <btn text="Cancel" design="basic-b" type="reset" @click="BackToHome" class="px-4"></btn>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- col-lg-12 -->
        </s-form>
        <div>
            <div>
                <h4 class="text-primary mt-2 mb-4 font-poppins-semibold ">Bull Screening List</h4>
            </div>
            <vue-table ref="table" :fields="fields" :url="screeningListURL" :per-page="10" search-placeholder="Bull">
                <template slot="screening_file" slot-scope="props">
                        <a
                            v-if="props.rowData.screening_file"
                            :href="props.rowData.screening_file"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ getFileName(props.rowData.screening_file) }}
                        </a>
                        <span v-else>-</span>
                </template>
            </vue-table>
<!--            <table style="width:100%" class="c-table-1 mt-2">-->
<!--                <th class="text-primary">Bull</th>-->
<!--                <th class="text-primary">Screening Date</th>-->
<!--                <th class="text-primary">Disease Type</th>-->
<!--&lt;!&ndash;                <th class="text-primary">Status</th>&ndash;&gt;-->
<!--                <th class="text-primary">Uploaded File</th>-->
<!--                <tr v-for="(item, i) in paginatedBulls" :key="i">-->
<!--                    <td style="white-space: pre-line">{{ item.regno}}</td>-->
<!--                    <td>{{ item.screening_date }}</td>-->
<!--&lt;!&ndash;                    <td>{{ item.status}}</td>&ndash;&gt;-->
<!--                    <td>{{ item.disease_type}}</td>-->
<!--                    <td>-->
<!--                      <span v-if="item.screening_file">-->
<!--                        <a :href="item.screening_file" target="_blank">-->
<!--                          {{ item.screening_file.split('/').pop() }} &lt;!&ndash; show only filename &ndash;&gt;-->
<!--                        </a>-->
<!--                      </span>-->
<!--                      <span v-else>-</span>-->
<!--                    </td>-->

<!--                </tr>-->
<!--            </table>-->
        </div>
<!--        <div class="pagination text-center">-->
<!--            <btn-group class="ml-2">-->
<!--              <btn class="mr-2" v-if="currentPage > 1" @click="prevPage"><img src="../../assets/web/icons/icon-left-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--              <span class="font-poppins-small fs-lg-0 text-primary">Page {{ currentPage }} of {{ totalPages }}</span>-->
<!--              <btn class="ml-2" v-if="currentPage < totalPages" @click="nextPage"><img src="../../assets/web/icons/icon-right-arrow.png" style="width: 16px; height: 16px;" alt="<-" /></btn>-->
<!--                </btn-group>-->
<!--        </div>-->
    </div>
</template>

<script>
import axios from 'secure-axios';
import masterURLs from '../../data/masterURLs';
import urls from '../../data/urls';

export default {
    name: 'BullDiseaseScreening',
    data () {
        return {
            loading: false,
            dataLoading: false,
            fileInputKey: 0,
            URL: urls.diseaseScreening.addEdit,
            agencyOptionURl: masterURLs.master.agency.vueSelect,
            shedOptionsURL: masterURLs.master.shed.vueSelect + '?animal=bull',
            diseaseTypeOptionURL: masterURLs.master.diseaseType.vueSelect,
            frequencyOptionURL: masterURLs.master.frequency.vueSelect,
            // # added list url
            screeningListURL: urls.diseaseScreening.list,
            fields: [
                {
                    name: 'regno',
                    title: 'Bull'
                },
                {
                    name: 'screening_date',
                    title: 'Screening Date'
                },
                {
                    name: 'disease_type',
                    title: 'Disease Type'
                },
                {
                    name: '__slot:screening_file',
                    title: 'Uploaded File'
                }
            ],
            selectedBullsList: [],
            itemsPerPage: 10,
            currentPage: 1,
            statusOptionURL: [
                { label: 'Positive', value: 'positive' },
                { label: 'Negative', value: 'negative' },
                { label: 'Recheck ', value: 'recheck ' }
            ],
            model: {
                disease_type: '',
                screening_date: '',
                agency: '',
                screening_frequency: '',
                result_date: '',
                shed_number: '',
                status: '',
                total_animals: '',
                no_of_animals_positive: '',
                no_of_animals_negative: '',
                remarks: '',
                bull: [],
                screening_file: ''
            },
            bullOptions: [],
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

    //  for pagination
    computed: {
        paginatedBulls () {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.selectedBullsList.slice(start, start + this.itemsPerPage);
        },
        totalPages () {
            return Math.ceil(this.selectedBullsList.length / this.itemsPerPage);
        }
    },
    // -----------------------------------------------------------------------------

    mounted () {
        console.log('---inside mounted---');
        this.loadBulls();
    },

    methods: {
        //  for list view on 07-11-2025
        nextPage () {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage () {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        getFileName (path) {
            if (!path) return '';
            return path.split('/').pop(); // Extracts the filename from a full path
        },
        // list of the bulls
        async loadBulls () {
            console.log('---inside loadBulls---');

            try {
                const response = await axios.get(this.screeningListURL);
                this.selectedBullsList = response.data.data || []; // adjust as per API response
                console.log('API Success --------', this.selectedBullsList);
            } catch (error) {
                console.error('API Error --------', error);
                this.selectedBullsList = [];
            }
        },
        // ----------------------------------------------------------------------------------
        async loadBullOptions () {
            // this.dataclear();
            this.dataLoading = true;
            this.model.status = '';
            this.model.total_animals = '';
            this.model.no_of_animals_positive = '';
            this.model.no_of_animals_negative = '';
            this.model.remarks = '';
            const response = await axios.get(urls.bulls.vueSelects + '?shed_number=' + this.model.shed_number);
            this.bullOptions = response.data.data;
            this.dataLoading = false;
            this.totalAnimals();
        },
        totalAnimals () {
            this.model.total_animals = this.bullOptions.length;
            this.model.no_of_animals_negative = 0;
            this.model.no_of_animals_positive = 0;
        },
        // calculateBulls () {
        //     console.log(this.model.bull.length);
        //     const selectedBulls = this.model.bull.length;
        //     const totalBulls = this.bullOptions.length;
        //     const remainingBulls = totalBulls - selectedBulls;
        //     this.model.no_of_animals_positive = selectedBulls;
        //     this.model.no_of_animals_negative = remainingBulls;
        // },
        calculateBulls () {
            const selectedBulls = this.model.bull.length;
            const totalBulls = this.bullOptions.length;

            if (this.model.status === 'positive') {
                this.model.no_of_animals_positive = selectedBulls;
                this.model.no_of_animals_negative = totalBulls - selectedBulls;
            } else if (this.model.status === 'negative') {
                this.model.no_of_animals_negative = selectedBulls;
                this.model.no_of_animals_positive = totalBulls - selectedBulls;
            } else {
                this.model.no_of_animals_positive = 0;
                this.model.no_of_animals_negative = 0;
            }
        },
        dataclear () {
            this.model.bull = '';
            this.model.disease_type = '';
            this.model.screening_date = '';
            this.model.agency = '';
            this.model.screening_frequency = '';
            this.model.result_date = '';
            this.model.shed_number = '';
            this.model.status = '';
            this.model.total_animals = '';
            this.model.no_of_animals_positive = '';
            this.model.no_of_animals_negative = '';
            this.model.remarks = '';
            this.model.bull = '';
            this.model.screening_file = '';
            this.$refs.form.reset();
        },
        Validation (date) {
            const screeningdate = this.model.screening_date;
            const dateParts = date.split('-');

            if (dateParts.length !== 3) {
                return 'Please enter a valid AI date in the format DD-MM-YYYY.';
            }
            const aiDay = parseInt(dateParts[0], 10);
            const aiMonth = parseInt(dateParts[1], 10);
            const aiYear = parseInt(dateParts[2], 10);

            const screeningdateParts = screeningdate.split('-');
            if (screeningdateParts.length !== 3) {
                return 'Please enter a valid DOB in the format DD-MM-YYYY.';
            }
            const screeningdateDay = parseInt(screeningdateParts[0], 10);
            const screeningdateMonth = parseInt(screeningdateParts[1], 10);
            const screeningdateYear = parseInt(screeningdateParts[2], 10);

            if (isNaN(aiDay) || isNaN(aiMonth) || isNaN(aiYear) || isNaN(screeningdateDay) || isNaN(screeningdateMonth) || isNaN(screeningdateYear)) {
                return 'Please enter valid dates in the format DD-MM-YYYY.';
            }

            const dateObj = new Date(aiYear, aiMonth - 1, aiDay);
            const screeningdateDateObj = new Date(screeningdateYear, screeningdateMonth - 1, screeningdateDay);

            if (dateObj <= screeningdateDateObj) {
                return 'Date should be after the Screening date';
            }

            return true;
        },
        async addItem () {
            try {
                this.loading = true;
                const response = await axios.form(this.URL, this.model);
                const result = response.data;
                if (result.success) {
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    await this.loadBulls();
                    this.dataclear();
                    this.fileInputKey++;
                    if (this.$refs.form && typeof this.$refs.form.reset === 'function') {
                        this.$refs.form.reset();
                    }
                    this.formKey++;
                    await this.$refs.table.refreshTable();
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
        }
    }

};
</script>

<style scoped>

</style>

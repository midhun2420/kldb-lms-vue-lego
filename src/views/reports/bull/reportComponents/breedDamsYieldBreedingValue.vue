<template>
  <div class="row">
    <div class="col-12 mt-3">
      <h3 class="text-primary fs-lg-4 font-poppins-semibold">
        Bulls Search based on Breed / Dams yield/ Breeding value
      </h3>
    </div>
    <div class="col-12 mt-3">
      <s-form @submit="downloadReport" class="">
        <div class="row">
          <div class="col-lg-2">
            <validated-checkbox label="Dead" v-model="model.dead"/>
          </div>
          <div class="col-lg-2">
            <validated-checkbox label="Alive" v-model="model.alive"/>
          </div>
          <div class="col-lg-2">
            <validated-checkbox label="Dams Yield" @input="changeValue('dam')" v-model="model.dams_yield"/>
          </div>
          <div class="col-lg-2">
            <validated-checkbox label="Breeding Value" @input="changeValue('breed')" v-model="model.breeding_value"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
          <validated-ajax-vue-select label="Breed" multiple
                                     v-model="model.breed"
                                     :url="breedOptionsURL"
                                     :rules="{required:true}"
                                     class="c-input-select"/>
        </div>
        <div class="col-lg-2">
          <validated-select :options="reportTypeOptions"
                            class="field-required c-input-select "
                            label="Download Format"
                            :rules="{required:true}"
                            v-model="model.format_type"/>
        </div>
        </div>
        <div class="row mt-lg-9">
          <div class="col-12">
            <div class="fl-x fl-j-e">
              <div class="btn-group">
                <btn class="text-right"
                     text="Download"
                     loading-text="Please Wait..."
                     :loading="loading"
                />
                <btn type="reset" @click="BackToHome" text="Cancel" design="basic-b" class="px-4"/>
              </div>
            </div>
          </div>
        </div>
      </s-form>

    </div>
  </div>

</template>

<script>
import urls from '../../../../data/urls';
import axios from 'secure-axios';

export default {
    name: 'breedDamsYieldBreedingValue',
    data () {
        return {
            model: {
                alive: false,
                dead: false,
                breed: '',
                dams_yield: false,
                breeding_value: false,
                format_type: ''
            },
            breedOptionsURL: urls.reports.optionURLS.breedSelect,
            loading: false,
            reportTypeOptions: [
                { label: 'Excel', value: 'Excel' },
                { label: 'Pdf', value: 'Pdf' }
            ]
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/reports/' });
        },
        changeValue (value) {
            if (value === 'dam') {
                if (this.model.dams_yield) {
                    this.model.breeding_value = !this.model.dams_yield;
                }
            }
            if (value === 'breed') {
                if (this.model.breeding_value) {
                    this.model.dams_yield = !this.model.breeding_value;
                }
            }
        },
        async downloadReport () {
            try {
                this.loading = true;
                const response = await axios.form(urls.reports.bulls.bullSearch, this.model);
                const json = response.data;
                if (json.error === false) {
                    this.loading = false;
                    window.open(json.url);
                } else {
                    this.loading = false;
                    this.$notify(json.message, 'Oops!', { type: 'warning' });
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

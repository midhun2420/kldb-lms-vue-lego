<template>
  <div>
    <div class="row fl-x fl-j-sb">
             <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary ml-3">Semen Collection</h2>
             <div>
                 <btn class="px-4 mt-2 ml-1 mr-3" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
             </div>

        </div>
    <div class="">
<!--      <div class="row">-->
<!--        <div class="mt-2 col-12 p-0">-->
<!--          <h1 class="text-primary font-poppins-semibold fs-lg-4 mb-4">Semen Collection</h1>-->
<!--        </div>-->
<!--      </div>-->
      <semen-collectionone ref="collectionForm" @loadData="loadBulls"></semen-collectionone>
    </div>
    <s-form @submit="addItem">
      <div class="row">
        <div class="card bg-grey mt-3 bs-1 pb-0 pr-0 pl-0 pt-0 pb-0 w-20r two">
          <div class="bg-white">
            <p class=" fl-x-cc text-primary font-poppins-semibold pt-2">Bull List</p>
            <p class="fl-x-cc text-primary pb-1">(Not found in excel file)</p>
          </div>
          <div v-if="bullsLoading" class="loader-wrapper center-loader">
            <div class="spinner"></div>
            <p class="text-muted mt-2">Loading bulls…</p>
          </div>
          <p v-else-if="!bullsData.length" class="pl-4 pt-2 text-muted">
            No bulls found
          </p>
          <p v-else style="cursor: pointer" class="pl-4 pt-2" v-for="(item, i) in bullsData" :key="i"
             @click="loadDetails(item)">{{ item.reg_no }}</p>

        </div>

        <div class="col-lg-5 ml-5 mt-5 fl-x">
          <div class="col-lg-5">
            <p>Bull Name</p>
            <p class="pt-4">Bull No</p>
            <p class="pt-4">Ejaculation No</p>
          </div>
          <div class="col-lg-5">
            <validated-input disabled class="" v-model="details.bull_name"></validated-input>
            <validated-input disabled class="" v-model="details.reg_no"></validated-input>
            <validated-input disabled class="" v-model="details.ejaculation_no"></validated-input>

          </div>
        </div>

      </div>
      <div>
        <semen-collection-last @ss="ss" @st="st" @success="onSaveSuccess" ref="sc" :details="bullsDetails" :saved-details="savedData"></semen-collection-last>
      </div>

      <div class="fl-x-br ">
        <btn type="submit" class="mr-3 px-4" :loading="loading" loading-text="Saving..." text="Save"></btn>
        <btn design="basic-b" type="reset" @click="BackToHome">Cancel</btn>
      </div>
    </s-form>
  </div>
</template>

<script>
import SemenCollectionLast from '../../components/semencollection/SemenCollectionLast';
import SemenCollectionone from '../../components/SemenCollectionone';
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'SemenCollectionn',
    components: { SemenCollectionone, SemenCollectionLast },
    data () {
        return {
            loading: false,
            bullsLoading: false,
            URL: urls.semenCollection.addEdit,
            bullsData: [],
            bullsDetails: '',
            details: {
                bull_name: '',
                reg_no: '',
                ejaculation_no: ''
            },
            savedData: ''
        };
    },
    methods: {
        clearSelectedBull () {
            this.details = {
                bull_name: '',
                reg_no: '',
                ejaculation_no: ''
            };
            this.bullsDetails = '';
        },
        onSaveSuccess () {
            this.clearSelectedBull(); //  clears bull name / reg no / ejaculation
            this.loadBullsAgain(); //  reload pending list
        },
        async loadDetails (data) {
            console.log('data', data);
            const response = await axios.form(urls.semenCollection.bullDetails, {
                id: data.id,
                excel_rejected_flag: data.excel_rejected_flag
            });
            const result = response.data.data;
            this.bullsDetails = result;
            this.details.bull_name = result.bull_name;
            this.details.reg_no = result.reg_no;
            this.details.ejaculation_no = result.ejaculation_no;
            this.$refs.sc.loadDetails();
        },

        BackToHome () {
            this.$router.push({ path: '/semen-collection/' });
        },
        loadBullsAgain () {
            const data = {
                collection_date: this.savedData.collection_date,
                batches: this.savedData.batches,
                dose_type: this.savedData.dose_type
            };
            this.loadBulls(data);
        },
        async loadBulls (data) {
            this.savedData = data;
            this.bullsLoading = true;
            try {
                const response = await axios.form(urls.semenCollection.pendingAnimal, {
                    collection_date: data.collection_date,
                    batches: data.batches

                });
                console.log('response', response.data.data);
                this.bullsData = response.data.data;
                if (this.bullsData.length === 0) {
                    this.onAllBullsCompleted();
                }
            } catch (error) {
                console.error('Failed to load bulls', error);
            } finally {
                this.bullsLoading = false;
            }
        },
        ss () {
            this.loading = true;
        },
        st () {
            this.loading = false;
        },
        addItem () {
            this.$refs.sc.addItem();
        },
        onAllBullsCompleted () {
            // clear bull selection
            this.clearSelectedBull();

            // reset top excel / batch / date form
            if (this.$refs.collectionForm) {
                this.$refs.collectionForm.resetForm();
            }
        }

    }
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

/*.item:first-child {*/
/*    grid-column-start: 1;*/
/*    grid-column-end: 6;*/
/*}*/
i:first-child, i.i-inline:first-child {
  margin-left: 1px;
  transform: rotate(225deg);
}

.text-white {
  color: white !important;
}

.bg-white {
  background-color: white;
}

.bg-grey {
  background-color: #f4f4f4;
}

.one {
  position: relative;
  top: 31px;
  z-index: 1;

}

.two {
  position: relative;
  top: -6px;

}
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #ddd;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.two {
  position: relative;
}

/* Center loader inside the card */
.center-loader {
  position: absolute;
  inset: 0;                 // top:0 right:0 bottom:0 left:0
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.85); // optional overlay
  z-index: 5;
}

</style>

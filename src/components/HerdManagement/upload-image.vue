<template>
  <!--    <div class="col-lg-12">-->
  <div class="">

    <div class="img-container pos-r">
      <img src="../../assets/web/cows/Cow.png" alt="Avatar" class="image" style="width:100%" v-if="!currentImageURL">
      <img :src="currentImageURL" alt="Avatar" class="image" style="width:100%" v-else>

      <div class="middle">
        <div class="" style="cursor: pointer">
          <i class="fa fa-camera" style="font-size:48px;color:white" @click="OpenImageModal"></i>

        </div>
      </div>
      <modal ref="imageModal" width="30r" title="Image Upload">
        <s-form @submit="UploadImage">
          <div class="row text-center">
            <div class="col-12">
              <validated-file-input
                  label="" v-model="model.image"
                  label-text="Choose file"></validated-file-input>
            </div>
            <div v-if="errorMessage" class="text-danger col-12">
              Image is required
            </div>
            <div class="col-12 mt-2">
              <btn text="Upload" :loading="loading" loading-text="Uploading..."></btn>
            </div>

          </div>

        </s-form>

      </modal>
    </div>
  </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'upload-image',
    props: {
        imageURL: { // This is the prop from the parent
            type: String,
            default: ''
        },
        animal: {
            type: String

        }
    },
    data () {
        return {
            loading: false,
            model: {
                id: this.$route.params.id,
                image: ''
            },
            errorMessage: false,
            currentImageURL: this.imageURL // Use an internal data property to manage the image display
        };
    },
    watch: {
        imageURL (newVal) {
            this.currentImageURL = newVal; // Update internal state if parent prop changes
        }
    },
    methods: {
        OpenImageModal () {
            this.$refs.imageModal.show();
        },
        imageSuccess () {
            this.$refs.imageModal.close();
        },
        async UploadImage () {
            try {
                this.loading = true;

                if (this.model.image.length === 0) {
                    this.errorMessage = true;
                    this.loading = false;
                    return;
                } else {
                    this.errorMessage = false;
                }

                let response = '';
                if (this.animal === 'bull') {
                    response = await axios.form(urls.bulls.imageEdit, {
                        id: this.model.id,
                        bull_image: this.model.image
                    });
                } else {
                    response = await axios.form(urls.cows.imageEdit, {
                        id: this.model.id,
                        cow_image: this.model.image
                    });
                }

                const result = response.data;
                if (result.success) {
                    // Emit an event to the parent instead of directly modifying the prop
                    this.$emit('image-uploaded', result.image_url);
                    this.currentImageURL = result.image_url; // Update internal state for immediate display
                    this.$notify('Added Successfully', 'Success', { type: 'success' });
                    console.log('imageUrl', result);
                    this.loading = false;
                    this.imageSuccess();
                } else {
                    this.loading = false;
                    this.$notify(result.message, 'Warning!', { type: 'warning' });
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

<style scoped lang="scss">
.bg-cow {
  height: 350px;
  background-image: url("../../assets/web/cows/Cow.png") !important;
  border-radius: 14px;
  background-position: center;
  background-size: cover;
  width: 100% !important;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.img-container:hover .image {
  opacity: 0.3;
}

.img-container:hover .middle {
  opacity: 1;
}

</style>

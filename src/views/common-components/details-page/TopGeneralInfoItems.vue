<template slot-scope="props">
    <div class="details-item-top-banner bg bg-cover pt-8 pb-5 px-3 pl-5 pr-5">
        <div v-if="animal==='bull' && bullLoading">
            <div class=" row text-white fon">
                <div class="col-12 text-center">
                    <loading-round/>
                    <div class="mt-3">Please wait while we fetching the data . . .</div>
                </div>
            </div>
        </div>
        <div v-else-if="animal=== 'cow' && cowLoading">
            <div class=" row text-white fon">
                <div class="col-12 text-center">
                    <loading-round/>
                    <div class="mt-3">Please wait while we fetching the data . . .</div>
                </div>
            </div>
        </div>
        <div v-else>
        <div class="fl-x-br">
            <btn class="px-41 btn-2 b-1 b-light mb-n4 text-white z-index-1" color="third" @click="setEdit">Edit</btn>
        </div>
        <row>
<!--            <col-12 lg="3" class="fl-x fl-d-c fl-a-c">-->
<!--                <upload-image-->
<!--                    :image-u-r-l="bullDetails.image"-->
<!--                    :animal="animal"-->
<!--                    class="m-2">-->
<!--                </upload-image>-->

<!--                <btn-->
<!--                    class="px-41 btn-2 b-1 b-light mt-2 text-white z-index-1"-->
<!--                    color="third"-->
<!--                    @click="setEdit">-->
<!--                    More Images-->
<!--                </btn>-->
<!--            </col-12>-->
            <col-12 lg="3" class="text-center">

                <div>
                    <upload-image
                        :image-u-r-l="bullDetails.image"
                        :animal="animal"
                        class="m-2 d-block mx-auto"
                        @image-uploaded="handleImageUploaded">
                    </upload-image>
                </div>

                <div class="mt-2">
                    <btn
                        class="px-41 btn-2 b-1 b-light text-white"
                        color="third"
                        @click="openImageModal">
                        More Images
                    </btn>
                </div>

            </col-12>
            <col-12 lg="9">
                <row>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Name"  v-model="bullDetails.bullname"  v-if="animal=== 'bull'"></details-item>
                        <details-item label="Name"  v-model="bullDetails.cowname"  v-if="animal=== 'cow'"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="UID Number"  v-model="bullDetails.uid" class="uid-number"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="AI Date"  v-model="bullDetails.aidate"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam Breeding Value" v-model="bullDetails.dam_breeding_value"></details-item>
                    </col-12>
<!--                    <col-12 lg="3" class="pr-0">
                        <details-item label="Vaccination Date"  v-model="bullDetails.last_vaccination_date"></details-item>
                    </col-12>-->
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Registration Number"  v-model="bullDetails.regno"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Purchase Value" v-model="bullDetails.purchasevalue"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam’s Milk Fat %"  v-model="bullDetails.milk_fat"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Source Type " v-model="bullDetails.registration_type"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Re Number" v-model="bullDetails.renumber"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dehorning Date"  v-model="bullDetails.dehorndate"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam’s Protein %"  v-model="bullDetails.protein"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Source"  v-model="bullDetails.source_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Date of Birth" v-model="bullDetails.dob"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item v-if="this.animal==='bull'" label="Nose Punching Date"  v-model="bullDetails.nosepunchdate"></details-item>
                        <details-item v-else label="Nose Punching Date"  v-model="bullDetails.nose_punching_date"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Sire Number" v-model="bullDetails.sireno"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Unit" v-model="bullDetails.unit"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
<!--                        <details-item label="Shed Number" v-if="bullDetails.shed_number"  v-model="bullDetails.shed_name"></details-item>
                        <details-item label="Shed Number"  v-else> -&#45;&#45; </details-item> -->
                        <details-item label="Shed " v-if="this.animal==='bull'"  v-model="bullDetails.shed_name"></details-item>
                        <details-item label="Shed "  v-else v-model="bullDetails.shed_name"> --- </details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam's Name"  v-model="bullDetails.dam_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Sire Name" v-model="bullDetails.sire_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Transfer Date"  v-model="bullDetails.transferdate"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Breeding Value"  v-model="bullDetails.breeding_value"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam's Number"  v-model="bullDetails.damno"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Sire Breed"  v-model="bullDetails.sirebreed_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Old Number"  v-model="bullDetails.old_number"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Breed"   v-model="bullDetails.breed_name"></details-item>
<!--                        <details-item label="Shed Number"  v-else> -&#45;&#45; </details-item>-->
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dam’s Breed" v-model="bullDetails.dambreed_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Sire Dam Yield"  v-model="bullDetails.siredamyield"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Country/State/Region"  v-model="bullDetails.country_state_region_name"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Birth Weight"  v-model="bullDetails.birthwt"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Dams Lactation Yield"  v-model="bullDetails.damlacyield"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Sire Daughter’s Yield" v-model="bullDetails.siredaughteryield"></details-item>
                    </col-12>
                    <col-12 lg="3" class="pr-0">
                        <details-item label="Remarks" value-font-size="sm" v-model="bullDetails.remarks"
                                      value=""></details-item>
                    </col-12>
                    <col-12 lg="3" class="">
                        <details-item label="F1 calf or not"  v-model="bullDetails.f1status"></details-item>
                    </col-12>
                    <col-12 lg="3" class="">
                        <details-item label="Dam’s Lactation No"  v-model="bullDetails.damlacno"></details-item>
                    </col-12>
                    <col-12 lg="3" class="">
                        <details-item label="Projected Yield of Daughter"  v-model="bullDetails.projected_yield_of_daughter"></details-item>
                    </col-12>
                    <col-12 lg="3">
                        <details-item label="Book Value"  v-model="bullDetails.book_value"></details-item>
                    </col-12>
                    <col-12 lg="3" class="">
                        <details-item label="Addition Date"  v-model="bullDetails.additiondate"></details-item>
                    </col-12>
                    <col-12 lg="3" class="">
                        <details-item label="Grand Dam Yield"  v-model="bullDetails.granddamyield"></details-item>
                    </col-12>
                    <col-12 lg="3" class="" v-if="animal==='cow'">
                        <details-item label="Recipient No"  v-model="bullDetails.recipient_no"></details-item>
                    </col-12>
                    <col-12 lg="3" class="" v-if="animal==='bull'">
                        <details-item label="Recipient No"  v-model="bullDetails.recipientno"></details-item>
                    </col-12>
                    <col-12 lg="3" class="" v-if="animal==='cow'">
                        <details-item label="Recipient Breed"  v-model="bullDetails.recipient_breed"></details-item>
                    </col-12>
                    <col-12 lg="3" class="" v-if="animal==='bull'">
                        <details-item label="Recipient Breed"  v-model="bullDetails.recipient_breed"></details-item>
                    </col-12>
<!--                    <col-12 lg="3" class="">-->
<!--                        <details-item label="Vaccination Type"  v-model="bullDetails.vactype"></details-item>-->
<!--                    </col-12>-->
<!--                    <col-12 lg="3" class="">-->
<!--                        <btn class="px-4 btn-2 b-1 b-light" color="fourth">Update</btn>-->
<!--                    </col-12>-->

                </row>
            </col-12>
        </row>
            </div>
        <modal title="Edit Details"  ref="bullEditModal" :no-close-on-backdrop="true" width="60r" header-color="primary">
            <EditItem ref="editPage" :animal=animal :model="editingItem" @success="formSuccess"></EditItem>
        </modal>
        <modal
            :title="animal === 'cow' ? 'Cow Images' : 'Bull Images'"
            ref="imageModal"
            width="60r" :no-close-on-backdrop="true"
            header-color="primary">

            <!-- 🔹 ADD BUTTON -->
            <div class="fl-x fl-j-e mb-2">
                <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="handleFileSelect"
                />

                <btn
                    class="px-3 btn-2 b-1 b-light text-white"
                    color="third"
                    @click="openUploadModal"
                >
                    Add Image
                </btn>
            </div>

            <!-- 🔹 LOADING -->
            <div v-if="loadingImages" class="text-center py-4">
                Loading images...
            </div>

            <!-- 🔹 IMAGE GRID -->
            <div v-else class="image-grid">
                <div
                    v-for="(img, index) in bullImages"
                    :key="index"
                    class="image-box"
                >
                    <img
                        :src="img.image"
                        class="grid-image"
                    />

                    <!-- 🔹 DELETE BUTTON -->
                    <btn
                        class="delete-btn"
                        color="danger"
                        @click="deleteImage(img.id)"
                    >
                        ✕
                    </btn>
                </div>
            </div>

        </modal>
        <modal
            title="Upload Image"
            ref="addImageModal"
            width="40r" :no-close-on-backdrop="true"
            header-color="primary">

            <div class="p-3">

                <!-- File Input -->
                <input
                    type="file"
                    ref="imageInput"
                    @change="handleFileSelect"
                />

                <!-- Preview -->
                <div v-if="selectedFilePreview" class="mt-3 text-center">
                    <img :src="selectedFilePreview" class="preview-image"/>
                </div>

                <!-- Actions -->
                <div class="fl-x fl-j-e mt-3">
                    <btn
                        class="mr-2"
                        color="light"
                        @click="resetImageSelection();
                            $refs.addImageModal.close()"
                    >
                        Cancel
                    </btn>

                    <btn
                        color="third"
                        @click="confirmUpload"
                    >
                        Confirm
                    </btn>
                </div>

            </div>

        </modal>

    </div>

</template>

<script>
import DetailsItem from '../../../components/details-page/DetailsItem';
import UploadImage from '../../../components/HerdManagement/upload-image';
import axios from 'secure-axios';
import urls from '../../../data/urls';
import EditItem from '../../../components/details-page/EditItem';
console.log('#############################################cow image detail add component------');

export default {
    name: 'TopGeneralInfoItems',
    data () {
        return {
            bullLoading: false,
            cowLoading: false,
            loading: false,
            editingItem: '',
            bullDetails: '',
            selectedFile: null,
            selectedFilePreview: null,
            loadingImages: false,
            bullImages: [],
            model: {
                id: null,
                bull_image: null
            }
        };
    },
    props: {
        animal: {
            type: String

        }
    },
    components: { EditItem, UploadImage, DetailsItem },
    mounted () {
        console.log('###################################Component is now rendered and mounted and animal is!', this.animal);
        if (this.animal === 'cow') {
            this.loadDetailsCow();
        } else {
            this.loadDetails();
        }
    },

    methods: {
        refreshData () {
            console.log('TRACE: refreshData called');
            if (this.animal === 'cow') {
                this.loadDetailsCow();
            } else {
                this.loadDetails();
            }
        },
        formSuccess (data) {
            this.$refs.bullEditModal.close();
            this.editingItem = '';
            this.bullDetails = data;
        },

        setEdit () {
            this.editingItem = { ...this.bullDetails };
            this.$refs.bullEditModal.show();
        },
        async loadDetailsCow () {
            try {
                this.cowLoading = true;
                const bullID = this.$route.params.id;
                const animal = this.$route.params.animal;
                console.log('TRACE: loadDetailsCow - Making API call for cow details with ID:', bullID, 'URL:', urls.cowDetails.cowDetails);
                const response = await axios.form(urls.cowDetails.cowDetails, { id: bullID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                console.log('animal: ', animal);
                this.bullDetails = response.data.data;
                console.log('cow degtails', this.bullDetails);
                // console.log('---------------------', this.bullDetails[0]?.image);
                // console.log('--------bhhhhhh-------------', this.bullDetails.image);
                this.cowLoading = false;
            } catch (error) {
                console.error('ERROR: loadDetailsCow failed', error);
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.cowLoading = false;
            }
        },
        cleanNullValues (obj) {
            for (const key in obj) {
                if (obj[key] === null) {
                    this.$set(obj, key, '');
                }
            }
            return obj;
        },
        async loadDetails () {
            try {
                this.bullLoading = true;
                const bullID = this.$route.params.id;
                const animal = this.$route.params.animal;
                console.log('TRACE: loadDetails - Making API call for bull details with ID:', bullID, 'URL:', urls.bullDetails.bullDetailsDetail);
                const response = await axios.form(urls.bullDetails.bullDetailsDetail, { id: bullID });
                console.log('response: ', response.data.data);
                console.log('id: ', this.$route.params.id);
                console.log('animal: ', animal);
                const data = response.data.data;
                this.bullDetails = this.cleanNullValues(data);
                console.log('degtails', this.bullDetails);
                this.bullLoading = false;
            } catch (error) {
                console.error('ERROR: loadDetails failed', error);
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' + error.response.statusText,
                    { type: 'danger' }
                );
                this.bullLoading = false;
            }
        },
        async openImageModal () {
            try {
                this.loadingImages = true;

                const id = this.$route.params.id;
                console.log('$$$$$$$$$$$$$ STEP 1 → FETCH IMAGES ID:', id);

                let response;

                if (this.animal === 'cow') {
                    response = await axios.get(
                        urls.cowImages.list,
                        { params: { id } }
                    );
                } else {
                    response = await axios.get(
                        urls.bullImages.list,
                        { params: { id } }
                    );
                }

                console.log('&&&&&&&&&&&&&&&&&&STEP 2 → IMAGE RESPONSE:', response);
                console.log('%%%%%%%%%%%%%%%%%%%STEP 2 → IMAGE DATA:', response?.data);

                // ✅ assign images
                this.bullImages = response.data.data || [];
                console.log('IMAGES--$$$$$$$$$$$$$$$', this.bullImages);
                // this.$set(this.bullDetails, 'image', response.data.data.image);
                // ✅ open modalthis.bullDetails.image
                this.$refs.imageModal.show();
            } catch (error) {
                console.error('********************ERROR:', error);
                this.$notify(
                    'Failed to load images',
            error.response?.statusText || 'Error',
            { type: 'danger' }
                );
            } finally {
                this.loadingImages = false;
            }
        },
        async uploadImage () {
            try {
                this.openImageModal(); // refresh
            } catch (error) {
                console.error('%%%%%%%%%%%%%%%%%% ERROR:', error);
                this.$notify('Upload failed', 'error');
            }
        },
        async deleteImage (imageId) {
            try {
                console.log('IMAGE ID --------------', imageId);
                const url = this.animal === 'cow'
                    ? urls.cowImages.delete
                    : urls.bullImages.delete;

                await axios.form(url, { id: imageId });

                this.$notify('Image deleted successfully', 'success', { type: 'success' });
                this.refreshData();
                this.openImageModal(); // refresh
            } catch (error) {
                this.$notify('Delete failed', 'error');
            }
        },
        handleFileSelect (event) {
            const file = event.target.files[0];
            if (!file) return;
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif'
            ];

            if (!allowedTypes.includes(file.type)) {
                this.$notify(
                    'Invalid file type. Only JPG, PNG, GIF files are allowed.',
                    'Warning',
                    { type: 'warning' }
                );

                this.selectedFile = null;
                this.selectedFilePreview = null;

                event.target.value = '';
                return;
            }
            this.selectedFile = file;

            // preview
            this.selectedFilePreview = URL.createObjectURL(file);
        },
        openUploadModal () {
            this.resetImageSelection();
            this.$refs.addImageModal.show();
        },
        resetImageSelection () {
            this.selectedFile = null;
            this.selectedFilePreview = null;

            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = '';
            }
        },
        async confirmUpload () {
            try {
                if (!this.selectedFile) {
                    this.$notify('Please select a file', 'warning', { type: 'warning' });
                    return;
                }

                const id = this.$route.params.id;
                console.log('confirm upload id ------------------------%^^%^%^%^^%T^%', id);
                console.log('TRACE: confirmUpload - ID for upload:', id);
                const formData = new FormData();
                formData.append('id', id);
                if (this.animal === 'cow') {
                    formData.append('cow_image', this.selectedFile);
                } else {
                    formData.append('bull_image', this.selectedFile);
                }

                const url = this.animal === 'cow'
                    ? urls.cows.imageEdit
                    : urls.bulls.imageEdit;
                console.log('TRACE: confirmUpload - Uploading to URL:', url);
                const response = await axios.post(url, formData);
                // this.$set(this.bullDetails, 'image', response.data.image_url);
                if (response.data.image_url) {
                    this.bullDetails.image = response.data.image_url;
                    console.log('TRACE: confirmUpload - bullDetails.image updated locally to:', this.bullDetails.image);
                }
                this.$notify('Image uploaded successfully', 'success', { type: 'success' });

                // reset
                this.selectedFile = null;
                this.selectedFilePreview = null;
                this.refreshData();
                // close modal
                this.resetImageSelection();
                this.$refs.addImageModal.close();
                // this.refreshData();
                // refresh image list
                this.openImageModal();
            } catch (error) {
                console.error('ERROR: confirmUpload failed', error);
                this.$notify('Upload failed', 'error');
            }
        },
        handleImageUploaded (newImageUrl) {
            console.log('TRACE: handleImageUploaded called with:', newImageUrl);
            this.$set(this.bullDetails, 'image', newImageUrl);
            // Optionally, you might want to refresh other data if the image change affects other parts of bullDetails
            // this.refreshData(); // Only if the backend's main detail endpoint is guaranteed to return the new image URL
        }
    }
};
</script>

<style scoped>
    .details-item-top-banner {
        background-image: url('../../../assets/web/details-page/details-bg.png');
    }
    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        padding: 10px;
    }

    .grid-image {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 6px;
    }

    .image-box {
        position: relative;
    }

    .delete-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 12px;
        padding: 2px 6px;
    }
    .preview-image {
        max-width: 150px;
        border-radius: 6px;
    }
    .uid-number {
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
</style>

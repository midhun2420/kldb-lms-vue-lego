<template>
    <div class="row bg-2">
        <div class="col-lg-3 p-0 m-0">
            <!--            <div class="w-h-100p" :style="setBgImage(data.img)"></div>-->
            <img :src="data.bull_image" class="w-h-100p card-img" alt="" v-if="data.bull_image && animal=== 'bull'">
            <img :src="data.cow_image" class="w-h-100p card-img" alt="" v-else-if="data.cow_image && animal=== 'cow'">
            <img src="../../assets/web/cows/Cow.png" alt="" class="w-h-100p card-img" v-else>
            <!--            <img src="../../assets/web/bulls/bull-1.png" @click="OpenImageUpload" style="cursor: pointer" class="w-h-100p" alt="" v-else>-->
            <!--            <div class="row" v-else>-->
            <!--                <div>-->
            <!--                    <img src="../../assets/web/bulls/bull-1.png" style="cursor: pointer" class="w-h-100p" alt="">-->
            <!--                </div>-->
            <!--                &lt;!&ndash;                <validated-file-input class="col p-5" label-text="Image" size="xs" icon="fa fa-camera"&ndash;&gt;-->
            <!--                &lt;!&ndash;                                      @input="ImageUpload" label="" placeholder="" v-model="image.bull_image">&ndash;&gt;-->
            <!--                &lt;!&ndash;                </validated-file-input>&ndash;&gt;-->
            <!--            </div>-->
        </div>
        <div class="col-lg-9 mb-3">
            <div class="fl-te-c">
                <div>
                    <!--            <h4 class="text-primary mt-4 fs-lg-2 mb-0 font-poppins-semibold" v-if="animal=== 'bull'">{{ data.bullname }}</h4>-->
                    <h4 class="text-primary mt-4 fs-lg-2 mb-0 font-poppins-semibold" v-if="animal=== 'bull'">{{ data.regno }}</h4>
                    <h4 class="text-primary mt-4 fs-lg-2 mb-0 font-poppins-semibold" v-else>{{ data.regno }}</h4>
                </div>
                <div>
                    <btn text="view" @click="detailsPage(data.id)" icon="fa fa-eye" size="xs" class="mt-4 mb-0"></btn>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <ul class="list-unstyled list-items">
                        <li class="mt-3"><span class="mr-2">Re Number</span> : <span class="item-value ml-2">{{ data.renumber }}</span></li>
                        <!--                        <li class="mt-3" v-if="animal=== 'bull'"><span class="mr-2">Bull Name</span> : <span class="item-value ml-2">{{ data.bullname }}</span></li>-->
                        <!--                        <li class="mt-3" v-else><span class="mr-2">Cow Name</span> : <span class="item-value ml-2">{{ data.cowname }}</span></li>-->
                        <li class="mt-3" v-if="animal=== 'cow'"><span class="mr-2">Cow Name</span> : <span class="item-value ml-2">{{ data.cowname }}</span></li>
                        <li class="mt-3"><span class="mr-2">Date of Birth</span> : <span class="item-value ml-2">{{ data.dob }}</span></li>
                    </ul>
                </div>
                <div class="col-lg-5 ml-0 pl-0">
                    <ul class="list-unstyled list-items">
                        <li class="mt-3"><span class="mr-2">Breed</span> : <span class="item-value ml-2" v-if="data.breed">{{ data.breed }}</span></li>
                        <li class="mt-3"><span class="mr-2">Shed</span> : <span class="item-value ml-2" v-if="data.shed_number">{{ data.shed_number }}</span></li>
                        <!--                        <li class="mt-3" v-if="animal=== 'cow'"><span class="mr-2">Batch</span> : <span class="item-value ml-2">{{ data.batch }}</span></li>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
console.log('INSIDE COW AND BULL IMAGE LIST COMPONENT%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
export default {
    name: 'CattleListItemCard',
    props: {
        animal: {
            type: String

        },
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            image: {
                bull_image: ''
            }
        };
    },
    methods: {
        setBgImage (image) {
            return {
                backgroundImage: 'url(' + image + ')',
                backgroundPosition: 'center'
            };
        },
        detailsPage (id) {
            if (this.animal === 'cow') {
                this.$router.push({ path: '/cow/' + id + '/details/' });
            } else {
                this.$router.push({ path: '/animal/' + id + '/details/' });
            }
        },
        ImageUpload () {
            alert('saving...');
        }
    }
};
</script>

<style scoped lang="scss">
.list-items {
    font-family: 'poppins-medium';

    .item-value {
        font-family: 'poppins-regular';
    }
}

.card-img {
    height: 100% !important;
    max-height: 9rem !important;
}
</style>

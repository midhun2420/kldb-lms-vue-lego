<template>
    <div class="fl-te-c b-1 b-primary round-1 del-file-item uploaded-file-contain-1">
        <div class="text-primary text-fs-0">
            <p class="text-truncate m-0">{{fileName}}</p></div>
<!--        <div class="pt-1 cursor-pointer pl-2"><img src="../../assets/web/icons/cross-round.svg" alt=""></div>-->
        <icon-remove class="mu-p ml-2" v-if="showRemoveButton"></icon-remove>
    </div>
</template>

<script>
import iconRemove from './icons/icon-remove';
export default {
    name: 'UploadedFileItem',
    components: { iconRemove },
    props: {
        showRemoveButton: {
            type: Boolean,
            default: false
        },
        fileName: {
            type: String,
            default: 'Report.Pdf'
        }
    }
};
</script>

<style scoped>
    .del-file-item {
        padding: 0.4rem;
    }

    .mt--4 {
        margin-top: -1.5rem !important;
    }
</style>

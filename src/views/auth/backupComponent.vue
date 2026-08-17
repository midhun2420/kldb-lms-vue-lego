<template>
    <div class="container">
        <div class="card">
            <div class="row fl-x fl-j-sb">
                <h5 class="text-center text-primary ml-3"><b>ACTIVITY BACKUP</b></h5>
                <btn size="sm" text="BACK" icon="fa fa-arrow-left" class="mr-3"
                     @click="BackToHome"></btn>
            </div>
            <p class="text-center mt-3">
                The backup process retrieves data up to yesterday and, upon completion of the download, removes the corresponding data from the database.
            </p>
            <div class="mt-3 text-center">
                <btn text="Backup"
                     :loading="downloading"
                     loading-text="Please Wait..."
                     @click="downloadReport"
                ></btn>
            </div>
            <div class="mt-3 text-center text-danger" v-if="error">
                <p>{{this.message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'backupComponent',
    data () {
        return {
            downloading: false,
            error: false,
            message: ''
        };
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/master-data/' });
        },
        async downloadReport () {
            try {
                const that = this;
                that.error = false;
                that.downloading = true;
                const response = await axios.get(urls.auth.logBackUp);
                const json = response.data;
                if (json.error === false) {
                    that.downloading = false;
                    this.$notify(json.message, 'Success', { type: 'success' });
                    window.open(json.url);
                } else {
                    that.downloading = false;
                    that.error = true;
                    that.message = json.message;
                    this.$notify(json.message, 'Error', { type: 'danger' });
                }
            } catch (error) {
                this.downloading = false;
                console.error('API request error:', error);
                this.error = true;
                this.message = 'Failed to download the report. Please try again.';
                this.$notify(this.message, 'Error', { type: 'danger' });
            }
        }
    }
};
</script>

<style scoped>

</style>

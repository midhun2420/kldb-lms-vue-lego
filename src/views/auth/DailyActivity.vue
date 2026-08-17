<template>
    <div class="container-fluid">
        <div class="card mt-3">
            <div class=" row fl-x fl-j-sb p-2 text-primary round-1">
                <h5 class="ml-3"><b>TODAY'S ACTIVITY</b></h5>
                <btn size="sm" text="BACK" icon="fa fa-arrow-left"
                     @click="BackToHome"></btn>
            </div>
        </div>
        <vue-table class="mt-1"
            :fields="fields" :url="URL" :per-page="10" ref="table" :show-search-box="false">
        </vue-table>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../data/urls';

export default {
    name: 'DailyActivity',
    data () {
        return {
            data: [],
            loading: false,
            URL: urls.auth.userActivity,
            fields: [
                {
                    name: 'username',
                    sortField: 'username',
                    title: 'User',
                    titleClass: ''
                },
                {
                    name: 'activity',
                    sortField: 'activity',
                    title: 'Activity',
                    titleClass: ''
                },
                {
                    name: 'updated_by',
                    sortField: 'updated_by',
                    title: 'Updated At',
                    titleClass: ''
                }
            ]
        };
    },
    mounted () {
        this.loadData();
    },
    methods: {
        BackToHome () {
            this.$router.push({ path: '/master-data/' });
        },
        async loadData () {
            try {
                this.loading = true;
                const response = await axios.get(urls.auth.userActivity);
                const data = response.data;
                this.data = data;
                console.log('response: ', data);
                if (data.success) {
                    // this.$notify('Added Successfully', 'Success', { type: 'success' });
                    this.loading = false;
                    // await this.$router.push({ path: '/general/' });
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
        }
    }
};
</script>

<style scoped>

</style>

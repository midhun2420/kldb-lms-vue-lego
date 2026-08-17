<template>
    <div>
        <h3 class="text-primary mb-4 font-poppins-semibold">USERS LIST</h3>
<!--        <div class="col-lg-4 order-lg-7 order-1  mt-3 pl-0">-->
<!--            <validated-input class=" c-input-1 m-0" placeholder="Search" v-model="search">-->
<!--                <template>-->
<!--                    <i class="fa fa-search"></i>-->
<!--                </template>-->
<!--            </validated-input>-->
<!--        </div>-->
        <div class="col-lg-6 mt-4 pl-0 fl-x">
            <div class="col-lg-2 pl-0">
                <validated-vue-select :options="stationOptions"
                                      class="c-input-select w-15v text-black" label="Station" placeholder="select" v-model="office"></validated-vue-select>
            </div>
            <div class="col-lg-2 pl-0 ml-8">
                <validated-vue-select :options="designationOptions"
                                      class="c-input-select w-15v text-black" label="Designation" placeholder="select" v-model="designation"></validated-vue-select>
            </div>
            <div class="col-lg-2 pl-0 ml-8">
                <validated-vue-select :options="statusOption"
                                      class="c-input-select w-15v text-black" label="Status" placeholder="select" v-model="status"></validated-vue-select>
            </div>
        </div>
        <div class="">
            <disable-modal
                @response="statusSuccess" :url="statusUrl" :params="{username: userId}" ref="disable">
                <template #default>Are you sure ?</template>
                <template #loading>Please Wait...</template>
            </disable-modal>
            <enable-modal
                @response="statusSuccess" :url="statusUrl" :params="{username: userId}" ref="enable">
                <template #default>Are you sure ?</template>
                <template #loading>Please Wait...</template>
            </enable-modal>
            <vue-table title="" :fields="fields" :url="URL" :show-search-box="true"
                       :extra-params="{
                            search: search,
                            office: office,
                            designation: designation,
                            status: status
                       }"
                       :per-page="10" ref="table">
                <template #buttons>
                    <btn design="basic-b" icon="fa fa-plus" text="Add List" @click="addUser"></btn>
                    <btn design="basic-b" text="Back" icon="fa fa-arrow-left" class="ml-1"
                     @click="BackToHome"></btn>
                </template>
                <template slot="actions" slot-scope="props">
                    <div class="btn-group">
                        <btn size="sm" icon="fa fa-pencil" @click="editUser(props.rowData)"></btn>

                    </div>
                </template>
                <template slot="status" slot-scope="props">
                    <div v-if="props.rowData.user_status">
                        <btn size="sm" v-if="props.rowData.user_status" color="success"
                             @click="disableItem(props.rowData.username)"
                             icon="fa fa-toggle-off"></btn>
<!--                        <span> Active</span>-->
                    </div>
                    <div v-else>
                        <btn size="sm" color="danger"
                             @click="enableItem(props.rowData.username)"
                             icon="fa fa-toggle-on"></btn>
<!--                        <span> Inactive</span>-->
                    </div>
                </template>

            </vue-table>
            <modal title="Edit User" ref="editUser" :no-close-on-backdrop="true" width="40r">
                <EditUser :model="editingModel" @success="formSuccess"></EditUser>
            </modal>
            <modal title="Add User" ref="addUser" :no-close-on-backdrop="true" width="40r">
                <AddUser @success="formSuccess"></AddUser>
            </modal>
        </div>
    </div>
</template>

<script>
import urls from '../../data/urls';
import AddUser from './AddUser';
import EditUser from './EditUser';
import EnableModal from '../../components/modal/EnableModal';
import DisableModal from '../../components/modal/DisableModal';

export default {
    name: 'UserList',
    components: { EditUser, AddUser, EnableModal, DisableModal },
    data () {
        return {
            URL: urls.user.UserList,
            statusUrl: urls.auth.StatusChange,
            userId: null,
            loading: false,
            designation: '',
            office: '',
            status: '',
            search: '',
            editingModel: '',
            statusOption: [
                { label: 'Active ', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' }
            ],

            stationOptions: [
                { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
                { label: 'Mattupetty', value: 'Mattupetty' },
                { label: 'Dhoni', value: 'Dhoni' },
                { label: 'Kulathupuzha', value: 'Kulathupuzha' },
                { label: 'Kolahalamedu', value: 'Kolahalamedu' },
                { label: 'Muvattupuzha', value: 'Muvattupuzha' },
                { label: 'Puthur', value: 'Puthur' },
                { label: 'Puthupady', value: 'Puthupady' },
                { label: 'Kannur', value: 'Kannur' },
                { label: ' Mananthavady', value: 'Mananthavady' },
                { label: 'Koothatukulam', value: 'Koothatukulam' },
                { label: 'Chalakudy', value: 'Chalakudy' },
                { label: 'Mavelikara', value: 'Mavelikara' }
            ],
            designationOptions: [
                { label: 'Managing Directer', value: 'Managing Directer' },
                { label: 'General Manager', value: 'General Manager' },
                { label: 'Personal Manager', value: 'Personal Manager' },
                { label: 'Deputy General Manager', value: 'Deputy General Manager' },
                { label: 'Assistant Manager', value: 'Assistant Manager' },
                { label: 'Livestock Inspector', value: 'Livestock Inspector' },
                { label: 'Office Assistant', value: 'Office Assistant' },
                { label: 'Agri Assistant', value: 'Agri Assistant' },
                { label: 'Project Coordinator', value: 'Project Coordinator' },
                { label: 'District Coordinator', value: 'District Coordinator' },
                { label: 'Coordinator', value: 'Coordinator' },
                { label: 'Officer', value: 'Officer' }
            ],
            fields: [
                {
                    name: 'employee_id',
                    sortField: 'employee_id',
                    title: 'Employee ID'
                },
                {
                    name: 'name',
                    title: 'Employee Name'
                },
                {
                    name: 'email',
                    title: 'Username'
                },
                {
                    name: 'designation',
                    title: 'Designation'
                },
                {
                    name: 'office',
                    title: 'Station'
                },
                {
                    name: '__slot:status',
                    title: 'Status'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ]

        };
    },

    mounted () {
        this.loadList();
    },

    methods: {
        BackToHome () {
            this.$router.push({ path: '/master-data/' });
        },
        editUser (user) {
            this.$refs.editUser.show();
            this.editingModel = user;
        },
        addUser () {
            this.$refs.addUser.show();
        },
        formSuccess () {
            this.$refs.addUser.close();
            this.$refs.editUser.close();
            this.$refs.table.refreshTable();
        },
        statusSuccess (response) {
            this.$refs.enable.close();
            this.$refs.disable.close();
            const json = response;
            if (json.error === false) {
                this.$refs.table.refreshTable();
            } else {
                this.Failure(json);
            }
        },
        Failure (json) {
            console.log(json);
            this.$notify(json.errors, 'Error',
                {
                    type: 'warning',
                    duration: 3000,
                    permanent: false
                }
            );
        },
        async disableItem (item) {
            this.userId = item;
            this.$refs.disable.show();
        },
        async enableItem (item) {
            this.userId = item;
            this.$refs.enable.show();
        }
    }

};
</script>

<style scoped>

</style>

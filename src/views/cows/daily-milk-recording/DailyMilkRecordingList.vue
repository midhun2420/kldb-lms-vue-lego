<template>
    <div>
        <div class="row fl-x fl-j-sb">
            <h2 class="head font-poppins-semibold fs-lg-4 mt-3 text-primary">
                Daily Milk Recording
            </h2>

            <div class="mr-4 mb-2">
                <btn
                    class="px-4 mt-2 ml-1"
                    style="cursor: pointer"
                    @click="AddRecord"
                >
                    Add Daily Milk Recording
                </btn>
                <btn class="px-4 mt-2 ml-1" icon="fa fa-back" style="cursor: pointer" @click="BackToHome">Back</btn>
            </div>
        </div>

        <div class="row">
            <validated-date-picker
                class="col-3 text-black c-input-datepicker"
                placeholder="From Date"
                format="DD-MM-YYYY"
                :disabled-date="disabledFromDate"
                :clearable="true"
                v-model="search.from_date"
            />

            <validated-date-picker
                class="col-3 text-black c-input-datepicker"
                placeholder="To Date"
                format="DD-MM-YYYY"
                :disabled-date="disabledToDate"
                :clearable="true"
                v-model="search.to_date"
            />

            <validated-input
                class="col-3 text-black"
                border-radius="1"
                placeholder="Register No"
                v-model="search.reg_no"
            />
        </div>

        <vue-table
            ref="table"
            :fields="fields"
            :url="listURL"
            :per-page="10"
            :show-search-box="false"
            :extra-params="tableParams"
        >
            <template slot="actions" slot-scope="props">
                <div class="btn-group">
                    <btn
                        text=""
                        size="sm"
                        icon="fa fa-pencil"
                        color="primary"
                        @click="editItem(props.rowData)"
                    />

                    <btn
                        text=""
                        size="sm"
                        icon="fa fa-trash"
                        color="danger"
                        @click="deleteItem(props.rowData.id)"
                    />
                </div>
            </template>
        </vue-table>

        <modal
            ref="editRecord"
            :no-close-on-backdrop="true"
            title="Daily Milk Recording"
            header-color="primary"
        >
            <s-form @submit="EditRecord">
                <div class="row">
                    <validated-input
                        label="Date"
                        :rules="{ required: true }"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.milk_date"
                        disabled
                    />

                    <validated-input
                        label="Register No"
                        :rules="{ required: true }"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.cow_reg_no"
                        disabled
                    />

                    <validated-input
                        label="Evening Quantity"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.evening_qty"
                    />

                    <validated-input
                        label="Morning Quantity"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.morning_qty"
                    />

                    <validated-input
                        label="Protein"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.protein"
                    />

                    <validated-input
                        label="SNF"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.snf"
                    />

                    <validated-input
                        type="number"
                        label="Somatic Cell Count"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.somatic_cell_count"
                    />

                    <validated-input
                        label="fat"
                        :rules="rules.positiveOnly"
                        class="col-3"
                        border-radius="1"
                        v-model="editingItem.fat"
                    />

                    <validated-checkbox
                        class="col-3"
                        v-model="editingItem.dnb"
                        label="DNB"
                    />

                    <validated-input
                        label="Remarks"
                        class="col-12"
                        border-radius="1"
                        v-model="editingItem.remarks"
                    />
                </div>

                <div class="col-12 text-right mt-4">
                    <btn
                        type="submit"
                        text="Save"
                        :loading="editLoading"
                        class="px-4"
                    />
                </div>
            </s-form>
        </modal>

        <delete-modal
            ref="deleteModal"
            :no-close-on-backdrop="true"
            enter-animation="animated slideInDown"
            exit-animation="animated slideOutUp"
            :url="deleteURL"
            :params="{ id: itemID }"
            @response="deleteComplete"
        >
            <p>Are you sure ?</p>

            <template #loading>
                <div class="fl-x">
                    <loading-animation />
                    <b class="ml-3">Please Wait...</b>
                </div>
            </template>
        </delete-modal>
    </div>
</template>

<script>
import axios from 'secure-axios';
import urls from '../../../data/urls';

export default {
    name: 'DailyMilkRecordingList',

    data () {
        return {
            viewData: [],
            currentPage: 1,
            itemsPerPage: 10,
            loadingData: false,

            listURL: urls.daily_milk_recording.list,
            deleteURL: urls.daily_milk_recording.delete,

            itemID: null,
            editLoading: false,
            editStatus: false,

            editingItem: {
                id: null,
                milk_date: null,
                cow: null,
                cow_reg_no: null,
                evening_qty: null,
                morning_qty: null,
                protein: null,
                snf: null,
                somatic_cell_count: null,
                dnb: null,
                fat: null,
                remarks: null
            },

            search: {
                from_date: null,
                to_date: null,
                reg_no: null
            },

            // IMPORTANT FIX
            tableParams: {
                from_date: null,
                to_date: null,
                reg_no: null
            },

            fields: [
                {
                    name: 'milk_date',
                    sortField: 'milk_date',
                    title: 'Date'
                },
                {
                    name: 'cow_reg_no',
                    sortField: 'cow_reg_no',
                    title: 'Register No'
                },
                {
                    name: 'morning_qty',
                    sortField: 'morning_qty',
                    title: 'Morning Quantity'
                },
                {
                    name: 'evening_qty',
                    sortField: 'evening_qty',
                    title: 'Evening Quantity'
                },
                {
                    name: '__slot:actions',
                    title: 'Actions'
                }
            ],

            rules: {
                positiveOnly: {
                    customValidator: (value) => {
                        return this.avoidNegetive(value);
                    }
                }
            }
        };
    },

    watch: {
        search: {
            deep: true,
            handler (val) {
                this.tableParams = {
                    from_date: val.from_date,
                    to_date: val.to_date,
                    reg_no: val.reg_no
                };
            }
        }
    },

    methods: {
        BackToHome () {
            this.$router.push({ path: '/ah-section/' });
        },
        editItem (item) {
            console.log('edit-item:>>>:', item);

            this.editStatus = true;

            this.$refs.editRecord.show();

            setTimeout(() => {
                this.editingItem = {
                    id: item.id,
                    milk_date: item.milk_date,
                    cow: item.cow,
                    cow_reg_no: item.cow_reg_no,
                    evening_qty: item.evening_qty,
                    morning_qty: item.morning_qty,
                    protein: item.protein,
                    snf: item.snf,
                    somatic_cell_count: item.somatic_cell_count,
                    dnb: item.dnb,
                    fat: item.fat,
                    remarks: item.remarks
                };
            }, 50);
        },

        deleteItem (item) {
            this.itemID = item;
            this.$refs.deleteModal.show();
        },

        parseDate (dateStr) {
            if (!dateStr) return null;

            const [day, month, year] = dateStr.split('-');

            return new Date(year, month - 1, day);
        },

        disabledToDate (date) {
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const from = this.parseDate(this.search.from_date);

            if (from) {
                from.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
                (from && date < from)
            );
        },

        disabledFromDate (date) {
            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const to = this.parseDate(this.search.to_date);

            if (to) {
                to.setHours(0, 0, 0, 0);
            }

            return (
                date > today ||
                (to && date > to)
            );
        },

        avoidNegetive (no) {
            const num = no;

            if (num < 0) {
                return 'Please enter a valid number';
            }

            return true;
        },

        deleteComplete (response) {
            const data = response.data || response;

            console.log(data);

            if (data.success) {
                this.$notify(
                    'Deleted Successfully',
                    'Success',
                    { type: 'success' }
                );

                // refresh ONLY after delete confirm
                this.$refs.table.refreshTable();
            } else {
                this.$notify(
                    data.message || 'Unable to delete record',
                    'Warning',
                    { type: 'warning' }
                );
            }

            this.$refs.deleteModal.close();
        },

        AddRecord () {
            this.$router.push({
                path: '/cows-daily-milk-recording/'
            });
        },

        async EditRecord () {
            this.editLoading = true;

            try {
                this.editingItem.remarks =
                    this.editingItem.remarks || '';

                const response = await axios.form(
                    urls.daily_milk_recording.addEdit,
                    this.editingItem
                );

                const result = response.data;

                if (result.success) {
                    this.$notify(
                        result.message || 'Updated Successfully',
                        'Success',
                        { type: 'success' }
                    );

                    this.$refs.editRecord.close();

                    // refresh ONLY after save
                    setTimeout(() => {
                        this.$refs.table.refreshTable();
                    }, 300);
                } else if (result.errors) {
                    const errors = result.errors;

                    for (const key in errors) {
                        let errorMessage = '';

                        if (key === '__all__') {
                            errorMessage = errors[key];
                        } else {
                            errorMessage = `${key}: ${errors[key]}`;
                        }

                        this.$notify(
                            errorMessage,
                            'Warning',
                            { type: 'warning' }
                        );
                    }
                }
            } catch (error) {
                this.$notify(
                    'Something Went Wrong..!!',
                    error.response.status + ' ' +
                    error.response.statusText,
                    { type: 'danger' }
                );
            } finally {
                this.editLoading = false;
            }
        },

        detailsPage (id) {
            this.$router.push({
                name: 'DailyMilkRecordingEdit',
                params: { id: id }
            });
        }
    }
};
</script>

<style>
table {
    background-color: #f3f3f3;
    text-align: center;
}

th {
    background-color: white;
    border: 0px;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 18px;
    text-align: center;
}

td {
    padding-left: 18px;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
}

table,
td,
tr {
    border: none;
    border-collapse: collapse;
}

table,
th,
tr {
    border-radius: 4px;
}
</style>

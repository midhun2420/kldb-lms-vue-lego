import Vuetable from 'vuetable-2/src/components/Vuetable';
import VueTablePaginationBootstrap from './Pagination';
import config from '@lego/config';
import _ from 'lodash';

export default {
    props: {
        loadOnStart: { type: Boolean, default: true },
        fields: { type: Array, required: true },

        tableData: { type: Array, required: false },
        url: { type: String, required: false },
        extraParams: { type: Object, default: null },

        perPage: { type: Number, default: 10 },
        showPagination: { type: Boolean, default: true },

        containerClasses: { type: String, default: '' },

        searchPlaceholder: { type: String, default: 'Search' },

        activeShadow: { type: String, default: '' },
        firstIcon: { type: String, default: config.pagination.firstPageIcon },
        lastIcon: { type: String, default: config.pagination.lastPageIcon },
        nextIcon: { type: String, default: config.pagination.nextPageIcon },
        prevIcon: { type: String, default: config.pagination.prevPageIcon }
    },

    watch: {
        extraParams: function () {
            this.refreshTable();
        },
        perPage: function () {
            this.updatePerPage();
        },

        search: function () {
            this.refreshTable();
        }

    },

    data: function () {
        return {
            dataLoading: false,
            error: false,

            page: 1,

            from: 0,
            to: 0,
            total: 0,
            lastPage: 0,
            perPageValue: 10,

            search: '',
            filterValues: {}
        };
    },

    beforeMount () {
        this.perPageValue = this.perPage;
    },

    computed: {
        tableProperties () {
            const url = this.url;
            const properties = {
                fields: this.fields,
                'per-page': this.perPageValue,
                'load-on-start': this.loadOnStart
            };

            if (url) {
                properties['api-mode'] = true;
                properties['api-url'] = url;
                properties['reactive-api-url'] = true;
                properties['load-on-start'] = this.loadOnStart;
                properties['query-params'] = this.makeQueryParams;
            } else {
                properties['pagination-path'] = 'pagination';
                properties['api-mode'] = false;
                properties['data-manager'] = this.dataManager;
            }

            return properties;
        },

        tableListeners () {
            return {
                'vuetable:pagination-data': this.onPaginationData,
                'vuetable:loading': this.showLoadingAnimation,
                'vuetable:load-success': this.hideLoadingAnimation,
                'vuetable:load-error': this.setError
            };
        }
    },

    methods: {
        dataManager (sortOrder, pagination) {
            if (this.tableData.length < 1) return;

            let local = this.tableData;

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                // console.log('orderBy:', sortOrder[0].sortField, sortOrder[0].direction);

                local = _.orderBy(
                    local,
                    sortOrder[0].sortField,
                    sortOrder[0].direction
                );
            }

            pagination = this.$refs.vuetable.makePagination(
                local.length,
                this.perPage
            );

            // console.log('pagination 2:', pagination);

            const from = pagination.from - 1;
            const to = from + this.perPage;

            const items = _.slice(local, from, to);
            const newItems = [];
            let i = 0;
            const count = items.length;

            for (i = 0; i < count; i += 1) {
                const item = items[i];
                item.$slNo = from + i + 1;
                newItems.push(item);
            }

            return {
                pagination: pagination,
                data: newItems
            };
        },

        makeQueryParams (sortOrder, currentPage) {
            this.selectedItems = [];
            let data = {
                page: currentPage,
                per_page: this.perPageValue,
                search: this.search,

                ...this.filterValues
            };

            if (this.extraParams) {
                data = {
                    ...this.extraParams,
                    ...data
                };
            }

            const firstSortOrder = sortOrder[0];
            return firstSortOrder
                ? {
                    sort: firstSortOrder
                        ? firstSortOrder.field + '|' + firstSortOrder.direction
                        : '',
                    ...data
                }
                : {
                    ...data
                };
        },

        onFilter (filterValues) {
            this.filterValues = filterValues;
            this.refreshTable();
        },

        onPaginationData (paginationData) {
            this.from = paginationData.from;
            this.to = paginationData.to;
            this.total = paginationData.total;
            this.lastPage = paginationData.last_page;
            this.items = paginationData.data;
            this.$refs.pagination.setPaginationData(paginationData);
            this.emitPaginationUpdated();
        },

        emitPaginationUpdated () {
            this.$emit('pagination-updated', {
                from: this.from,
                to: this.to,
                total: this.total,
                lastPage: this.lastPage
            });
        },

        updatePerPage () {
            this.perPageValue = this.perPage;
        },

        refreshTable () {
            this.$refs.vuetable.refresh();
        },

        showLoadingAnimation () {
            this.error = false;
            if (this.url) {
                this.dataLoading = true;
            }
        },

        hideLoadingAnimation () {
            this.error = false;
            this.dataLoading = false;
        },

        setError () {
            this.error = true;
            this.dataLoading = false;
        },

        onChangePage (page) {
            this.$refs.vuetable.changePage(page);
        },

        changePageSize (perPage) {
            this.perPageValue = perPage;
            this.refreshTable();
        },

        getData () {
            return this.$refs.vuetable.tableData;
        },

        setData (data) {
            return this.$refs.vuetable.setData(data);
        }
    },

    components: {
        vuetable: Vuetable,
        'vuetable-pagination-bootstrap': VueTablePaginationBootstrap
    }

};

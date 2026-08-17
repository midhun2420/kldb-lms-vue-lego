
<template>
    <div class="card mb-5 table-container">
        <div class="fl-te-c pb-3 text-5 font-poppins-semibold fs-lg-2">
            <h4 v-html="title"></h4>

            <div>
                <slot name="buttons"></slot>
            </div>
        </div>

        <div class="ld-over" :class="[{'running': dataLoading}]">

            <div class="ld ld-ring ld-spin" v-if="dataLoading"></div>

            <div class="mb-2 mt-2 fl-te-c">
                <form-input size="sm" :placeholder="searchPlaceholder" v-model="search" v-show="showSearchBox"/>
                <div v-show="!showSearchBox"></div>
                <slot name="extraHead"></slot>
                <div class="fl-te-c">
                    <span class="text-muted text-small mr-3">{{ from }}-{{ to }} of {{ total }}</span>
<!--                    <validated-vue-select right :options="setOptions()" label="Per Page"-->
<!--                                      variant="outline-dark" class="d-inline-block mr-3"-->
<!--                                      v-model="loadSize"-->
<!--                                      @input="changePageSize(loadSize)"-->
<!--                                    size="xs">-->
<!--                    </validated-vue-select>-->

                </div>
            </div>

            <div v-show="error">
                <slot name="error">
                    <div class="bg-danger p-3">
                        <error-icon/>
                        Loading Data Failed.
                    </div>
                </slot>
            </div>

            <vuetable ref="vuetable" pagination-path class="order-with-arrow responsive-table" :api-url="url" :per-page="perPageValue"
                      :reactive-api-url="true" :fields="fields"
                      @vuetable:pagination-data="onPaginationData" @vuetable:loading="showLoadingAnimation"
                      @vuetable:load-success="hideLoadingAnimation" @vuetable:load-error="setError"
                      :query-params="makeQueryParams" v-show="!error" :load-on-start="loadOnStart">

                <!--suppress XmlUnboundNsPrefix, JSUnusedLocalSymbols -->
                <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope"/>
                </template>

            </vuetable>
            <vue-table-pagination-bootstrap
                :next-icon="nextIcon" :prev-icon="prevIcon"
                v-show="showPagination" class="mt-4" ref="pagination"
                @vuetable-pagination:change-page="onChangePage"/>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<script>
import VueTableComponentMixin from './VueTableComponentMixin';
import VueTablePaginationBootstrap from './Pagination';

export default {
    name: 'vue-table-card',
    extends: VueTableComponentMixin,
    components: {
        VueTablePaginationBootstrap
    },
    props: {
        title: { type: String, default: '' },
        pageSizes: {
            type: Array,
            default: () => [10, 50, 100, 1000]
        }
    },
    data () {
        return {
            loadSize: 10
        };
    },
    methods: {

        setOptions () {
            const options = [];
            for (const i in this.pageSizes) {
                options.push({
                    label: this.pageSizes[i],
                    value: this.pageSizes[i]
                });
            }

            return options;
        }
    }
};
</script>

<style>
.table-container {
  overflow-x: auto;
  max-width: 100%;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
}

.responsive-table th,
.responsive-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

/* Apply responsive design for smaller screens */
@media (max-width: 768px) {
  .responsive-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .responsive-table thead,
  .responsive-table tbody,
  .responsive-table tr,
  .responsive-table th,
  .responsive-table td {
    display: block;
  }

  .responsive-table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .responsive-table tbody tr {
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .responsive-table td {
    border: none;
    border-bottom: 1px solid #ccc;
    position: relative;
    padding-left: 50%;
  }

  .responsive-table td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
  }
}

</style>

<template>
    <nav>
        <ul class="pagination justify-content-center pagination-sm">
            <li :class="{'disabled': isOnFirstPage,'page-item':true}">
                <a class="page-link" href="javascript:;" @click.prevent="loadPage('prev')">
                    <span><i :class="prevIcon"/></span>
                </a>
            </li>
            <template v-if="notEnoughPages">
                <li v-for="n in totalPage" :class="className(n)" :key="n">
                    <a class="page-link" href="javascript:;" @click.prevent="loadPage(n)" v-html="n"></a>
                </li>
            </template>
            <template v-else>
                <li v-for="n in windowSize" :class="className(windowStart+n-1)" :key="n">
                    <a class="page-link" href="javascript:;" @click.prevent="loadPage(windowStart+n-1)" v-html="windowStart+n-1"></a>
                </li>
            </template>
            <li :class="{'disabled': isOnLastPage,'page-item':true}">
                <a class="page-link" href="javascript:;" @click.prevent="loadPage('next')">
                    <span><i :class="nextIcon"/></span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import VueTablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin';
// import config from '../Config';

export default {
    name: 'vuetable-pagination-bootstrap',
    props: {
        nextIcon: { type: String /* default: config.config.tables.nextPageIcon */ },
        prevIcon: { type: String /* default: config.config.tables.prevPageIcon */ },
        activeShadow: { type: String, default: '11' }
    },
    methods: {
        className (i) {
            const names = ['page-item'];
            if (this.isCurrentPage(i)) {
                names.push('active');
                if (this.activeShadow) {
                    names.push('bs-' + this.activeShadow);
                }
            }

            return names;
        }
    },
    mixins: [VueTablePaginationMixin]
};
</script>

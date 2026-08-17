import SimpleVueTable from 'lego-framework/src/tables/SimpleVueTable';

export default {
    extends: SimpleVueTable,
    props: {
        // color: { type: String, default: 'danger-700' },
        containerClasses: { type: String, default: 'bs-29 b-1 card p-0 of-h w-100p' },
        showSearchBox: { type: Boolean, default: false },
        paginationDesign: { type: String, default: 'design-2' },
        paginationPrevNextButtonDesign: { type: String, default: '' },
        paginationPrevNextButtonClasses: { type: [String, Array], default: 'bs-9h font-poppins-medium bg-3-h b-2' },
        paginationContainerClasses: { type: [String, Array], default: 'p-3 px-5 pb-4 bt-1' },
        showCurrentPageDataIndexes: { type: Boolean, default: false },
        showPagination: { type: Boolean, default: true }
    }
};

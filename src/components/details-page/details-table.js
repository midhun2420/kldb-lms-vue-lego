import SimpleTable from 'lego-framework/src/tables/SimpleTable';

export default {
    name: 'DetailsTable',
    extends: SimpleTable,
    props: {
        tableAdditionalClasses: { type: [String, Array], default: 'table-border-collapse-separate mb-0' },
        containerClasses: { type: [String, Array], default: 'p-2 bg-2 round-1 bs-5' },
        tableHeadingContainerClasses: { type: [String, Array], default: 'px-3 pt-2' }
    }
};

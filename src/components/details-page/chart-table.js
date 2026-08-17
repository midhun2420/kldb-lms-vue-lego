import SimpleTable from 'lego-framework/src/tables/SimpleTable';

export default {
    name: 'ChartTable',
    extends: SimpleTable,
    props: {
        tableAdditionalClasses: { type: [String, Array], default: 'mb-0 p-0' },
        containerClasses: { type: [String, Array], default: 'p-0 bg-2 round-1 bs-5 of-h bg-13' },
        tableHeadingContainerClasses: { type: [String, Array], default: 'px-3 py-2 bg-primary' }
    }
};

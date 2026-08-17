import Tabs from 'lego-framework/src/containers/Tabs';

export default {
    name: 'details-tabs',
    extends: Tabs,
    props: {
        align: { type: String, default: 'center' },
        tabsContainerClasses: { type: [String, Array], default: 'b-unset bg-1 pt-3' },
        tabTitleClasses: { type: [String, Array], default: 'text-2 font-poppins-semibold py-4 px-4 fs-lg-2' },
        headerClasses: { type: [String, Array], default: 'bs-5 bg-2' },
        color: { type: String, default: 'fifth' },
        mode: { type: String, default: 'formal' }
    }
};

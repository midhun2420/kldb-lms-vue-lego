import VueTableMixin from './VueTableMixin';
import FormInput from 'lego-framework/src/forms/FormInput';

const VueTableComponentMixin = {
    extends: VueTableMixin,
    components: { FormInput },
    props: {
        pageSizes: { type: Array, default: () => [4, 8, 12] },
        showBorder: { type: Boolean, default: false },
        showSearchBox: { type: Boolean, default: true },
        filters: {
            type: Array,
            default () {
                return [];
            }
        }
    }
};

export default VueTableComponentMixin;

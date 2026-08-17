import BaseFormControl from './BaseFormControl';
import vSelect from 'vue-select';

export default {
    components: { BaseFormControl, vSelect },
    props: {
        clearable: { type: Boolean, default: true },
        multiple: { type: Boolean, default: false },
        selectFirst: { type: Boolean, default: false }
    },
    watch: {
        options () {
            this.findModel();
        },

        'value' (newValue) {
            this.model = newValue;
            this.findModel();
        }
    },

    methods: {
        findModel () {
            const options = this.options;
            if (!options || options.length === 0) {
                return;
            }

            if (this.multiple) {
                this.findModelMultiple(options);
                return;
            }

            const selectedValue = this.value + '';
            const len = options.length;
            let i;
            let item;
            for (i = 0; i < len; i += 1) {
                item = options[i];
                const value = item.value + '';
                if (value === selectedValue) {
                    this.model = item;
                    return;
                }
            }

            if (this.selectFirst && len > 0) {
                this.model = this.options[0];
                this.updateValue();
            }
        },

        findModelMultiple (options) {
            const selectedValue = this.value;
            if (Array.isArray(selectedValue) === false) {
                this.model = [];
                return;
            }

            const optionsLength = options.length;
            const selectedValueLength = selectedValue.length;

            let i;
            let j;
            let currentOption;
            let currentOptionValue;
            let selectedItemValue;
            const models = [];

            for (i = 0; i < optionsLength; i += 1) {
                currentOption = options[i];
                currentOptionValue = options[i].value + '';
                for (j = 0; j < selectedValueLength; j += 1) {
                    selectedItemValue = selectedValue[j];
                    if (selectedItemValue.value) {
                        selectedItemValue = selectedItemValue.value;
                    }
                    selectedItemValue = selectedItemValue + '';
                    if (currentOptionValue === selectedItemValue) {
                        models.push(currentOption);
                        break;
                    }
                }
            }

            this.model = models;
        },

        updateValue () {
            if (this.multiple) {
                const models = this.model;
                const result = [];
                const len = models.length;
                let i;
                for (i = 0; i < len; i += 1) {
                    result.push(models[i].value);
                }
                this.$emit('input', result);
            } else {
                let value = this.model;
                if (value) {
                    value = value.value;
                }
                this.$emit('input', value);
            }
        }

    }
};

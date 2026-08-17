import CommonProps from './CommonProps';

const BaseInput = {
    allowedControlAttributeNames: ['disabledTime', 'disabledDate', 'defaultPanel'],
    data () {
        return { focused: false, model: '', loadingOptions: false };
    },
    mounted () {
        this.model = this.value;
    },
    watch: {
        'value' (newValue) {
            this.model = newValue;
        }
    },
    computed: {
        listeners () {
            const listeners = {
                input: this.updateValue,
                focus: this.onFocus,
                blur: this.onBlur,
                'search:focus': this.onFocus,
                'search:blur': this.onBlur
            };

            if (this.disableCopyAndPaste) {
                listeners.paste = this.prevent;
                listeners.copy = this.prevent;
            }

            return listeners;
        },

        controlAttributes () {
            const attributes = {
                placeholder: this.placeholder,
                id: this.controlId
            };

            const options = this.$options;
            const allowedAttrs = options.allowedControlAttributeNames;
            const len = allowedAttrs.length;
            for (let i = 0; i < len; i += 1) {
                const attr = allowedAttrs[i];
                const value = this[attr];
                if (value !== undefined && value !== '') {
                    attributes[attr] = value;
                }
            }

            if (this.disableAutoComplete) {
                attributes.autocomplete = 'off';
            }

            return attributes;
        },

        formControlAttributes () {
            return {
                color: this.color,
                label: this.label,
                icon: this.icon,
                clearIcon: this.clearIcon,

                size: this.size,
                hasData: !!this.model,

                design: this.design,

                name: this.name || this.label || this.placeholder,
                rules: this.rules,

                focused: this.focused,
                disabled: this.disabled,

                borderRadius: this.borderRadius,
                shadow: this.shadow,
                hoverShadow: this.hoverShadow,

                loadingOptions: this.loadingOptions,

                showLoadingAppend: this.showLoadingAppend,
                showLoadingPrepend: this.showLoadingPrepend,

                inputClasses: this.inputClasses,
                labelClasses: this.labelClasses,
                errorMessage: this.errorMessage,
                successMessage: this.successMessage
            };
        }
    },
    props: {
        value: { type: [String, Number, Array, Boolean, Object], default: '' },
        ...CommonProps
    },
    methods: {
        prevent (evt) {
            evt.preventDefault();
            return false;
        },
        onFocus (evt) {
            this.focused = true;
            this.$emit('focus', evt);
        },
        onBlur (evt) {
            this.focused = false;
            this.$emit('blur', evt);
        },
        updateValue (evt) {
            let value;
            if (evt && evt.target && evt.target.value) {
                value = evt.target.value;
            }
            this.$emit('input', value);
        },
        clear () {
            this.model = '';
            this.$emit('input', '');
        }
    }
};

export default BaseInput;

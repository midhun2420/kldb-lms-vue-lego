const CommonProps = {
    controlId: { type: String, default: '' },

    design: { type: String, default: '' },

    placeholder: { type: String, default: '' },
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    clearIcon: { type: String, default: '' },
    clearText: { type: String, default: '' },

    disabled: { type: Boolean, default: false },

    name: { type: String, default: '' },
    rules: { type: Object, default: null },

    color: { type: String, default: '' },
    size: { type: String, default: '' },

    borderRadius: { type: String, default: '1' },
    shadow: { type: String, default: '1' },
    hoverShadow: { type: String, default: '' },

    showLoadingAppend: { type: Boolean, default: false },
    showLoadingPrepend: { type: Boolean, default: false },

    disableAutoComplete: { type: Boolean, default: false },
    disableCopyAndPaste: { type: Boolean, default: false },

    errorMessage: { type: String, default: '' },
    successMessage: { type: String, default: '' },
    labelClasses: { type: [String, Array], default: '' },
    inputClasses: { type: [String, Array], default: '' }
};

export default CommonProps;

import FormFileInputFilenameSeparated from 'lego-framework/src/forms/FormFileInputFilenameSeparated';

export default {
    name: 'FormFileInputSeparateFilename',
    extends: FormFileInputFilenameSeparated,
    props: {
        inputContainerClasses: { type: [String, Array], default: 'text-center round-1 of-h' },
        inputClasses: { type: [String, Array], default: 'bg-primary mb-0' },
        labelText: { type: String, default: 'Upload' },
        labelTextClasses: { type: [String, Array], default: 'text-white' },
        // fileNameClasses: { type: [String, Array], default: 'fs-lg--1 text-primary w-10r text-truncate' },
        fileNameClasses: { type: [String, Array], default: 'fs-lg--1 text-primary w-10r mt-n2' },
        fileNameContainerClasses: { type: [String, Array], default: '' },
        showFileClearButton: { type: Boolean, default: false },
        fileTypesInfo: { type: String, default: '' },
        fileTypesContainerClasses: { type: [String, Array], default: 'mt-n3 text-primary' }
    }
};

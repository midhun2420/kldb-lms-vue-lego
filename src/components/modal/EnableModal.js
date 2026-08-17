import Modal from 'lego-framework/src/ajax/ConfirmPostModal';

export default {
    name: 'enable-modal',
    extends: Modal,
    props: {
        width: { type: String, default: '30r' },
        title: { type: String, default: 'Enable' },
        headerColor: { type: String, default: 'success' },
        bodyColor: { type: String, default: 'success' },
        dialog: { type: Boolean, default: true },
        okButton: { type: String, default: 'Enable' },
        okButtonColor: { type: String, default: 'success' },
        cancelButton: { type: String, default: 'No' },
        cancelButtonColor: { type: String, default: 'primary' }
    }
};

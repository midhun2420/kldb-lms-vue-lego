import Modal from 'lego-framework/src/ajax/ConfirmPostModal';

export default {
    name: 'disable-modal',
    extends: Modal,
    props: {
        width: { type: String, default: '30r' },
        title: { type: String, default: 'Disable' },
        headerColor: { type: String, default: 'danger' },
        bodyColor: { type: String, default: 'danger' },
        dialog: { type: Boolean, default: true },
        okButton: { type: String, default: 'Disable' },
        okButtonColor: { type: String, default: 'danger' },
        cancelButton: { type: String, default: 'No' },
        cancelButtonColor: { type: String, default: 'primary' }
    }
};

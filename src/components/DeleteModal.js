import Modal from 'lego-framework/src/ajax/ConfirmPostModal';
export default {
    name: 'delete-modal',
    extends: Modal,
    props: {
        width: { type: String, default: '30r' },
        title: { type: String, default: 'Delete' },
        headerColor: { type: String, default: 'danger' },
        bodyColor: { type: String, default: 'danger' },
        dialog: { type: Boolean, default: true },
        okButton: { type: String, default: 'Delete' },
        okButtonColor: { type: String, default: 'danger' },
        cancelButton: { type: String, default: 'No' },
        cancelButtonColor: { type: String, default: 'primary' }
    }
};

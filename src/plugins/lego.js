import Button from 'lego-framework/src/components/Button';
import Modal from 'lego-framework/src/containers/Modal';
import Tabs from 'lego-framework/src/containers/Tabs';
import Tab from 'lego-framework/src/containers/Tab';
import Section from 'lego-framework/src/containers/Section';
import IconImage from 'lego-framework/src/components/IconImage';
import ClickOutside from 'lego-framework/src/directives/click-outside';
import FormInput from 'lego-framework/src/forms/FormInput';
import FormMaskInput from 'lego-framework/src/forms/FormMaskInput';
import FormTextArea from 'lego-framework/src/forms/FormTextArea';
import FormSelect from 'lego-framework/src/forms/FormSelect';
import FormDatePicker from 'lego-framework/src/forms/FormDatePicker';
import TransitionFade from '../components/ui/TransitionFade';
import FormFileInput from '../components/ui/extended-components/FormFileInputSeparateFilename';
import FormFileInputType2 from '../components/ui/extended-components/form-file-input-separated-file-name-type2';
import DashboardCardItem from '../components/ui/DashboardCardItem';
import CustomSimpleVueTable from '../components/ui/extended-components/simple-vue-table-extended';
import FormAjaxSelect from '../components/customAjax/FormAjaxSelect';

import UploadedFileItem from '../components/ui/UploadedFileItem';
import VueApexCharts from 'vue-apexcharts';

import Form from 'lego-framework/src/forms/PostForm';
import SimpleForm from 'lego-framework/src/forms/SimpleForm';

// Grid Items
import Row from 'lego-framework/src/containers/Row';
import Col12 from 'lego-framework/src/containers/grid/col-12';

// import VueTable from 'lego-framework/src/tables/VueTable';
import VueTable from '../components/CustomTable/customVueTableCard';
import VueTableCard from 'lego-framework/src/tables/VueTableCard';
import SimpleTable from 'lego-framework/src/tables/SimpleTable';

import ErrorIcon from 'lego-framework/src/svg-icons/ErrorIcon';
import SuccessIcon from 'lego-framework/src/svg-icons/SuccessIcon';
import LoadingAnimation from 'lego-framework/src/svg-icons/LoadingAnimation';
import FormCheckbox from 'lego-framework/src/forms/FormCheckbox';

import * as validator from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

import EditButton from 'lego-framework/src/components/EditButton';
import DeleteButton from 'lego-framework/src/components/DeleteButton';
import SaveButton from 'lego-framework/src/components/SaveButton';

import AjaxView from 'lego-framework/src/ajax/AjaxView';
import NotificationsPlugin from 'lego-framework/src/notification';
import DeleteModal from '../components/DeleteModal';
// loading
import loadingRound from '../components/loadingAnimation/loadingRound';
import loadingHorizontal from '../components/loadingAnimation/loadingHorizontal';

import nameExists from '@/validators/nameExists';

export default {
    install: function (Vue) {
        Vue.use(ClickOutside);
        Vue.use(NotificationsPlugin);
        Vue.use(VueApexCharts);

        Vue.component('btn', Button);
        Vue.component('edit-btn', EditButton);
        Vue.component('delete-btn', DeleteButton);
        Vue.component('save-btn', SaveButton);
        Vue.component('tabs', Tabs);
        Vue.component('tab', Tab);
        Vue.component('modal', Modal);
        Vue.component('lego-section', Section);
        Vue.component('icon-img', IconImage);

        Vue.component('b-form', Form);
        Vue.component('s-form', SimpleForm);
        Vue.component('validated-checkbox', FormCheckbox);

        Vue.component('validated-input', FormInput);
        Vue.component('validated-text-area', FormTextArea);
        Vue.component('validated-mask-input', FormMaskInput);
        Vue.component('validated-select', FormSelect);
        Vue.component('validated-ajax-vue-select', FormAjaxSelect);
        Vue.component('validated-vue-select', FormSelect);
        Vue.component('validated-date-picker', FormDatePicker);
        Vue.component('validated-file-input', FormFileInput);
        Vue.component('validated-file-input-type2', FormFileInputType2);

        Vue.component('vue-table', VueTable);

        Vue.component('vue-table-card', VueTableCard);
        Vue.component('custom-simple-vue-table', CustomSimpleVueTable);
        Vue.component('simple-table', SimpleTable);
        Vue.component('uploaded-file-item', UploadedFileItem);

        Vue.component('apexchart', VueApexCharts);

        Vue.component('row', Row);
        Vue.component('col-12', Col12);

        Vue.component('dashboard-card-item', DashboardCardItem);

        Vue.component('error-icon', ErrorIcon);
        Vue.component('success-icon', SuccessIcon);
        Vue.component('loading-animation', LoadingAnimation);
        Vue.component('loading-round', loadingRound);
        Vue.component('loading-horizontal', loadingHorizontal);
        Vue.component('transition-fade', TransitionFade);

        Vue.component('ajax-view', AjaxView);

        Vue.component('delete-modal', DeleteModal);

        Vue.component('validation-provider', validator.ValidationProvider);
        Vue.component('validation-observer', validator.ValidationObserver);

        Object.keys(rules).forEach(rule => {
            validator.extend(rule, {
                ...rules[rule], // copies rule configuration
                message: messages[rule] // assign message
            });
        });

        nameExists.install();
    }
};

<template>
    <base-form-control v-bind="formControlAttributes">
        <slot name="prepend"></slot>
        <v-select class="control" :clearable="clearable" v-bind="controlAttributes" v-model="model" :disabled="disabled" :multiple="multiple" v-on="listeners" :options="options"></v-select>
        <slot name="append"></slot>
    </base-form-control>
</template>

<script>
import BaseInput from './BaseInput';
import VueSelectCommons from './VueSelectCommons';
import axios from 'secure-axios';

export default {
    name: 'form-ajax-select',
    extends: BaseInput,
    mixins: [VueSelectCommons],
    data () {
        return { model: '', options: [] };
    },
    props: {
        ajaxMethod: { type: String, default: 'form' },

        url: { type: String, required: true },
        params: { type: Object, default: null }
    },
    mounted () {
        this.loadOptions();
        this.findModel();
    },
    watch: {
        url: 'loadOptions',
        params: 'loadOptions'
    },
    methods: {
        async loadOptions () {
            this.loadingOptions = true;
            this.disabled = true;
            let response;
            const options = this.options;
            if (!options) {
                response = await axios.get(this.url);
            } else {
                response = await axios.perform(this.url, options, this.ajaxMethod);
            }
            this.options = response.data.data;
            this.findModel();
            this.disabled = false;
            this.loadingOptions = false;
        }
    }

};
</script>

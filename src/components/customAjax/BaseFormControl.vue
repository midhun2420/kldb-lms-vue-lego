<template>
    <validation-provider tag="div" :rules="rules" :name="validatorName" v-bind="$attrs" v-slot="{errors, valid, invalid, validated}" class="form-group" :class="parentClass">
        <label v-if="label" :class="labelClasses" class="form-control-label">
            {{ label }}
        </label>
        <div :class="errors.length ? inputClassNames + ' error' : inputClassNames">
            <slot name="prepend-loading">
                <loading-animation v-if="showLoadingPrepend || loadingOptions"/>
            </slot>
            <slot name="prepend-icon">
                <i :class="icon" v-if="icon"></i>
            </slot>

            <slot :errors="errors" :valid="valid" :invalid="invalid" :validated="validated">

            </slot>
            <slot name="clear-icon">
                <i :class="clearIcon" v-if="clearIcon" @click="$emit('clear-clicked')"></i>
            </slot>
            <slot name="append-loading">
                <loading-animation v-if="showLoadingAppend"/>
            </slot>
        </div>
        <animate-transition enter-animation="fadeIn" exit-animation="fadeOut">
            <p class="text-danger" v-html="errors[0]" v-if="errors[0]"></p>
            <p class="text-danger" v-html="errorMessage" v-if="errorMessage"></p>
            <p class="text-success" v-html="successMessage" v-if="successMessage"></p>
        </animate-transition>
    </validation-provider>
</template>

<script>

import CommonProps from './CommonProps';
import * as validator from 'vee-validate';
import AnimateTransition from 'lego-framework/src/components/AnimateTransition';

export default {
    name: 'base-form-control',
    props: {
        isTextarea: { type: Boolean, default: false },
        isCheckbox: { type: Boolean, default: false },
        focused: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        hasData: { type: Boolean, default: false },

        loadingOptions: { type: Boolean, default: false },
        ...CommonProps
    },
    components: { AnimateTransition, 'validation-provider': validator.ValidationProvider },
    data () {
        return { validatorName: '' };
    },
    created () {
        this.validatorName = this.name || this.label;
    },
    computed: {
        parentClass () {
            const names = [];
            if (this.design === 'floating-top') {
                names.push('form-control-floating');
            }

            if (this.size) {
                names.push('form-control-' + this.size);
            }

            if (this.icon) {
                names.push('has-icon');
            }

            if (this.focused) {
                names.push('focus');
            } else if (this.hasData) {
                names.push('has-data');
            }

            return names;
        },

        inputClassNames () {
            const names = ['form-control'];
            names.push(this.inputClasses);

            if (this.errorMessage) {
                names.push('error');
            } else if (this.successMessage) {
                names.push('success');
            } else if (this.color) {
                names.push(this.color);
            }

            if (this.isTextarea) {
                names.push('form-textarea');
            }

            if (this.borderRadius) {
                names.push('round-' + this.borderRadius);
                names.push('round-' + this.borderRadius + '-b');
            }

            if (this.shadow) {
                names.push('bs-' + this.shadow);
            }

            if (this.hoverShadow) {
                names.push('bs-' + this.hoverShadow + '-h');
            }

            if (this.disabled) {
                names.push('disabled');
            }

            return names.join(' ');
        }
    }
};
</script>

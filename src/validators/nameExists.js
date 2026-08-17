import { extend } from 'vee-validate';

const checkDuplicate = (name, array) => {
    name = name.replace(/ /g, '');
    if (array.length !== 0) {
        for (let i = 0; i <= array.length; i++) {
            if (array[i] === name.toLowerCase()) {
                return true;
            }
        }
    }
    return false;
};

const validate = (value, { component, names, currentName }) => {
    if (value === component()[currentName].replace(/ /g, '').toLowerCase()) {
        return true;
    }

    if (!checkDuplicate(value, component()[names])) {
        return 'The ' + value + ' already exists.';
    }

    return true;
};

const params = ['component', 'names', 'currentName'];

export default {
    install () {
        extend('nameExists', { validate, params });
        extend('customValidator', {
            validate (value, { fn }) {
                return fn(value);
            },
            params: ['fn']
        });
    }
};

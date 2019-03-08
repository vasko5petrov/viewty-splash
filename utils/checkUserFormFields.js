const _ = require('lodash');

const checkUserFormFields = function(user) {
    const result = {
        errors: {}
    };

    _.forEach(user, (val, key) => {
        if(user[key] === undefined || user[key] === "") {
            result.errors[key] = `This field is required`;
        }
    })

    return result;
}

module.exports = checkUserFormFields;
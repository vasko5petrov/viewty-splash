const _ = require('lodash');

const parseErrors = function(errors) {
    const result = {};

    _.forEach(errors, (val, key) => {
        result[key] = val.message;
    })

    return result;
}

module.exports = parseErrors;
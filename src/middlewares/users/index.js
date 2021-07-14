const {check} = require('express-validator');

const _nameRequired = check('name', 'Name Required').not().isEmpty();

const postRequestValidations = [
    _nameRequired,
]

module.exports = {
    postRequestValidations
}
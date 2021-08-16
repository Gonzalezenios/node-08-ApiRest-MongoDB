const {
    check
} = require('express-validator');
const AppError = require('../../erros/appError');
const { validationResult } = require('../commons');


const _emailRequired = check('email', 'Email Required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _passwordRequiered = check('password', 'Password Required').not().isEmpty();

const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequiered,
    validationResult
];

module.exports = {
    postLoginRequestValidations
};
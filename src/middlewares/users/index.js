const {
    check
} = require('express-validator');
const AppError = require('../../erros/appError');
const userService = require('../../services/userService');
const {
    ROLES
} = require('../../constants/index');
const { validationResult } = require('../commons');


const _nameRequired = check('name', 'Name Required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name Required').not().isEmpty();
const _emailRequired = check('email', 'Email Required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);

const _optionalEmailValid = check('email', 'Email is invalid').isEmail();
const _optionarlEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if (userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);

const _passwordRequiered = check('password', 'Password Required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if (!ROLES.includes(role)) {
            throw new AppError('Invalid Role', 400);
        }
    }
);


const _dateValid = check('birthdate').optional().isDate('MM-DD-YYYY');

const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if (!userFound) {
            throw new AppError('id is does not exist in DB', 400);
        }
    }
);

const postRequestValidations = [
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequiered,
    _roleValid,
    _dateValid,
    validationResult
];

const putRequestValidations = [
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailValid,
    _optionarlEmailExist,
    _roleValid,
    _dateValid,
    validationResult
];

module.exports = {
    postRequestValidations,
    putRequestValidations,
};
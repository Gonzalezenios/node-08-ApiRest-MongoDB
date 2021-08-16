const express = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/successHandler');
const { request, response } = require('express');

const login = async (req = request, res = response, next) => {

    const { email, password } = req.body;
    try {


        res.json(new Success({ test: 'ingreso al login' }));

    } catch (error) {
        next(error);
    }

};

module.exports = {
    login
};
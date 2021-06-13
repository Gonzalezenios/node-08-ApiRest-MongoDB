const express = require('express');
const User = require('../models/user');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


const createUser = async (req, res, next) => {
    try {
        let user = req.body;
        user = await User.create(user);

        const result = {
            message: 'User Created',
            user
        }
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateUser = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        let user = req.body;
        user._id = id;

        await User.updateOne(user);


        const result = {
            message: 'User Updated',
            user
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updatePartialUser = (req, res, next) => {
    try {
        const result = {
            message: 'User updated with patch',
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteUser = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const user = await User.findById(id);
        user.remove();
        const result = {
            message: `User with id:${id} Deleted`
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}
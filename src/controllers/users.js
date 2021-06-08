const express = require('express');
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = (req, res) =>  {
    const users = [
        {
            id: 1,
            name: 'Enio'
        },
        {
            id: 2,
            name: 'Florencia'
        },
    ]
    res.json(users);
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


const createUser = (req, res) => {

    
    const user = req.body;
    user.id = 123

    const result = {
        message: 'User Created',
        user
    }
    res.status(201).json(result);
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateUser = (req, res) => {

    const { id } = req.params;
    const user = req.body;

    user.id = id;


    const result = {
        message: 'User Updated',
        user
    }
    res.json(result);
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updatePartialUser = (req, res) => {
    const result = {
        message: 'User updated with patch',
    }
    res.json(result);
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteUser = (req, res) => {

    const { id } = req.params;
    const result = {
        message: `User with id:${id} Deleted`
    }
    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}
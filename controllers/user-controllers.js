const res = require('express/lib/response');
const { Users } = require('../models');

const usersController = {

    // Get all Users
    getAllUsers(req, res) {
        Users.find({})
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one user by ID
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
            .then(dbUsersData => {
                // If no Users is found, send 404
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No user with this ID'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create Users
    // Note how the body obj is destructured out of the request object.
    // We can do that b/c we don't need anything else from the req object.
    createUsers({ body }, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));
    },

    // Update pizzy by ID
    updateUsers({ params, body }, res) {
        // If { new: true } isnt set in the third param, it wont return the updated json
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No Users found with this id' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    // Delete Users
    deleteUsers({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No Users found with that id'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = usersController;
const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} = require('../../controllers/user-controllers');

// Set up GET all and POST at /api/users
router 
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

// Set up GET one, PUT and DELETE at /api/Users/:id
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

const { 
    addFriends,
    removeFriends
} = require('../../controllers/friends-controllers');

// Set up POST and DELETE route for /api/Users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriends);
router.route('/:userId/friends/:friendId').delete(removeFriends);

module.exports = router;
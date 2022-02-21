const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controllers');

// Set up GET all and POST at /api/thought
router 
    .route('/')
    .get(getAllThought)
    .post(createThought);

// Set up GET one, PUT and DELETE at /api/thought/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

const { createReaction, deleteReaction } = require('../../controllers/reaction-controllers');

// Set up POST route for /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// Set up DELETE route for /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
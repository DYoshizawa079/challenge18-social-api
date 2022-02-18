
///
const router = require('express').Router();
const { createReaction, deleteReaction } = require('../../controllers/reaction-controllers');

// /api/comments/<pizzaId>
router.route('/:thoughtId/reactions').post(createReaction);

// /api/comments/<pizzaId>/<commentId>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
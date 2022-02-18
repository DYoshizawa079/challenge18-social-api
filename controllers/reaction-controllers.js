//const res = require('express/lib/response');
const { Reaction, Thought } = require('../models');

const reactionController = {

    // Get all Reaction
    /* getAllReaction(req, res) {
        Reaction.find({})
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }, */

    // Get one user by ID
    /* getReactionById({ params }, res) {
        Reaction.findOne({ _id: params.id })
            .then(dbReactionData => {
                // If no Reaction is found, send 404
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No Reaction with this ID'});
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }, */

    // Create Reaction
    // Note how the body obj is destructured out of the request object.
    // We can do that b/c we don't need anything else from the req object.
    /* createReaction({ body }, res) {
        Reaction.create(body)
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.status(400).json(err));
    }, */

    createReaction( { params, body }, res) {
        //console.log("PARAMS", params);
        Reaction.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: _id }}, 
                    { new: true }
                );
            })
            .then(dbReactionData => {
                if(!dbReactionData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
    },
    
    // Delete Reaction
    deleteReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
            .then(deletedReaction => {
                if(!deletedReaction) {
                    return res.status(404).json({ message: 'No reaction with this id found' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { reactions: params.reactionId }},
                    { new: true }
                );
            })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    res.status(404).json({ message: 'No reaction found with this id' });
                    return;
                }
                res.json(deletedReaction);
            })
            .catch(err => res.json(err));
    }
};

module.exports = reactionController;
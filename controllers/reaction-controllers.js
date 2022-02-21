const { Reaction, Thought } = require('../models');

const reactionController = {

    // Add a reaction to an existing post
    createReaction( { params, body }, res) {
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
    
    // Delete a reaction that's attached to an existing post
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
const { Users } = require('../models');

const friendsController = {

    addFriends( { params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }}, 
            { new: true }
        )
        .then(dbFriendsData => {
            if(!dbFriendsData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbFriendsData);
        })
        .catch(err => res.json(err));
    },
    
    // Delete Friends
    removeFriends( { params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }}, 
            { new: true }
        )
        .then(dbFriendsData => {
            if(!dbFriendsData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbFriendsData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = friendsController;
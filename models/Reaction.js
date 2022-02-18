// Import Mongoose's Schema constructor and model function
const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // Set default value to new ObjectId
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction statement',
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'Please enter a username'
        },
        createdAt: {
            type: Date,
            default: Date.now
            //Use a getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            virtuals: true, // Allow you to use virtuals
        },
        id: false // Set to false because we dont need it
    }
);

// Create the Users model using the UsersSchema
const Reaction = model('Reaction', ReactionSchema);

//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

// Export the Users model
module.exports = Thought;
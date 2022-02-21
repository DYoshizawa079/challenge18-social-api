// Import Mongoose's Schema constructor and model function
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter a thought',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            //Use a getter method to format timestamp on query
        },
        username: {
            type: String,
            required: 'Please enter a username'
        },
        // [] indicate that an array is the data type here
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction' 
            }
        ]
    },
    {
        toJSON: {
            virtuals: true, // Allow you to use virtuals
        },
        id: false // Set to false because we dont need it
    }
);

// Create the Users model using the UsersSchema
const Thought = model('Thought', ThoughtSchema);

// Export the Users model
module.exports = Thought;
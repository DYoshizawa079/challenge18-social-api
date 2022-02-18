// Import Mongoose's Schema constructor and model function
const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter an email address',
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        // [] indicate that an array is the data type here
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts' 
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users' 
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
const Users = model('Users', UsersSchema);

// Get total count of friends on retrieval
UsersSchema.virtual('friendCount').get(function(){
    return this.users.length;
});

// Export the Users model
module.exports = Users;
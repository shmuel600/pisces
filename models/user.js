import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    },
    location: {
        type: Object
    },
    findMe: {
        gender: { type: String, required: true },
        age: { type: Array, required: true },
        distance: { type: Number, required: true },
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    matchHistory: [{
        type: String
    }]

    // bio: {
    //     type: String
    // },
    // hobbies: {
    //     type: Array
    // },

    // profileImage: {
    //     type: String,
    // },
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
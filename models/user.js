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
    location: {
        type: Object
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    findMe: {
        gender: { type: String, required: true },
        age: { type: Array, required: true },
        distance: { type: Number, required: true },
    },
    since: {
        type: Date,
        default: Date.now
    },
    // gender: {
    //     type: String,
    //     required: true
    // },
    // birthday: {
    //     type: Date,
    //     required: true
    // },

    // bio: {
    //     type: String
    // },
    // hobbies: {
    //     type: Array
    // },

    // profileImage: {
    //     type: String,
    // },
    // matchHistory: {
    //     type: Array
    // }
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
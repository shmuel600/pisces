import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // gender: {
    //     type: String,
    //     required: true
    // },
    // birthday: {
    //     type: Date,
    //     required: true
    // },
    // findMe: {
    //     gender: { type: String, required: true },
    //     age: { type: Array, required: true },
    //     distance: { type: Number, required: true },
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
    // location: {
    //     type: Object
    // },
    // matchHistory: {
    //     type: Array
    // }
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
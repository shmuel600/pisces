import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chat = new Schema({
    participants: {
        type: Array
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
});

mongoose.models = {};

const Chat = mongoose.model('Chat', chat);

export default Chat;
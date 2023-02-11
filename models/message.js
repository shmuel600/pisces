import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const message = new Schema({
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    content: {
        type: String
    },
    sender: {
        type: String
    },
    time: {
        type: Date
    },
    recieved: {
        type: Boolean
    },
    read: {
        type: Boolean
    },
});

mongoose.models = {};

const Message = mongoose.model('Message', message);

export default Message;
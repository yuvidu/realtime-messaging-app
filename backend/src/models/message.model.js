import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID: {
        type :mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverID: {
        type :mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }


},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);
export default Message;